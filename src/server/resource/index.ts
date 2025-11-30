import type { ResourceDefinition } from "../../types/mcpResource.js";

import { createFileResourceTemplates, readFileResource } from "./fileServer.js";

// 导出所有静态资源
export const resources: ResourceDefinition[] = [];

// 导出文件服务器资源模板创建函数和处理器
export const createFileTemplates = createFileResourceTemplates;
export const fileResourceHandler = readFileResource;
