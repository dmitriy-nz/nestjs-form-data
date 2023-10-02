import { MemoryStoredFile } from '../../../src/classes/storage';
import { IsFile } from '../../../src/decorators';

export class CustomErrorArrayDto {
  @IsFile({ message: 'Custom message', each: true })
  files: MemoryStoredFile[];
}
