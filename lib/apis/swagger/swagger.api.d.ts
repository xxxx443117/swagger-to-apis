import { Http } from '../http';
export declare class SwaggerApi extends Http {
    get_api_nft_blindBoxRules(productId: number): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1ListBlindBoxRulesRes>>;
    get_api_nft_log1155(params: {
        page?: number;
        size?: number;
        fromId?: number;
        toId?: number;
        prodcutId?: number;
        orderType?: number;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft1155LogListRes>>;
    get_api_nft_log721(params: {
        page?: number;
        size?: number;
        fromId?: number;
        toId?: number;
        nftId?: number;
        prodcutId?: number;
        orderType?: number;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft721LogListRes>>;
    get_api_nft_nft1155(params: {
        page?: number;
        size?: number;
        ownerId?: number;
        productId?: number;
        productCode?: string;
        productType?: number;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft1155ListRes>>;
    get_api_nft_nft721(params: {
        page?: number;
        size?: number;
        ownerId?: number;
        productId?: number;
        productCode?: string;
        productType?: number;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft721ListRes>>;
    get_api_nft_nft721_(id: number): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft721DetailRes>>;
    post_api_nft_openBlindBox(req: Api.Swagger.P7_go_serverApiNftV1OpenBlindBoxReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1OpenBlindBoxRes>>;
    get_api_nft_product(params: {
        page?: number;
        size?: number;
        productType?: number;
        productCode?: string;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1NftProductListRes>>;
    get_api_noauth_article_announcemen(params: {
        page?: number;
        size?: number;
        type?: number;
        language?: string;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiArticleV1GetAnnouncemenListRes>>;
    get_api_noauth_article_announcemen_(id: number): Promise<Api.Response<Api.Swagger.P7_go_serverApiArticleV1GetAnnouncemenDetailRes>>;
    get_api_noauth_nft_product(params: {
        page?: number;
        size?: number;
        productType?: number;
        productCode?: string;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1NftProductListRes>>;
    get_api_noauth_v1_user_checkVerifyCaptcha(Dots: string, Key: string): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1CheckVerifyCaptchaRes>>;
    get_api_noauth_v1_user_getVerifyCaptcha(Phone: string): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetVerifyCaptchaRes>>;
    post_api_noauth_v1_user_getVerifyCode(type: number, req: {
        phone: string;
        captcha: string;
        captcha_id: string;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetVerificationCodeRes>>;
    post_api_noauth_v1_user_signIn(req: Api.Swagger.P7_go_serverApiUserV1GetSignInReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetSignInRes>>;
    post_api_sing_v1_game_uploadUserStep(req: Api.Swagger.P7_go_serverApiGameV1UploadUserStepReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiGameV1UploadUserStepRes>>;
    get_api_v1_user_getReferralInfo(Id: number): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetReferralInfoRes>>;
    get_api_v1_user_getUserInfo(Id: number, Password: string): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetUserInfoRes>>;
    get_api_v1_user_getWalletInfo(): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetWalletRes>>;
    post_api_v1_user_modifyPwd(req: Api.Swagger.P7_go_serverApiUserV1ModifyPwdReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1ModifyPwdRes>>;
    get_api_v1_user_signOut(params: {
        phone: string;
        code?: string;
        password?: string;
        referralId?: number;
    }): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetSignOutRes>>;
    post_api_v1_user_updateUser(req: Api.Swagger.P7_go_serverApiUserV1UpdateUserInfoReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1UpdateUserInfoRes>>;
    post_api_v1_user_yeepay_login(req: Api.Swagger.P7_go_serverApiUserV1YeepayLoginReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1YeepayLoginRes>>;
    post_api_v1_user_yeepay_register(req: Api.Swagger.P7_go_serverApiUserV1YeepayRegisterReq): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1YeepayRegisterRes>>;
}
