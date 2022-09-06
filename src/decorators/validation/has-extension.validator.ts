import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { isFile } from './is-file.validator';
import { MetaFieldSource, MetaSource } from '../../interfaces/MetaFieldSource';
import { toArray } from '../../helpers/toArray';


export function HasExtension(allowedExtensions: string[] | string, strictSource?: MetaSource | ValidationOptions, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy({
    name: 'HasExtension',
    constraints: [allowedExtensions, strictSource],
    validator: {
      validate(value: StoredFile, args: ValidationArguments) {
        const allowedExtensions: string[] = toArray<string>(args.constraints[0]);
        const strictSource: MetaSource = (typeof args.constraints[1] === 'string')
          ? args.constraints[1] as MetaSource
          : undefined;

        if (isFile(value)) {
          const ext: MetaFieldSource = value.extensionWithSource;
          return allowedExtensions.includes(ext.value) && (!strictSource || strictSource === ext.source);
        }

        return false;
      },

      defaultMessage(validationArguments?: ValidationArguments): string {
        const allowedExtensions: string[] = toArray<string>(validationArguments.constraints[0]);
        return `File must be of one of the extensions ${allowedExtensions.join(', ')}`;
      },
    },
  }, validationOptions || ((typeof strictSource === 'object') ? strictSource as ValidationOptions : null));
}
