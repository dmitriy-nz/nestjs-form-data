import { HasMimeType, IsFile, MaxFileSize, MinFileSize } from '../../../src/decorators';
import { FileSystemStoredFile } from '../../../src/classes/storage';
import { ValidationArguments } from 'class-validator';


export class UploadSingleFileFSStorageDto {

  @IsFile()
  @HasMimeType(['text/plain'])
  @MaxFileSize(5, {
    message: (opt: ValidationArguments) => {
      return `${opt.value.path}`;
    },
  })
  @MinFileSize(3)
  file: FileSystemStoredFile;

}