# 文件服务器资源使用说明

## 功能概述

文件服务器资源允许你通过 MCP 协议访问指定目录下的所有文件。当前配置为访问 `/Users/jie/Documents/markdown` 目录。

## 主要特性

### 1. 自动文件发现
- 自动扫描目录下的所有文件
- 支持递归扫描子目录
- 实时反映文件系统的变化

### 2. 智能类型检测
支持多种文件类型，自动设置正确的 MIME 类型：
- Markdown (`.md`) → `text/markdown`
- 纯文本 (`.txt`) → `text/plain`
- JSON (`.json`) → `application/json`
- JavaScript (`.js`) → `text/javascript`
- TypeScript (`.ts`) → `text/typescript`
- HTML (`.html`) → `text/html`
- CSS (`.css`) → `text/css`
- YAML (`.yaml`, `.yml`) → `text/yaml`

### 3. 元数据支持
读取文件时提供额外的元数据：
- 文件名
- 文件大小
- 最后修改时间

### 4. 路径自动补全
支持文件路径的智能补全，方便快速定位文件。

## 使用方式

### 在 MCP Inspector 中测试

1. 启动 MCP Inspector：
   ```bash
   npx @modelcontextprotocol/inspector node build/index.js
   ```

2. 在浏览器中打开 Inspector 界面

3. 查看可用资源列表：
   - 点击 "Resources" 标签
   - 你会看到所有可用的文件资源

4. 读取特定文件：
   - 选择一个文件资源
   - 点击 "Read" 按钮查看文件内容

### URI 格式

文件资源使用以下 URI 格式：
```
file://markdown/{相对路径}
```

示例：
- `file://markdown/test.md` - 读取 test.md 文件
- `file://markdown/%E6%9C%AA%E5%91%BD%E5%90%8D.md` - 读取未命名.md 文件（URL 编码）

### 在代码中使用

```typescript
// 列出所有可用的文件
const resources = await client.listResources();

// 读取特定文件
const content = await client.readResource('file://markdown/test.md');
console.log(content.contents[0].text);
```

## 配置

如需更改监控目录，编辑 `src/server/resource/fileServer.ts`：

```typescript
// 修改这个常量
const MARKDOWN_DIR = "/Users/jie/Documents/markdown";
```

## 安全注意事项

- 文件服务器只能访问指定目录下的文件
- 不会访问隐藏文件（以 `.` 开头的文件）
- 仅支持读取，不支持写入或修改文件
- 建议不要在生产环境中暴露敏感目录

## 应用场景

### 1. 文档知识库
将所有 Markdown 文档放在指定目录，AI 可以：
- 浏览所有可用文档
- 读取特定文档内容
- 回答基于文档的问题
- 生成文档摘要

### 2. 代码审查
放置代码文件，让 AI 进行：
- 代码审查
- 问题诊断
- 优化建议

### 3. 内容分析
批量处理文本文件：
- 内容总结
- 关键词提取
- 趋势分析

## 故障排除

### 文件不显示
- 检查目录路径是否正确
- 确保文件具有读取权限
- 重新构建项目：`npm run build`

### 中文文件名问题
- URI 会自动进行 URL 编码
- 系统会正确处理中文文件名

### 读取失败
- 检查文件是否存在
- 确保文件不是二进制文件（目前只支持文本文件）
