import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import { createTestModule } from './helpers/create-test-module';

describe('Express - Optional file uploads', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Upload optional file', () => {
    return request
      .default(app.getHttpServer())
      .post('/optional')
      .expect(200)
      .expect({});
  });
});

describe('Fastify - Optional file uploads', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({
      fastify: true,
    })) as NestFastifyApplication;
  });

  it('Upload optional file', () => {
    return request
      .default(app.getHttpServer())
      .post('/optional')
      .expect(200)
      .expect({});
  });
});
