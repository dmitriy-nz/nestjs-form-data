import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';


export function isFile(value: any): boolean {
  return value && value instanceof StoredFile;
}

export function IsFile(validationOptions?: ValidationOptions): PropertyDecorator {

  return ValidateBy({
    name: 'IsFile',
    constraints: [],
    validator: {

      validate(value: any, args: ValidationArguments) {
        return isFile(value);
      },

      defaultMessage(validationArguments?: ValidationArguments): string {
        return `Field "${validationArguments.property}" does not contain file`;
      },
    },
  }, validationOptions);


}