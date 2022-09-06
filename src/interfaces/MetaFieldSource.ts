export interface MetaFieldSource {
  source: MetaSource;
  value: string;
}

export enum MetaSource {
  bufferMagicNumber = 'bufferMagicNumber',
  contentType = 'contentType',
}
