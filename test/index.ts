import { swaggerToApis } from '../src/index';
import * as swagger_v2 from './datas/swagger_v2.json';
// import * as swagger_v3 from './datas/swagger_v3.json';
import { AllSwaggerDocumentVersions } from '../src/types';

swaggerToApis({
  doc: swagger_v2 as AllSwaggerDocumentVersions,
  // url: 'https://drgv-drgv-admin.w2cfm5.easypanel.host/api/api.json',
  output: './output-apis',
});

export default {};
