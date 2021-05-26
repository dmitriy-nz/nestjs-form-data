import { plainToClass } from 'class-transformer';
import { StoredFile } from './StoredFile';
import mkdirp from 'mkdirp';
import path from 'path';
import * as fs from 'fs';
import { FormDataInterceptorConfig } from '../../interfaces/FormDataInterceptorConfig';

export class FileSystemStoredFile extends StoredFile {
  mimetype: string;
  encoding: string;
  originalName: string;
  size: number;
  path: string;

  static async create(originalName, encoding, mimetype, stream: NodeJS.ReadableStream, config: FormDataInterceptorConfig): Promise<FileSystemStoredFile> {

    await mkdirp.native(config.fileSystemStoragePath);
    const filePath = path.resolve(config.fileSystemStoragePath, originalName);

    return new Promise<FileSystemStoredFile>((res, rej) => {
      const outStream = fs.createWriteStream(filePath);
      let size: number = 0;


      stream.on('data', (chunk) => size += chunk.length);
      outStream.on('error', rej);
      outStream.on('finish', () => {
        const file: FileSystemStoredFile = plainToClass(FileSystemStoredFile, {
          originalName,
          encoding,
          mimetype,
          path: filePath,
          size,
        });

        res(file);
      });

      stream.pipe(outStream);

    });
  }

  delete(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.unlink(this.path, (err: any) => {

        if (err && err.code !== 'ENOENT') {
          return reject(err);
        }

        resolve();
      });
    });
  }

}