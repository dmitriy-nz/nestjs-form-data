import { StoredFile } from '../classes/storage';
import { Type } from '@nestjs/common';

export interface FormDataInterceptorConfig {
  storage?: Type<StoredFile>,
  fileSystemStoragePath?: string;
  autoDeleteFile?: boolean;
  limits?: FormDataInterceptorLimitsConfig;
  /**
   * If you want the module to be available globally
   * Once you import the module and configure it, it will be available globally
   * Only for sync configuration
   */
  isGlobal?: boolean;
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



