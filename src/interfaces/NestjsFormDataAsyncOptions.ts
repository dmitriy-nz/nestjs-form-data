import { FormDataInterceptorConfig } from './FormDataInterceptorConfig';
import { ModuleMetadata, Type } from '@nestjs/common';
import { NestjsFormDataConfigFactory } from './NestjsFormDataConfigFactory';

export interface NestjsFormDataAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<NestjsFormDataConfigFactory>;
  useClass?: Type<NestjsFormDataConfigFactory>;
  useFactory?: (...args: any[]) => Promise<FormDataInterceptorConfig> | FormDataInterceptorConfig;
  inject?: any[];
}