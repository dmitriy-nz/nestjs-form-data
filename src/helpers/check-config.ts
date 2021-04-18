import { FormDataInterceptorConfig } from '../interfaces/FormDataInterceptorConfig';
import { DEFAULT_CONFIG } from '../config/default.config';

export function checkConfig(config: FormDataInterceptorConfig, defaults: FormDataInterceptorConfig = DEFAULT_CONFIG): FormDataInterceptorConfig {

  if (!config.storage)
    config.storage = defaults.storage;

  if (config.autoDeleteFile === undefined)
    config.autoDeleteFile = defaults.autoDeleteFile;

  if (!config.fileSystemStoragePath)
    config.fileSystemStoragePath = defaults.fileSystemStoragePath;

  return Object.assign(config, defaults);
}