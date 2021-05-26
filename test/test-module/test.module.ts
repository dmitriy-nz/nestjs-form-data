import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { NestjsFormDataModule } from '../../src';

@Module({
  controllers: [
    TestController,
  ],
  imports: [
    NestjsFormDataModule,
  ],
  providers: [],
  exports: [],
})
export class TestModule {
}
