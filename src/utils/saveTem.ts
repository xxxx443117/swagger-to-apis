import fs = require('fs');
import path = require('path');

interface Options {
  replace?: boolean; // 如果存在原文件 是否替换原文件
}
export const saveTem = async (
  _path: string,
  data: string,
  _option?: Options,
) => {
  const option = {
    replace: true,
    ...(_option || {}),
  };
  const fsPath = path.relative('.', _path);

  const parsedPath = path.parse(fsPath);
  if (!fs.existsSync(parsedPath.dir)) {
    fs.mkdirSync(parsedPath.dir, { recursive: true });
  }
  if (!option.replace && fs.existsSync(fsPath)) {
    console.log(`file i exists: ${_path}`);
    return;
  }
  fs.writeFile(fsPath, data, (error) => {
    console.log(error);
  });
  // const _data = await fs.readFileSync(fsPath);
};
