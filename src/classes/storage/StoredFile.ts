import { ParticleStoredFile } from '../../interfaces/ParticleStoredFile';
import { FormDataInterceptorConfig } from '../../interfaces/FormDataInterceptorConfig';

export abstract class StoredFile implements ParticleStoredFile {
  abstract mimetype: string;
  abstract encoding: string;
  abstract originalName: string;
  abstract size: number;


  static create(filename, encoding, mimetype, stream: NodeJS.ReadableStream, config: FormDataInterceptorConfig): Promise<StoredFile> {
    throw new Error(`Static method create must be implemented`);
  };


  abstract delete(): Promise<void>;

}