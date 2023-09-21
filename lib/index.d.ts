interface Options {
    apiUrl?: string;
    assets?: string;
    reslib?: string;
}
declare const SwaggerToApis: ({ apiUrl, assets, reslib }: Options) => Promise<void>;
export default SwaggerToApis;
