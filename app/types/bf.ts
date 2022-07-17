export interface BfTemplateInsertLibrary {
  [identifier: string]: (...params: any[]) => string | undefined;
}
