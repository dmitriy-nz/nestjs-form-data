import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Express - Extension validator', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('[valid] Extension validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach('file', path.resolve(__dirname, 'test-files', 'img.webp'))
      .expect(200);
  });

  it('[invalid] Extension validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['File must be of one of the extensions webp'],
        error: 'Bad Request',
      });
  });

  it('[valid] Extension strict validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach(
        'strictContentType',
        path.resolve(__dirname, 'test-files', 'file.txt'),
      )
      .expect(200)
      .expect({
        filename: 'file.txt',
        mimeTypeWithSource: { value: 'text/plain', source: 'contentType' },
        extWithSource: { value: 'txt', source: 'contentType' },
      });
  });

  it('[invalid] Extension strict validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach(
        'strictMagicNumber',
        path.resolve(__dirname, 'test-files', 'file.txt'),
      )
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['File must be of one of the extensions txt'],
        error: 'Bad Request',
      });
  });
});

describe('Fastify - Extension validator', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({
      fastify: true,
    })) as NestFastifyApplication;
  });

  it('[valid] Extension validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach('file', path.resolve(__dirname, 'test-files', 'img.webp'))
      .expect(200);
  });

  it('[invalid] Extension validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['File must be of one of the extensions webp'],
        error: 'Bad Request',
      });
  });

  it('[valid] Extension strict validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach(
        'strictContentType',
        path.resolve(__dirname, 'test-files', 'file.txt'),
      )
      .expect(200)
      .expect({
        filename: 'file.txt',
        mimeTypeWithSource: { value: 'text/plain', source: 'contentType' },
        extWithSource: { value: 'txt', source: 'contentType' },
      });
  });

  it('[invalid] Extension strict validator buffer magic number', () => {
    return request
      .default(app.getHttpServer())
      .post('/ext-validator')
      .attach(
        'strictMagicNumber',
        path.resolve(__dirname, 'test-files', 'file.txt'),
      )
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['File must be of one of the extensions txt'],
        error: 'Bad Request',
      });
  });
});
