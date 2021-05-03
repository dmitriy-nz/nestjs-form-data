import { FormDataInterceptorConfig } from './FormDataInterceptorConfig';

export interface NestjsFormDataConfigFactory {
  configAsync(): Promise<FormDataInterceptorConfig> | FormDataInterceptorConfig;
}