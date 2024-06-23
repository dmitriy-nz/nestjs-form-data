import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import { createTestModule } from './helpers/create-test-module';


// https://github.com/dmitriy-nz/nestjs-form-data/issues/55
describe('Express - Exposed optional upload', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Upload optional exposed field single file', () => {
    return request
      .default(app.getHttpServer())
      .post('/optional-exposed-single')
      .expect(200)
      .expect({});
  });

  it('Upload optional exposed field array files', () => {
    return request
      .default(app.getHttpServer())
      .post('/optional-exposed-array')
      .expect(200)
      .expect({});
  });
});

describe('Fastify - Exposed optional upload', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({
      fastify: true,
    })) as NestFastifyApplication;
  });

  it('Upload optional exposed field single file', () => {
    return request
      .default(app.getHttpServer())
      .post('/optional-exposed-single')
      .expect(200)
      .expect({});
  });

  it('Upload optional exposed field array files', () => {
    return request
      .default(app.getHttpServer())
      .post('/optional-exposed-array')
      .expect(200)
      .expect({});
  });
});
