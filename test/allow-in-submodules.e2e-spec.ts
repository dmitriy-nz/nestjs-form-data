import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';

describe('Submodule', () => {
  let appWithGlobal: INestApplication;
  let hasErrorInSubmoduleCreateModuleWithoutGlobal: boolean;

  beforeEach(async () => {
    appWithGlobal = await createTestModule({ isGlobal: true, withSubmodule: true });

    try {
      await createTestModule({ isGlobal: false, withSubmodule: true });
    } catch (err) {
      hasErrorInSubmoduleCreateModuleWithoutGlobal = true;
    }
  });

  it('Is the module available in submodules', () => {
    return request.default(appWithGlobal.getHttpServer())
      .post('/submodule/single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect({ filename: 'file.txt', mimetype: 'text/plain' });
  });

  it('Is the not module available in submodules', () => {
    return expect(hasErrorInSubmoduleCreateModuleWithoutGlobal).toBe(true);
  });


});
