import type { PromptDefinition } from "../../types/mcpPrompt.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod/v4";

// 代码审查提示模板
export const codeReviewPrompt: PromptDefinition = {
  name: "code-review",
  description: "代码审查提示模板，帮助进行系统化的代码审查",
  argsSchema: {
    language: z.string().describe("编程语言（如：TypeScript、Python、Go等）"),
    focus: z
      .string()
      .optional()
      .describe("审查重点（如：性能、安全性、可维护性等）"),
  },
  handler: async (args) => {
    const { language, focus = "综合" } = args;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `# 代码审查指南

## 审查语言
${language}

## 审查重点
${focus}

## 审查清单

### 1. 代码质量
- [ ] 代码是否遵循${language}的最佳实践？
- [ ] 命名是否清晰、有意义？
- [ ] 函数是否保持单一职责？
- [ ] 代码复杂度是否合理（避免过深嵌套）？

### 2. 性能考虑
- [ ] 是否存在不必要的计算或循环？
- [ ] 数据结构选择是否合理？
- [ ] 是否有内存泄漏风险？
- [ ] 异步操作是否得当？

### 3. 安全性
- [ ] 输入验证是否充分？
- [ ] 是否存在注入攻击风险？
- [ ] 敏感数据是否得到保护？
- [ ] 错误处理是否安全？

### 4. 可维护性
- [ ] 代码是否易于理解？
- [ ] 注释是否充分且准确？
- [ ] 是否遵循项目的代码规范？
- [ ] 是否有足够的测试覆盖？

### 5. 错误处理
- [ ] 异常是否被正确捕获和处理？
- [ ] 错误信息是否清晰有用？
- [ ] 是否有适当的日志记录？

## 建议格式
对于每个问题，请按以下格式提供反馈：
- **问题位置**：文件名和行号
- **问题描述**：具体说明问题
- **严重程度**：高/中/低
- **改进建议**：如何修复或改进`,
          },
        },
      ],
    };
  },
};

// 文档生成提示模板
export const docGenerationPrompt: PromptDefinition = {
  name: "doc-generation",
  description: "文档生成提示模板，用于生成项目文档、API文档等",
  argsSchema: {
    docType: z.string().describe("文档类型（如：API、README、使用指南等）"),
    projectName: z.string().optional().describe("项目名称"),
  },
  handler: async (args) => {
    const { docType, projectName = "项目" } = args;

    const templates: Record<string, string> = {
      API: `# ${projectName} API 文档

## 概述
[简要描述API的用途和功能]

## 基础信息
- **Base URL**: \`http://api.example.com\`
- **API Version**: v1.0.0
- **认证方式**: [描述认证方式]

## 端点列表

### 1. [端点名称]
\`\`\`
METHOD /path/to/endpoint
\`\`\`

**描述**：[端点功能描述]

**请求参数**：
| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| param1 | string | 是 | 参数描述 |

**响应示例**：
\`\`\`json
{
  "status": "success",
  "data": {}
}
\`\`\`

**错误码**：
| 错误码 | 描述 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 500 | 服务器错误 |`,

      README: `# ${projectName}

## 简介
[项目简介，说明项目的用途和主要功能]

## 特性
- 功能1
- 功能2
- 功能3

## 安装

\`\`\`bash
# 使用 npm
npm install ${projectName}

# 使用 yarn
yarn add ${projectName}
\`\`\`

## 快速开始

\`\`\`javascript
// 示例代码
import { Example } from '${projectName}';

const example = new Example();
example.doSomething();
\`\`\`

## API 文档
[链接到详细的API文档]

## 配置
[配置说明]

## 贡献指南
欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 许可证
[许可证类型]

## 联系方式
[联系方式]`,

      使用指南: `# ${projectName} 使用指南

## 目录
1. [入门](#入门)
2. [基础用法](#基础用法)
3. [高级功能](#高级功能)
4. [常见问题](#常见问题)
5. [最佳实践](#最佳实践)

## 入门

### 前置要求
- 要求1
- 要求2

### 安装步骤
1. 步骤1
2. 步骤2
3. 步骤3

## 基础用法

### 示例1：[场景名称]
[场景描述]

\`\`\`javascript
// 代码示例
\`\`\`

### 示例2：[场景名称]
[场景描述]

\`\`\`javascript
// 代码示例
\`\`\`

## 高级功能

### 功能1
[详细说明]

### 功能2
[详细说明]

## 常见问题

### Q: 问题1？
A: 回答1

### Q: 问题2？
A: 回答2

## 最佳实践

1. **实践1**：说明
2. **实践2**：说明
3. **实践3**：说明`,
    };

    const template = templates[docType] || templates["README"];

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `# ${docType}文档生成模板

${template}

## 填写指南
请根据以上模板结构，结合实际项目情况填写相应内容。
注意保持文档的清晰性和完整性。`,
          },
        },
      ],
    };
  },
};

// 调试帮助提示模板
export const debugHelpPrompt: PromptDefinition = {
  name: "debug-help",
  description: "调试帮助提示模板，提供系统化的调试方法",
  argsSchema: {
    errorType: z
      .string()
      .describe("错误类型（如：运行时错误、逻辑错误、性能问题等）"),
    language: z.string().optional().describe("编程语言"),
  },
  handler: async (args) => {
    const { errorType, language = "通用" } = args;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `# 调试帮助指南

## 错误类型
${errorType}

## 编程语言
${language}

## 调试步骤

### 1. 问题复现
- [ ] 记录错误信息和堆栈跟踪
- [ ] 确定触发条件
- [ ] 尝试最小化复现步骤
- [ ] 记录环境信息（操作系统、版本等）

### 2. 信息收集
- [ ] 检查日志文件
- [ ] 查看最近的代码变更
- [ ] 确认输入数据
- [ ] 检查相关配置

### 3. 问题定位
- [ ] 使用断点调试
- [ ] 添加日志输出
- [ ] 检查变量状态
- [ ] 追踪执行流程

### 4. 根因分析
#### 常见问题类型：

**运行时错误**
- 空指针/未定义变量
- 类型不匹配
- 数组越界
- 资源未释放

**逻辑错误**
- 条件判断错误
- 循环逻辑问题
- 状态管理错误
- 边界条件未处理

**性能问题**
- 不必要的循环
- 内存泄漏
- 阻塞操作
- 资源竞争

### 5. 解决方案
- [ ] 制定修复方案
- [ ] 编写修复代码
- [ ] 添加单元测试
- [ ] 验证修复效果

### 6. 预防措施
- [ ] 添加错误处理
- [ ] 改进代码质量
- [ ] 更新文档
- [ ] 分享经验教训

## 调试工具推荐

### ${language} 调试工具
${
  language === "TypeScript" || language === "JavaScript"
    ? `- Chrome DevTools
- VS Code Debugger
- Node.js Inspector
- console.log / debugger`
    : language === "Python"
    ? `- pdb (Python Debugger)
- VS Code Debugger
- PyCharm Debugger
- print() / logging`
    : language === "Go"
    ? `- Delve
- VS Code Debugger
- fmt.Println
- pprof (性能分析)`
    : `- IDE 内置调试器
- 日志输出
- 性能分析工具`
}

## 提示
- 不要假设问题所在，用数据说话
- 一次只改变一个变量
- 保持冷静和耐心
- 必要时寻求他人帮助`,
          },
        },
      ],
    };
  },
};

// 测试用例生成提示模板
export const testGenerationPrompt: PromptDefinition = {
  name: "test-generation",
  description: "测试用例生成提示模板，帮助编写完整的测试用例",
  argsSchema: {
    testType: z
      .string()
      .describe("测试类型（如：单元测试、集成测试、端到端测试）"),
    framework: z
      .string()
      .optional()
      .describe("测试框架（如：Jest、Mocha、Pytest等）"),
  },
  handler: async (args) => {
    const { testType, framework = "Jest" } = args;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `# ${testType}测试用例生成指南

## 测试框架
${framework}

## 测试用例结构

### 基本模板
\`\`\`javascript
describe('功能模块名称', () => {
  // 测试前准备
  beforeAll(() => {
    // 一次性设置
  });

  beforeEach(() => {
    // 每个测试前的设置
  });

  // 测试后清理
  afterEach(() => {
    // 每个测试后的清理
  });

  afterAll(() => {
    // 一次性清理
  });

  describe('子功能', () => {
    it('应该...（正常情况）', () => {
      // Arrange - 准备测试数据
      const input = ...;
      
      // Act - 执行被测试的功能
      const result = functionUnderTest(input);
      
      // Assert - 验证结果
      expect(result).toBe(expected);
    });

    it('应该...（边界情况）', () => {
      // 测试边界条件
    });

    it('应该...（异常情况）', () => {
      // 测试错误处理
    });
  });
});
\`\`\`

## 测试场景清单

### 正常场景
- [ ] 有效输入的基本功能测试
- [ ] 不同类型的有效输入
- [ ] 正常流程的端到端测试

### 边界场景
- [ ] 空值/null/undefined
- [ ] 最小值和最大值
- [ ] 空数组/空对象
- [ ] 边界条件组合

### 异常场景
- [ ] 无效输入
- [ ] 类型错误
- [ ] 权限不足
- [ ] 网络错误
- [ ] 超时情况

### 性能场景
- [ ] 大数据量处理
- [ ] 并发操作
- [ ] 内存使用
- [ ] 响应时间

## 测试最佳实践

### 1. 测试命名
- 使用描述性的名称
- 说明测试场景和预期结果
- 保持一致的命名风格

### 2. 测试独立性
- 每个测试独立运行
- 不依赖测试执行顺序
- 使用适当的 setup/teardown

### 3. 断言清晰
- 一个测试一个关注点
- 使用精确的断言
- 提供清晰的失败消息

### 4. 测试覆盖率
- 关键路径 100% 覆盖
- 边界条件全面测试
- 错误处理完整验证

### 5. 可维护性
- 避免重复代码
- 使用测试辅助函数
- 保持测试简洁

## Mock 和 Stub 使用

### 何时使用 Mock
- 外部依赖（数据库、API）
- 时间依赖的功能
- 随机数生成
- 文件系统操作

### Mock 示例
\`\`\`javascript
// Mock 外部依赖
jest.mock('./externalService', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: 'mocked' })
}));

// Mock 时间
jest.useFakeTimers();
jest.setSystemTime(new Date('2024-01-01'));
\`\`\`

## 测试数据管理

### Fixture 数据
\`\`\`javascript
const testData = {
  validUser: { id: 1, name: 'Test User' },
  invalidUser: { id: -1, name: '' },
  // 更多测试数据...
};
\`\`\`

## 断言示例

### ${framework} 常用断言
\`\`\`javascript
// 相等性
expect(value).toBe(expected);
expect(value).toEqual(expected);

// 真值
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// 数字
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);

// 字符串
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// 数组
expect(array).toContain(item);
expect(array).toHaveLength(3);

// 对象
expect(object).toHaveProperty('key');

// 异常
expect(() => func()).toThrow();
expect(() => func()).toThrow(ErrorType);

// 异步
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
\`\`\``,
          },
        },
      ],
    };
  },
};

// 重构建议提示模板
export const refactoringPrompt: PromptDefinition = {
  name: "refactoring",
  description: "重构建议提示模板，提供代码重构的系统方法",
  argsSchema: {
    focus: z
      .string()
      .optional()
      .describe("重构重点（如：性能优化、可读性提升、架构改进等）"),
  },
  handler: async (args) => {
    const { focus = "综合" } = args;

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `# 代码重构指南

## 重构重点
${focus}

## 重构原则

### 1. 保持功能不变
- 重构前后功能完全一致
- 通过测试验证
- 逐步小步改进

### 2. 提升代码质量
- 提高可读性
- 降低复杂度
- 增强可维护性

### 3. 遵循最佳实践
- SOLID 原则
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)

## 常见重构场景

### 1. 提取方法
**适用场景**：函数过长或有重复代码

**重构前**：
\`\`\`javascript
function processOrder(order) {
  // 验证订单
  if (!order.id) throw new Error('Invalid order');
  if (!order.items || order.items.length === 0) throw new Error('Empty order');
  
  // 计算总价
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  
  // 应用折扣
  if (order.coupon) {
    total = total * (1 - order.coupon.discount);
  }
  
  return total;
}
\`\`\`

**重构后**：
\`\`\`javascript
function processOrder(order) {
  validateOrder(order);
  const subtotal = calculateSubtotal(order.items);
  const total = applyDiscount(subtotal, order.coupon);
  return total;
}

function validateOrder(order) {
  if (!order.id) throw new Error('Invalid order');
  if (!order.items?.length) throw new Error('Empty order');
}

function calculateSubtotal(items) {
  return items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0);
}

function applyDiscount(amount, coupon) {
  return coupon ? amount * (1 - coupon.discount) : amount;
}
\`\`\`

### 2. 引入参数对象
**适用场景**：函数参数过多

**重构前**：
\`\`\`javascript
function createUser(name, email, age, address, phone) {
  // ...
}
\`\`\`

**重构后**：
\`\`\`javascript
interface UserData {
  name: string;
  email: string;
  age: number;
  address: string;
  phone: string;
}

function createUser(userData: UserData) {
  // ...
}
\`\`\`

### 3. 替换条件表达式
**适用场景**：复杂的条件判断

**重构前**：
\`\`\`javascript
function getPrice(type, quantity) {
  if (type === 'regular') {
    return quantity * 10;
  } else if (type === 'premium') {
    return quantity * 15;
  } else if (type === 'vip') {
    return quantity * 20;
  }
}
\`\`\`

**重构后**：
\`\`\`javascript
const PRICE_MAP = {
  regular: 10,
  premium: 15,
  vip: 20
};

function getPrice(type, quantity) {
  return (PRICE_MAP[type] || 0) * quantity;
}
\`\`\`

### 4. 引入策略模式
**适用场景**：根据类型选择不同行为

**重构前**：
\`\`\`javascript
function calculateShipping(order) {
  if (order.shippingType === 'standard') {
    return order.weight * 1.5;
  } else if (order.shippingType === 'express') {
    return order.weight * 3;
  } else if (order.shippingType === 'overnight') {
    return order.weight * 5;
  }
}
\`\`\`

**重构后**：
\`\`\`javascript
class ShippingStrategy {
  calculate(weight) {
    throw new Error('Must implement');
  }
}

class StandardShipping extends ShippingStrategy {
  calculate(weight) { return weight * 1.5; }
}

class ExpressShipping extends ShippingStrategy {
  calculate(weight) { return weight * 3; }
}

class OvernightShipping extends ShippingStrategy {
  calculate(weight) { return weight * 5; }
}

const strategies = {
  standard: new StandardShipping(),
  express: new ExpressShipping(),
  overnight: new OvernightShipping()
};

function calculateShipping(order) {
  const strategy = strategies[order.shippingType];
  return strategy.calculate(order.weight);
}
\`\`\`

## 重构检查清单

### 代码结构
- [ ] 函数长度适中（< 20行）
- [ ] 嵌套深度合理（< 3层）
- [ ] 单一职责原则
- [ ] 避免重复代码

### 命名
- [ ] 变量名清晰有意义
- [ ] 函数名表达意图
- [ ] 常量使用大写
- [ ] 避免缩写和魔法数字

### 错误处理
- [ ] 统一的错误处理策略
- [ ] 适当的异常类型
- [ ] 有用的错误信息

### 性能
- [ ] 避免不必要的计算
- [ ] 合理使用缓存
- [ ] 优化循环和递归
- [ ] 注意内存使用

## 重构步骤

1. **识别问题**：找出需要改进的代码
2. **编写测试**：确保有足够的测试覆盖
3. **小步重构**：每次只做一个小改动
4. **运行测试**：每次改动后都运行测试
5. **提交代码**：小步提交，便于回滚
6. **审查代码**：获取他人反馈

## 何时不应该重构

- 临近发布期
- 没有测试保护
- 代码即将被废弃
- 不理解代码逻辑
- 时间压力过大

## 重构工具

- ESLint / TSLint（代码检查）
- Prettier（代码格式化）
- IDE 重构功能
- 代码复杂度分析工具`,
          },
        },
      ],
    };
  },
};
