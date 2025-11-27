import type { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

// 资源定义类型
export interface ResourceDefinition {
  name: string;
  uri: string;
  description?: string;
  mimeType?: string;
  handler: (uri: URL) => Promise<ReadResourceResult>;
}
