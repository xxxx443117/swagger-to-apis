import axios = require('axios');
import * as prettier from 'prettier';

import { createTem } from './createTem';
import { Data } from './types';
import {
  transferPathToVar,
  parseParameters,
  parseSchema,
  responseToInterface,
  transferPathParse,
} from './utils';

import { saveTem } from './saveTem';

const prettierConfig: unknown = {
  parser: 'babel-ts',
  tabWidth: 2,
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSpacing: true,
};

interface Options {
  apiUrl?: string;
  assets?: string;
  reslib?: string;
}

const SwaggerToApis = async ({ apiUrl, assets, reslib }: Options) => {
  let data: Data = null;
  if (apiUrl) {
    // @ts-ignore
    const res = await axios.get(apiUrl);
    data = res.data;
  } else {
    data = require(assets);
  }

  const requestTem = await createTem('./template/tag/request.md');
  let requestRes = '';
  Object.keys(data.paths).forEach((key) => {
    const ele = data.paths[key];
    const method = ele.get ? 'get' : 'post';
    const body = ele[method];

    const { params, arg, pathReq } = parseParameters(
      body.parameters,
      body?.requestBody,
    );

    console.log(pathReq, transferPathParse(key), key);
    requestRes += requestTem.replace({
      method,
      handle: transferPathToVar(key),
      namespace: 'Swagger',
      response: responseToInterface(body.responses),
      path: transferPathParse(key),
      params,
      inPath: pathReq,
      arg,
      summary: `${body.summary} ${body.tags}`,
    });
  });
  const swaggerTem = await createTem('./template/tag/swagger.md');

  const swaggerRes = swaggerTem.replace({
    tag: 'SwaggerApi',
    body: requestRes,
  });
  const formatSwagger = await prettier.format(swaggerRes, prettierConfig);
  saveTem(`${reslib}/swagger/swagger.api.ts`, formatSwagger);

  const typeTem = await createTem('./template/tag/type.md');

  const { schemas } = data.components;
  let schemaRes = '';
  Object.keys(schemas).forEach((key) => {
    const ele = schemas[key];
    const resType = parseSchema(key, ele);
    schemaRes += resType;
  });

  const typeRes = typeTem.replace({
    namespace: 'Swagger',
    body: schemaRes,
  });

  const formatType = await prettier.format(typeRes, prettierConfig);

  saveTem(`${reslib}/swagger/swagger.d.ts`, formatType);

  const apiTem = await createTem('./template/api.api.md');
  const apiRes = apiTem.replace({
    importBody: '',
    body: '',
  });
  const formatApi = await prettier.format(apiRes, prettierConfig);
  saveTem(`${reslib}/apis/api.api.ts`, formatApi);

  const apiTypeTem = await createTem('./template/api.d.ts.md');
  saveTem(`${reslib}/apis/api.d.ts`, apiTypeTem.value);

  const apiHttpTem = await createTem('./template/http.ts.md');
  saveTem(`${reslib}/apis/http.ts`, apiHttpTem.value);

  const apiIndexTem = await createTem('./template/index.ts.md');
  saveTem(`${reslib}/apis/index.ts`, apiIndexTem.value);

  const apiTypesTem = await createTem('./template/type.ts.md');
  saveTem(`${reslib}/apis/type.ts`, apiTypesTem.value);

  const apiUtilsTem = await createTem('./template/util.ts.md');
  saveTem(`${reslib}/apis/util.ts`, apiUtilsTem.value);

  const date = Date();
  console.log('成功啦 !!!               ', date.toLocaleLowerCase());
  console.log('----------------分割线--------------');
  // api.api.md;
};

export default SwaggerToApis;
