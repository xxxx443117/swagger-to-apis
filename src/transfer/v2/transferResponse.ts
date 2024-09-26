import { OpenAPIV2 } from 'openapi-types';
import { UnknownType } from '../../types';
import { refToInterface } from '../../utils/transfer';

export const transferResponse = (responses: OpenAPIV2.ResponsesObject) => {
  const res: OpenAPIV2.Response = responses.default || responses[200];

  if ('$ref' in res) {
    return refToInterface(res.$ref);
  }

  if (res.schema) {
    if ('$ref' in res.schema) {
      return refToInterface(res.schema.$ref);
    }

    if (res.schema.allOf) {
      let res_type = '';
      const allOf = res.schema.allOf;
      allOf.forEach((item) => {
        if (item.properties?.data) {
          if (item.properties.data.type === 'array') {
            if ('$ref' in item.properties.data.items) {
              res_type = `${refToInterface(item.properties.data.items.$ref)}[]`;
            } else {
              res_type = `${UnknownType.key}[]`;
            }
          } else {
            res_type = refToInterface(item.properties.data.$ref);
          }
        }
      });

      return res_type || UnknownType.key;
    }
  }

  return UnknownType.key;
};
