import { StoredFile } from '../classes/storage';
import { Type } from '@nestjs/common';

export interface FormDataInterceptorConfig {
  storage?: Type<StoredFile>,
  fileSystemStoragePath?: string;
  autoDeleteFile?: boolean;
  limits?: FormDataInterceptorLimitsConfig;
}


export interface FormDataInterceptorLimitsConfig {
  fieldNameSize?: number;
  fieldSize?: number;
  fields?: number;
  fileSize?: number;
  files?: number;
  parts?: number;
  headerPairs?: number;
}



