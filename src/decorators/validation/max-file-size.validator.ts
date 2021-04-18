import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { isFile } from './is-file.validator';

export function MaxFileSize(maxSizeBytes: number, validationOptions?: ValidationOptions): PropertyDecorator {

  return ValidateBy({
    name: 'MaxFileSize',
    constraints: [maxSizeBytes],
    validator: {
      validate(value: StoredFile, args: ValidationArguments) {
        const size: number = args.constraints[0];

        if (isFile(value)) {
          return value.size <= size;
        }

        return false;
      },

      defaultMessage(validationArguments?: ValidationArguments): string {
        return `Maximum file size is ${validationArguments.constraints[0]}`;
      },
    },
  }, validationOptions);

}