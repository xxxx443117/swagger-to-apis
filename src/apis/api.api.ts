import { isSuccess } from './util';
import { SwaggerApi } from './swagger/swagger.api';

export const Api = {
  isSuccess,
  SwaggerApi: new SwaggerApi(),
};
