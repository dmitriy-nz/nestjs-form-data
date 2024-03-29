import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { isFile } from './is-file.validator';
import { toArray } from '../../helpers/toArray';
import { MetaFieldSource, MetaSource } from '../../interfaces/MetaFieldSource';

export function HasMimeType(allowedMimeTypes: string[] | string, strictSource?: MetaSource | ValidationOptions, validationOptions?: ValidationOptions): PropertyDecorator {

  return ValidateBy({
    name: 'HasMimeType',
    constraints: [allowedMimeTypes],
    validator: {

      validate(value: StoredFile, args: ValidationArguments) {
        const allowedMimeTypes: string[] = toArray(args.constraints[0]) || [];
        const strictSource: MetaSource = (typeof args.constraints[1] === 'string')
          ? args.constraints[1] as MetaSource
          : undefined;

        if (isFile(value)) {
          const mimeWithSource: MetaFieldSource = value.mimeTypeWithSource;
          return allowedMimeTypes.includes(mimeWithSource.value) && (!strictSource || strictSource === mimeWithSource.source);
        }

        return false;
      },

      defaultMessage(validationArguments?: ValidationArguments): string {
        const allowedMimeTypes: string[] = toArray(validationArguments.constraints[0]) || [];
        return `File must be of one of the types ${allowedMimeTypes.join(', ')}`;
      },
    },
  }, validationOptions || ((typeof strictSource === 'object') ? strictSource as ValidationOptions : null));


}
