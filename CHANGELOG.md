### v1.8.0
- Changed incoming arguments for the factory method `StoredFile.create()`
  Your custom classes for saving files will be broken, they will need to be fixed, example in `src/classes/storage/MemoryStoredFile.ts`
- Added [file-type](https://www.npmjs.com/package/file-type) dependency as a reliable source for getting file mime-type and extension.
- Changed `HasMimeType` validator, added second argument to strictly check mime-type source
- Added `HasExtension` validator, to check file extension, uses file-type
- Added tests to test validators
- Modified README.md, added more information about validators and their usage
- Added CHANGELOG.md
