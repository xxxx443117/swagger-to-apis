import { swaggerToApis } from '../src/index';
// import * as swagger_v2 from './datas/swagger_v2.json';
// import * as swagger_v3 from './datas/swagger_v3.json';
// import { AllSwaggerDocumentVersions } from '../src/types';

swaggerToApis({
  // doc: swagger_v2 as AllSwaggerDocumentVersions,
  url: 'https://petstore3.swagger.io/api/v3/openapi.json',
  output: './output-v3-apis',
});

swaggerToApis({
  // doc: swagger_v2 as AllSwaggerDocumentVersions,
  url: 'https://petstore.swagger.io/v2/swagger.json',
  output: './output-v2-apis',
});

export default {};
