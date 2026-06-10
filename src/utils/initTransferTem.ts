import { createTem } from './createTem';
import { saveTem } from './saveTem';
import * as prettier from 'prettier';

export const initTransferTem = async (
  output: string,
  prettierConfig: prettier.Options,
  namespace = 'SwaggerApi',
  dirName = 'apis'
) => {
  const apiTem = createTem('../template/api.api.md');
  const apiRes = apiTem.replace({
    importBody: '',
    body: '',
    namespace
  });
  const formatApi = await prettier.format(apiRes, prettierConfig);

  const apiTypeTem = createTem('../template/api.d.ts.md');
  const apiHttpTem = createTem('../template/http.ts.md');
  const apiIndexTem = createTem('../template/index.ts.md');
  const apiTypesTem = createTem('../template/type.ts.md');
  const apiUtilsTem = createTem('../template/util.ts.md');

  await Promise.all([
    saveTem(`${output}/${dirName}/api.api.ts`, formatApi, { replace: false }),
    saveTem(`${output}/${dirName}/api.d.ts`, apiTypeTem.value, { replace: false }),
    saveTem(`${output}/${dirName}/http.ts`, apiHttpTem.value, { replace: false }),
    saveTem(`${output}/${dirName}/index.ts`, apiIndexTem.value, { replace: false }),
    saveTem(`${output}/${dirName}/type.ts`, apiTypesTem.value, { replace: false }),
    saveTem(`${output}/${dirName}/util.ts`, apiUtilsTem.value, { replace: false })
  ]);
};
