import { MemoryStoredFile } from '../../../src/classes/storage';
import { HasMimeType, IsFile, MaxFileSize, MinFileSize } from '../../../src/decorators';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UploadOptionalExposedFieldSingleFileDto {

  @Expose()
  @IsFile()
  @HasMimeType(['text/plain'])
  @MaxFileSize(5)
  @MinFileSize(3)
  @IsOptional()
  file?: MemoryStoredFile;

}
