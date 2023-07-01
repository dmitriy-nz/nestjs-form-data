import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Mime-type validator', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('[valid] Mime validator', () => {
    return request.default(app.getHttpServer())
      .post('/mime-validator')
      .attach('file', path.resolve(__dirname, 'test-files', 'img.webp'))
      .expect(200)
  });

  it('[invalid] Mime validator', () => {
    return request.default(app.getHttpServer())
      .post('/mime-validator')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(400)
      .expect({
        statusCode: 400,
        message: [ 'File must be of one of the types image/webp' ],
        error: 'Bad Request'
      });
  });

  it('[valid] Mime strict validator buffer magic number', () => {
    return request.default(app.getHttpServer())
      .post('/mime-validator')
      .attach('strictContentType', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect({
        filename: 'file.txt',
        mimeTypeWithSource: { value: 'text/plain', source: 'contentType' },
        extWithSource: { value: 'txt', source: 'contentType' },
      });
  });

  it('[invalid] Mime strict validator buffer magic number', () => {
    return request.default(app.getHttpServer())
      .post('/mime-validator')
      .attach('strictMagicNumber', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(400)
      .expect({
        statusCode: 400,
        message: [ 'File must be of one of the types image/webp' ],
        error: 'Bad Request'
      });
  });

  // it('[valid] Mime of svg', () => {
  //   return request.default(app.getHttpServer())
  //     .post('/mime-validator')
  //     .attach('any', path.resolve(__dirname, 'test-files', 'ua.svg'))
  //     .expect(200)
  //     .expect({
  //       statusCode: 400,
  //       message: [ 'File must be of one of the types image/webp' ],
  //       error: 'Bad Request'
  //     });
  // });

});
