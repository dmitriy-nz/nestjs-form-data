import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { isFile } from './is-file.validator';

export function HasMimeType(allowedMimeTypes: string[], validationOptions?: ValidationOptions): PropertyDecorator {

  return ValidateBy({
    name: 'HasMimeType',
    constraints: [allowedMimeTypes],
    validator: {

      validate(value: StoredFile, args: ValidationArguments) {
        const allowedMimeTypes: string[] = args.constraints[0] || [];

        if (isFile(value)) {
          return allowedMimeTypes.includes(value.mimetype);
        }

        return false;
      },

      defaultMessage(validationArguments?: ValidationArguments): string {
        const allowedMimeTypes: string[] = validationArguments.constraints[0] || [];
        return `File must be of one of the types ${allowedMimeTypes.join(', ')}`;
      },
    },
  }, validationOptions);


}