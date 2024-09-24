import { OpenAPIV3 } from 'openapi-types';
import { baseType, TransferResult, UnknownType } from '../types';
import { createTem } from '../utils/createTem';
import {
  getHttpMethods,
  refToInterface,
  transferPathParse,
  transferPathToName,
  transferSchemaToType,
} from '../utils/transfer';

export const transformV3 = (doc: OpenAPIV3.Document): TransferResult => {
  const requestRes = getRequestApisWithPaths(doc.paths);

  const swaggerTem = createTem('../template/tag/swagger.md');

  const swaggerRes = swaggerTem.replace({
    tag: namespace_tag,
    body: requestRes,
  });

  const type = getTypeApisWithComponents(doc.components);
  console.log(doc);
  return {
    api: swaggerRes,
    type,
  };
};

export const namespace = 'SwaggerV3';
export const namespace_tag = `${namespace}Api`;

function getRequestApisWithPaths(paths: OpenAPIV3.PathsObject) {
  const requestTem = createTem<{
    method: string;
    handle: string;
    namespace: string;
    response: string;
    path: string;
    params;
    in_path: string;
    arg: string;
    summary: string;
  }>('../template/tag/request.md');

  // async $method$handle($arg): Promise<Api.Response<Api.$namespace.$response>> {
  //   return this.$method(`$path$in_path`, $params);
  // }

  let requestRes = '';

  Object.keys(paths).forEach((key) => {
    const ele = paths[key];
    const method = getHttpMethods(ele);
    // const method = ele.get ? 'get' : 'post';
    const body = ele[method];

    const { params, arg } = parseParameters(body.parameters);

    const response = parseResponse(body.responses);
    requestRes += requestTem.replace({
      method,
      handle: transferPathToName(key),
      namespace,
      response,
      path: `${transferPathParse(key)}`,
      params,
      in_path: '', // Will support in the future
      arg,
      summary: `${body.summary} ${body.tags}`,
    });
  });

  return requestRes;
}

function parseParameters(
  parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
) {
  if (!parameters)
    return {
      params: '',
      arg: '',
    };

  if (parameters.length === 1) {
    const { arg, params } = getParamsParametersItem(parameters[0]);
    return {
      arg,
      params,
    };
  }

  let paramsType = `\n `;
  parameters.forEach((parameter: OpenAPIV3.ParameterObject) => {
    // const parameter: OpenAPIV3.GeneralParameterObject = parameters[key];

    paramsType += `"${parameter.name}"${
      parameter.required ? '' : '?'
    }: ${parseSchema(parameter.schema)}; ${
      parameter.description ? `// ${parameter.description}` : ''
    }\n `;
  });

  return {
    arg: `params: {${paramsType}}`,
    params: `params`,
  };
}

function getParamsParametersItem(
  _parameter: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject,
) {
  let ref = (_parameter as OpenAPIV3.ReferenceObject).$ref;
  if (
    !ref &&
    (
      (_parameter as OpenAPIV3.ParameterObject)
        .schema as OpenAPIV3.ReferenceObject
    )?.$ref
  ) {
    ref = (
      (_parameter as OpenAPIV3.ParameterObject)
        .schema as OpenAPIV3.ReferenceObject
    )?.$ref;
  }

  if (ref) {
    return {
      arg: `params: Api.${namespace}.${refToInterface(ref)}`,
      params: 'params',
    };
  }

  const parameter = _parameter as OpenAPIV3.ParameterObject;

  return {
    arg: `${parameter.name}: ${parseSchema(parameter.schema)}`,
    params: `${parameter.name}`,
    pathReq: parameter.in === 'path' ? `\${${parameter.name}}` : '',
  };
}

function parseResponse(responses: OpenAPIV3.ResponsesObject) {
  if ((responses[200] as OpenAPIV3.ReferenceObject).$ref) {
    return refToInterface((responses[200] as OpenAPIV3.ReferenceObject).$ref);
  }
  const content = (responses[200] as OpenAPIV3.ResponseObject).content;
  const schema = Object.values(content)[0]?.schema;
  return parseSchema(schema);

  // return UnknownType.key;
}

function parseType(type: string) {
  if (type === 'integer') return 'number';
  if (type === 'file') return 'FormData';
  if (type === 'object') return 'Record<string, unknown>';
  if (baseType.includes(type)) return type;
  return 'unknown';
}

const parseSchema = (
  schema?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
) => {
  if (!schema) return UnknownType.key;
  if ((schema as OpenAPIV3.ReferenceObject).$ref) {
    return refToInterface((schema as OpenAPIV3.ReferenceObject).$ref);
  }
  if ((schema as OpenAPIV3.ArraySchemaObject).type === 'array') {
    const _schema = schema as OpenAPIV3.ArraySchemaObject;
    // _schema.items.forEach(item => {
    //   return ''
    // })
    const type = parseSchema(_schema.items);

    return `${type}[]`;
  } else {
    const _schema = schema as OpenAPIV3.NonArraySchemaObject;
    // _schema
    return parseNonArraySchemaObject(_schema);
  }
};

const parseNonArraySchemaObject = (schema: OpenAPIV3.NonArraySchemaObject) => {
  return parseType(schema.type);
  // if (schema.type === 'object') {
  //   return '';
  // }
  // return '';
};

function parseSchemaByKey(key: string, schema: OpenAPIV3.SchemaObject) {
  let paramsType = `\n `;
  Object.keys(schema.properties).forEach((key) => {
    const parameter = schema.properties[key] as OpenAPIV3.SchemaObject;
    paramsType += `"${key}"${
      schema.required ? (schema.required?.includes(key) ? '' : '?') : ''
    }: ${parametersToTypeofByParameter(parameter)}; ${
      parameter.description ? `// ${parameter.description}` : ''
    }\n `;
  });
  if (schema.type === 'array') {
    return `type ${transferSchemaToType(key).replace(
      /-/g,
      '_',
    )} = ${parseSchema(schema)}
  `;
  }
  return `
    interface ${transferSchemaToType(key).replace(/-/g, '_')} {
      ${paramsType}
    }
  `;
}

function getTypeApisWithComponents(components: OpenAPIV3.ComponentsObject) {
  const typeTem = createTem('../template/tag/type.md');

  let schemaRes = '';
  const schemas = components.schemas;

  if (schemas) {
    Object.keys(schemas).forEach((key) => {
      const ele = schemas[key];
      const resType = parseSchemaByKey(key, ele);

      schemaRes += resType;
    });
  }
  const typeRes = typeTem.replace({
    namespace,
    body: schemaRes,
    base: `${UnknownType.type};`,
  });
  return typeRes;
}

function parametersToTypeofByParameter(prop?: OpenAPIV3.SchemaObject) {
  const type = prop?.type;
  const item = prop?.items;
  if (prop?.$ref) {
    return refToInterface(prop?.$ref);
  }
  if (type === 'integer') return 'number';
  if (type === 'array') {
    const _item = item as OpenAPIV3.ItemsObject;
    if (item?.$ref) {
      return `${refToInterface(item?.$ref)}[]`;
    }

    const sub_item = _item?.items as OpenAPIV3.ItemsObject;
    if (sub_item?.type === 'array') {
      return `${`${sub_item.format}`?.includes('int') ? 'number' : 'unknow'}[]`;
    }
    if (sub_item?.$ref) {
      return `${refToInterface(sub_item?.$ref)}[]`;
    }

    return `${parseType(_item.type)}[]`;
  }
  if (type === 'object') {
    if (typeof prop?.additionalProperties === 'boolean') {
      //
    } else if (prop?.additionalProperties?.$ref) {
      return `Record<string, ${
        refToInterface(prop?.additionalProperties?.$ref) || 'unknown'
      }>`;
    } else if (prop?.additionalProperties?.type) {
      return `Record<string, ${
        parseType(prop?.additionalProperties?.type as string) || 'unknown'
      }>`;
    }
    // if ()
    return 'Record<string, unknown>';
  }
  if (baseType.includes(type as string)) return type;
  return 'unknown';
}
