import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Array files uploads', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('IsFile (single) custom error message (positive)', () => {
    return request.default(app.getHttpServer())
      .post('/custom-error-single')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect({ filename: 'file.txt' });
  });

  it('IsFile (single) custom error message (negative)', () => {
    return request.default(app.getHttpServer())
      .post('/custom-error-single')
      .expect(400)
      .expect({
        message: [ 'Custom message' ],
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it('IsFile (multiple) custom error message (positive)', () => {
    return request.default(app.getHttpServer())
      .post('/custom-error-array')
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .attach('files', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect([ { filename: 'file.txt' }, { filename: 'file.txt' } ]);
  });

  it('IsFile (multiple) custom error message (negative)', () => {
    return request.default(app.getHttpServer())
      .post('/custom-error-array')
      .expect(400)
      .expect({
        message: [ 'Custom message', 'Custom message' ],
        error: 'Bad Request',
        statusCode: 400
      });
  });


});
