import { InnerItems, ParametersItem, PropertiesItem, RequestBody, Responses, SchemasItem, Types } from './types';
export declare const transferPathToVar: (path: string) => string;
export declare const transferPathParse: (path: string) => string;
export declare const transferPathToType: (path: string) => string;
export declare const transferSchemaToType: (path: string) => string;
export declare const refToInterface: (ref: string) => string;
export declare const responseToInterface: (response: Responses) => string;
export declare const parametersToTypeof: (type: Types, item?: InnerItems) => any;
export declare const parametersToTypeofByParameter: (prop?: PropertiesItem) => string;
export declare const parseRequestBody: (requestBody?: RequestBody) => {
    reqArg: string;
    reqParams: string;
};
export declare const parseParameters: (parameters?: ParametersItem[], requestBody?: RequestBody) => {
    arg: string;
    params: string;
    pathReq: string;
};
export declare const parseSchema: (key: string, schema: SchemasItem) => string;
