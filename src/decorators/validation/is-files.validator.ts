import { IsArray, ValidationOptions } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { IsFile } from './is-file.validator';

export function IsFiles(validationOptions?: ValidationOptions): PropertyDecorator {
  return applyDecorators(
    IsArray(validationOptions),
    IsFile(Object.assign(validationOptions || {}, { each: true })),
  );
}