import { DynamicModule, Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { NestjsFormDataModule } from '../../src';
import { TestSubmoduleModule } from './modules/test-submodule/test.module';
import { FormDataInterceptorConfig } from '../../src/interfaces';

@Module({
  controllers: [
    TestController,
  ],
  imports: [
    NestjsFormDataModule,
  ],
})
export class TestModule {


  static config(config: FormDataInterceptorConfig | any = {}): DynamicModule {
    return {
      module: TestModule,
      imports: [
        NestjsFormDataModule.configAsync({
          isGlobal: config?.isGlobal,
          useFactory: () => config,
        }),
        ...((config?.withSubmodule) ? [TestSubmoduleModule] : []),
      ],
    };
  }

}
