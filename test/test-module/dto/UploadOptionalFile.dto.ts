import { MemoryStoredFile } from '../../../src/classes/storage';
import { HasMimeType, IsFile, MaxFileSize, MinFileSize } from '../../../src/decorators';
import { IsOptional } from 'class-validator';

export class UploadOptionalFileDto {

  @IsFile()
  @HasMimeType(['text/plain'])
  @MaxFileSize(5)
  @MinFileSize(3)
  @IsOptional()
  file?: MemoryStoredFile;

}