import * as SwaggerToApi from '../src/index';
import * as data from './data.json';

SwaggerToApi.swaggerToApis({
  assets: data as unknown as any,
  reslib: './test/'
});
