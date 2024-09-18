import { swaggerToApis } from '../src/index';
import * as swagger_v2 from './datas/swagger_v2.json';
import { AllSwaggerDocumentVersions } from '../src/types';

swaggerToApis({
  doc: swagger_v2 as AllSwaggerDocumentVersions,
  output: './output-apis',
});
