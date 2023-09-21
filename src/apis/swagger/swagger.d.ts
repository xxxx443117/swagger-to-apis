declare namespace Api {
  namespace Swagger {
    interface P7_go_serverApiNftV1ListBlindBoxRulesReq {
      productId: number; // nft产品ID
    }

    interface P7_go_serverApiNftV1ListBlindBoxRulesRes {
      list: P7_go_serverInternalModelListBlindBoxRulesItemOutput[]; // 规则
    }

    interface P7_go_serverInternalModelListBlindBoxRulesItemOutput {
      id: number;
      boxProductId: number; // 盲盒nft
      nftProductId: number; // 开出的nft产品id
      total: number; // 可以产出的总数(展示)
      quantityLeft: number; // 剩余产出
      nft1155Amount: number; // 当为nft1155时数量
      nft721Level: number; // 当为nft721时等级
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverApiNftV1Nft1155LogListReq {
      page: number; // 分页号,默认1
      size: number; // 分页数量,最大20
      fromId: number;
      toId: number;
      prodcutId: number;
      orderType: number; // 0用户转账  101开盲盒销毁 102升级鞋子销毁 103游戏销毁 104 卖出 210mint 211空投 201开盲盒产出 202升级鞋子产出 203游戏产出 204买入  205销售单撤回
    }

    interface P7_go_serverApiNftV1Nft1155LogListRes {
      total: number; // 总数
      list: P7_go_serverInternalModelNft1155LogListItemOutput[]; // 列表
    }

    interface P7_go_serverInternalModelNft1155LogListItemOutput {
      id: number;
      fromId: number;
      toId: number;
      toBeforeBalance: number;
      toAfterBalance: number;
      fromBeforeBalance: number;
      fromAfterBalance: number;
      amount: number;
      prodcutId: number;
      orderType: number;
      businessLogId: number;
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverApiNftV1Nft721LogListReq {
      page: number; // 分页号,默认1
      size: number; // 分页数量,最大20
      fromId: number;
      toId: number;
      nftId: number;
      prodcutId: number;
      orderType: number; // 0用户转账  101开盲盒销毁 102升级鞋子销毁 103游戏销毁 104 卖出 210mint 211空投 201开盲盒产出 202升级鞋子产出 203游戏产出 204买入  205销售单撤回
    }

    interface P7_go_serverApiNftV1Nft721LogListRes {
      total: number; // 总数
      list: P7_go_serverInternalModelNft721LogListItemOutput[]; // 列表
    }

    interface P7_go_serverInternalModelNft721LogListItemOutput {
      id: number;
      fromId: number;
      toId: number;
      nftId: number;
      prodcutId: number;
      orderType: number;
      businessLogId: number;
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverApiNftV1Nft1155ListReq {
      page: number; // 分页号,默认1
      size: number; // 分页数量,最大20
      ownerId: number;
      productId: number; // 产品id
      productCode: string; // 产品code
      productType: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
    }

    interface P7_go_serverApiNftV1Nft1155ListRes {
      total: number; // 总数
      list: P7_go_serverInternalModelNft1155ListItemOutput[]; // 列表
    }

    interface P7_go_serverInternalModelNft1155ListItemOutput {
      id: number;
      ownerId: number;
      nftProductId: number;
      balance: number;
      freeze: number;
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverApiNftV1Nft721ListReq {
      page: number; // 分页号,默认1
      size: number; // 分页数量,最大20
      ownerId: number;
      productId: number; // 产品id
      productCode: string; // 产品code
      productType: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
    }

    interface P7_go_serverApiNftV1Nft721ListRes {
      total: number; // 总数
      list: P7_go_serverInternalModelNft721ListItemOutput[]; // 列表
    }

    interface P7_go_serverInternalModelNft721ListItemOutput {
      id: number;
      ownerId: number;
      tokenId: number;
      nftProductId: number; // NFT产品id
      status: number; // 状态 1.正常 2.出售中  3.冻结
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverApiNftV1Nft721DetailReq {
      id: number; // id
    }

    interface P7_go_serverApiNftV1Nft721DetailRes {
      id: number;
      ownerId: number;
      tokenId: number;
      nftProductId: number; // NFT产品id
      status: number; // 状态 1.正常 2.出售中  3.冻结
      Slots: P7_go_serverInternalModelNft721SlotNft1155[]; // 材料插槽
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverInternalModelNft721SlotNft1155 {
      id: number;
      nftId: number; //  nft ID
      slotProductId: number; // NFT产品id
      剩余数量: number;
    }

    interface P7_go_serverApiNftV1OpenBlindBoxReq {
      productId: number; // id
    }

    interface P7_go_serverApiNftV1OpenBlindBoxRes {
      productId: number; // 产出nft产品
      TokenId: number; // nft tokenid(开出鞋子时有值)
      nft721Level: number; // 当为nft721时等级
      Amount: number; // 产生数量(开出材料时有值)
    }

    interface P7_go_serverApiNftV1NftProductListReq {
      page: number; // 分页号,默认1
      size: number; // 分页数量,最大20
      productType: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
      productCode: string; // 产品code
    }

    interface P7_go_serverApiNftV1NftProductListRes {
      total: number; // 总数
      list: P7_go_serverInternalModelNftProductItemOutput[]; // 列表
    }

    interface P7_go_serverInternalModelNftProductItemOutput {
      id: number;
      nftCollectionId: number;
      nftCollectionTitle: string; // nft集合名称
      authorId: number; // 作者Id
      publisherId: number; // 发布者id
      authorName: string; // 作者名称
      publisherName: string; // 发布者名称
      productType: number; // 类型: 10 NFT  20 盲盒 30 材料 40 皮肤
      productCode: string; // 产品code
      isErc721: number; // 是否721 0:否 1:是
      firstPrice: number; // 首发价
      resLink: string; // 图片或者视频链接
      title: string; // 名称
      desc: string; // 描述
      createdAt: number;
      updatedAt: number;
    }

    interface P7_go_serverApiArticleV1GetAnnouncemenListReq {
      page: number; // 分页号,默认1
      size: number; // 分页数量,最大20
      type: number; // announcement类型: 1:公告 2:帮助中心 3.首页弹出
      language: string; // 语言
    }

    interface P7_go_serverApiArticleV1GetAnnouncemenListRes {
      total: number; // 总数
      list: P7_go_serverInternalModelGetAnnouncementItem[]; // 列表
    }

    interface P7_go_serverInternalModelGetAnnouncementItem {
      id: number;
      type: number; // announcement类型: 1:公告 2:帮助中心 3.首页弹出
      language: string; //  语言类型
      title: string; // 标题
      article: string; // 文章
      indexImg: string; // 首页图
      startTime: number; // 开始时间 毫秒
      endTime: number; // 结束 毫秒
      status: number; // 状态
      createdAt: number; // 创建时间 毫秒
      updatedAt: number; // 更新时间 毫秒
    }

    interface P7_go_serverApiArticleV1GetAnnouncemenDetailReq {
      id: number; // id
    }

    interface P7_go_serverApiArticleV1GetAnnouncemenDetailRes {
      id: number;
      type: number; // announcement类型: 1:公告 2:帮助中心 3.首页弹出
      language: string; //  语言类型
      title: string; // 标题
      article: string; // 文章
      indexImg: string; // 首页图
      startTime: number; // 开始时间 毫秒
      endTime: number; // 结束 毫秒
      status: number; // 状态
      createdAt: number; // 创建时间 毫秒
      updatedAt: number; // 更新时间 毫秒
    }

    interface P7_go_serverApiUserV1CheckVerifyCaptchaReq {
      Dots: string;
      Key: string;
    }

    interface P7_go_serverApiUserV1CheckVerifyCaptchaRes {}

    interface P7_go_serverApiUserV1GetVerifyCaptchaReq {
      Phone: string;
    }

    interface P7_go_serverApiUserV1GetVerifyCaptchaRes {
      VerifyCaptchaKey: string;
      ImageBase64: string;
      ThumbBase64: string;
    }

    interface P7_go_serverApiUserV1GetVerificationCodeReq {
      type?: number; // 验证码类型
      phone: string; // 手机号
      captcha: string; // 验证码
      captcha_id: string; // 验证码id
    }

    interface P7_go_serverApiUserV1GetVerificationCodeRes {
      VerifyCode: string;
    }

    interface P7_go_serverApiUserV1GetSignInReq {
      phone: string; // 手机号
      code?: string; // 验证码
      password?: string; // 密码
      referralId?: number; // 邀请人Id
    }

    interface P7_go_serverApiUserV1GetSignInRes {}

    interface P7_go_serverApiGameV1UploadUserStepReq {
      userId?: number; // 用户id
      uploadTime: number; // 上传时间
      setpCount: number; // 步数
      signatureData: number; // 签名数据
    }

    interface P7_go_serverApiGameV1UploadUserStepRes {}

    interface P7_go_serverApiUserV1GetReferralInfoReq {
      Id: number;
    }

    interface P7_go_serverApiUserV1GetReferralInfoRes {
      ReferralCode: string;
    }

    interface P7_go_serverApiUserV1GetUserInfoReq {
      Id: number;
      Password: string;
    }

    interface P7_go_serverApiUserV1GetUserInfoRes {
      id: number; // id
      referralId: number; // id
      level: string; // 等级
      authLv: string; // 实名等级
      phone: string; // 手机号
      avatar: string; // 头像
      email: string; // 邮箱
      nickname: string; // 昵称
      introduction: string; // 简介
    }

    interface P7_go_serverApiUserV1GetWalletReq {}

    interface P7_go_serverApiUserV1GetWalletRes {
      status: boolean; // 开通状态:true-开通,false-未开通
      balanceUrl: string; // 访问地址
    }

    interface P7_go_serverApiUserV1ModifyPwdReq {
      Id: number;
      origPassword: string; // 原密码
      newPassword: string; // 新密码
      repPassword: string; // 重复新密码
    }

    interface P7_go_serverApiUserV1ModifyPwdRes {}

    interface P7_go_serverApiUserV1GetSignOutReq {
      phone: string; // 手机号
      code?: string; // 验证码
      password?: string; // 密码
      referralId?: number; // 邀请人Id
    }

    interface P7_go_serverApiUserV1GetSignOutRes {}

    interface P7_go_serverApiUserV1UpdateUserInfoReq {
      id: number; // id
      phone?: string; // 手机号
      avatar?: string; // 头像
      passwd?: string; // 密码
      email?: string; // 邮箱
      nickname?: string; // 昵称
      introduction?: string; // 简介
    }

    interface P7_go_serverApiUserV1UpdateUserInfoRes {}

    interface P7_go_serverApiUserV1YeepayLoginReq {
      userId: string; // 用户ID
      returnUrl: string; // 钱包首页返回商户页面地址
    }

    interface P7_go_serverApiUserV1YeepayLoginRes {
      code: string; // code
      message: string; // message
      token: string; // token
      url: string; // url 登录或者注册的url
    }

    interface P7_go_serverApiUserV1YeepayRegisterReq {
      userId: string; // 用户ID
      name: string; // 用户姓名
      certificateType: string; // 证件类型: 身份证IDENTITY_CARD, 手机:PHONE
      certificateNo: string; // 身份证号码(身份证号码证件号码和手机号二选一必填）
      mobile: string; // 手机号码(证件号码和手机号二选一必填）
      returnUrl: string; // 钱包首页返回商户页面地址
    }

    interface P7_go_serverApiUserV1YeepayRegisterRes {
      code: string; // code
      message: string; // message
      token: string; // token
      url: string; // url 登录或者注册的url
    }
  }
}
