import { StoredFile } from '../classes/storage';
import { Type } from '@nestjs/common';

export interface FormDataInterceptorConfig {
  storage?: Type<StoredFile>,
  fileSystemStoragePath?: string;

  /**
   * @deprecated
   * Use `cleanupAfterSuccessHandle` and `cleanupAfterFailedHandle` instead;
   */
  autoDeleteFile?: boolean;

  /**
   * Indicates whether cleanup should be performed after successful handling.
   * If set to true, all processed and uploaded files will be deleted after successful processing by the final method.
   * This means that the `delete` method will be called on all files (StoredFile)
   * @type {boolean}
   * @default true
   */
  cleanupAfterSuccessHandle?: boolean;

  /**
   * Indicates whether cleanup should be performed after error handling.
   * If set to true, all processed and uploaded files will be deleted after unsuccessful processing by the final method.
   * This means that the `delete` method will be called on all files (StoredFile)
   * @type {boolean}
   * @default true
   */
  cleanupAfterFailedHandle?: boolean;


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



