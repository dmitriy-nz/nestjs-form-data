import { MemoryStoredFile } from '../../../src/classes/storage';
import { HasMimeType, IsFiles, MaxFileSize, MinFileSize } from '../../../src/decorators';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UploadOptionalExposedFieldArrayFileDto {

  @Expose()
  @IsFiles()
  @HasMimeType(['text/plain'], { each: true })
  @MaxFileSize(5, { each: true })
  @MinFileSize(3, { each: true })
  @IsOptional()
  file?: MemoryStoredFile[];

}
