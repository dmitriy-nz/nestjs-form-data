import { DynamicModule, Module } from '@nestjs/common';
import { FormDataInterceptor } from './interceptors/FormData.interceptor';
import { FormDataInterceptorConfig } from './interfaces/FormDataInterceptorConfig';
import { GLOBAL_CONFIG_INJECT_TOKEN } from './config/global-config-inject-token.config';
import { DEFAULT_CONFIG } from './config/default.config';
import { checkConfig } from './helpers/check-config';

@Module({
  providers: [
    FormDataInterceptor,
    {
      provide: GLOBAL_CONFIG_INJECT_TOKEN,
      useValue: DEFAULT_CONFIG,
    },
  ],
  exports: [
    FormDataInterceptor,
    GLOBAL_CONFIG_INJECT_TOKEN,

  ],
})
export class NestjsFormDataModule {

  static config(config: FormDataInterceptorConfig): DynamicModule {

    return {
      module: NestjsFormDataModule,
      providers: [
        {
          provide: GLOBAL_CONFIG_INJECT_TOKEN,
          useValue: checkConfig(config),
        },
      ],
    };
  }
}
