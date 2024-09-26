import { createTem } from '../utils/createTem';
import { IJsonSchema, OpenAPIV2 } from 'openapi-types';
import { baseType, TransferResult, UnknownType } from '../types';
import {
  transferPathToName,
  transferPathParse,
  refToInterface,
  transferSchemaToType,
} from '../utils/transfer';

export const namespace = 'SwaggerV2';
export const namespace_tag = `${namespace}Api`;

export const transformV2 = (doc: OpenAPIV2.Document): TransferResult => {
  const requestRes = getRequestApisWithPaths(doc.paths, doc.basePath);

  const swaggerTem = createTem('../template/tag/swagger.md');

  const swaggerRes = swaggerTem.replace({
    tag: namespace_tag,
    body: requestRes,
  });

  const type = getTypeApisWithDefinitions(doc.definitions);

  return {
    api: swaggerRes,
    type,
  };
};

function getRequestApisWithPaths(
  paths: OpenAPIV2.PathsObject,
  basePath?: string,
) {
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
    const method = ele.get ? 'get' : 'post';
    const body = ele[method];

    const { params, arg } = parseParameters(body.parameters);

    const response = parseResponse(body.responses);
    requestRes += requestTem.replace({
      method,
      handle: transferPathToName(key),
      namespace,
      response,
      path: `${basePath ? basePath : ''}${transferPathParse(key)}`,
      params,
      in_path: '', // Will support in the future
      arg,
      summary: `${body.summary} ${body.tags}`,
    });
  });

  return requestRes;
}

function getTypeApisWithDefinitions(definitions: OpenAPIV2.DefinitionsObject) {
  const typeTem = createTem('../template/tag/type.md');

  let schemaRes = '';
  Object.keys(definitions).forEach((key) => {
    const ele = definitions[key];
    const resType = parseSchema(key, ele);

    schemaRes += resType;
  });

  const typeRes = typeTem.replace({
    namespace,
    body: schemaRes,
    base: `${UnknownType.type};`,
  });

  return typeRes;
}

function parseParameters(parameters?: OpenAPIV2.Parameters) {
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
  Object.keys(parameters).forEach((key) => {
    const parameter: OpenAPIV2.GeneralParameterObject = parameters[key];

    paramsType += `${parameter.name}${
      parameter.required ? '' : '?'
    }: ${parametersToTypeof(parameter)}; ${
      parameter.description ? `// ${parameter.description}` : ''
    }\n `;
  });

  return {
    arg: `params: {${paramsType}}`,
    params: `params`,
  };
}

function parseResponse(responses: OpenAPIV2.ResponsesObject) {
  const res: OpenAPIV2.Response = responses.default || responses[200];

  if ((res as OpenAPIV2.ReferenceObject).$ref) {
    return refToInterface((res as OpenAPIV2.ReferenceObject).$ref);
  }
  const schema = (res as OpenAPIV2.ResponseObject).schema;

  if ((schema as OpenAPIV2.SchemaObject).$ref) {
    return refToInterface((schema as OpenAPIV2.SchemaObject).$ref);
  }

  if ((schema as OpenAPIV2.SchemaObject).allOf) {
    let res_type = '';
    const allOf = (schema as OpenAPIV2.SchemaObject).allOf;
    allOf.forEach((item) => {
      if (item.properties?.data) {
        if (item.properties.data.type === 'array') {
          if ((item.properties.data.items as IJsonSchema)?.$ref) {
            res_type = `${refToInterface(
              (item.properties.data.items as IJsonSchema).$ref,
            )}[]`;
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
  return UnknownType.key;
}

function getParamsParametersItem(
  _parameter: OpenAPIV2.ReferenceObject | OpenAPIV2.Parameter,
) {
  if (_parameter.$ref) {
    return {
      arg: `params: Api.${namespace}.${refToInterface(_parameter.$ref)}`,
      params: 'params',
    };
  }
  if ((_parameter as OpenAPIV2.InBodyParameterObject).schema?.$ref) {
    const parameter = _parameter as OpenAPIV2.InBodyParameterObject;
    return {
      // arg: `${parameter.name}: Api.Swagger.${refToInterface(
      //   parameter.schema.$ref,
      // )}`,
      // params: parameter.name,
      arg: `params: Api.${namespace}.${refToInterface(parameter.schema.$ref)}`,
      params: 'params',
    };
  }

  const parameter = _parameter as OpenAPIV2.GeneralParameterObject;

  return {
    arg: `${parameter.name}: ${parametersToTypeof(parameter)}`,
    params: `{${parameter.name}}`,
  };
}

function parseType(type: string) {
  if (type === 'integer') return 'number';
  if (type === 'file') return 'FormData';
  if (type === 'object') return 'Record<string, unknown>';
  if (baseType.includes(type)) return type;
  return 'unknown';
}

function parametersToTypeof(parameter: OpenAPIV2.GeneralParameterObject) {
  if (parameter?.$ref) {
    return `Api.${namespace}.${refToInterface(parameter.$ref)}`;
  }
  if (parameter.type === 'array') {
    if (parameter?.items?.$ref) {
      return `Api.${namespace}.${refToInterface(parameter.items.$ref)}`;
    }
    return `${parseType((parameter.items as OpenAPIV2.ItemsObject).type)}[]`;
  }
  return parseType(parameter.type);
}

function parseSchema(key: string, schema: OpenAPIV2.SchemaObject) {
  let paramsType = `\n `;
  Object.keys(schema.properties).forEach((key) => {
    const parameter: OpenAPIV2.SchemaObject = schema.properties[key];
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
    )} = ${parametersToTypeofByParameter(schema)}
  `;
  }
  return `
    interface ${transferSchemaToType(key).replace(/-/g, '_')} {
      ${paramsType}
    }
  `;
}

function parametersToTypeofByParameter(prop?: OpenAPIV2.SchemaObject) {
  const type = prop?.type;
  const item = prop?.items;
  if (prop?.$ref) {
    return refToInterface(prop?.$ref);
  }
  if (type === 'integer') return 'number';
  if (type === 'array') {
    const _item = item as OpenAPIV2.ItemsObject;
    if (item?.$ref) {
      return `${refToInterface(item?.$ref)}[]`;
    }

    const sub_item = _item?.items as OpenAPIV2.ItemsObject;
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
