import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { isFile } from './is-file.validator';

export function MinFileSize(minSizeBytes: number, validationOptions?: ValidationOptions) {

  return ValidateBy({
    name: 'MinFileSize',
    constraints: [minSizeBytes],
    validator: {
      validate(value: StoredFile, args: ValidationArguments) {
        const size: number = args.constraints[0];
        
        if (isFile(value)) {
          return value.size >= size;
        }

        return false;
      },

      defaultMessage(validationArguments?: ValidationArguments): string {
        return `Maximum file size is ${validationArguments.constraints[0]}`;
      },
    },
  }, validationOptions);

}