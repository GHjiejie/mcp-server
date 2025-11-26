#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./server/tools/index.js";

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

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP 服务器已启动，等待连接...");
}

main().catch((error) => {
  console.error("服务器启动失败:", error);
  process.exit(1);
});
