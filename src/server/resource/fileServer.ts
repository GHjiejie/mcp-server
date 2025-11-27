import * as fs from "fs/promises";
import * as path from "path";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getMimeType } from "../../utils/file.js";

// Markdown 文件目录
const DEV_DIR = "/Users/jie/Documents/Github/my-mcp-server/resources";

/**
 * 获取目录下的所有子目录
 */
async function getSubDirectories(dirPath: string): Promise<string[]> {
  const dirs: string[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        dirs.push(path.join(dirPath, entry.name));
      }
    }
    console.log("dirs", dirs);
  } catch (error) {
    console.error(`读取目录失败: ${dirPath}`, error);
  }

  return dirs;
}

/**
 * 递归获取目录下所有文件
 */
async function getAllFiles(dirPath: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // 递归获取子目录中的文件
        const subFiles = await getAllFiles(fullPath);
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

/**
 * 将文件路径转换为 URI
 */
function filePathToUri(filePath: string, categoryName: string): string {
  const relativePath = path.relative(
    path.join(DEV_DIR, categoryName),
    filePath
  );
  const encodedPath = encodeURIComponent(relativePath);
  return `file://${categoryName}/${encodedPath}`;
}

/**
 * 将 URI 转换回文件路径
 */
function uriToFilePath(uri: string, categoryName: string): string {
  const match = uri.match(new RegExp(`^file://${categoryName}/(.+)$`));
  if (!match) {
    throw new Error(`无效的 URI 格式: ${uri}`);
  }

  const encodedPath = match[1];
  const relativePath = decodeURIComponent(encodedPath);
  return path.join(DEV_DIR, categoryName, relativePath);
}

/**
 * 为指定目录创建资源模板
 */
function createResourceTemplateForDirectory(
  categoryPath: string
): ResourceTemplate {
  const categoryName = path.basename(categoryPath);

  return new ResourceTemplate(`file://${categoryName}/{path}`, {
    // 列出该目录下所有可用的文件资源
    list: async () => {
      const files = await getAllFiles(categoryPath);

      return {
        resources: files.map((filePath) => {
          const relativePath = path.relative(categoryPath, filePath);
          const fileName = path.basename(filePath);

          return {
            uri: filePathToUri(filePath, categoryName),
            name: fileName,
            description: `${categoryName}/${relativePath}`,
            mimeType: getMimeType(filePath),
          };
        }),
      };
    },

    // 支持路径自动补全
    complete: {
      path: async (value: string) => {
        try {
          const files = await getAllFiles(categoryPath);
          const suggestions = files
            .map((f) => path.relative(categoryPath, f))
            .filter((f) => f.includes(value))
            .slice(0, 10);

          return suggestions;
        } catch (error) {
          return [];
        }
      },
    },
  });
}

/**
 * 创建所有子目录的资源模板
 */
export async function createFileResourceTemplates(): Promise<
  Array<{ name: string; template: ResourceTemplate }>
> {
  const subDirs = await getSubDirectories(DEV_DIR);
  return subDirs.map((dir) => ({
    name: path.basename(dir),
    template: createResourceTemplateForDirectory(dir),
  }));
}

/**
 * 文件资源读取处理器
 */
export async function readFileResource(uri: URL) {
  try {
    // 从 URI 中提取目录名
    const match = uri.href.match(/^file:\/\/([^/]+)\//);
    if (!match) {
      throw new Error(`无效的 URI 格式: ${uri.href}`);
    }

    const categoryName = match[1];
    const filePath = uriToFilePath(uri.href, categoryName);

    // 检查文件是否存在
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`文件不存在: ${filePath}`);
    }

    // 读取文件内容
    const content = await fs.readFile(filePath, "utf-8");
    const fileName = path.basename(filePath);
    const stats = await fs.stat(filePath);

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: getMimeType(filePath),
          text: content,
        },
      ],
      _meta: {
        fileName,
        category: categoryName,
        size: stats.size,
        modified: stats.mtime.toISOString(),
      },
    };
  } catch (error) {
    throw new Error(
      `读取文件失败: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
