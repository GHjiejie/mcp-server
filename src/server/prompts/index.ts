import type { PromptDefinition } from "../../types/mcpPrompt.js";
import type { WorkflowDefinition } from "../../types/mcpPrompt.js";

// 导入所有提示模板
import {
  codeReviewPrompt,
  docGenerationPrompt,
  debugHelpPrompt,
  testGenerationPrompt,
  refactoringPrompt,
} from "./templates.js";

// 导入所有工作流
import { workflows } from "./workflows.js";

// 导出所有提示模板
export const prompts: PromptDefinition[] = [
  codeReviewPrompt,
  docGenerationPrompt,
  debugHelpPrompt,
  testGenerationPrompt,
  refactoringPrompt,
];

// 导出所有工作流
export { workflows };

// 导出类型
export type { PromptDefinition, WorkflowDefinition };
