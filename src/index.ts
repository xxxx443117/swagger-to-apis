import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
import { namespace_tag_v2, namespace_tag_v3, transformV2, transformV3 } from './transfer';
import { AllSwaggerDocumentVersions, Options, TransferResult } from './types';
import { isV2Document, isV31Document, isV3Document } from './utils/detectDocumentVersion';
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
  bracketSpacing: true
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
  dirName = 'apis'
) {
  let transfer_res: TransferResult = {
    api: '',
    type: ''
  };

  if (isV2Document(inputDoc)) {
    await initTransferTem(output, prettierConfig, namespace_tag_v2, dirName);
    transfer_res = transformV2(inputDoc as OpenAPIV2.Document);
  } else if (isV31Document(inputDoc)) {
    throw new Error('OpenAPI V3.1 is not yet supported');
  } else if (isV3Document(inputDoc)) {
    await initTransferTem(output, prettierConfig, namespace_tag_v3, dirName);
    transfer_res = transformV3(inputDoc as OpenAPIV3.Document);
  } else {
    throw new Error('Can not detect version ot this version in not supported');
  }

  const [format_api, format_type] = await Promise.all([
    prettier.format(transfer_res.api, prettierConfig),
    prettier.format(transfer_res.type, prettierConfig)
  ]);
  await Promise.all([
    saveTem(`${output}/${dirName}/swagger/swagger.api.ts`, format_api),
    saveTem(`${output}/${dirName}/swagger/swagger.d.ts`, format_type)
  ]);
}

export async function swaggerToApis(option: Options) {
  if (!option.url && !option.doc) {
    throw new Error('swaggerToApis: url or doc is required');
  }

  let doc = option.doc;
  if (option.url) {
    doc = await fetchData(option.url);
  }

  await transformSwagger(doc, option.output || './src', option.dirName);

  const date = Date();
  console.log('成功啦 !!!               ', date.toLocaleLowerCase());
  console.log('----------------分割线--------------');
}
