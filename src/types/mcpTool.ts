import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

// 工具定义类型
export interface ToolDefinition<T = any> {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, any>;
  outputSchema: Record<string, any>;
  handler: (args: T) => Promise<CallToolResult>;
}
