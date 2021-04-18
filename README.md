# Description
nestjs-form-data is a [NestJS](https://github.com/nestjs/nest) middleware for handling multipart/form-data, which is primarily used for uploading files.
- Process files and strings, serialize form-data to object
- Process files in nested objects
- Integration with [class-validator](https://github.com/typestack/class-validator), validate files with validator decorator

nestjs-form-data serializes the form-data request into an object and places it in the body of the request. 
The files in the request are transformed into objects.  
**Standard file storage types:**
- Memory storage
- File system storage

## Installation
```sh
$ npm install nestjs-form-data
```
Add the module to your application
```ts
@Module({
  imports: [
    NestjsFormDataModule,
  ],
})
export class AppModule {
}
```
# Usage
Apply `@FormDataRequest()` decorator to your controller method
```ts
@Controller()
export class NestjsFormDataController {


  @Post('load')
  @FormDataRequest()
  getHello(@Body() testDto: FormDataTestDto): void {
    console.log(testDto);
  }
}
```
If you are using class-validator describe dto and specify validation rules
```ts
export class FormDataTestDto {

  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  avatar: MemoryStoredFile;
  
}
```

## Configuration
You can set the global configuration when connecting the module using the `NestjsFormDataModule.config` method:
```ts
@Module({
  imports: [
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
```
Or pass the config object while using the decorator on the method
```ts
@Controller()
export class NestjsFormDataController {


  @Post('load')
  @FormDataRequest({storage: MemoryStoredFile})
  getHello(@Body() testDto: FormDataTestDto): void {
    console.log(testDto);
  }
}
```
### Configuration fields
- `storage` - The type of storage logic for the uploaded file  (Default MemoryStoredFile)
- `fileSystemStoragePath` - The path to the directory for storing temporary files, used only for `storage: FileSystemStoredFile` (Default: /tmp/nestjs-tmp-storage)  
- `autoDeleteFile` - Automatically delete files after the request ends (Default true)
- `limits` - [busboy](https://www.npmjs.com/package/busboy#busboy-methods) limits configuration. Constraints in this declaration are handled at the serialization stage, so using these parameters is preferable for performance.
## File storage types
### Memory storage
`MemoryStoredFile` The file is loaded into RAM, files with this storage type are very fast but not suitable for processing large files.
### File system storage
`FileSystemStoredFile` The file is loaded into a temporary directory (see configuration) and is available during the processing of the request. The file is automatically deleted after the request finishes
### Custom storage types
You can define a custom type of file storage, for this, inherit your class from `StoredFile`, see examples in the storage directory
## Validation
By default, several validators are available with which you can check the file  

`@IsFile()` - Checks if the value is an uploaded file  
`@IsFiles()` - Checks an array of files  
`@MaxFileSize()` - Maximum allowed file size  
`@MinFileSize()` - Minimum allowed file size  
`@HasMimeType()` - Check the mime type of the file  

If you need to validate an array of files for size or otherwise, use `each: true` property from `ValidationOptions`



## Examples
### FileSystemStoredFile storage configuration
Controller
```ts
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@Controller()
export class NestjsFormDataController {


  @Post('load')
  @FormDataRequest({storage: FileSystemStoredFile})
  getHello(@Body() testDto: FormDataTestDto): void {
    console.log(testDto);
  }
}
```
DTO
```ts
import { FileSystemStoredFile, HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';


export class FormDataTestDto {

  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  avatar: FileSystemStoredFile;

}
```
### Validate the array of file
```ts
import { FileSystemStoredFile, HasMimeType, IsFiles, MaxFileSize } from 'nestjs-form-data';

export class FormDataTestDto {

  @IsFiles()
  @MaxFileSize(1e6, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  avatars: FileSystemStoredFile[];

}
```
## License
[MIT](LICENSE)