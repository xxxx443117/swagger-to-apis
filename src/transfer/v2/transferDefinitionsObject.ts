import { OpenAPIV2 } from 'openapi-types';
import { transferSchema, isEmptySchema, isGenericSchemaKey } from './utils';
import { transferSchemaToType } from '../../utils/transfer';
import { checkValidVariableName } from '../../utils/tools';

export const transferDefinitionsObject = (
  key: string,
  schema: OpenAPIV2.ReferenceObject | OpenAPIV2.SchemaObject,
  namespace_tag: string
) => {
  const typeKey = transferSchemaToType(key).replace(/-/g, '_');

  if ('$ref' in schema) {
    const params_type = transferSchema(schema, namespace_tag);
    return `
      interface ${typeKey} {
        ${params_type}
      }
    `;
  }
  if (schema.type === 'array') {
    const params_type = transferSchema(schema, namespace_tag);
    return `type ${typeKey} = ${params_type}
  `;
  }
  if (schema.enum) {
    const params_type = transferSchema(schema, namespace_tag);
    return `type ${typeKey} = ${params_type};\n`;
  }

  // 检测泛型: schema 含有空属性, 且被注册为泛型候选
  if (schema.properties && isGenericSchemaKey(key)) {
    const genericProp = Object.entries(schema.properties).find(
      ([, prop]) => isEmptySchema(prop)
    )?.[0];
    if (genericProp) {
      let res = '';
      for (const [name, prop] of Object.entries(schema.properties)) {
        if (name === genericProp) {
          res += `${name}: T[]; \n`;
        } else {
          const type = transferSchema(
            prop as OpenAPIV2.SchemaObject | OpenAPIV2.ReferenceObject,
            namespace_tag
          );
          if (type) {
            const propKey = checkValidVariableName(name) ? name : `"${name}"`;
            res += `${propKey}: ${type}; \n`;
          }
        }
      }
      return `
    interface ${typeKey}<T> {
      ${res}
    }
  `;
    }
  }

  const params_type = transferSchema(schema, namespace_tag);
  return `
    interface ${typeKey} {
      ${params_type}
    }
  `;
};
