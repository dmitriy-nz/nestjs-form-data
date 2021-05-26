import { Test, TestingModule } from '@nestjs/testing';
import { TestModule } from '../test-module/test.module';
import { INestApplication } from '@nestjs/common';

export async function createTestModule(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
}