import fs = require('fs');
import path = require('path');

interface Options {
  replace?: boolean; // 如果存在原文件 是否替换原文件
}
export const saveTem = async (_path: string, data: string, _option?: Options) => {
  const option = {
    replace: true,
    ...(_option || {})
  };
  const fsPath = path.relative('.', _path);

  const parsedPath = path.parse(fsPath);
  if (!fs.existsSync(parsedPath.dir)) {
    fs.mkdirSync(parsedPath.dir, { recursive: true });
  }
  // replace: false 时跳过已存在的文件, 这是预期行为 (用户用 replace: false 就是要保留旧文件)
  if (!option.replace && fs.existsSync(fsPath)) {
    return;
  }
  await fs.promises.writeFile(fsPath, data);
};
