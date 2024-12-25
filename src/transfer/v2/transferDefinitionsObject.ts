import { OpenAPIV2 } from 'openapi-types';
import { transferSchema } from './utils';
import { transferSchemaToType } from '../../utils/transfer';

export const transferDefinitionsObject = (
  key: string,
  schema: OpenAPIV2.ReferenceObject | OpenAPIV2.SchemaObject,
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
  if (schema.enum) {
    return `type ${typeKey} = ${params_type};\n`;
  }
  return `
    interface ${typeKey} {
      ${params_type}
    }
  `;
};
