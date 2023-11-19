import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TestModule } from '../test-module/test.module';

export async function createTestModule(
  config: any = {},
): Promise<INestApplication | NestFastifyApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestModule.config(config)],
  }).compile();

  let app: INestApplication | NestFastifyApplication;

  const useFastify = config.fastify ?? false;

  if (useFastify) {
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    (app as NestFastifyApplication).register(require('@fastify/multipart'));
  } else {
    app = moduleFixture.createNestApplication();
  }

  await app.init();

  if (useFastify) {
    await app.getHttpAdapter().getInstance().ready();
  }

  return app;
}
