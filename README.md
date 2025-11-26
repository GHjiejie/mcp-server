# My MCP Server

一个使用 TypeScript 实现的 MCP (Model Context Protocol) 服务器，实现了两数相加的功能。

## 功能

- **add**: 将两个数字相加并返回结果

## 安装

```bash
npm install
```

## 构建

```bash
npm run build
```

## 运行

```bash
npm start
```

## 开发模式

```bash
npm run dev
```

## 使用方法

该 MCP 服务器提供了一个 `add` 工具，可以将两个数字相加：

- **工具名称**: `add`
- **参数**:
  - `a` (number): 第一个数字
  - `b` (number): 第二个数字
- **返回**: 两个数字的和

## 项目结构

```
my-mcp-server/
├── src/
│   └── index.ts       # MCP 服务器主文件
├── build/             # 编译后的文件
├── package.json
├── tsconfig.json
└── README.md
```
