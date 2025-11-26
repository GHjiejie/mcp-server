import type { ToolDefinition } from "../../types/mcpTool.js";
import {
  addTool,
  subtractTool,
  multiplyTool,
  divideTool,
} from "./arithmetic.js";

// 导出所有工具
export const tools: ToolDefinition[] = [
  addTool,
  subtractTool,
  multiplyTool,
  divideTool,
];
