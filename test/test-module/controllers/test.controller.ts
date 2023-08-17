import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UploadSingleFileDto } from '../dto/UploadSingleFile.dto';
import { FormDataRequest } from '../../../src/decorators';
import { UploadArrayFilesDto } from '../dto/UploadArrayFiles.dto';
import { UploadSingleFileFSStorageDto } from '../dto/UploadSingleFileFSStorage.dto';
import { FileSystemStoredFile, MemoryStoredFile } from '../../../src';
import { ExtValidatorDto } from '../dto/ExtValidator.dto';
import { MimeTypeValidatorDto } from '../dto/MimeTypeValidator.dto';
import { UploadOptionalFileDto } from '../dto/UploadOptionalFile.dto';

@Controller('')
export class TestController {


  @Post('single-file')
  @UsePipes(ValidationPipe)
  @FormDataRequest({autoDeleteFile: true})
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
  @FormDataRequest({ autoDeleteFile: true, storage: FileSystemStoredFile, limits: { fileSize: 5 } })
  @HttpCode(HttpStatus.OK)
  uploadSingleWithAutoDeleteFileBusboySizeLimit(@Body() singleFileDto: UploadSingleFileFSStorageDto) {
    return {
      filename: singleFileDto.file.originalName,
      mimetype: singleFileDto.file.mimetype,
      path: singleFileDto.file.path,
    };
  }


  @Post('ext-validator')
  @UsePipes(ValidationPipe)
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  extMagicNumValidator(@Body() dto: ExtValidatorDto) {
    const file: MemoryStoredFile = dto.file || dto.strictMagicNumber || dto.strictContentType;

    return {
      filename: file.originalName,
      mimeTypeWithSource: file.mimeTypeWithSource,
      extWithSource: file.extensionWithSource,
    };
  }

  @Post('mime-validator')
  @UsePipes(ValidationPipe)
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  mimeTypeValidator(@Body() dto: MimeTypeValidatorDto) {
    const file: MemoryStoredFile = dto.file || dto.strictMagicNumber || dto.strictContentType || dto.any;

    return {
      filename: file.originalName,
      mimeTypeWithSource: file.mimeTypeWithSource,
      extWithSource: file.extensionWithSource,
    };
  }

  @Post('optional')
  @UsePipes(ValidationPipe)
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  optionalFile(@Body() dto: UploadOptionalFileDto) {
    return dto;
  }

}
