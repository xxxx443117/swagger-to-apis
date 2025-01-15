import { OpenAPIV3 } from 'openapi-types';
import { UnknownType } from '../types';

export const transferPathToName = (path: string) => {
  return path.replace(/[/-]/g, '_').split(':')[0].split('{')[0];
};

export const transferPathParse = (path: string, params?: string) => {
  return path
    .replace(/:(\w+)/g, '{$1}')
    .replace(/\{/g, `\${${params ? params + '.' : ''}`);
};

export const checkPathIncludeParams = (path: string) => {
  return path.match(/:(\w+)/g)?.map((item) => item.replace(/:(\w+)/g, '$1'));
};

export const formatPathParams = (params: string[], namespace: string) => {
  return params.reduce(
    (prev, curr) =>
      `${prev}${curr}: ${getNamespaceRef(namespace, UnknownType.key)}, `,
    '',
  );
};

const firstUpperCase = ([first, ...rest]: string) =>
  first.toUpperCase() + rest.join('');

export const transferSchemaToType = (path: string) => {
  const arr = path.split('.');
  return arr
    .reduce((prev, curr) => {
      return prev + firstUpperCase(curr);
    }, '')
    .replace(/-/g, '_');
};

export const refToInterface = (ref: string) => {
  if (!ref) return UnknownType.key;
  const temp = ref?.split('/');
  return transferSchemaToType(temp[temp.length - 1]);
};

export const getHttpMethods = (parameter: {
  [method: string]: unknown;
}): OpenAPIV3.HttpMethods => {
  const keys = Object.values(OpenAPIV3.HttpMethods);

  for (let key = 0; key < keys.length; key++) {
    const element = keys[key];
    if (parameter[element]) return element;
  }
  return OpenAPIV3.HttpMethods.GET;
};

export const getNamespaceRef = (namespace: string, type: string) => {
  return `Api.${namespace}.${type}`;
};
