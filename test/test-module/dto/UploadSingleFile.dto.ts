import { MemoryStoredFile } from '../../../src/classes/storage';
import { HasMimeType, IsFile, MaxFileSize, MinFileSize } from '../../../src/decorators';

export class UploadSingleFileDto {

  @IsFile()
  @HasMimeType(['text/plain'])
  @MaxFileSize(5)
  @MinFileSize(3)
  file: MemoryStoredFile;

}