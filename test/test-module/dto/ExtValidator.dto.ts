import { MemoryStoredFile } from '../../../src/classes/storage';
import { IsFile } from '../../../src/decorators';
import { HasExtension } from '../../../src';
import { MetaSource } from '../../../src/interfaces/MetaFieldSource';
import { IsOptional } from 'class-validator';

export class ExtValidatorDto {

  @IsOptional()
  @IsFile()
  @HasExtension('webp')
  file: MemoryStoredFile;

  @IsOptional()
  @IsFile()
  @HasExtension('txt', MetaSource.bufferMagicNumber)
  strictMagicNumber: MemoryStoredFile;

  @IsOptional()
  @IsFile()
  @HasExtension('txt', MetaSource.contentType)
  strictContentType: MemoryStoredFile;

}
