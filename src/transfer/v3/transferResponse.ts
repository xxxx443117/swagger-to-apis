import { OpenAPIV3 } from 'openapi-types';
import { ALLOWED_CODES, UnknownType } from '../../types';
import { transferMedia } from './utils';
import { refToInterface } from '../../utils/transfer';

export const transferResponse = (responses: OpenAPIV3.ResponsesObject) => {
  let namespace_type = UnknownType.key;
  Object.keys(responses).forEach((code) => {
    if (ALLOWED_CODES.includes(code)) {
      const data = responses[code];
      console.log(data);

      if ('$ref' in data) {
        namespace_type = refToInterface(data.$ref);
      } else if (data.content) {
        if ('application/json' in data.content) {
          namespace_type = transferMedia(data.content['application/json']);
        }
      }
    }
  });
  console.log(namespace_type);
  // return 'AAA';
  return namespace_type;
};
