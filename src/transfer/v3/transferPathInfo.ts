import { OpenAPIV3 } from 'openapi-types';
import { transferResponse } from './transferResponse';
import { transferRequestBody } from './transferRequestBody';
import { transferParameters } from './transferParameters';
import { UnknownType } from '../../types';
// import { createTem } from '/utils/createTem';

export const transferPathInfo = (
  path_info: OpenAPIV3.OperationObject,
  namespace_tag: string,
) => {
  console.log(path_info, namespace_tag);
  let response = UnknownType.key;
  if (path_info.responses) {
    response = transferResponse(path_info.responses);
  }

  let in_path = '';
  let params = '';
  let arg = '';

  if (path_info.requestBody) {
    const t_res = transferRequestBody(path_info.requestBody, namespace_tag);
    arg = t_res.arg;
    params = t_res.arg;
  }

  if (path_info.parameters) {
    const t_res = transferParameters(path_info.parameters, namespace_tag);
    if (t_res.arg) {
      arg = arg ? `${arg}, ${t_res.arg}` : t_res.arg;
    }
    if (t_res.params) {
      params = params ? `${params}, ${t_res.params}` : t_res.params;
    }
    in_path = t_res.in_path;
  }
  return {
    response,
    params,
    in_path,
    arg,
  };
};