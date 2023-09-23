"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const prettier = require("prettier");
const createTem_1 = require("./createTem");
const utils_1 = require("./utils");
const saveTem_1 = require("./saveTem");
const prettierConfig = {
    parser: 'babel-ts',
    tabWidth: 2,
    semi: true,
    trailingComma: 'none',
    singleQuote: true,
    printWidth: 100,
    arrowParens: 'avoid',
    bracketSpacing: true,
};
const SwaggerToApis = async ({ apiUrl, assets, reslib }) => {
    let data = null;
    if (apiUrl) {
        // @ts-ignore
        const res = await axios.get(apiUrl);
        data = res.data;
    }
    else {
        data = require(assets);
    }
    const requestTem = await (0, createTem_1.createTem)('./template/tag/request.md');
    let requestRes = '';
    Object.keys(data.paths).forEach((key) => {
        const ele = data.paths[key];
        const method = ele.get ? 'get' : 'post';
        const body = ele[method];
        const { params, arg, pathReq } = (0, utils_1.parseParameters)(body.parameters, body === null || body === void 0 ? void 0 : body.requestBody);
        console.log(pathReq, (0, utils_1.transferPathParse)(key), key);
        requestRes += requestTem.replace({
            method,
            handle: (0, utils_1.transferPathToVar)(key),
            namespace: 'Swagger',
            response: (0, utils_1.responseToInterface)(body.responses),
            path: (0, utils_1.transferPathParse)(key),
            params,
            inPath: pathReq,
            arg,
            summary: `${body.summary} ${body.tags}`,
        });
    });
    const swaggerTem = await (0, createTem_1.createTem)('./template/tag/swagger.md');
    const swaggerRes = swaggerTem.replace({
        tag: 'SwaggerApi',
        body: requestRes,
    });
    const formatSwagger = await prettier.format(swaggerRes, prettierConfig);
    (0, saveTem_1.saveTem)(`${reslib}/apis/swagger/swagger.api.ts`, formatSwagger);
    const typeTem = await (0, createTem_1.createTem)('./template/tag/type.md');
    const { schemas } = data.components;
    let schemaRes = '';
    Object.keys(schemas).forEach((key) => {
        const ele = schemas[key];
        const resType = (0, utils_1.parseSchema)(key, ele);
        schemaRes += resType;
    });
    const typeRes = typeTem.replace({
        namespace: 'Swagger',
        body: schemaRes,
    });
    const formatType = await prettier.format(typeRes, prettierConfig);
    (0, saveTem_1.saveTem)(`${reslib}/apis/swagger/swagger.d.ts`, formatType);
    const apiTem = await (0, createTem_1.createTem)('./template/api.api.md');
    const apiRes = apiTem.replace({
        importBody: '',
        body: '',
    });
    const formatApi = await prettier.format(apiRes, prettierConfig);
    (0, saveTem_1.saveTem)(`${reslib}/apis/api.api.ts`, formatApi);
    const apiTypeTem = await (0, createTem_1.createTem)('./template/api.d.ts.md');
    (0, saveTem_1.saveTem)(`${reslib}/apis/api.d.ts`, apiTypeTem.value);
    const apiHttpTem = await (0, createTem_1.createTem)('./template/http.ts.md');
    (0, saveTem_1.saveTem)(`${reslib}/apis/http.ts`, apiHttpTem.value);
    const apiIndexTem = await (0, createTem_1.createTem)('./template/index.ts.md');
    (0, saveTem_1.saveTem)(`${reslib}/apis/index.ts`, apiIndexTem.value);
    const apiTypesTem = await (0, createTem_1.createTem)('./template/type.ts.md');
    (0, saveTem_1.saveTem)(`${reslib}/apis/type.ts`, apiTypesTem.value);
    const apiUtilsTem = await (0, createTem_1.createTem)('./template/util.ts.md');
    (0, saveTem_1.saveTem)(`${reslib}/apis/util.ts`, apiUtilsTem.value);
    const date = Date();
    console.log('成功啦 !!!               ', date.toLocaleLowerCase());
    console.log('----------------分割线--------------');
    // api.api.md;
};
exports.default = SwaggerToApis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBZ0M7QUFDaEMscUNBQXFDO0FBRXJDLDJDQUF3QztBQUV4QyxtQ0FNaUI7QUFFakIsdUNBQW9DO0FBRXBDLE1BQU0sY0FBYyxHQUFZO0lBQzlCLE1BQU0sRUFBRSxVQUFVO0lBQ2xCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsSUFBSSxFQUFFLElBQUk7SUFDVixhQUFhLEVBQUUsTUFBTTtJQUNyQixXQUFXLEVBQUUsSUFBSTtJQUNqQixVQUFVLEVBQUUsR0FBRztJQUNmLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLGNBQWMsRUFBRSxJQUFJO0NBQ3JCLENBQUM7QUFRRixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBVyxFQUFFLEVBQUU7SUFDbEUsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDO0lBQ3RCLElBQUksTUFBTSxFQUFFO1FBQ1YsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztLQUNqQjtTQUFNO1FBQ0wsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN4QjtJQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSxxQkFBUyxFQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDaEUsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxNQUFNLEdBQUcs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