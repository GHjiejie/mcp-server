# 提示模板使用示例

本文档提供了一些实际使用提示模板的示例场景。

## 示例 1: 代码审查 TypeScript 项目

**场景**：你需要审查一个 TypeScript 项目的 Pull Request，重点关注性能问题。

**使用的提示模板**：`code-review`

**参数**：
```json
{
  "language": "TypeScript",
  "focus": "性能"
}
```

**预期输出**：
- 性能相关的审查清单
- TypeScript 特定的最佳实践
- 性能优化建议
- 常见性能问题检查点

---

## 示例 2: 生成 REST API 文档

**场景**：你刚完成了一个新的 REST API 开发，需要编写 API 文档。

**使用的提示模板**：`doc-generation`

**参数**：
```json
{
  "docType": "API",
  "projectName": "user-service"
}
```

**预期输出**：
- API 文档的标准结构
- 端点描述模板
- 请求/响应示例
- 错误码说明

---

## 示例 3: 调试运行时错误

**场景**：你的 Node.js 应用出现了运行时错误，需要系统化的调试方法。

**使用的提示模板**：`debug-help`

**参数**：
```json
{
  "errorType": "运行时错误",
  "language": "JavaScript"
}
```

**预期输出**：
- 调试步骤清单
- JavaScript 特定的调试工具
- 问题定位方法
- 常见运行时错误类型

---

## 示例 4: 为新功能编写单元测试

**场景**：你使用 Jest 框架，需要为新开发的功能编写单元测试。

**使用的提示模板**：`test-generation`

**参数**：
```json
{
  "testType": "单元测试",
  "framework": "Jest"
}
```

**预期输出**：
- Jest 测试用例模板
- 测试场景清单（正常、边界、异常）
- Mock 使用示例
- 断言方法示例

---

## 示例 5: 重构遗留代码以提高可读性

**场景**：你需要重构一些遗留代码，主要目标是提高代码的可读性。

**使用的提示模板**：`refactoring`

**参数**：
```json
{
  "focus": "可读性提升"
}
```

**预期输出**：
- 提高可读性的重构模式
- 命名优化建议
- 代码结构改进方法
- 重构前后对比示例

---

## 工作流使用示例

### 场景：开发一个新的用户认证功能

**使用的工作流**：`feature-development-workflow`

**步骤执行**：

1. **用户故事**
   ```
   作为用户，我希望能够通过邮箱和密码登录系统，
   以便访问我的个人信息。
   
   验收标准：
   - 支持邮箱密码登录
   - 密码加密存储
   - 登录失败有错误提示
   - 登录成功返回JWT token
   ```

2. **任务拆分**
   - [ ] 设计数据库模型
   - [ ] 实现密码加密功能
   - [ ] 实现登录API
   - [ ] 添加输入验证
   - [ ] 编写单元测试
   - [ ] 编写集成测试

3. **测试驱动开发**
   - 使用 `test-generation` 模板：
     ```json
     {
       "testType": "单元测试",
       "framework": "Jest"
     }
     ```

4. **功能实现**
   - 使用 `refactoring` 模板确保代码质量：
     ```json
     {
       "focus": "综合"
     }
     ```

5. **集成测试**
   - 使用 `test-generation` 模板：
     ```json
     {
       "testType": "集成测试",
       "framework": "Jest"
     }
     ```

6. **功能演示**
   - 使用 `doc-generation` 模板创建演示文档：
     ```json
     {
       "docType": "使用指南",
       "projectName": "user-auth"
     }
     ```

7. **回顾总结**
   - 记录遇到的问题和解决方案
   - 更新团队知识库

---

## 组合使用示例

### 场景：修复生产环境 Bug

**涉及的流程**：

1. **问题报告**（使用 `debug-help`）
   ```json
   {
     "errorType": "运行时错误",
     "language": "TypeScript"
   }
   ```

2. **问题分析**
   - 收集日志
   - 复现问题
   - 定位根因

3. **编写测试**（使用 `test-generation`）
   ```json
   {
     "testType": "单元测试",
     "framework": "Jest"
   }
   ```
   - 先写一个失败的测试来复现 Bug

4. **修复代码**
   - 实现修复
   - 确保测试通过

5. **代码审查**（使用 `code-review`）
   ```json
   {
     "language": "TypeScript",
     "focus": "安全性"
   }
   ```

6. **更新文档**（使用 `doc-generation`）
   ```json
   {
     "docType": "README",
     "projectName": "项目名"
   }
   ```
   - 添加问题说明和解决方案

---

## 团队协作示例

### 场景：新成员加入项目

**欢迎流程**：

1. **项目介绍**
   - 使用 `doc-generation` 生成项目 README：
     ```json
     {
       "docType": "README",
       "projectName": "团队项目"
     }
     ```

2. **代码规范培训**
   - 使用 `code-review` 模板说明代码标准：
     ```json
     {
       "language": "TypeScript",
       "focus": "综合"
     }
     ```

3. **开发流程培训**
   - 介绍 `development-workflow`
   - 介绍 `feature-development-workflow`

4. **实践任务**
   - 分配一个小功能
   - 使用工作流指导完成
   - 使用 `code-review` 进行代码审查

---

## 持续改进示例

### 场景：优化系统性能

**改进流程**：

1. **性能分析**
   - 使用 `debug-help`：
     ```json
     {
       "errorType": "性能问题",
       "language": "TypeScript"
     }
     ```

2. **制定重构计划**
   - 使用 `refactoring`：
     ```json
     {
       "focus": "性能优化"
     }
     ```

3. **执行重构**
   - 遵循 `refactoring-workflow`
   - 小步迭代
   - 持续测试

4. **性能测试**
   - 使用 `test-generation`：
     ```json
     {
       "testType": "性能测试",
       "framework": "Jest"
     }
     ```

5. **代码审查**
   - 使用 `code-review`：
     ```json
     {
       "language": "TypeScript",
       "focus": "性能"
     }
     ```

6. **文档更新**
   - 记录优化结果
   - 更新最佳实践

---

## 总结

这些示例展示了如何在实际开发中使用提示模板和工作流：

- **单独使用**：针对特定任务使用单个模板
- **组合使用**：在复杂任务中组合多个模板
- **工作流指导**：使用工作流确保流程完整性
- **团队协作**：统一团队的工作方式
- **持续改进**：不断优化开发流程

记住：这些模板和工作流是灵活的，可以根据具体情况调整使用方式！
