export const transferPathToName = (path: string) => {
  return path.replace(/[/-]/g, '_').split(':')[0].split('{')[0];
};

export const transferPathParse = (path: string) => {
  return path.split(':')[0].split('{')[0];
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
  if (!ref) return 'unknow';
  const temp = ref?.split('/');
  return transferSchemaToType(temp[temp.length - 1]);
};
