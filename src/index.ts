// import axios = require('axios');
import fetch = require('node-fetch');
// import fetch from 'node-fetch';

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
  assets?: Data;
  reslib?: string;
}

export const swaggerToApis = async ({ apiUrl, assets, reslib }: Options) => {
  let data: Data = null;
  if (apiUrl) {
    // @ts-ignore
    // const res = await axios.get(apiUrl);
    const res1 = await fetch(apiUrl);

    // const aaa = res1.toJSON()
    const data1 = await res1.json();

    // console.log(data1);
    data = data1;
  } else if (assets) {
    data = assets;
  }

  if (!data) throw new Error('data is null');

  const requestTem = await createTem('./template/tag/request.md');
  let requestRes = '';
  Object.keys(data.paths).forEach((key) => {
    const ele = data.paths[key];
    const method = ele.get ? 'get' : 'post';
    const body = ele[method];

    // console.log(body);
    const { params, arg, pathReq } = parseParameters(
      body.parameters,
      body?.requestBody,
    );

    // console.log(pathReq, transferPathParse(key), key);
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
  saveTem(`${reslib}/apis/swagger/swagger.api.ts`, formatSwagger);

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

  saveTem(`${reslib}/apis/swagger/swagger.d.ts`, formatType);

  const apiTem = await createTem('./template/api.api.md');
  const apiRes = apiTem.replace({
    importBody: '',
    body: '',
  });
  const formatApi = await prettier.format(apiRes, prettierConfig);
  saveTem(`${reslib}/apis/api.api.ts`, formatApi, { replace: false });

  const apiTypeTem = await createTem('./template/api.d.ts.md');
  saveTem(`${reslib}/apis/api.d.ts`, apiTypeTem.value, { replace: false });

  const apiHttpTem = await createTem('./template/http.ts.md');
  saveTem(`${reslib}/apis/http.ts`, apiHttpTem.value, { replace: false });

  const apiIndexTem = await createTem('./template/index.ts.md');
  saveTem(`${reslib}/apis/index.ts`, apiIndexTem.value, { replace: false });

  const apiTypesTem = await createTem('./template/type.ts.md');
  saveTem(`${reslib}/apis/type.ts`, apiTypesTem.value, { replace: false });

  const apiUtilsTem = await createTem('./template/util.ts.md');
  saveTem(`${reslib}/apis/util.ts`, apiUtilsTem.value, { replace: false });

  const date = Date();
  console.log('成功啦 !!!               ', date.toLocaleLowerCase());
  console.log('----------------分割线--------------');
  // api.api.md;
};
