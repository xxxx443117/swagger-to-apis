import { isSuccess } from './util';
import { SwaggerV2Api } from './swagger/swagger.api';

export const Api = {
  isSuccess,
  SwaggerV2Api: new SwaggerV2Api()
};
