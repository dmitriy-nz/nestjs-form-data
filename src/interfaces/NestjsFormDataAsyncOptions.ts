import { FormDataInterceptorConfig } from './FormDataInterceptorConfig';
import { ModuleMetadata, Type } from '@nestjs/common';
import { NestjsFormDataConfigFactory } from './NestjsFormDataConfigFactory';

export interface NestjsFormDataAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<NestjsFormDataConfigFactory>;
  useClass?: Type<NestjsFormDataConfigFactory>;
  useFactory?: (...args: any[]) => Promise<FormDataInterceptorConfig> | FormDataInterceptorConfig;
  inject?: any[];
  /**
   * If you want the module to be available globally
   * Once you import the module and configure it, it will be available globally
   * Only for async configuration
   */
  isGlobal?: boolean;
}
