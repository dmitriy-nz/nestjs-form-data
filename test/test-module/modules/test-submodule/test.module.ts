import { Module } from '@nestjs/common';
import { TestSubmoduleController } from './controllers/test-submodule.controller';

@Module({
  controllers: [
    TestSubmoduleController,
  ],
  providers: [],
  exports: [],
})
export class TestSubmoduleModule {
}
