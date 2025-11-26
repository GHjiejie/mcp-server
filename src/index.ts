#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";

// 创建 MCP server
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// 注册加法工具
server.registerTool(
  "add",
  {
    title: "加法工具",
    description: "将两个数字相加并返回结果",
    inputSchema: {
      a: z.number(),
      b: z.number(),
    },
    outputSchema: {
      result: z.number(),
    },
  },
  async ({ a, b }) => {
    const result = a + b;

    return {
      content: [
        {
          type: "text",
          text: `计算结果: ${a} + ${b} = ${result}`,
        },
      ],
      structuredContent: { result },
    };
  }
);

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
