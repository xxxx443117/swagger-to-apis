import { createTem } from '../utils/createTem';
import { OpenAPIV2 } from 'openapi-types';
import { ALLOWED_METHODS, TransferResult, UnknownType } from '../types';
import {
  checkPathIncludeParams,
  formatPathParams,
  transferPathParse,
} from '../utils/transfer';
import { transferPathToVar } from '../../src/utils';
import { transferPathInfo } from './v2/transferPathInfo';
import { transferDefinitionsObject } from './v2/transferDefinitionsObject';

export const namespace = 'SwaggerV2';
export const namespace_tag = `${namespace}Api`;

export const transformV2 = (doc: OpenAPIV2.Document): TransferResult => {
  const requestRes = getRequestApisWithPaths(doc.paths, doc.basePath);

  const swaggerTem = createTem('../template/tag/swagger.md');

  const swaggerRes = swaggerTem.replace({
    tag: namespace_tag,
    body: requestRes,
  });

  const type = getTypeApisWithDefinitions(doc.definitions);

  return {
    api: swaggerRes,
    type,
  };
};

function getRequestApisWithPaths(
  paths: OpenAPIV2.PathsObject,
  basePath?: string,
) {
  const requestTem = createTem<{
    method: string;
    handle: string;
    namespace: string;
    response: string;
    path: string;
    params;
    in_path: string;
    arg: string;
    summary: string;
  }>('../template/tag/request.md');

  let requestRes = '';

  Object.keys(paths).forEach((path) => {
    const data = paths[path];
    Object.keys(data).forEach((method) => {
      if (ALLOWED_METHODS.includes(method)) {
        const pathInfo: OpenAPIV2.OperationObject = data[method];
        const { response, params, arg, in_path_params } = transferPathInfo(
          pathInfo,
          namespace,
        );

        const description = `${pathInfo.deprecated ? '@deprecated' : ''} ${pathInfo.summary} ${pathInfo.tags}  ${pathInfo.description ? `(${pathInfo.description})` : ''}`;

        let pathIncludeParams = checkPathIncludeParams(path);
        /**
         * @hack 处理非标准参数
         * 如果路径中包含参数，但是没有在parameters中没有，则需要将in_path设置为参数
         */
        let _arg = arg;
        pathIncludeParams = pathIncludeParams?.filter(
          (item) =>
            !new RegExp(`^${item}`).test(arg) &&
            !new RegExp(`["' ]${item}["']`).test(arg),
        );
        if (pathIncludeParams?.length) {
          _arg = `${formatPathParams(pathIncludeParams, namespace)}${arg}`;
        }

        requestRes += requestTem.replace({
          method,
          handle: transferPathToVar(path),
          namespace,
          response,
          path: `${basePath ? basePath : ''}${transferPathParse(path, in_path_params)}`,
          params,
          in_path: '',
          arg: _arg,
          summary: description,
        });
      }
    });
  });

  return requestRes;
}

function getTypeApisWithDefinitions(definitions: OpenAPIV2.DefinitionsObject) {
  const typeTem = createTem('../template/tag/type.md');

  let schemaRes = '';
  Object.keys(definitions).forEach((key) => {
    const ele = definitions[key];
    const resType = transferDefinitionsObject(key, ele, namespace);

    schemaRes += resType;
  });

  const typeRes = typeTem.replace({
    namespace,
    body: schemaRes,
    base: `${UnknownType.type};`,
  });

  return typeRes;
}
