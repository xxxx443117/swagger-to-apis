import { OpenAPIV3 } from 'openapi-types';
import { ALLOWED_CODES, UnknownType } from '../../types';
import { transferMedia } from './utils';

export const transferResponse = (responses: OpenAPIV3.ResponsesObject) => {
  let namespace_type = UnknownType.key;
  Object.keys(responses).forEach((code) => {
    if (ALLOWED_CODES.includes(code)) {
      const data = responses[code];
      console.log(data);
      if ('application/json' in data) {
        namespace_type = transferMedia(data['application/json']);
      }
    }
  });
  return namespace_type;
};
