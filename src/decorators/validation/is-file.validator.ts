import { IsArray, ValidateBy, ValidationArguments, ValidationOptions } from 'class-validator';
import { StoredFile } from '../../classes/storage/StoredFile';
import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';


export function isFile(value: any): boolean {
  return value && value instanceof StoredFile;
}

export function IsFile(validationOptions?: ValidationOptions): PropertyDecorator {

  const isFileValidator = ValidateBy({
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

  const transformEnableImplicitConversion = Transform(params => {
    return params.obj[params.key]
  })



  if(validationOptions?.each){
    return applyDecorators(
      Transform((params: TransformFnParams) => {
        if(!Array.isArray(params.value)){
          return [ params.value ];
        }
        return params.value;
      }),
      transformEnableImplicitConversion,
      isFileValidator,
      IsArray(Object.assign({},validationOptions || {}, { each: false }))
    );
  }

  return applyDecorators(
    transformEnableImplicitConversion,
    isFileValidator
  );

}
