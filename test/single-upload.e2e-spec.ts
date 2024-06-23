import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Express - Single file uploads', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Valid file upload - single dto - single file', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect({ filename: 'file.txt', mimetype: 'text/plain' });
  });

  it('Invalid file upload - single dto - array file', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(400);
  });

  it('Mime type validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.csv'))
      .expect(400);
  });

  it('Max file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400);
  });

  it('Min file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-small.txt'))
      .expect(400);
  });

  it('HTTP request with empty form data', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .set(
        'content-type',
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      )
      .expect(400);
  });
});

describe('Fastify - Single file uploads', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({
      fastify: true,
    })) as NestFastifyApplication;
  });

  it('Valid file upload', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect({ filename: 'file.txt', mimetype: 'text/plain' });
  });

  it('Mime type validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.csv'))
      .expect(400);
  });

  it('Max file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400);
  });

  it('Min file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-small.txt'))
      .expect(400);
  });

  it('HTTP request with empty form data', () => {
    return request
      .default(app.getHttpServer())
      .post('/single-file')
      .set(
        'content-type',
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      )
      .expect(400);
  });
});
