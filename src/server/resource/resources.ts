import type { ResourceDefinition } from "../../types/mcpResource.js";

// 系统信息资源
export const systemInfoResource: ResourceDefinition = {
  name: "系统信息",
  uri: "system://info",
  description: "获取当前系统的基本信息",
  mimeType: "application/json",
  handler: async (uri: URL) => {
    const info = {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      memory: {
        total: Math.round(require("os").totalmem() / 1024 / 1024) + " MB",
        free: Math.round(require("os").freemem() / 1024 / 1024) + " MB",
      },
      uptime: Math.round(process.uptime()) + " 秒",
    };

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(info, null, 2),
        },
      ],
    };
  },
};

// 当前时间资源
export const currentTimeResource: ResourceDefinition = {
  name: "当前时间",
  uri: "time://current",
  description: "获取当前的日期和时间",
  mimeType: "text/plain",
  handler: async (uri: URL) => {
    const now = new Date();
    const timeString = now.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/plain",
          text: `当前时间: ${timeString}`,
        },
      ],
    };
  },
};

// 环境变量资源
export const envResource: ResourceDefinition = {
  name: "环境变量",
  uri: "env://variables",
  description: "获取当前进程的环境变量信息",
  mimeType: "application/json",
  handler: async (uri: URL) => {
    // 只返回一些常见的环境变量，避免泄露敏感信息
    const safeEnvVars = {
      NODE_ENV: process.env.NODE_ENV || "development",
      PATH: process.env.PATH?.split(":").slice(0, 3).join(":") + "...",
      HOME: process.env.HOME,
      USER: process.env.USER,
      SHELL: process.env.SHELL,
    };

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(safeEnvVars, null, 2),
        },
      ],
    };
  },
};

// 帮助文档资源
export const helpResource: ResourceDefinition = {
  name: "帮助文档",
  uri: "help://guide",
  description: "MCP Server 使用指南",
  mimeType: "text/markdown",
  handler: async (uri: URL) => {
    const helpText = `# MCP Server 使用指南

## 可用工具 (Tools)

### 1. 加法工具 (add)
- 描述: 将两个数字相加并返回结果
- 参数: a (数字), b (数字)

### 2. 减法工具 (subtract)
- 描述: 将两个数字相减并返回结果
- 参数: a (数字), b (数字)

### 3. 乘法工具 (multiply)
- 描述: 将两个数字相乘并返回结果
- 参数: a (数字), b (数字)

### 4. 除法工具 (divide)
- 描述: 将两个数字相除并返回结果
- 参数: a (数字), b (数字)
- 注意: 除数不能为0

## 可用资源 (Resources)

### 静态资源

#### 1. system://info
- 系统信息，包括平台、架构、内存等

#### 2. time://current
- 当前日期和时间

#### 3. env://variables
- 环境变量信息

#### 4. help://guide
- 本帮助文档

### 动态资源

#### 5. file://markdown/{path}
- 访问 /Users/jie/Documents/markdown 目录下的所有文件
- 支持递归读取子目录中的文件
- 自动检测文件类型（Markdown、文本、JSON等）
- 可以列出所有可用文件
- 支持路径自动补全

## 使用示例

\`\`\`typescript
// 使用工具
const result = await callTool('add', { a: 5, b: 3 });

// 读取静态资源
const systemInfo = await readResource('system://info');

// 列出所有可用的文件资源
const fileList = await listResources();

// 读取特定文件
const fileContent = await readResource('file://markdown/未命名.md');
\`\`\`

## 文件服务器功能

文件服务器资源提供以下功能：

1. **自动发现**: 自动扫描指定目录下的所有文件
2. **递归支持**: 支持读取子目录中的文件
3. **类型检测**: 根据文件扩展名自动设置正确的 MIME 类型
4. **元数据**: 提供文件大小、修改时间等元数据
5. **路径补全**: 支持文件路径的自动补全功能

### 支持的文件类型

- Markdown (.md)
- 纯文本 (.txt)
- JSON (.json)
- JavaScript/TypeScript (.js, .ts)
- HTML/CSS (.html, .css)
- YAML (.yaml, .yml)
- 其他文本文件
`;

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: helpText,
        },
      ],
    };
  },
};
