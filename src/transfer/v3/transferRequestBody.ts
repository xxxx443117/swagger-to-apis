import { OpenAPIV3 } from 'openapi-types';
import { getNamespaceRef, refToInterface } from '../../utils/transfer';
import { transferMedia } from './utils';

export const transferRequestBody = (
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  namespace_tag: string,
) => {
  let params = '';
  let arg = '';

  if ('$ref' in requestBody) {
    const type = getNamespaceRef(
      namespace_tag,
      refToInterface(requestBody.$ref),
    );
    arg = `data: ${type}`;
    params = 'data';
  }

  if ('content' in requestBody) {
    const content = requestBody.content;
    if ('application/json' in content) {
      const _interface = transferMedia(content['application/json']);
      // console.log(_interface, content['application/json']);
      const type = getNamespaceRef(namespace_tag, _interface);
      arg = `data: ${type}`;
      params = 'data';
    }
  }
  // return namespace_type;

  // console.log(params, arg);
  return {
    arg,
    params,
  };
};
