import { OpenAPIV3 } from 'openapi-types';
import { transferSchema } from './utils';
import { transferSchemaToType } from '../../utils/transfer';

export const transferComponentsSchemas = (
  key: string,
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  namespace_tag: string,
) => {
  const typeKey = transferSchemaToType(key).replace(/-/g, '_');
  const params_type = transferSchema(schema, namespace_tag);

  if ('$ref' in schema) {
    return `
      interface ${typeKey} {
        ${params_type}
      }
    `;
  }
  if (schema.type === 'array') {
    return `type ${typeKey} = ${params_type}[]
  `;
  }
  return `
    interface ${typeKey} {
      ${params_type}
    }
  `;
};
