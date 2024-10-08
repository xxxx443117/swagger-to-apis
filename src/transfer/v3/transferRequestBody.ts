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
    params = `data: ${type}`;
    arg = 'data';
  }

  if ('content' in requestBody) {
    const data = requestBody.content;
    if ('application/json' in data) {
      const _interface = transferMedia(data['application/json']);
      const type = getNamespaceRef(namespace_tag, _interface);
      params = `data: ${type}`;
      arg = 'data';
    }
  }
  // return namespace_type;

  return {
    arg,
    params,
  };
};
