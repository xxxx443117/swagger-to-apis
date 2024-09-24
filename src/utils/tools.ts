export const checkValidVariableName = (name: string) => {
  const regex = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
  return regex.test(name);
};
