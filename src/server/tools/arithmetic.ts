import { z } from "zod/v4";
import type { ToolDefinition } from "../../types/mcpTool.js";

// 加法工具
export const addTool: ToolDefinition<{ a: number; b: number }> = {
  name: "add",
  title: "加法工具",
  description: "将两个数字相加并返回结果",
  inputSchema: {
    a: z.number(),
    b: z.number(),
  },
  outputSchema: {
    result: z.number(),
  },
  handler: async ({ a, b }) => {
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
  },
};

// 减法工具
export const subtractTool: ToolDefinition<{ a: number; b: number }> = {
  name: "subtract",
  title: "减法工具",
  description: "将两个数字相减并返回结果",
  inputSchema: {
    a: z.number(),
    b: z.number(),
  },
  outputSchema: {
    result: z.number(),
  },
  handler: async ({ a, b }) => {
    const result = a - b;
    return {
      content: [
        {
          type: "text",
          text: `计算结果: ${a} - ${b} = ${result}`,
        },
      ],
      structuredContent: { result },
    };
  },
};

// 乘法工具
export const multiplyTool: ToolDefinition<{ a: number; b: number }> = {
  name: "multiply",
  title: "乘法工具",
  description: "将两个数字相乘并返回结果",
  inputSchema: {
    a: z.number(),
    b: z.number(),
  },
  outputSchema: {
    result: z.number(),
  },
  handler: async ({ a, b }) => {
    const result = a * b;
    return {
      content: [
        {
          type: "text",
          text: `计算结果: ${a} × ${b} = ${result}`,
        },
      ],
      structuredContent: { result },
    };
  },
};

// 除法工具
export const divideTool: ToolDefinition<{ a: number; b: number }> = {
  name: "divide",
  title: "除法工具",
  description: "将两个数字相除并返回结果",
  inputSchema: {
    a: z.number(),
    b: z.number(),
  },
  outputSchema: {
    result: z.number(),
  },
  handler: async ({ a, b }) => {
    if (b === 0) {
      throw new Error("除数不能为0");
    }
    const result = a / b;
    return {
      content: [
        {
          type: "text",
          text: `计算结果: ${a} ÷ ${b} = ${result}`,
        },
      ],
      structuredContent: { result },
    };
  },
};
