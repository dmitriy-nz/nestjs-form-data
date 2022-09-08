import { StoredFile } from './StoredFile';
import mkdirp from 'mkdirp';
import path, { ParsedPath } from 'path';
import * as fs from 'fs';
import { FormDataInterceptorConfig } from '../../interfaces/FormDataInterceptorConfig';
import { uid } from 'uid';
import { Readable as ReadableStream } from 'stream';
import { ParticleStoredFile } from '../../interfaces/ParticleStoredFile';
import { plainToClass } from 'class-transformer';

export class FileSystemStoredFile extends StoredFile {
  path: string;
  size: number;

  static async create(busboyFileMeta: ParticleStoredFile, stream: ReadableStream, config: FormDataInterceptorConfig): Promise<FileSystemStoredFile> {
    await mkdirp.native(config.fileSystemStoragePath);
    const filePath = path.resolve(config.fileSystemStoragePath, FileSystemStoredFile.makeFileNameWithSalt(busboyFileMeta.originalName));

    return new Promise<FileSystemStoredFile>((res, rej) => {
      const outStream = fs.createWriteStream(filePath);
      let size: number = 0;
      stream.on('data', (chunk) => size += chunk.length);
      outStream.on('error', rej);
      outStream.on('finish', () => {
        const file: FileSystemStoredFile = plainToClass(FileSystemStoredFile, {
          originalName: busboyFileMeta.originalName,
          encoding: busboyFileMeta.encoding,
          busBoyMimeType: busboyFileMeta.mimetype,
          path: filePath,
          size,
        });

        res(file);
      });
      stream.pipe(outStream);
    });
  }

  private static makeFileNameWithSalt(originalName: string): string {
    const parsed: ParsedPath = path.parse(originalName);
    return `${parsed.name}-${uid(6)}${parsed.ext}`;
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
