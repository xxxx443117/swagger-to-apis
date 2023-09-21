import { Http } from '../http';

export class SwaggerApi extends Http {
  // 获取开盲盒规则 nft
  async get_api_nft_blindBoxRules(
    productId: number,
  ): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiNftV1ListBlindBoxRulesRes>
  > {
    return this.get(`/api/nft/blindBoxRules`, { productId });
  }

  // 获取nft1155转账日志 nft
  async get_api_nft_log1155(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    fromId?: number;
    toId?: number;
    prodcutId?: number;
    orderType?: number; // 0用户转账  101开盲盒销毁 102升级鞋子销毁 103游戏销毁 104 卖出 210mint 211空投 201开盲盒产出 202升级鞋子产出 203游戏产出 204买入  205销售单撤回
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft1155LogListRes>> {
    return this.get(`/api/nft/log1155`, params);
  }

  // 获取nft721转账日志 nft
  async get_api_nft_log721(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    fromId?: number;
    toId?: number;
    nftId?: number;
    prodcutId?: number;
    orderType?: number; // 0用户转账  101开盲盒销毁 102升级鞋子销毁 103游戏销毁 104 卖出 210mint 211空投 201开盲盒产出 202升级鞋子产出 203游戏产出 204买入  205销售单撤回
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft721LogListRes>> {
    return this.get(`/api/nft/log721`, params);
  }

  // 获取nft1155列表 nft
  async get_api_nft_nft1155(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    ownerId?: number;
    productId?: number; // 产品id
    productCode?: string; // 产品code
    productType?: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft1155ListRes>> {
    return this.get(`/api/nft/nft1155`, params);
  }

  // 获取nft721列表 nft
  async get_api_nft_nft721(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    ownerId?: number;
    productId?: number; // 产品id
    productCode?: string; // 产品code
    productType?: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft721ListRes>> {
    return this.get(`/api/nft/nft721`, params);
  }

  // 获取nft详情 nft
  async get_api_nft_nft721_(
    id: number,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1Nft721DetailRes>> {
    return this.get(`/api/nft/nft721/{id}${id}`, { id });
  }

  // 开启盲盒 nft
  async post_api_nft_openBlindBox(
    req: Api.Swagger.P7_go_serverApiNftV1OpenBlindBoxReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1OpenBlindBoxRes>> {
    return this.post(`/api/nft/openBlindBox`, req);
  }

  // 获取nft产品信息 nft
  async get_api_nft_product(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    productType?: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
    productCode?: string; // 产品code
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1NftProductListRes>> {
    return this.get(`/api/nft/product`, params);
  }

  // 获取公告 文章
  async get_api_noauth_article_announcemen(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    type?: number; // announcement类型: 1:公告 2:帮助中心 3.首页弹出
    language?: string; // 语言
  }): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiArticleV1GetAnnouncemenListRes>
  > {
    return this.get(`/api/noauth/article/announcemen`, params);
  }

  // 获取公告详情 文章
  async get_api_noauth_article_announcemen_(
    id: number,
  ): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiArticleV1GetAnnouncemenDetailRes>
  > {
    return this.get(`/api/noauth/article/announcemen/{id}${id}`, { id });
  }

  // 获取nft产品信息 nft
  async get_api_noauth_nft_product(params: {
    page?: number; // 分页号,默认1
    size?: number; // 分页数量,最大20
    productType?: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
    productCode?: string; // 产品code
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiNftV1NftProductListRes>> {
    return this.get(`/api/noauth/nft/product`, params);
  }

  // 验证图形验证码 用户
  async get_api_noauth_v1_user_checkVerifyCaptcha(
    Dots: string,
    Key: string,
  ): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiUserV1CheckVerifyCaptchaRes>
  > {
    return this.get(`/api/noauth/v1/user/checkVerifyCaptcha/`, { Dots, Key });
  }

  // 获取图形验证码 用户
  async get_api_noauth_v1_user_getVerifyCaptcha(
    Phone: string,
  ): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiUserV1GetVerifyCaptchaRes>
  > {
    return this.get(`/api/noauth/v1/user/getVerifyCaptcha`, { Phone });
  }

  // 根据手机号获取验证码 用户
  async post_api_noauth_v1_user_getVerifyCode(
    type: number,
    req: {
      phone: string; // 手机号
      captcha: string; // 验证码
      captcha_id: string; // 验证码id
    },
  ): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiUserV1GetVerificationCodeRes>
  > {
    return this.post(`/api/noauth/v1/user/getVerifyCode${type}`, {
      type,
      ...req,
    });
  }

  // 用户手机号登录 用户
  async post_api_noauth_v1_user_signIn(
    req: Api.Swagger.P7_go_serverApiUserV1GetSignInReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetSignInRes>> {
    return this.post(`/api/noauth/v1/user/signIn`, req);
  }

  // 上传用户步数 游戏
  async post_api_sing_v1_game_uploadUserStep(
    req: Api.Swagger.P7_go_serverApiGameV1UploadUserStepReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiGameV1UploadUserStepRes>> {
    return this.post(`/api/sing/v1/game/uploadUserStep`, req);
  }

  // 获取邀请码 用户
  async get_api_v1_user_getReferralInfo(
    Id: number,
  ): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiUserV1GetReferralInfoRes>
  > {
    return this.get(`/api/v1/user/getReferralInfo`, { Id });
  }

  // 获取用户信息 用户
  async get_api_v1_user_getUserInfo(
    Id: number,
    Password: string,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetUserInfoRes>> {
    return this.get(`/api/v1/user/getUserInfo/`, { Id, Password });
  }

  // 我的钱包 用户
  async get_api_v1_user_getWalletInfo(): Promise<
    Api.Response<Api.Swagger.P7_go_serverApiUserV1GetWalletRes>
  > {
    return this.get(`/api/v1/user/getWalletInfo`);
  }

  // 设置或修改密码 用户
  async post_api_v1_user_modifyPwd(
    req: Api.Swagger.P7_go_serverApiUserV1ModifyPwdReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1ModifyPwdRes>> {
    return this.post(`/api/v1/user/modifyPwd`, req);
  }

  // 用户手机号退出登录 用户
  async get_api_v1_user_signOut(params: {
    phone: string; // 手机号
    code?: string; // 验证码
    password?: string; // 密码
    referralId?: number; // 邀请人Id
  }): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1GetSignOutRes>> {
    return this.get(`/api/v1/user/signOut`, params);
  }

  // 修改用户信息 用户
  async post_api_v1_user_updateUser(
    req: Api.Swagger.P7_go_serverApiUserV1UpdateUserInfoReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1UpdateUserInfoRes>> {
    return this.post(`/api/v1/user/updateUser`, req);
  }

  // 易宝账号登录 用户
  async post_api_v1_user_yeepay_login(
    req: Api.Swagger.P7_go_serverApiUserV1YeepayLoginReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1YeepayLoginRes>> {
    return this.post(`/api/v1/user/yeepay/login`, req);
  }

  // 易宝账号注册 用户
  async post_api_v1_user_yeepay_register(
    req: Api.Swagger.P7_go_serverApiUserV1YeepayRegisterReq,
  ): Promise<Api.Response<Api.Swagger.P7_go_serverApiUserV1YeepayRegisterRes>> {
    return this.post(`/api/v1/user/yeepay/register`, req);
  }
}
