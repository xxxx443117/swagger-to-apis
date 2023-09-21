"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerApi = void 0;
const http_1 = require("../http");
class SwaggerApi extends http_1.Http {
    // 获取开盲盒规则 nft
    async get_api_nft_blindBoxRules(productId) {
        return this.get(`/api/nft/blindBoxRules`, { productId });
    }
    // 获取nft1155转账日志 nft
    async get_api_nft_log1155(params) {
        return this.get(`/api/nft/log1155`, params);
    }
    // 获取nft721转账日志 nft
    async get_api_nft_log721(params) {
        return this.get(`/api/nft/log721`, params);
    }
    // 获取nft1155列表 nft
    async get_api_nft_nft1155(params) {
        return this.get(`/api/nft/nft1155`, params);
    }
    // 获取nft721列表 nft
    async get_api_nft_nft721(params) {
        return this.get(`/api/nft/nft721`, params);
    }
    // 获取nft详情 nft
    async get_api_nft_nft721_(id) {
        return this.get(`/api/nft/nft721/{id}${id}`, { id });
    }
    // 开启盲盒 nft
    async post_api_nft_openBlindBox(req) {
        return this.post(`/api/nft/openBlindBox`, req);
    }
    // 获取nft产品信息 nft
    async get_api_nft_product(params) {
        return this.get(`/api/nft/product`, params);
    }
    // 获取公告 文章
    async get_api_noauth_article_announcemen(params) {
        return this.get(`/api/noauth/article/announcemen`, params);
    }
    // 获取公告详情 文章
    async get_api_noauth_article_announcemen_(id) {
        return this.get(`/api/noauth/article/announcemen/{id}${id}`, { id });
    }
    // 获取nft产品信息 nft
    async get_api_noauth_nft_product(params) {
        return this.get(`/api/noauth/nft/product`, params);
    }
    // 验证图形验证码 用户
    async get_api_noauth_v1_user_checkVerifyCaptcha(Dots, Key) {
        return this.get(`/api/noauth/v1/user/checkVerifyCaptcha/`, { Dots, Key });
    }
    // 获取图形验证码 用户
    async get_api_noauth_v1_user_getVerifyCaptcha(Phone) {
        return this.get(`/api/noauth/v1/user/getVerifyCaptcha`, { Phone });
    }
    // 根据手机号获取验证码 用户
    async post_api_noauth_v1_user_getVerifyCode(type, req) {
        return this.post(`/api/noauth/v1/user/getVerifyCode${type}`, {
            type,
            ...req,
        });
    }
    // 用户手机号登录 用户
    async post_api_noauth_v1_user_signIn(req) {
        return this.post(`/api/noauth/v1/user/signIn`, req);
    }
    // 上传用户步数 游戏
    async post_api_sing_v1_game_uploadUserStep(req) {
        return this.post(`/api/sing/v1/game/uploadUserStep`, req);
    }
    // 获取邀请码 用户
    async get_api_v1_user_getReferralInfo(Id) {
        return this.get(`/api/v1/user/getReferralInfo`, { Id });
    }
    // 获取用户信息 用户
    async get_api_v1_user_getUserInfo(Id, Password) {
        return this.get(`/api/v1/user/getUserInfo/`, { Id, Password });
    }
    // 我的钱包 用户
    async get_api_v1_user_getWalletInfo() {
        return this.get(`/api/v1/user/getWalletInfo`);
    }
    // 设置或修改密码 用户
    async post_api_v1_user_modifyPwd(req) {
        return this.post(`/api/v1/user/modifyPwd`, req);
    }
    // 用户手机号退出登录 用户
    async get_api_v1_user_signOut(params) {
        return this.get(`/api/v1/user/signOut`, params);
    }
    // 修改用户信息 用户
    async post_api_v1_user_updateUser(req) {
        return this.post(`/api/v1/user/updateUser`, req);
    }
    // 易宝账号登录 用户
    async post_api_v1_user_yeepay_login(req) {
        return this.post(`/api/v1/user/yeepay/login`, req);
    }
    // 易宝账号注册 用户
    async post_api_v1_user_yeepay_register(req) {
        return this.post(`/api/v1/user/yeepay/register`, req);
    }
}
exports.SwaggerApi = SwaggerApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpcy9zd2FnZ2VyL3N3YWdnZXIuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUErQjtBQUUvQixNQUFhLFVBQVcsU0FBUSxXQUFJO0lBQ2xDLGNBQWM7SUFDZCxLQUFLLENBQUMseUJBQXlCLENBQzdCLFNBQWlCO1FBSWpCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFPekI7UUFDQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG1CQUFtQjtJQUNuQixLQUFLLENBQUMsa0JBQWtCLENBQUMsTUFReEI7UUFDQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGtCQUFrQjtJQUNsQixLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFPekI7UUFDQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixLQUFLLENBQUMsa0JBQWtCLENBQUMsTUFPeEI7UUFDQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGNBQWM7SUFDZCxLQUFLLENBQUMsbUJBQW1CLENBQ3ZCLEVBQVU7UUFFVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsV0FBVztJQUNYLEtB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