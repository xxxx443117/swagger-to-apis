import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { namespace_tag_v2, transformV2, transformV3 } from './transfer';
import { AllSwaggerDocumentVersions, Options, TransferResult } from './types';
import {
  isV2Document,
  isV31Document,
  isV3Document,
} from './utils/detectDocumentVersion';
import * as prettier from 'prettier';
import { saveTem } from './utils/saveTem';
import { fetchData } from './fetchs';
import { initTransferTem } from './utils/initTransferTem';

const prettierConfig: prettier.Options = {
  parser: 'babel-ts',
  tabWidth: 2,
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSpacing: true,
};

/**
 * Check version of the document,
 * run appropriate processor and beautify the markdown after processing.
 *
 * @export
 * @param {AllSwaggerDocumentVersions} inputDoc
 * @param {Options} options

 */
export async function transformSwagger(
  inputDoc: AllSwaggerDocumentVersions,
  output: string,
) {
  let transfer_res: TransferResult = {
    api: '',
    type: '',
  };

  if (isV2Document(inputDoc)) {
    initTransferTem(output, prettierConfig, namespace_tag_v2);
    transfer_res = transformV2(inputDoc as OpenAPIV2.Document);
  } else if (isV3Document(inputDoc)) {
    // throw new Error('OpenAPI V3 is not yet supported');
    transfer_res = transformV3(inputDoc as OpenAPIV3.Document);
  } else if (isV31Document(inputDoc)) {
    throw new Error('OpenAPI V3.1 is not yet supported');
  } else {
    throw new Error('Can not detect version ot this version in not supported');
  }
  console.log(transfer_res, output);

  //   console.log(prettierConfig, prettier);
  const format_api = await prettier.format(transfer_res.api, prettierConfig);
  console.log(format_api, '==format_api');
  saveTem(`${output}/apis/swagger/swagger.api.ts`, format_api);

  const format_type = await prettier.format(transfer_res.type, prettierConfig);
  saveTem(`${output}/apis/swagger/swagger.d.ts`, format_type);
}

export async function swaggerToApis(option: Options) {
  let doc = option.doc;
  if (option.url) {
    doc = await fetchData(option.url);
  }

  await transformSwagger(doc, option.output);

  const date = Date();
  console.log('成功啦 !!!               ', date.toLocaleLowerCase());
  console.log('----------------分割线--------------');
}
