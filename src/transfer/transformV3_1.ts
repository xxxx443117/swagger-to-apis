import { OpenAPIV3_1 } from 'openapi-types';
import { TransferResult } from '../types';

export const transformV3_1 = (doc: OpenAPIV3_1.Document): TransferResult => {
  // TODO:

  console.log(doc);
  return {
    api: '',
    type: '',
  };
};
