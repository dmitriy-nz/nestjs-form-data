## v1.9.93
- Merged PR [Add support for nestjs 11](https://github.com/dmitriy-nz/nestjs-form-data/pull/66)
- Added "engines" section and `.nvmrc` file

### v1.9.91
- Resolved [Issue 55](https://github.com/dmitriy-nz/nestjs-form-data/issues/55)
- Added test cases for `Exposed` decorated fields

### v1.9.9
- Resolved [Issue 60](https://github.com/dmitriy-nz/nestjs-form-data/issues/60)
- Added test cases for `enableImplicitConversion` field in the `class-validator` transform options
- Modified `IsFile` validator to handle `enableImplicitConversion` param
- Some other test cases were improved

### v1.9.8
- Updated `README.md`, clarified `class-validator` pipe configuration

### v1.9.7
- `autoDeleteFile` config field separated to two fields: `cleanupAfterSuccessHandle` and `cleanupAfterFailedHandle`
- Extended `HasMimeType` validator, added regex support and asterisk match
- Extended tests for cover a new functionality
- Resolved [Issue 56](https://github.com/dmitriy-nz/nestjs-form-data/issues/56)
- Resolved [Issue 57](https://github.com/dmitriy-nz/nestjs-form-data/issues/57)
- Updated README.md - described additional information about the usage of new config fields and validations

### v1.9.6
- Updated peer deps: `reflect-metadata^0.2.0`
- Resolved [Issue 58](https://github.com/dmitriy-nz/nestjs-form-data/issues/58)
### v1.9.5
- Added missed exports: `MetaFieldSource` and MetaSource
- Resolved [Issue 52](https://github.com/dmitriy-nz/nestjs-form-data/issues/52)
### v1.9.4
- Minor npm publish fix
### v1.9.3
- Added missed exports: `MetaFieldSource` and MetaSource
- Resolved [Issue 52](https://github.com/dmitriy-nz/nestjs-form-data/issues/52)
### v1.9.2
- Added fastify support, thanks to [0x67](https://github.com/dmitriy-nz/nestjs-form-data/pull/53)
- Resolved [Issue 18](https://github.com/dmitriy-nz/nestjs-form-data/issues/18)
### v1.9.1
- Resolved [Issue 47](https://github.com/dmitriy-nz/nestjs-form-data/issues/41)
- Fixed issue with mappings files to same field
- Removed `node-append-field` library from dependencies and placed in the project (for modification)
- Added tests for reproduce [Issue 49](https://github.com/dmitriy-nz/nestjs-form-data/issues/49)

### v1.9.0
- Added NestJs 10 support

### v1.8.7
- Resolved [Issue 45](https://github.com/dmitriy-nz/nestjs-form-data/issues/45)
- Added support class-validator "^0.13.2" in peer dependencies

### v1.8.6
- Resolved [Issue 41](https://github.com/dmitriy-nz/nestjs-form-data/issues/41)
- Added the `isGlobal` configuration parameter, which allows you to make the module global for all submodules.
- Added tests to test the `isGlobal` parameter for future support.
- Updated readme

### v1.8.5 - v1.8.5

- Updated `peerDependencies` to version `^0.14.0`

### v1.8.3

- [fix issue 35](https://github.com/dmitriy-nz/nestjs-form-data/issues/35), added missing field `buffer: Buffer` in
  class `MemoryStoredFile` in version 1.8.0
- Fix link to changelog in README.md

### v1.8.2

- [fix issue 29](https://github.com/dmitriy-nz/nestjs-form-data/issues/29)
- Cleared the default error handling, which duplicated the standard error handling. Custom error handlers work again
- Fixed errors when deleting files after processing requests if there is no delete method

### v1.8.1

- [fix issue 34](https://github.com/dmitriy-nz/nestjs-form-data/issues/34)
- removed 'node:stream' imports to ensure compatibility

### v1.8.0

- Changed incoming arguments for the factory method `StoredFile.create()`
  Your custom classes for saving files will be broken, they will need to be fixed, example
  in `src/classes/storage/MemoryStoredFile.ts`
- Added [file-type](https://www.npmjs.com/package/file-type) dependency as a reliable source for getting file mime-type
  and extension.
- Changed `HasMimeType` validator, added second argument to strictly check mime-type source
- Added `HasExtension` validator, to check file extension, uses file-type
- Added tests to test validators
- Modified README.md, added more information about validators and their usage
- Added CHANGELOG.md

