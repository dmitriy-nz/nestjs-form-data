import { DynamicModule, Module, Provider } from '@nestjs/common';
import { FormDataInterceptor } from './interceptors/FormData.interceptor';
import { FormDataInterceptorConfig, NestjsFormDataAsyncOptions, NestjsFormDataConfigFactory } from './interfaces';
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
      global: !!config.isGlobal,
      module: NestjsFormDataModule,
      providers: [
        {
          provide: GLOBAL_CONFIG_INJECT_TOKEN,
          useValue: checkConfig(config),
        },
      ],
    };
  }

  static configAsync(options: NestjsFormDataAsyncOptions): DynamicModule {
    return {
      global: !!options.isGlobal,
      module: NestjsFormDataModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(options: NestjsFormDataAsyncOptions): Provider[] {

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options): Provider {
    if (options.useFactory) {
      return {
        provide: GLOBAL_CONFIG_INJECT_TOKEN,
        useFactory: async (...args: any[]) => {
          return checkConfig(await options.useFactory(...args));
        },
        inject: options.inject || [],
      };
    }


    return {
      provide: GLOBAL_CONFIG_INJECT_TOKEN,
      useFactory: async (optionsFactory: NestjsFormDataConfigFactory) => {
        const config: FormDataInterceptorConfig = await optionsFactory.configAsync();
        return checkConfig(config);
      },
      inject: [options.useExisting || options.useClass],
    };
  }
}
