import { MemoryStoredFile } from '../../../src/classes/storage';
import { IsFile } from '../../../src/decorators';

export class CustomErrorSingleDto {
  @IsFile({message: 'Custom message'})
  file: MemoryStoredFile;
}
