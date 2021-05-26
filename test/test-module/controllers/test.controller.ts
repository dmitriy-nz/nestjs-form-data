import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UploadSingleFileDto } from '../dto/UploadSingleFile.dto';
import { FormDataRequest } from '../../../src/decorators';
import { UploadArrayFilesDto } from '../dto/UploadArrayFiles.dto';

@Controller('')
export class TestController {


  @Post('single-file')
  @UsePipes(ValidationPipe)
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  uploadSingleFile(@Body() singleFileDto: UploadSingleFileDto) {
    console.log(singleFileDto);

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
    console.log(arrayFilesDto.files);

    return arrayFilesDto.files.map(file => {
      return {
        filename: file.originalName,
        mimetype: file.mimetype,
      };
    });


  }

}