# 提示模板快速参考

## 5个提示模板

| 模板名称 | 用途 | 必需参数 | 可选参数 |
|---------|------|---------|---------|
| `code-review` | 代码审查指南 | `language` | `focus` |
| `doc-generation` | 文档生成 | `docType` | `projectName` |
| `debug-help` | 调试帮助 | `errorType` | `language` |
| `test-generation` | 测试用例生成 | `testType` | `framework` |
| `refactoring` | 重构建议 | - | `focus` |

## 6个工作流

| 工作流名称 | 描述 | 步骤数 | 预估时间 |
|-----------|------|--------|---------|
| `development-workflow` | 完整开发流程 | 7 | 根据项目规模 |
| `code-review-workflow` | 代码审查流程 | 6 | 30分钟-2小时 |
| `debug-workflow` | 问题调试流程 | 6 | 根据问题复杂度 |
| `refactoring-workflow` | 重构流程 | 6 | 根据重构范围 |
| `feature-development-workflow` | 敏捷功能开发 | 7 | 1-2周 |
| `api-development-workflow` | API开发流程 | 7 | 根据API复杂度 |

## 快速使用

### 代码审查 TypeScript
```json
{
  "name": "code-review",
  "args": {
    "language": "TypeScript",
    "focus": "性能"
  }
}
```

### 生成 API 文档
```json
{
  "name": "doc-generation",
  "args": {
    "docType": "API",
    "projectName": "my-api"
  }
}
```

### 调试运行时错误
```json
{
  "name": "debug-help",
  "args": {
    "errorType": "运行时错误",
    "language": "JavaScript"
  }
}
```

### 生成单元测试
```json
{
  "name": "test-generation",
  "args": {
    "testType": "单元测试",
    "framework": "Jest"
  }
}
```

### 重构优化性能
```json
{
  "name": "refactoring",
  "args": {
    "focus": "性能优化"
  }
}
```

## 常用组合

### Bug修复流程
1. `debug-help` - 定位问题
2. `test-generation` - 编写测试
3. `code-review` - 审查修复

### 新功能开发
1. `test-generation` - TDD开发
2. `refactoring` - 代码优化
3. `doc-generation` - 编写文档
4. `code-review` - 代码审查

### 代码优化
1. `code-review` - 识别问题
2. `refactoring` - 制定方案
3. `test-generation` - 测试覆盖
4. `code-review` - 验证改进

## 参数选项

### language
- TypeScript
- JavaScript
- Python
- Go
- Java
- 等...

### focus (审查/重构)
- 性能
- 安全性
- 可维护性
- 可读性
- 综合

### docType
- API
- README
- 使用指南

### errorType
- 运行时错误
- 逻辑错误
- 性能问题

### testType
- 单元测试
- 集成测试
- 端到端测试

### framework
- Jest
- Mocha
- Pytest
- JUnit
- 等...

---

📖 详细文档：[PROMPTS_GUIDE.md](./PROMPTS_GUIDE.md)
💡 使用示例：[PROMPTS_EXAMPLES.md](./PROMPTS_EXAMPLES.md)
