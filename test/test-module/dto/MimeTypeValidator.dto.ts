import { MemoryStoredFile } from '../../../src/classes/storage';
import { IsFile, HasMimeType, IsFiles } from '../../../src/decorators';
import { MetaSource } from '../../../src/interfaces/MetaFieldSource';
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

  @IsOptional()
  @IsFile()
  any: MemoryStoredFile;

  @IsOptional()
  @IsFile()
  @HasMimeType('image/*')
  filePartial?: MemoryStoredFile;

  @IsOptional()
  @IsFiles()
  @HasMimeType(['image/*'])
  filePartialArray?: MemoryStoredFile[];

  @IsOptional()
  @IsFile()
  @HasMimeType(/^image\/webp$/)
  fileRegex?: MemoryStoredFile;

}
