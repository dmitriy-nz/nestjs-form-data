import { ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { isFile } from './is-file.validator';
import { toArray } from '../../helpers/toArray';
import { MetaFieldSource, MetaSource } from '../../interfaces/MetaFieldSource';


export type AllowedMimeTypes = Array<AllowedMimeType>
export type AllowedMimeType = string | RegExp;

export function HasMimeType(allowedMimeTypes: AllowedMimeTypes | AllowedMimeType, strictSource?: MetaSource | ValidationOptions, validationOptions?: ValidationOptions): PropertyDecorator {

  return ValidateBy({
    name: 'HasMimeType',
    constraints: [allowedMimeTypes],
    validator: {

      validate(value: StoredFile, args: ValidationArguments) {
        const allowedMimeTypes: AllowedMimeTypes = toArray(args.constraints[0]) || [];
        const strictSource: MetaSource = (typeof args.constraints[1] === 'string')
          ? args.constraints[1] as MetaSource
          : undefined;

        if (isFile(value)) {
          const mimeWithSource: MetaFieldSource = value.mimeTypeWithSource;
          const hasSourceMatch = !strictSource || strictSource === mimeWithSource.source;

          if (!hasSourceMatch) {
            return false;
          }

          for (let mimeType of allowedMimeTypes) {
            switch (true) {
              case typeof mimeType === 'string' && !mimeType.includes('*'):
                if (mimeType === mimeWithSource.value) {
                  return true;
                }
                break;
              case typeof mimeType === 'string' && mimeType.includes('*'):
                const regex = new RegExp(`^${mimeType as string}$`.replace('*', '.+'));
                if (regex.test(mimeWithSource.value)) {
                  return true;
                }
                break;
              case mimeType instanceof RegExp:
                if ((mimeType as RegExp).test(mimeWithSource.value)) {
                  return true;
                }
                break;
              default:
                throw new Error(`Unknown mime type for validate`);
            }
          }
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
