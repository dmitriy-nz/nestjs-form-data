import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TestModule } from '../test-module/test.module';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export async function createTestModule(
  config: any = {}, validationPipeOptions: ValidationPipeOptions = {
    transform: true,
  }
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

  app.useGlobalPipes(
    new ValidationPipe(validationPipeOptions),
  );

  await app.init();

  if (useFastify) {
    await app.getHttpAdapter().getInstance().ready();
  }

  return app;
}
