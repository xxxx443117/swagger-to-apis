import { OpenAPIV3 } from 'openapi-types';
import { TransferResult } from 'types';

export const transformV3 = (doc: OpenAPIV3.Document): TransferResult => {
  // TODO:

  console.log(doc);
  return {
    api: '',
    type: '',
  };
};
