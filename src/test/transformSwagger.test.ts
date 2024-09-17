import { transformSwagger } from '../index';
import * as swagger_v2 from '../lib/swagger_v2.json';
import { OpenAPIV2 } from 'openapi-types';

test('transformSwagger', () => {
  //   expect(1 + 2).toBe(3);
  const res = transformSwagger(swagger_v2 as OpenAPIV2.Document, './');
  console.log(res);
});
