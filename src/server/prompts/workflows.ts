import type { WorkflowDefinition } from "../../types/mcpPrompt.js";

// 开发工作流
export const developmentWorkflow: WorkflowDefinition = {
  name: "development-workflow",
  description: "标准开发工作流程，从需求到部署的完整流程",
  steps: [
    {
      id: "requirements",
      name: "需求分析",
      description: "分析和明确功能需求",
      prompts: [],
      tools: [],
      resources: [],
    },
    {
      id: "design",
      name: "设计方案",
      description: "设计技术方案和架构",
      prompts: [],
      tools: [],
      resources: ["backend", "frontend"],
    },
    {
      id: "implementation",
      name: "编码实现",
      description: "实现功能代码",
      prompts: ["refactoring"],
      tools: ["add", "subtract", "multiply", "divide"],
      resources: ["backend", "frontend"],
    },
    {
      id: "testing",
      name: "测试验证",
      description: "编写和执行测试用例",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "review",
      name: "代码审查",
      description: "进行代码审查和优化",
      prompts: ["code-review", "refactoring"],
      tools: [],
      resources: [],
    },
    {
      id: "documentation",
      name: "文档编写",
      description: "编写相关文档",
      prompts: ["doc-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "deployment",
      name: "部署上线",
      description: "部署到生产环境",
      prompts: [],
      tools: [],
      resources: [],
    },
  ],
  metadata: {
    tags: ["开发", "全流程"],
    category: "开发流程",
    estimatedTime: "根据项目规模而定",
  },
};

// 代码审查工作流
export const codeReviewWorkflow: WorkflowDefinition = {
  name: "code-review-workflow",
  description: "系统化的代码审查流程",
  steps: [
    {
      id: "preparation",
      name: "审查准备",
      description: "了解变更内容和背景",
      prompts: [],
      tools: [],
      resources: [],
    },
    {
      id: "code-quality",
      name: "代码质量审查",
      description: "检查代码质量和规范",
      prompts: ["code-review"],
      tools: [],
      resources: [],
    },
    {
      id: "functionality",
      name: "功能验证",
      description: "验证功能实现是否正确",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "performance",
      name: "性能检查",
      description: "检查性能和资源使用",
      prompts: ["code-review"],
      tools: [],
      resources: [],
    },
    {
      id: "security",
      name: "安全审查",
      description: "检查安全隐患",
      prompts: ["code-review"],
      tools: [],
      resources: [],
    },
    {
      id: "feedback",
      name: "反馈建议",
      description: "提供改进建议",
      prompts: ["refactoring"],
      tools: [],
      resources: [],
    },
  ],
  metadata: {
    tags: ["代码审查", "质量保证"],
    category: "质量控制",
    estimatedTime: "30分钟 - 2小时",
  },
};

// 问题调试工作流
export const debugWorkflow: WorkflowDefinition = {
  name: "debug-workflow",
  description: "系统化的问题调试流程",
  steps: [
    {
      id: "reproduce",
      name: "问题复现",
      description: "复现并记录问题",
      prompts: ["debug-help"],
      tools: [],
      resources: [],
    },
    {
      id: "information",
      name: "信息收集",
      description: "收集相关日志和环境信息",
      prompts: ["debug-help"],
      tools: [],
      resources: [],
    },
    {
      id: "analyze",
      name: "问题分析",
      description: "分析问题根本原因",
      prompts: ["debug-help"],
      tools: [],
      resources: [],
    },
    {
      id: "fix",
      name: "问题修复",
      description: "实施修复方案",
      prompts: ["code-review"],
      tools: [],
      resources: ["backend", "frontend"],
    },
    {
      id: "verify",
      name: "验证修复",
      description: "验证问题是否解决",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "prevent",
      name: "预防措施",
      description: "添加预防措施",
      prompts: ["test-generation", "refactoring"],
      tools: [],
      resources: [],
    },
  ],
  metadata: {
    tags: ["调试", "问题修复"],
    category: "故障排查",
    estimatedTime: "根据问题复杂度而定",
  },
};

// 重构工作流
export const refactoringWorkflow: WorkflowDefinition = {
  name: "refactoring-workflow",
  description: "安全的代码重构流程",
  steps: [
    {
      id: "identify",
      name: "识别问题",
      description: "识别需要重构的代码",
      prompts: ["code-review", "refactoring"],
      tools: [],
      resources: [],
    },
    {
      id: "test-coverage",
      name: "测试准备",
      description: "确保有足够的测试覆盖",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "plan",
      name: "制定计划",
      description: "制定重构计划",
      prompts: ["refactoring"],
      tools: [],
      resources: [],
    },
    {
      id: "refactor",
      name: "执行重构",
      description: "小步进行重构",
      prompts: ["refactoring"],
      tools: [],
      resources: ["backend", "frontend"],
    },
    {
      id: "test",
      name: "测试验证",
      description: "运行测试确保功能不变",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "review",
      name: "审查确认",
      description: "代码审查确认改进效果",
      prompts: ["code-review"],
      tools: [],
      resources: [],
    },
  ],
  metadata: {
    tags: ["重构", "代码改进"],
    category: "代码优化",
    estimatedTime: "根据重构范围而定",
  },
};

// 功能开发工作流（敏捷）
export const featureDevelopmentWorkflow: WorkflowDefinition = {
  name: "feature-development-workflow",
  description: "敏捷功能开发流程",
  steps: [
    {
      id: "story",
      name: "用户故事",
      description: "明确用户需求和验收标准",
      prompts: [],
      tools: [],
      resources: [],
    },
    {
      id: "task-breakdown",
      name: "任务拆分",
      description: "将功能拆分为小任务",
      prompts: [],
      tools: [],
      resources: [],
    },
    {
      id: "tdd",
      name: "测试驱动开发",
      description: "先写测试，再写实现",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "implement",
      name: "功能实现",
      description: "实现功能代码",
      prompts: ["refactoring"],
      tools: [],
      resources: ["backend", "frontend"],
    },
    {
      id: "integrate",
      name: "集成测试",
      description: "进行集成测试",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "demo",
      name: "功能演示",
      description: "向团队演示功能",
      prompts: ["doc-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "retrospective",
      name: "回顾总结",
      description: "总结经验教训",
      prompts: [],
      tools: [],
      resources: [],
    },
  ],
  metadata: {
    tags: ["敏捷", "功能开发", "TDD"],
    category: "敏捷开发",
    estimatedTime: "1-2周（一个Sprint）",
  },
};

// API开发工作流
export const apiDevelopmentWorkflow: WorkflowDefinition = {
  name: "api-development-workflow",
  description: "API开发的标准流程",
  steps: [
    {
      id: "api-design",
      name: "API设计",
      description: "设计API接口规范",
      prompts: ["doc-generation"],
      tools: [],
      resources: ["backend"],
    },
    {
      id: "contract",
      name: "契约定义",
      description: "定义请求和响应格式",
      prompts: ["doc-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "mock",
      name: "Mock实现",
      description: "创建Mock服务",
      prompts: [],
      tools: [],
      resources: ["backend"],
    },
    {
      id: "implement",
      name: "API实现",
      description: "实现真实的API",
      prompts: ["refactoring"],
      tools: [],
      resources: ["backend"],
    },
    {
      id: "api-test",
      name: "API测试",
      description: "编写和执行API测试",
      prompts: ["test-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "api-doc",
      name: "API文档",
      description: "编写API文档",
      prompts: ["doc-generation"],
      tools: [],
      resources: [],
    },
    {
      id: "versioning",
      name: "版本管理",
      description: "处理API版本",
      prompts: [],
      tools: [],
      resources: [],
    },
  ],
  metadata: {
    tags: ["API", "后端开发"],
    category: "API开发",
    estimatedTime: "根据API复杂度而定",
  },
};

// 导出所有工作流
export const workflows: WorkflowDefinition[] = [
  developmentWorkflow,
  codeReviewWorkflow,
  debugWorkflow,
  refactoringWorkflow,
  featureDevelopmentWorkflow,
  apiDevelopmentWorkflow,
];
