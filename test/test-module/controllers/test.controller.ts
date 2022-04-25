import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UploadSingleFileDto } from '../dto/UploadSingleFile.dto';
import { FormDataRequest } from '../../../src/decorators';
import { UploadArrayFilesDto } from '../dto/UploadArrayFiles.dto';
import { UploadSingleFileFSStorageDto } from '../dto/UploadSingleFileFSStorage.dto';
import { FileSystemStoredFile } from '../../../src';

@Controller('')
export class TestController {


  @Post('single-file')
  @UsePipes(ValidationPipe)
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  uploadSingleFile(@Body() singleFileDto: UploadSingleFileDto) {
    return {
      filename: singleFileDto.file.originalName,
      mimetype: singleFileDto.file.mimetype,
    };
  }

  @Post('array-files')
  @UsePipes(ValidationPipe)
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  uploadArrayFiles(@Body() arrayFilesDto: UploadArrayFilesDto) {
    return arrayFilesDto.files.map(file => {
      return {
        filename: file.originalName,
        mimetype: file.mimetype,
      };
    });
  }

  @Post('auto-delete-single-file')
  @UsePipes(ValidationPipe)
  @FormDataRequest({ autoDeleteFile: true, storage: FileSystemStoredFile })
  @HttpCode(HttpStatus.OK)
  uploadSingleWithAutoDeleteFile(@Body() singleFileDto: UploadSingleFileFSStorageDto) {
    return {
      filename: singleFileDto.file.originalName,
      mimetype: singleFileDto.file.mimetype,
      path: singleFileDto.file.path,
    };
  }

  @Post('auto-delete-single-file-busboy')
  @UsePipes(ValidationPipe)
  @FormDataRequest({ autoDeleteFile: true, storage: FileSystemStoredFile, limits: {fileSize: 5}})
  @HttpCode(HttpStatus.OK)
  uploadSingleWithAutoDeleteFileBusboySizeLimit(@Body() singleFileDto: UploadSingleFileFSStorageDto) {
    return {
      filename: singleFileDto.file.originalName,
      mimetype: singleFileDto.file.mimetype,
      path: singleFileDto.file.path,
    };
  }

}
