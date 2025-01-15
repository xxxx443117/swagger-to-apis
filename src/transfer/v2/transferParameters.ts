import { OpenAPIV2 } from 'openapi-types';
import { getNamespaceRef, refToInterface } from '../../utils/transfer';
import { ALLOWED_PARAMETERS_IN } from '../../types';
import { checkValidVariableName } from '../../utils/tools';
import { parseBaseType, transferSchema } from './utils';

export const transferParameters = (
  parameters: OpenAPIV2.Parameters,
  namespace_tag: string,
) => {
  let in_path = '';
  let params = '';
  let arg = '';

  // 判断是否都是合法变量
  const isValidVariableName = parameters.every((parameter) => {
    if ('$ref' in parameter || !ALLOWED_PARAMETERS_IN.includes(parameter.in)) {
      return false;
    }
    const name = parameter.name;
    return checkValidVariableName(name);
  });

  // 小于等于2个参数 可直接写形参
  if (parameters.length <= 2 && isValidVariableName) {
    const param = transferParameter(parameters[0], namespace_tag);
    if (param.name) {
      arg = `${param.name}${param.required ? '' : '?'}: ${param.type}`;
      in_path = param.path_in ? `/$\{${param.name}}` : '';
      params = param.base_type
        ? `{${param.deconstruction ? '...' : ''}${param.name}}`
        : param.name;
    }
    if (parameters[1]) {
      const param1 = transferParameter(parameters[1], namespace_tag);
      if (param1.name) {
        if (arg) {
          // 必选参数放前面
          if (param1.required) {
            arg = `${param1.name}: ${param1.type}, ${arg}`;
          } else {
            arg = `${arg}, ${param1.name}?: ${param1.type}`;
          }
        } else {
          arg = `${param1.name}${param1.required ? '' : '?'}: ${param1.type}`;
        }
        params = params
          ? `{${param.deconstruction ? '...' : ''}${param.name}, ${param1.deconstruction ? '...' : ''}${param1.name}}`
          : `{ ${param1.deconstruction ? '...' : ''}${param1.name}}`;
        in_path = param.path_in ? `${in_path}/${param.name}` : in_path;
      }
    }

    return {
      arg,
      in_path,
      params,
    };
  }

  let param_obj = '';
  for (let index = 0; index < parameters.length; index++) {
    const parameter = parameters[index];
    const param = transferParameter(parameter, namespace_tag);

    if (param.name) {
      if (param.path_in) {
        in_path = `${in_path}/${param.name}`;
      }
      param_obj = `${param_obj}"${param.name}"${param.required ? '' : '?'}: ${param.type}; ${param.description ? `// ${param.description || ''}` : ''} \n `;
    }
  }

  arg = param_obj ? `params: {${param_obj}}` : '';
  params = param_obj ? `params` : '';

  return {
    arg,
    params_name: 'params',
    in_path,
    params,
  };
};

function transferParameter(
  parameter: OpenAPIV2.ReferenceObject | OpenAPIV2.ParameterObject,
  namespace_tag: string,
) {
  if (
    !parameter ||
    '$ref' in parameter ||
    !ALLOWED_PARAMETERS_IN.includes(parameter.in)
  ) {
    return {
      name: '',
      type: 'unknown',
      path_in: false,
      required: false,
    };
  }

  const name = parameter.name;
  const path_in = parameter.in === 'path';
  if (parameter.schema && '$ref' in parameter.schema) {
    if ('$ref' in parameter.schema) {
      const type = getNamespaceRef(
        namespace_tag,
        refToInterface(parameter.schema.$ref),
      );
      return {
        name,
        path_in,
        type,
        deconstruction: true, // 需要解构
        required: parameter.required,
        description: parameter.description,
      };
    }
    const type = transferSchema(parameter.schema, namespace_tag);

    return {
      name,
      type,
      path_in,
      required: parameter.required,
      description: parameter.description,
    };
  }

  if (parameter.type === 'array' && 'items' in parameter) {
    return {
      name,
      type: `${parameter.items.type}[]`,
      path_in,
      base_type: true,
      required: parameter.required,
      description: parameter.description,
    };
  }
  const type = parseBaseType(parameter.type || parameter.schema?.type);

  return {
    name,
    type,
    path_in,
    base_type: true,
    required: parameter.required,
    description: parameter.description,
  };
}
