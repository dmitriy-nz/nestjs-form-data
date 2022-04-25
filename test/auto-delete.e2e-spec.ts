import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';
import * as fs from 'fs';

describe('Auto delete', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
  });

  it('Delete after success upload', () => {
    return request.default(app.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect((res: any) => {
        expect(typeof res.body.path).toBe('string');
        expect(fs.existsSync(res.body.path)).toBe(false);
      });
  });

  it('Delete after failed upload (class validation)', () => {
    return request.default(app.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400)
      .expect((res: any) => {

        expect(typeof res.body.message[0]).toBe('string');
        expect(fs.existsSync(res.body.message[0])).toBe(false);
      });
  });

});