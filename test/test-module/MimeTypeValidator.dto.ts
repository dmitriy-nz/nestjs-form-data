import { MemoryStoredFile } from '../../src/classes/storage';
import { IsFile, HasMimeType } from '../../src/decorators';
import { MetaSource } from '../../src/interfaces/MetaFieldSource';
import { IsOptional } from 'class-validator';

export class MimeTypeValidatorDto {

  @IsOptional()
  @IsFile()
  @HasMimeType('image/webp')
  file: MemoryStoredFile;

  @IsOptional()
  @IsFile()
  @HasMimeType('image/webp', MetaSource.bufferMagicNumber)
  strictMagicNumber: MemoryStoredFile;

  @IsOptional()
  @IsFile()
  @HasMimeType('text/plain', MetaSource.contentType)
  strictContentType: MemoryStoredFile;

}
