import { UnknownType } from '../types';

export const transferPathToVar = (path: string) => {
  return path
    .replace(/[/-]/g, '_') // 替换 / 和 - 为 _
    .replace(/{|}/g, '') // 去除大括号 {}
    .split(':') // 按 : 分割字符串
    .join('_'); // 使用 _ 连接分割后的数组
};

export const transferPathParse = (path: string, params?: string) => {
  return path.replace(/:(\w+)/g, '{$1}').replace(/\{/g, `\${${params ? params + '.' : ''}`);
};

export const checkPathIncludeParams = (path: string) => {
  return path.match(/:(\w+)/g)?.map(item => item.replace(/:(\w+)/g, '$1'));
};

export const formatPathParams = (params: string[], namespace: string) => {
  return params.reduce(
    (prev, curr) => `${prev}${curr}: ${getNamespaceRef(namespace, UnknownType.key)}, `,
    ''
  );
};

const firstUpperCase = ([first, ...rest]: string) => first.toUpperCase() + rest.join('');

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

export const getNamespaceRef = (namespace: string, type: string) => {
  return `Api.${namespace}.${type}`;
};
