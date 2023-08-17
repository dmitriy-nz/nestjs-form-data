import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestModule } from './helpers/create-test-module';

describe('Optional file uploads', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Upload optional file', () => {
    return request.default(app.getHttpServer())
      .post('/optional')
      .expect(200)
      .expect({});
  });


});
