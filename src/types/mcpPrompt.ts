import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";

// 提示模板定义
export interface PromptDefinition<T = Record<string, any>> {
  name: string;
  description: string;
  argsSchema?: Record<string, any>;
  handler: (args: T) => Promise<GetPromptResult>;
}

// 工作流步骤定义
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  prompts: string[]; // 使用的提示模板名称
  tools?: string[]; // 可能需要的工具
  resources?: string[]; // 可能需要的资源
}

// 工作流定义
export interface WorkflowDefinition {
  name: string;
  description: string;
  steps: WorkflowStep[];
  metadata?: {
    tags?: string[];
    category?: string;
    estimatedTime?: string;
  };
}
