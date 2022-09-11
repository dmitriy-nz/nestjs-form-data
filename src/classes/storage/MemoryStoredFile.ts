import { StoredFile } from './StoredFile';
import concat from 'concat-stream';
import { FormDataInterceptorConfig } from '../../interfaces/FormDataInterceptorConfig';
import { Readable as ReadableStream } from 'stream';
import { ParticleStoredFile } from '../../interfaces/ParticleStoredFile';
import { Buffer } from 'buffer';
import { plainToClass } from 'class-transformer';

export class MemoryStoredFile extends StoredFile {
  size: number;
  buffer: Buffer;

  static create(busboyFileMeta: ParticleStoredFile, stream: ReadableStream, config: FormDataInterceptorConfig): Promise<MemoryStoredFile> {
    return new Promise<MemoryStoredFile>((res, rej) => {
      stream.pipe(concat({ encoding: 'buffer' }, (buffer: Buffer) => {

        const file: MemoryStoredFile = plainToClass(MemoryStoredFile, {
          originalName: busboyFileMeta.originalName,
          encoding: busboyFileMeta.encoding,
          busBoyMimeType: busboyFileMeta.mimetype,
          buffer,
          size: buffer.length,
        });

        res(file);
      }));
    });
  }

  delete(): Promise<void> {
    return Promise.resolve(undefined);
  }

}
