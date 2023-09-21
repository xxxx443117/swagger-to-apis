"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = exports.STORAGE_SID = void 0;
const axios_1 = require("axios");
const util_1 = require("./util");
exports.STORAGE_SID = 'STORAGE_SID';
const baseURL = '/';
axios_1.default.defaults.timeout = 30 * 1000;
axios_1.default.interceptors.response.use((response) => {
    if (response.data) {
        return response;
    }
    return Promise.reject(response);
}, (error) => {
    return Promise.reject(error.response);
});
class Http {
    async request(configs) {
        let response;
        const SID = localStorage.getItem(exports.STORAGE_SID);
        try {
            response = await (0, axios_1.default)({
                ...configs,
                headers: SID && !configs.ignoreSID
                    ? { ...configs.headers, SID }
                    : configs.headers,
            });
            return response.data;
        }
        catch (e) {
            return e;
        }
    }
    async get(url, params, option = {}) {
        const config = {
            method: 'GET',
            url,
            baseURL,
            params,
            ...option,
        };
        return this.request(config);
    }
    async getOther(otherBaseURL, url, params, option = { ignoreSID: true }) {
        const config = {
            method: 'GET',
            url,
            baseURL: otherBaseURL,
            params,
            ...option,
        };
        return this.request(config);
    }
    async post(url, data, option = {}) {
        const config = {
            method: 'POST',
            url,
            data,
            baseURL,
            ...option,
        };
        return this.request(config);
    }
    static checkSuccess(res) {
        return (0, util_1.isSuccess)(res);
    }
}
exports.Http = Http;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGlzL2h0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWtEO0FBQ2xELGlDQUFtQztBQUV0QixRQUFBLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFPekMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBRXBCLGVBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFFbkMsZUFBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUM3QixDQUFDLFFBQVEsRUFBRSxFQUFFO0lBQ1gsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ2pCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ1IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQ0YsQ0FBQztBQUVGLE1BQWEsSUFBSTtJQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUM7UUFDN0MsSUFBSSxRQUFRLENBQUM7UUFDYixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFXLENBQUMsQ0FBQztRQUU5QyxJQUFJO1lBQ0YsUUFBUSxHQUFHLE1BQU0sSUFBQSxlQUFLLEVBQUM7Z0JBQ3JCLEdBQUcsT0FBTztnQkFDVixPQUFPLEVBQ0wsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7b0JBQ3ZCLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQzdCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTzthQUN0QixDQUFDLENBQUM7WUFDSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDdEI7UUFBQyxPQUFPLENBQVUsRUFBRTtZQUNuQixPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQ1AsR0FBVyxFQUNYLE1BQWdCLEVBQ2hCLFNBQW1DLEVBQUU7UUFFckMsTUFBTSxNQUFNLEdBQTZCO1lBQ3ZDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsR0FBRztZQUNILE9BQU87WUFDUCxNQUFNO1lBQ04sR0FBRyxNQUFNO1NBQ1YsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FDWixZQUFvQixFQUNwQixHQUFXLEVBQ1gsTUFBZ0IsRUFDaEIsU0FBbUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO1FBRXRELE1BQU0sTUFBTSxHQUE2QjtZQUN2QyxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUc7WUFDSCxPQUFPLEVBQUUsWUFBWTtZQUNyQixNQUFNO1lBQ04sR0FBRyxNQUFNO1NBQ1YsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FDUixHQUFXLEVBQ1gsSUFBYyxFQUNkLFNBQW1DLEVBQUU7UUFFckMsTUFBTSxNQUFNLEdBQTZCO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsR0FBRztZQUNILElBQUk7WUFDSixPQUFPO1lBQ1AsR0FBRyxNQUFNO1NBQ1YsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFjO1FBQ2hDLE9BQU8sSUFBQSxnQkFBUyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Q0FDRjtBQXBFRCxvQkFvRUMifQ==