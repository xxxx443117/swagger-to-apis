import {
  InnerItems,
  ParametersItem,
  PropertiesItem,
  RequestBody,
  Responses,
  SchemasItem,
  Types,
  baseType,
} from './types';

export const transferPathToVar = (path: string) => {
  return path.replace(/[/-]/g, '_').split(':')[0].split('{')[0];
};

export const transferPathParse = (path: string) => {
  return path.split(':')[0].split('{')[0];
};

const firstUpperCase = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join('');

export const transferPathToType = (path: string) => {
  const arr = path.split('/');
  return arr.reduce((prev, curr) => {
    return prev + firstUpperCase(curr);
  }, '');
};

export const transferSchemaToType = (path: string) => {
  const arr = path.split('.');
  return arr
    .reduce((prev, curr) => {
      return prev + firstUpperCase(curr);
    }, '')
    .replace(/-/g, '_');
};

export const refToInterface = (ref: string) => {
  if (!ref) return 'unknow';
  const temp = ref?.split('/');
  return transferSchemaToType(temp[temp.length - 1]);
};

export const responseToInterface = (response: Responses) => {
  const ref = response[200].content['application/json'].schema.$ref;
  if (ref) {
    return refToInterface(ref);
  }
  return 'unknow';
};

export const parametersToTypeof = (type: Types, item?: InnerItems) => {
  if (type === 'integer') return 'number';
  if (type === 'array') {
    if (item?.items?.$ref) {
      return refToInterface(item?.items?.$ref);
    }
    if (item?.$ref) {
      return refToInterface(item?.$ref);
    }
    return `${parametersToTypeof(item.type)}[]`;
  }
  if (type === 'object') return 'Record<string, unknown>';
  if (baseType.includes(type)) return type;
  return 'unknown';
};

export const parametersToTypeofByParameter = (prop?: PropertiesItem) => {
  const type = prop?.type;
  const item = prop?.items;
  if (prop?.$ref) {
    return refToInterface(prop?.$ref);
  }
  if (type === 'integer') return 'number';
  if (type === 'array') {
    if (item?.items?.$ref) {
      return `${refToInterface(item?.items?.$ref)}[]`;
    }
    if (item?.$ref) {
      return `${refToInterface(item?.$ref)}[]`;
    }
    return `${parametersToTypeof(item.type)}[]`;
  }
  if (type === 'object') {
    if (prop?.additionalProperties?.$ref) {
      return `Record<string, ${
        refToInterface(prop?.additionalProperties?.$ref) || 'unknown'
      }>`;
    }
    // if ()
    return 'Record<string, unknown>';
  }
  if (baseType.includes(type)) return type;
  return 'unknown';
};

const getStrByParametersItem = (parameter?: ParametersItem) => {
  return {
    arg: `${parameter.name}: ${parametersToTypeof(
      parameter.schema.type,
      parameter.schema.items,
    )}`,
    params: `${parameter.name}`,
    pathReq: parameter.in === 'path' ? `\${${parameter.name}}` : '',
  };
};

export const parseRequestBody = (requestBody?: RequestBody) => {
  if (!requestBody) {
    return {
      reqArg: '',
      reqParams: ``,
    };
  }
  const type = refToInterface(
    requestBody.content['application/json'].schema.$ref,
  );

  if (
    type === 'unknow' &&
    requestBody.content['application/json'].schema.type
  ) {
    const schema = requestBody.content['application/json'].schema;
    let paramsType = `\n `;
    Object.keys(schema.properties).forEach((key) => {
      const parameter: PropertiesItem = schema.properties[key];
      paramsType += `${key}${
        schema.required ? (schema.required?.includes(key) ? '' : '?') : ''
      }: ${parametersToTypeofByParameter(parameter)}; ${
        parameter.description ? `// ${parameter.description}` : ''
      }\n `;
    });

    return {
      reqArg: `req: {${paramsType}}`,
      reqParams: `req`,
    };
  }
  return {
    reqArg: `req: Api.Swagger.${type}`,
    reqParams: `req`,
  };
};

export const parseParameters = (
  parameters?: ParametersItem[],
  requestBody?: RequestBody,
) => {
  const { reqArg, reqParams } = parseRequestBody(requestBody);
  if (!parameters) {
    return {
      arg: reqArg || '',
      params: reqParams || '',
      pathReq: '',
    };
  }

  if (parameters.length === 1) {
    const { arg, params, pathReq } = getStrByParametersItem(parameters[0]);
    console.log(pathReq);
    return {
      arg: `${arg}${reqArg ? `, ${reqArg}` : ''}`,
      params: `{${params}${reqParams ? `, ...${reqParams}` : ''}}`,
      pathReq,
    };
  }
  if (parameters.length === 2) {
    const {
      arg: arg0,
      params: params0,
      pathReq: path0,
    } = getStrByParametersItem(parameters[0]);
    const {
      arg: arg1,
      params: params1,
      pathReq: path1,
    } = getStrByParametersItem(parameters[1]);
    return {
      arg: `${arg0}, ${arg1}${reqArg ? `, ${reqArg}` : ''}`,
      params: `{${params0}, ${params1}${reqParams ? `, ...${reqParams}` : ''}}`,
      pathReq: `${path0}/${path1}`,
    };
  }

  let paramsType = `\n `;
  let pathReq = '';
  Object.keys(parameters).forEach((key) => {
    const parameter: ParametersItem = parameters[key];
    if (parameter.in === 'path') {
      pathReq = pathReq
        ? `${pathReq}/\${params.${parameter.name}}`
        : `\${params.${parameter.name}}`;
    }
    paramsType += `${parameter.name}${
      parameter.required ? '' : '?'
    }: ${parametersToTypeof(parameter.schema.type, parameter.schema.items)}; ${
      parameter.description ? `// ${parameter.description}` : ''
    }\n `;
  });

  return {
    arg: `params: {${paramsType}}`,
    params: `params`,
    pathReq,
  };
};

export const parseSchema = (key: string, schema: SchemasItem) => {
  let paramsType = `\n `;
  Object.keys(schema.properties).forEach((key) => {
    const parameter: PropertiesItem = schema.properties[key];
    paramsType += `${key}${
      schema.required ? (schema.required?.includes(key) ? '' : '?') : ''
    }: ${parametersToTypeofByParameter(parameter)}; ${
      parameter.description ? `// ${parameter.description}` : ''
    }\n `;
  });

  return `
    interface ${transferSchemaToType(key).replace(/-/g, '_')} {
      ${paramsType}
    }
  `;
};
