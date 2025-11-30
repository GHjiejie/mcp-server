import * as fs from "fs/promises";
import * as path from "path";
import { getMimeType } from "../../utils/file.js";

const DEFAULT_RESOURCE_DIR =
  process.env.MCP_FILE_RESOURCES_DIR ??
  "/Users/jie/Documents/Github/my-mcp-server/resources";

export interface FileResourceListItem {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

export interface FileResourceContent {
  uri: string;
  mimeType: string;
  text: string;
  fileName: string;
  category: string;
  size: number;
  modified: string;
}

export class FileResourceService {
  static get resourceRoot(): string {
    return DEFAULT_RESOURCE_DIR;
  }

  static async getCategoryDirectories(): Promise<string[]> {
    return FileResourceService.getSubDirectories(
      FileResourceService.resourceRoot
    );
  }

  static async listResourcesForCategory(
    categoryPath: string
  ): Promise<FileResourceListItem[]> {
    const categoryName = path.basename(categoryPath);
    const files = await FileResourceService.getAllFiles(categoryPath);

    return files.map((filePath) => {
      const relativePath = path.relative(categoryPath, filePath);
      const fileName = path.basename(filePath);

      return {
        uri: FileResourceService.filePathToUri(filePath, categoryName),
        name: fileName,
        description: `${categoryName}/${relativePath}`,
        mimeType: getMimeType(filePath),
      };
    });
  }

  static async completePaths(
    categoryPath: string,
    value: string
  ): Promise<string[]> {
    const files = await FileResourceService.getAllFiles(categoryPath);
    return files
      .map((file) => path.relative(categoryPath, file))
      .filter((relative) => relative.includes(value))
      .slice(0, 10);
  }

  static async readFileByUri(uri: string): Promise<FileResourceContent> {
    const { categoryName, filePath } = FileResourceService.uriToFilePath(uri);

    await FileResourceService.ensureFileExists(filePath);

    const content = await fs.readFile(filePath, "utf-8");
    const stats = await fs.stat(filePath);

    return {
      uri,
      mimeType: getMimeType(filePath),
      text: content,
      fileName: path.basename(filePath),
      category: categoryName,
      size: stats.size,
      modified: stats.mtime.toISOString(),
    };
  }

  private static async ensureFileExists(filePath: string) {
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`文件不存在: ${filePath}`);
    }
  }

  private static async getSubDirectories(dirPath: string): Promise<string[]> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(dirPath, entry.name));
    } catch (error) {
      console.error(`读取目录失败: ${dirPath}`, error);
      return [];
    }
  }

  private static async getAllFiles(dirPath: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          const subFiles = await FileResourceService.getAllFiles(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`读取目录失败: ${dirPath}`, error);
    }

    return files;
  }

  private static filePathToUri(filePath: string, categoryName: string): string {
    const relativePath = path.relative(
      path.join(FileResourceService.resourceRoot, categoryName),
      filePath
    );
    const encodedPath = encodeURIComponent(relativePath);
    return `file://${categoryName}/${encodedPath}`;
  }

  private static uriToFilePath(uri: string): {
    categoryName: string;
    filePath: string;
  } {
    const match = uri.match(/^file:\/\/([^/]+)\/(.+)$/);
    if (!match) {
      throw new Error(`无效的 URI 格式: ${uri}`);
    }

    const [, categoryName, encodedPath] = match;
    const relativePath = decodeURIComponent(encodedPath);
    const filePath = path.join(
      FileResourceService.resourceRoot,
      categoryName,
      relativePath
    );

    return { categoryName, filePath };
  }
}
