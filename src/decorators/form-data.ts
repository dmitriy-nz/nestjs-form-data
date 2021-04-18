import { FormDataInterceptorConfig } from '../interfaces/FormDataInterceptorConfig';
import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { FormDataInterceptor } from '../interceptors/FormData.interceptor';


export const FORM_DATA_REQUEST_METADATA_KEY: Symbol = Symbol();

export function FormDataRequest(config?: FormDataInterceptorConfig) {
  
  return applyDecorators(
    SetMetadata(FORM_DATA_REQUEST_METADATA_KEY, config),
    UseInterceptors(FormDataInterceptor),
  );

}