import { FormDataInterceptorConfig } from '../interfaces/FormDataInterceptorConfig';
import { DEFAULT_CONFIG } from '../config/default.config';

export function checkConfig(config: FormDataInterceptorConfig, defaults: FormDataInterceptorConfig = DEFAULT_CONFIG): FormDataInterceptorConfig {
  config = Object.assign({}, config)

  if (!config.storage)
    config.storage = defaults.storage;


  if(config.cleanupAfterSuccessHandle === undefined){
    config.cleanupAfterSuccessHandle = defaults.cleanupAfterSuccessHandle;
  }

  if(config.cleanupAfterFailedHandle === undefined){
    config.cleanupAfterFailedHandle = defaults.cleanupAfterFailedHandle;
  }

  if (!config.fileSystemStoragePath)
    config.fileSystemStoragePath = defaults.fileSystemStoragePath;

  return Object.assign({}, defaults, config);
}
