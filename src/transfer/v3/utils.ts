import { OpenAPIV3 } from 'openapi-types';
import { getNamespaceRef, refToInterface } from '../../utils/transfer';
import { baseType, UnknownType } from '../../types';

export function transferMedia(media: OpenAPIV3.MediaTypeObject) {
  // let ref = media.schema?.$ref;
  if ('$ref' in media.schema) {
    return refToInterface(media.schema.$ref);
  }
  return UnknownType.key;
}

export function parseBaseType(type: string) {
  if (type === 'integer') return 'number';
  if (type === 'file') return 'FormData';
  if (type === 'array') return '';
  if (baseType.includes(type)) return type;
  return UnknownType.key;
}

export function parseType(
  type: string,
  properties: {
    [name: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
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

export function transferSchema(
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  namespace_tag: string,
) {
  if ('$ref' in schema) {
    return getNamespaceRef(namespace_tag, refToInterface(schema.$ref));
  }
  return transferSchemaObject(schema, namespace_tag);
}

export function transferAdditionalPropertiesSchemaObject(
  type: 'array' | OpenAPIV3.NonArraySchemaObjectType,
  properties: boolean | OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  namespace_tag: string,
) {
  console.log(type, properties, namespace_tag);
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
  schema: OpenAPIV3.SchemaObject,
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
  return parseType(schema.type, schema.properties, namespace_tag);
}
