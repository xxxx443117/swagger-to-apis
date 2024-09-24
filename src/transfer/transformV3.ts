import { OpenAPIV3 } from 'openapi-types';
import { ALLOWED_METHODS, TransferResult, UnknownType } from '../types';
import { createTem } from '../utils/createTem';

import { transferPathInfo } from './v3/transferPathInfo';
import { transferPathParse, transferPathToVar } from '../utils';
import { transferComponentsSchemas } from './v3/transferComponentsSchemas';

export const namespace = 'SwaggerV3';
export const namespace_tag = `${namespace}Api`;

export const transformV3 = (doc: OpenAPIV3.Document): TransferResult => {
  const requestRes = getRequestApisWithPaths(doc.paths);

  const swaggerTem = createTem('../template/tag/swagger.md');

  const swaggerRes = swaggerTem.replace({
    tag: namespace_tag,
    body: requestRes,
  });

  const type = getTypeApisWithComponents(doc.components);
  return {
    api: swaggerRes,
    type,
  };
};

function getRequestApisWithPaths(paths: OpenAPIV3.PathsObject) {
  let requestRes = '';

  const requestTem = createTem('../template/tag/request.md');
  Object.keys(paths).forEach((path) => {
    const data = paths[path];
    Object.keys(data).forEach((method) => {
      if (ALLOWED_METHODS.includes(method)) {
        const pathInfo: OpenAPIV3.OperationObject = data[method];
        const { response, params, in_path, arg } = transferPathInfo(
          pathInfo,
          namespace,
        );

        const description = `${pathInfo.deprecated ? '@deprecated' : ''} ${pathInfo.summary} ${pathInfo.tags}  ${pathInfo.description ? `(${pathInfo.description})` : ''}`;
        requestRes += requestTem.replace({
          method,
          handle: transferPathToVar(path),
          namespace,
          response,
          path: transferPathParse(path),
          params,
          in_path,
          arg,
          summary: description,
        });
      }
    });
  });

  return requestRes;
}

function getTypeApisWithComponents(components: OpenAPIV3.ComponentsObject) {
  const typeTem = createTem<{
    namespace: string;
    body: string;
    base: string;
  }>('../template/tag/type.md');

  let requestRes = '';

  if (components.schemas) {
    Object.keys(components.schemas).forEach((key) => {
      const data = components.schemas[key];
      requestRes += transferComponentsSchemas(key, data, namespace);
    });
  }

  const typeRes = typeTem.replace({
    namespace,
    body: requestRes,
    base: `${UnknownType.type};`,
  });

  return typeRes;
}
