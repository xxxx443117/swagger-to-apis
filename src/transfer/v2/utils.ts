import { IJsonSchema, OpenAPIV2 } from 'openapi-types';
import { getNamespaceRef, refToInterface } from '../../utils/transfer';
import { baseType, UnknownType } from '../../types';

export function parseBaseType(type: string | string[]) {
  if (type === 'integer') return 'number';
  if (type === 'file') return 'FormData';
  if (type === 'array') return 'unknown';
  if (typeof type === 'string' && baseType.includes(type)) return type;
  return UnknownType.key;
}

export function parseType(
  type: string | string[],
  properties: {
    [name: string]: OpenAPIV2.SchemaObject | IJsonSchema;
  },
  namespace_tag: string,
) {
  if (type === 'object') {
    let res = ``;
    Object.keys(properties).forEach((name) => {
      const data = properties[name];
      let description = '';
      if ('description' in data) {
        description = data.description;
      }
      const type = transferSchema(data, namespace_tag);
      if (type) {
        res += `${name}: ${transferSchema(data, namespace_tag)}; ${description ? `// ${description}` : ''} \n`;
      }
    });

    return res;
  }

  return parseBaseType(type);
  // return UnknownType.key;
}

export function transferAdditionalPropertiesSchemaObject(
  type: string | string[],
  properties: boolean | IJsonSchema,
  namespace_tag: string,
) {
  if (typeof properties === 'boolean') return UnknownType.key;

  if (type === 'array') {
    const type = transferSchema(properties, namespace_tag);
    return `${type}[]`;
  }
  if (type === 'object') {
    return transferSchema(properties, namespace_tag);
  }
  return parseBaseType(type);
}

export function transferSchemaObject(
  schema: OpenAPIV2.SchemaObject | IJsonSchema,
  namespace_tag: string,
) {
  if ('additionalProperties' in schema) {
    return transferAdditionalPropertiesSchemaObject(
      schema.type,
      schema.additionalProperties,
      namespace_tag,
    );
  }
  if (schema.type === 'array') {
    const type = transferSchema(schema.items, namespace_tag);

    return `${type}[]`;
  }
  if (schema.enum) {
    return schema.enum.reduce((prev, curr) => {
      if (prev) return `${prev} | "${curr}"`;
      return `"${curr}"`;
    }, '');
  }
  return parseType(schema.type, schema.properties, namespace_tag);
}

export function transferSchema(
  schema: OpenAPIV2.ReferenceObject | OpenAPIV2.SchemaObject | IJsonSchema,
  namespace_tag: string,
) {
  if ('$ref' in schema) {
    return getNamespaceRef(namespace_tag, refToInterface(schema.$ref));
  }
  return transferSchemaObject(schema, namespace_tag);
}
