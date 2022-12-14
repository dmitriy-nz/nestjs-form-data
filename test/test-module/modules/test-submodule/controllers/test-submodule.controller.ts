import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UploadSingleFileDto } from '../../../dto/UploadSingleFile.dto';
import { FormDataRequest } from '../../../../../src/decorators';

@Controller('/submodule')
export class TestSubmoduleController {


  @Post('single-file')
  @UsePipes(ValidationPipe)
  @FormDataRequest({ autoDeleteFile: true })
  @HttpCode(HttpStatus.OK)
  uploadSingleFile(@Body() singleFileDto: UploadSingleFileDto) {
    return {
      filename: singleFileDto.file.originalName,
      mimetype: singleFileDto.file.mimetype,
    };
  }
}
