"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSchema = exports.parseParameters = exports.parseRequestBody = exports.parametersToTypeofByParameter = exports.parametersToTypeof = exports.responseToInterface = exports.refToInterface = exports.transferSchemaToType = exports.transferPathToType = exports.transferPathParse = exports.transferPathToVar = void 0;
const types_1 = require("./types");
const transferPathToVar = (path) => {
    return path.replace(/[/-]/g, '_').split(':')[0].split('{')[0];
};
exports.transferPathToVar = transferPathToVar;
const transferPathParse = (path) => {
    return path.split(':')[0].split('{')[0];
};
exports.transferPathParse = transferPathParse;
const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('');
const transferPathToType = (path) => {
    const arr = path.split('/');
    return arr.reduce((prev, curr) => {
        return prev + firstUpperCase(curr);
    }, '');
};
exports.transferPathToType = transferPathToType;
const transferSchemaToType = (path) => {
    const arr = path.split('.');
    return arr
        .reduce((prev, curr) => {
        return prev + firstUpperCase(curr);
    }, '')
        .replace(/-/g, '_');
};
exports.transferSchemaToType = transferSchemaToType;
const refToInterface = (ref) => {
    if (!ref)
        return 'unknow';
    const temp = ref === null || ref === void 0 ? void 0 : ref.split('/');
    return (0, exports.transferSchemaToType)(temp[temp.length - 1]);
};
exports.refToInterface = refToInterface;
const responseToInterface = (response) => {
    const ref = response[200].content['application/json'].schema.$ref;
    if (ref) {
        return (0, exports.refToInterface)(ref);
    }
    return 'unknow';
};
exports.responseToInterface = responseToInterface;
const parametersToTypeof = (type, item) => {
    var _a, _b;
    if (type === 'integer')
        return 'number';
    if (type === 'array') {
        if ((_a = item === null || item === void 0 ? void 0 : item.items) === null || _a === void 0 ? void 0 : _a.$ref) {
            return (0, exports.refToInterface)((_b = item === null || item === void 0 ? void 0 : item.items) === null || _b === void 0 ? void 0 : _b.$ref);
        }
        if (item === null || item === void 0 ? void 0 : item.$ref) {
            return (0, exports.refToInterface)(item === null || item === void 0 ? void 0 : item.$ref);
        }
        return `${(0, exports.parametersToTypeof)(item.type)}[]`;
    }
    if (type === 'object')
        return 'Record<string, unknown>';
    if (types_1.baseType.includes(type))
        return type;
    return 'unknown';
};
exports.parametersToTypeof = parametersToTypeof;
const parametersToTypeofByParameter = (prop) => {
    var _a, _b;
    const type = prop === null || prop === void 0 ? void 0 : prop.type;
    const item = prop === null || prop === void 0 ? void 0 : prop.items;
    if (prop === null || prop === void 0 ? void 0 : prop.$ref) {
        return (0, exports.refToInterface)(prop === null || prop === void 0 ? void 0 : prop.$ref);
    }
    if (type === 'integer')
        return 'number';
    if (type === 'array') {
        if ((_a = item === null || item === void 0 ? void 0 : item.items) === null || _a === void 0 ? void 0 : _a.$ref) {
            return `${(0, exports.refToInterface)((_b = item === null || item === void 0 ? void 0 : item.items) === null || _b === void 0 ? void 0 : _b.$ref)}[]`;
        }
        if (item === null || item === void 0 ? void 0 : item.$ref) {
            return `${(0, exports.refToInterface)(item === null || item === void 0 ? void 0 : item.$ref)}[]`;
        }
        return `${(0, exports.parametersToTypeof)(item.type)}[]`;
    }
    if (type === 'object')
        return 'Record<string, unknown>';
    if (types_1.baseType.includes(type))
        return type;
    return 'unknown';
};
exports.parametersToTypeofByParameter = parametersToTypeofByParameter;
const getStrByParametersItem = (parameter) => {
    return {
        arg: `${parameter.name}: ${(0, exports.parametersToTypeof)(parameter.schema.type, parameter.schema.items)}`,
        params: `${parameter.name}`,
        pathReq: parameter.in === 'path' ? `\${${parameter.name}}` : '',
    };
};
const parseRequestBody = (requestBody) => {
    if (!requestBody) {
        return {
            reqArg: '',
            reqParams: ``,
        };
    }
    const type = (0, exports.refToInterface)(requestBody.content['application/json'].schema.$ref);
    if (type === 'unknow' &&
        requestBody.content['application/json'].schema.type) {
        const schema = requestBody.content['application/json'].schema;
        let paramsType = `\n `;
        Object.keys(schema.properties).forEach((key) => {
            var _a;
            const parameter = schema.properties[key];
            paramsType += `${key}${schema.required ? (((_a = schema.required) === null || _a === void 0 ? void 0 : _a.includes(key)) ? '' : '?') : ''}: ${(0, exports.parametersToTypeofByParameter)(parameter)}; ${parameter.description ? `// ${parameter.description}` : ''}\n `;
        });
        return {
            reqArg: `req: {${paramsType}}`,
            reqParams: `req`,
        };
    }
    return {
        reqArg: `req: Api.Swagger.${type}`,
        reqParams: `req`,
    };
};
exports.parseRequestBody = parseRequestBody;
const parseParameters = (parameters, requestBody) => {
    const { reqArg, reqParams } = (0, exports.parseRequestBody)(requestBody);
    if (!parameters) {
        return {
            arg: reqArg || '',
            params: reqParams || '',
            pathReq: '',
        };
    }
    if (parameters.length === 1) {
        const { arg, params, pathReq } = getStrByParametersItem(parameters[0]);
        console.log(pathReq);
        return {
            arg: `${arg}${reqArg ? `, ${reqArg}` : ''}`,
            params: `{${params}${reqParams ? `, ...${reqParams}` : ''}}`,
            pathReq,
        };
    }
    if (parameters.length === 2) {
        const { arg: arg0, params: params0, pathReq: path0, } = getStrByParametersItem(parameters[0]);
        const { arg: arg1, params: params1, pathReq: path1, } = getStrByParametersItem(parameters[1]);
        return {
            arg: `${arg0}, ${arg1}${reqArg ? `, ${reqArg}` : ''}`,
            params: `{${params0}, ${params1}${reqParams ? `, ...${reqParams}` : ''}}`,
            pathReq: `${path0}/${path1}`,
        };
    }
    let paramsType = `\n `;
    let pathReq = '';
    Object.keys(parameters).forEach((key) => {
        const parameter = parameters[key];
        if (parameter.in === 'path') {
            pathReq = pathReq
                ? `${pathReq}/\${params.${parameter.name}}`
                : `\${params.${parameter.name}}`;
        }
        paramsType += `${parameter.name}${parameter.required ? '' : '?'}: ${(0, exports.parametersToTypeof)(parameter.schema.type, parameter.schema.items)}; ${parameter.description ? `// ${parameter.description}` : ''}\n `;
    });
    return {
        arg: `params: {${paramsType}}`,
        params: `params`,
        pathReq,
    };
};
exports.parseParameters = parseParameters;
const parseSchema = (key, schema) => {
    let paramsType = `\n `;
    Object.keys(schema.properties).forEach((key) => {
        var _a;
        const parameter = schema.properties[key];
        paramsType += `${key}${schema.required ? (((_a = schema.required) === null || _a === void 0 ? void 0 : _a.includes(key)) ? '' : '?') : ''}: ${(0, exports.parametersToTypeofByParameter)(parameter)}; ${parameter.description ? `// ${parameter.description}` : ''}\n `;
    });
    return `
    interface ${(0, exports.transferSchemaToType)(key).replace(/-/g, '_')} {
      ${paramsType}
    }
  `;
};
exports.parseSchema = parseSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBU2lCO0FBRVYsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO0lBQ2hELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUM7QUFGVyxRQUFBLGlCQUFpQixxQkFFNUI7QUFFSyxNQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDaEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFGVyxRQUFBLGlCQUFpQixxQkFFNUI7QUFFRixNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFTLEVBQUUsRUFBRSxDQUNsRCxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUUvQixNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDL0IsT0FBTyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUMsQ0FBQztB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