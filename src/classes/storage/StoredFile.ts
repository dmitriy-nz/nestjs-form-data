import { ParticleStoredFile } from '../../interfaces/ParticleStoredFile';
import { FormDataInterceptorConfig } from '../../interfaces/FormDataInterceptorConfig';
import { Readable as ReadableStream } from 'stream';
import { FileTypeResult } from 'file-type/core';
import { MetaFieldSource, MetaSource } from '../../interfaces/MetaFieldSource';
import path from 'path';

export abstract class StoredFile implements ParticleStoredFile {
  encoding: string;
  originalName: string;

  abstract size: number;

  protected busBoyMimeType: string;
  protected fileType: FileTypeResult;

  static create(busboyFileMeta: ParticleStoredFile, stream: ReadableStream, config: FormDataInterceptorConfig): Promise<StoredFile> {
    throw new Error(`Static method create must be implemented`);
  };

  setFileTypeResult(fileType: FileTypeResult): void {
    this.fileType = fileType;
  }


  get mimeType(): string {
    return this.fileType?.mime || this.busBoyMimeType;
  }

  // Compatibility with previous versions
  get mimetype(): string {
    return this.mimeType;
  }

  get extension(): string {
    return this.fileType?.ext || (path.parse(this.originalName).ext || '').replace('.', '');
  }

  get mimeTypeWithSource(): MetaFieldSource {
    const value: string = this.mimeType;
    const source: MetaSource = (!!this.fileType?.mime) ? MetaSource.bufferMagicNumber : MetaSource.contentType;
    return { value, source };
  }

  get extensionWithSource(): MetaFieldSource {
    const value: string = this.extension;
    const source: MetaSource = (!!this.fileType?.ext) ? MetaSource.bufferMagicNumber : MetaSource.contentType;
    return { value, source };
  }

  abstract delete(): Promise<void>;

}
