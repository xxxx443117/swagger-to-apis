import { OpenAPIV2 } from 'openapi-types';
import { UnknownType } from '../../types';
import { refToInterface } from '../../utils/transfer';
import { isGenericSchemaKey } from './utils';

/** 从 $ref 中取 definition key, 如 #/definitions/response.PageResult -> response.PageResult */
function getRefKey(ref: string): string {
  return ref.split('/').pop() || '';
}

/** 如果 ref 指向泛型 definition, 返回 RefName<Unknown>; 否则返回原始名 */
function resolveRef(ref: string): string {
  const key = refToInterface(ref);
  if (isGenericSchemaKey(getRefKey(ref))) {
    return `${key}<${UnknownType.key}>`;
  }
  return key;
}

export const transferResponse = (responses: OpenAPIV2.ResponsesObject) => {
  const res: OpenAPIV2.Response = responses.default || responses[200];

  if (!res) return UnknownType.key;

  if ('$ref' in res) {
    return resolveRef(res.$ref);
  }

  if (res.schema) {
    if ('$ref' in res.schema) {
      return resolveRef(res.schema.$ref);
    }

    if (res.schema.allOf) {
      let res_type = '';
      const allOf = res.schema.allOf;
      allOf.forEach(item => {
        if (item.properties?.data) {
          const data = item.properties.data;

          // data 自身是 allOf: 泛型合并模式 (如 PageResult + 具体 list 类型)
          if ('allOf' in data && Array.isArray((data as { allOf: unknown[] }).allOf)) {
            let baseRef = '';
            let itemRef = '';
            const dataAllOf = (data as { allOf: Record<string, unknown>[] }).allOf;
            for (const raw of dataAllOf) {
              const dataItem = raw as Record<string, unknown>;
              if (dataItem.$ref && typeof dataItem.$ref === 'string') {
                baseRef = refToInterface(dataItem.$ref);
              }
              const props = dataItem.properties as Record<string, unknown> | undefined;
              const list = props?.list as Record<string, unknown> | undefined;
              const items = list?.items as Record<string, unknown> | undefined;
              if (items?.$ref && typeof items.$ref === 'string') {
                itemRef = refToInterface(items.$ref);
              }
            }
            if (baseRef) {
              res_type = itemRef ? `${baseRef}<${itemRef}>` : `${baseRef}<${UnknownType.key}>`;
            }
          } else if (data.type === 'array') {
            if ('$ref' in data.items) {
              res_type = `${refToInterface(data.items.$ref)}[]`;
            } else {
              res_type = `${UnknownType.key}[]`;
            }
          } else if ('$ref' in data) {
            res_type = resolveRef(data.$ref);
          }
        }
      });

      return res_type || UnknownType.key;
    }
  }

  return UnknownType.key;
};
