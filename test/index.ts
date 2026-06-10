import { swaggerToApis } from '../src/index';
// import * as swagger_v2 from './datas/swagger_v2.json';
// import * as swagger_v3 from './datas/swagger_v3.json';
// import { AllSwaggerDocumentVersions } from '../src/types';

swaggerToApis({
  // doc: swagger_v2 as AllSwaggerDocumentVersions,
  url: 'https://bird-points-go.qmuzpo.easypanel.host/api.json',
  output: './output-v3-apis',
  dirName: 'api-v3'
});

swaggerToApis({
  // doc: swagger_v2 as AllSwaggerDocumentVersions,
  url: 'https://go-mall-go.qmuzpo.easypanel.host/swagger/doc.json',
  output: './output-v2-apis',
  dirName: 'api-v2'
});

export default {};
