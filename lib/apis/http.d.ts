import { AxiosRequestConfig } from 'axios';
export declare const STORAGE_SID = "STORAGE_SID";
interface AxiosRequestConfigCustom extends AxiosRequestConfig {
    hideHttpError?: boolean;
    ignoreSID?: boolean;
}
export declare class Http {
    request(configs: AxiosRequestConfigCustom): Promise<any>;
    get(url: string, params?: unknown, option?: AxiosRequestConfigCustom): Promise<any>;
    getOther(otherBaseURL: string, url: string, params?: unknown, option?: AxiosRequestConfigCustom): Promise<any>;
    post(url: string, data?: unknown, option?: AxiosRequestConfigCustom): Promise<any>;
    static checkSuccess(res: Api.Error): boolean;
}
export {};
