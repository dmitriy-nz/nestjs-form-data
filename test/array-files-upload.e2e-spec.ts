import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Express - Array files uploads', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Valid files upload', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([
        { filename: 'file.txt', mimetype: 'text/plain' },
        { filename: 'file.txt', mimetype: 'text/plain' },
      ]);
  });

  it('Valid single file as array', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([{ filename: 'file.txt', mimetype: 'text/plain' }]);
  });

  it('Mime type validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.csv'))
      .expect(400);
  });

  it('Max file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach(
        'files[]',
        path.resolve(__dirname, 'test-files', 'file-large.txt'),
      )
      .expect(400);
  });

  it('Min file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach(
        'files[]',
        path.resolve(__dirname, 'test-files', 'file-small.txt'),
      )
      .expect(400);
  });
});

describe('Fastify - Array files uploads', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({
      fastify: true,
    })) as NestFastifyApplication;
  });

  it('Valid files upload', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([
        { filename: 'file.txt', mimetype: 'text/plain' },
        { filename: 'file.txt', mimetype: 'text/plain' },
      ]);
  });

  it('Valid single file as array', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([{ filename: 'file.txt', mimetype: 'text/plain' }]);
  });

  it('Mime type validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.csv'))
      .expect(400);
  });

  it('Max file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach(
        'files[]',
        path.resolve(__dirname, 'test-files', 'file-large.txt'),
      )
      .expect(400);
  });

  it('Min file size validator', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files[]', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach(
        'files[]',
        path.resolve(__dirname, 'test-files', 'file-small.txt'),
      )
      .expect(400);
  });
});
