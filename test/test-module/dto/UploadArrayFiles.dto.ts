import { MemoryStoredFile } from '../../../src/classes/storage';
import { HasMimeType, IsFiles, MaxFileSize, MinFileSize } from '../../../src/decorators';

export class UploadArrayFilesDto {

  @IsFiles()
  @HasMimeType(['text/plain'], { each: true })
  @MaxFileSize(5, { each: true })
  @MinFileSize(3, { each: true })
  files: MemoryStoredFile[];

}