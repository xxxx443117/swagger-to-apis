import * as SwaggerToApi from '../src/index';

SwaggerToApi.swaggerToApis({
  apiUrl: 'https://example/api.json',
  reslib: './test/'
});
