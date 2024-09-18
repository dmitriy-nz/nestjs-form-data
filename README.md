[![npm version](https://badge.fury.io/js/nestjs-form-data.svg)](https://badge.fury.io/js/nestjs-form-data)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://img.shields.io/badge/License-MIT-green.svg)




# 💭 Description
nestjs-form-data is a [NestJS](https://github.com/nestjs/nest) middleware for handling multipart/form-data, which is primarily used for uploading files.
- Process files and strings, serialize form-data to object
- Process files in nested objects
- Integration with [class-validator](https://github.com/typestack/class-validator), validate files with validator decorator

nestjs-form-data serializes the form-data request into an object and places it in the body of the request. 
The files in the request are transformed into objects.  
**Standard file storage types:**
- Memory storage
- File system storage

[Changelog](CHANGELOG.md)

## ⏳ Installation
```sh
# npm
npm install nestjs-form-data
# yarn
yarn add nestjs-form-data
```
This module has `class-validator` and `class-transformer` as a **required** peed dependencies.  
Read more about validation pipe in the [official docs page](https://docs.nestjs.com/techniques/validation#using-the-built-in-validationpipe).  
Make sure that you already have these and enable global validation pipe:
```sh
# npm
npm install class-validator class-transformer
# yarn
yarn add class-validator class-transformer
```
Register a global validation pipe in `main.ts` file inside `bootstrap` function:
```ts
//main.ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true // Transform is recomended configuration for avoiding issues with arrays of files transformations
  })
);
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
# 🪄 Usage
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
## Fastify

Need to install [@fastify/multipart](https://www.npmjs.com/package/@fastify/multipart).

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import multipart from '@fastify/multipart'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.register(multipart);

  await app.listen(3000);
}

```

## Configuration
### Static configuration 
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
### Async configuration 
Quite often you might want to asynchronously pass your module options instead of passing them beforehand. 
In such case, use `configAsync()` method, that provides a couple of various ways to deal with async data.

##### 1. Use factory
```ts
NestjsFormDataModule.configAsync({
  useFactory: () => ({
    storage: MemoryStoredFile
  })
});
```
Our factory behaves like every other one (might be async and is able to inject dependencies through inject).
```ts
NestjsFormDataModule.configAsync({
 imports: [ConfigModule],
  useFactory: async (configService: ConfigService)  => ({
    storage: MemoryStoredFile,
    limits: {
      files: configService.get<number>('files'),
    }
  }),
 inject: [ConfigService],
});
```
##### 2. Use class
```ts
NestjsFormDataModule.configAsync({
  useClass: MyNestJsFormDataConfigService
});
```
Above construction will instantiate `MyNestJsFormDataConfigService` inside `NestjsFormDataModule` and will leverage it 
to create options object.
```ts
export class MyNestJsFormDataConfigService implements NestjsFormDataConfigFactory {
  configAsync(): Promise<FormDataInterceptorConfig> | FormDataInterceptorConfig {
    return {
      storage: FileSystemStoredFile,
      fileSystemStoragePath: '/tmp/nestjs-fd',
    };
  }
}
```
##### 3. Use existing
```ts
NestjsFormDataModule.configAsync({
  imports: [MyNestJsFormDataConfigModule],
  useExisting: MyNestJsFormDataConfigService
});
```
It works the same as useClass with one critical difference - `NestjsFormDataModule` will lookup imported modules to 
reuse already created `MyNestJsFormDataConfigService`, instead of instantiating it on its own.
### Method level configuration
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
- `isGlobal` - If you want the module to be available globally. Once you import the module and configure it, it will be available globally
- `storage` - The type of storage logic for the uploaded file  (Default MemoryStoredFile)
- `fileSystemStoragePath` - The path to the directory for storing temporary files, used only for `storage: FileSystemStoredFile` (Default: /tmp/nestjs-tmp-storage)  
- `cleanupAfterSuccessHandle` - If set to true, all processed and uploaded files will be deleted after successful processing by the final method. This means that the `delete` method will be called on all files (StoredFile)
- `cleanupAfterFailedHandle` - If set to true, all processed and uploaded files will be deleted after unsuccessful processing by the final method. This means that the `delete` method will be called on all files (StoredFile)
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
Note: If you need to validate an array of files for size or otherwise, use `each: true` property from `ValidationOptions`

### IsFile
Checks if the value is an uploaded file
```ts
@IsFile(validationOptions?: ValidationOptions)
```

### IsFiles
Checks an array of files, the same as `@IsFile({ each: true })`  
For convenience
```ts
@IsFiles(validationOptions?: ValidationOptions)
```

### MaxFileSize
Maximum allowed file size
```ts
@MaxFileSize(maxSizeBytes: number, validationOptions?: ValidationOptions)
```

### MinFileSize
Minimum allowed file size
```ts
@MinFileSize(minSizeBytes: number, validationOptions?: ValidationOptions)
```

### HasMimeType
Check the mime type of the file  
The library uses two sources to get the mime type for the file:
- [file-type](https://www.npmjs.com/package/file-type) library gets mime-type: gets the mime-type from the [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files) directly from the binary data, it is a reliable source because it checks the file itself but may not return values for some files
- content type header from [busboy](https://www.npmjs.com/package/busboy: is a less trusted source because it can be tampered with  

*Priority of receiving mime-type corresponds to the list*

The default is simple mode, which does not check the data source, but you can pass a second argument to strictly check the mime-type and data source.  
You can also get the mime type and data source via the `get mimeTypeWithSource():MetaFieldSource` getter on the `StoredFile`


```ts
type AllowedMimeTypes = Array<AllowedMimeType>
type AllowedMimeType = string | RegExp;

@HasMimeType(allowedMimeTypes: AllowedMimeTypes | AllowedMimeType, strictSource?: MetaSource | ValidationOptions, validationOptions?: ValidationOptions)
```

You can also use partial matching, just pass the unimportant parameter as `*`, for example:
```ts
@HasMimeType('image/*')
```
also as array:
```ts
@HasMimeType(['image/*', 'text/*'])
```

### HasExtension
Check the extension type of the file
The library uses two sources to get the extension for the file:
- [file-type](https://www.npmjs.com/package/file-type) library gets mime-type: gets the extension from the [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files) directly from the binary data, it is a reliable source because it checks the file itself but may not return values for some files
- value after the last dot in file name: is a less trusted source because it can be tampered with

*Priority of receiving extension corresponds to the list*  

The default is simple mode, which does not check the data source, but you can pass a second argument to strictly check the extension and data source.  
You can also get the extension and data source via the `get extensionWithSource():MetaFieldSource` getter on the `StoredFile`

```ts
@HasExtension(allowedMimeTypes: string[] | string, strictSource?: MetaSource | ValidationOptions, validationOptions?: ValidationOptions)
```

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

Send request (via Insomnia)  

![image](https://user-images.githubusercontent.com/51157176/139556439-6b709fe8-8d62-41a2-9997-f9b7a2ff3d30.png)


### Validate the array of file

DTO

```ts
import { FileSystemStoredFile, HasMimeType, IsFiles, MaxFileSize } from 'nestjs-form-data';

export class FormDataTestDto {

  @IsFiles()
  @MaxFileSize(1e6, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  avatars: FileSystemStoredFile[];

}
```
Send request (via Insomnia)  

![image](https://user-images.githubusercontent.com/51157176/139556545-a8a1232d-3f1d-4325-9eff-98c294736d88.png)

## License
[MIT](LICENSE)
