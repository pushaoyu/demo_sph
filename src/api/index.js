// 当前这个模块:API进行统一管理
import req from '@/api/request'
import mockReq from '@/api/mockAjax'

// 三级联动接口
//  /api/product/getBaseCategoryList    GET请求     无参数
export const reqCategoryList = ()=>req({url:'/product/getBaseCategoryList',method:'get'})

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = ()=>mockReq.get('/banner')

// 获取floor
export const reqGetFloorList = ()=>mockReq.get('/floor')

// 获取search模块数据 传参至少为一个空对象
export const reqGetSearchInfo = (params)=>req({url:'/list',method:'post',data:params})

// 获取商品详情页面的数据 URL:/api/item/{ skuId }   参数:skuId
export const reqGoodsInfo = (skuId)=>req({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中(获取更新某一产品个数)
// /api/cart/addToCart/{ skuId }/{ skuNum }  'post'
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>req({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表接口   /api/cart/cartList      'get'
export const reqCartList = () =>req({url:'/cart/cartList',method:'get'})

// 删除购物车商品请求 /api/cart/deleteCart/{skuId}  'delete'
export const reqDeleteCart = (skuId) => req({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改某个产品的勾选状态接口   /api/cart/checkCart/{skuID}/{isChecked}   get
export const reqUpdateChecked = (skuId,isChecked)=>req({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取注册验证码接口   /api/user/passport/sendCode/{phone}     get
export const getCode = (phone)=>req({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户接口 /api/user/passport/register     post
export const reRegisterUser = (data)=>req({url:'/user/passport/register',data,method:'post'})

// 用户登录接口     /api/user/passport/login       'post'
export const reqUserLogin = (data)=>req({url:`/user/passport/login`,data,method:'post'})

// 获取用户信息(校验token 发送请求携带token参数来获取用户信息) /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>req({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录的接口 /api/user/passport/logout     'get'
export const reqLogOut = ()=>req({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList    get
export const reqUserAddress = ()=>req({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单信息     /api/order/auth/trade       get
export const reqOrderInfo = ()=>req({url:'/order/auth/trade',method:'get'})

// 提交订单接口     /api/order/auth/submitOrder?tradeNo={tradeNo}       post
export const reqSubmitOrder = (tradeNo,data)=>req({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息接口     /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId)=>req({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询订单支付状态     /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId)=>req({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单列表     /api/order/auth/{page}/{limit}      get
export const reqMyOrderList = (page,limit)=>req({url:`/order/auth/${page}/${limit}`,method:'get'})




