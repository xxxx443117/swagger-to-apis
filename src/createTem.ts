import fs = require('fs');
import path = require('path');

class Template {
  constructor(_value: string) {
    this.value = _value;
  }
  value: string;

  replace(re: Record<string, string>) {
    let res = this.value;
    if (re) {
      Object.keys(re).forEach((key) => {
        res = res.replace(new RegExp(`\\$${key}`, 'g'), re[key]);
      });
    }
    return res;
  }
}

export const createTem = async (
  _path: string,
  // template?: Record<string, string>,
) => {
  const fsPath = path.resolve(__dirname, _path);
  const _data = await fs.readFileSync(fsPath);

  let dataStr = _data.toString();

  dataStr = dataStr.replace('```ts', '').replace('```', '');

  return new Template(dataStr);
};
