import { FileResourceController } from "../controllers/fileResourceController.js";

export const createFileResourceTemplates = () =>
  FileResourceController.createFileResourceTemplates();

export const readFileResource = (uri: URL) =>
  FileResourceController.readFileResource(uri);
