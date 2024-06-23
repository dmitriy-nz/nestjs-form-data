import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Express - transform enableImplicitConversion', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule({}, {
      transform: true, transformOptions: {
        enableImplicitConversion: true,
      },
    });
  });

  it('Valid files upload - array dto - array files', () => {
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

  it('Valid files upload - array dto - single file', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([{ filename: 'file.txt', mimetype: 'text/plain' }]);
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
});

describe('Fastify - transform enableImplicitConversion', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    app = (await createTestModule({
      fastify: true,
    }, {
      transform: true, transformOptions: {
        enableImplicitConversion: true,
      },
    })) as NestFastifyApplication;
  });

  it('Valid files upload - array dto - array files', () => {
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

  it('Valid files upload - array dto - single file', () => {
    return request
      .default(app.getHttpServer())
      .post('/array-files')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([{ filename: 'file.txt', mimetype: 'text/plain' }]);
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
});
