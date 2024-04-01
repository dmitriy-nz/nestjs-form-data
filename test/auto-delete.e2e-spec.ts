import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import path from 'path';
import { createTestModule } from './helpers/create-test-module';
import * as fs from 'fs';

describe('Express - Auto delete', () => {
  let app: INestApplication;
  let appCleanupAfterSuccessHandleDisabled: INestApplication;
  let appCleanupAfterFailedHandle: INestApplication;

  beforeEach(async () => {
    app = await createTestModule();
    appCleanupAfterSuccessHandleDisabled = await createTestModule({
      cleanupAfterSuccessHandle: false
    });
    appCleanupAfterFailedHandle = await createTestModule({
      cleanupAfterFailedHandle: false
    });
  });

  it('Delete after success upload (cleanupAfterSuccessHandle: true)', () => {
    return request(app.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect((res: any) => {
        expect(typeof res.body.path).toBe('string');
        expect(fs.existsSync(res.body.path)).toBe(false);
      });
  });

  it('Delete after success upload (cleanupAfterSuccessHandle: false)', () => {
    return request(appCleanupAfterSuccessHandleDisabled.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect((res: any) => {
        expect(typeof res.body.path).toBe('string');
        expect(fs.existsSync(res.body.path)).toBe(true);
      });
  });

  it('Delete after failed upload (cleanupAfterFailedHandle:true, class validation)', () => {
    return request(app.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400)
      .expect((res: any) => {
        expect(typeof res.body.message[0]).toBe('string');
        expect(fs.existsSync(res.body.message[0])).toBe(false);
      });
  });

  it('Delete after failed upload (cleanupAfterFailedHandle:true, class validation)', () => {
    return request(appCleanupAfterFailedHandle.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400)
      .expect((res: any) => {
        expect(typeof res.body.message[0]).toBe('string');
        expect(fs.existsSync(res.body.message[0])).toBe(true);
      });
  });
});

describe('Fastify - Auto delete', () => {
  let app: NestFastifyApplication;
  let appCleanupAfterSuccessHandleDisabled: NestFastifyApplication;
  let appCleanupAfterFailedHandle: NestFastifyApplication;

  beforeEach(async () => {
    app = await createTestModule({
      fastify: true,
    }) as NestFastifyApplication;

    appCleanupAfterSuccessHandleDisabled = await createTestModule({
      fastify: true,
      cleanupAfterSuccessHandle: false
    }) as NestFastifyApplication;

    appCleanupAfterFailedHandle = await createTestModule({
      fastify: true,
      cleanupAfterFailedHandle: false
    }) as NestFastifyApplication;
  });

  it('Delete after success upload (cleanupAfterSuccessHandle: true)', () => {
    return request(app.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect((res: any) => {
        expect(typeof res.body.path).toBe('string');
        expect(fs.existsSync(res.body.path)).toBe(false);
      });
  });

  it('Delete after success upload (cleanupAfterSuccessHandle: false)', () => {
    return request(appCleanupAfterSuccessHandleDisabled.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file.txt'))
      .expect(200)
      .expect((res: any) => {
        expect(typeof res.body.path).toBe('string');
        expect(fs.existsSync(res.body.path)).toBe(true);
      });
  });

  it('Delete after failed upload (cleanupAfterFailedHandle:true, class validation)', () => {
    return request(app.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400)
      .expect((res: any) => {
        expect(typeof res.body.message[0]).toBe('string');
        expect(fs.existsSync(res.body.message[0])).toBe(false);
      });
  });

  it('Delete after failed upload (cleanupAfterFailedHandle:true, class validation)', () => {
    return request(appCleanupAfterFailedHandle.getHttpServer())
      .post('/auto-delete-single-file')
      .attach('file', path.resolve(__dirname, 'test-files', 'file-large.txt'))
      .expect(400)
      .expect((res: any) => {
        expect(typeof res.body.message[0]).toBe('string');
        expect(fs.existsSync(res.body.message[0])).toBe(true);
      });
  });
});
