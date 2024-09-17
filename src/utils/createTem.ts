import fs = require('fs');
import path = require('path');

class Template<ReplaceP extends Record<string, string>> {
  constructor(_value: string) {
    this.value = _value;
  }
  value: string;

  replace(re: ReplaceP) {
    let res = this.value;
    if (re) {
      Object.keys(re).forEach((key) => {
        res = res.replace(new RegExp(`\\$${key}`, 'g'), re[key]);
      });
    }
    return res;
  }
}

export const createTem = <T extends Record<string, string>>(_path: string) => {
  const fsPath = path.resolve(__dirname, _path);
  const _data = fs.readFileSync(fsPath);

  let dataStr = _data.toString();

  dataStr = dataStr.replace('```ts', '').replace('```', '');

  return new Template<T>(dataStr);
};
