#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./server/tools/index.js";
import {
  resources,
  createFileTemplates,
  fileResourceHandler,
} from "./server/resource/index.js";
import { prompts } from "./server/prompts/index.js";

// 创建 MCP server
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// 统一注册所有工具
tools.forEach((tool) => {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
      outputSchema: tool.outputSchema,
    },
    tool.handler
  );
});

// 统一注册所有静态资源
resources.forEach((resource) => {
  server.registerResource(
    resource.name,
    resource.uri,
    {
      description: resource.description,
      mimeType: resource.mimeType,
    },
    resource.handler
  );
});

// 统一注册所有提示模板
prompts.forEach((prompt) => {
  server.registerPrompt(
    prompt.name,
    {
      description: prompt.description,
      argsSchema: prompt.argsSchema,
    },
    prompt.handler
  );
});

// 启动服务器
async function main() {
  // 动态创建并注册所有子目录的资源模板
  const fileTemplates = await createFileTemplates();

  fileTemplates.forEach(({ name, template }) => {
    server.registerResource(
      `${name} 资源`,
      template,
      {
        description: `访问 ${name} 目录下的所有文件`,
      },
      fileResourceHandler
    );
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP 服务器已启动，等待连接...");
  console.error(`已注册 ${tools.length} 个工具`);
  console.error(`已注册 ${prompts.length} 个提示模板`);
  console.error(`已注册 ${fileTemplates.length} 个资源模板`);
}

main().catch((error) => {
  console.error("服务器启动失败:", error);
  process.exit(1);
});
