import * as path from "path";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { FileResourceService } from "../services/fileResourceService.js";

export class FileResourceController {
  static async createFileResourceTemplates() {
    const subDirs = await FileResourceService.getCategoryDirectories();

    return subDirs.map((dir) => ({
      name: path.basename(dir),
      template: FileResourceController.createTemplateForDirectory(dir),
    }));
  }

  static async readFileResource(uri: URL) {
    const content = await FileResourceService.readFileByUri(uri.href);

    return {
      contents: [
        {
          uri: content.uri,
          mimeType: content.mimeType,
          text: content.text,
        },
      ],
      _meta: {
        fileName: content.fileName,
        category: content.category,
        size: content.size,
        modified: content.modified,
      },
    };
  }

  private static createTemplateForDirectory(categoryPath: string) {
    const categoryName = path.basename(categoryPath);

    return new ResourceTemplate(`file://${categoryName}/{path}`, {
      list: async () => ({
        resources: await FileResourceService.listResourcesForCategory(
          categoryPath
        ),
      }),
      complete: {
        path: async (value: string) =>
          FileResourceService.completePaths(categoryPath, value),
      },
    });
  }
}
