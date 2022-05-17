//当前这个模块, API进行同一管理
import request from "@/api/request";
import request_mock from "@/api/request_mock";
///product/getBaseCategoryList
export const reqCategoryList = ()=>{
    //发请求
   return  request({url:'/product/getBaseCategoryList',method:'get'})
}
//获取banner--Home首页轮播图接口
/*export const reqMockBannerList = ()=>{
   return request_mock({url:'/banner',method:'get'})
}*/
//简写
export const reqMockBannerList = ()=>request_mock.get('/banner')
//获取floor数据
export const reqMockFloorList = ()=>request_mock.get('/floor')
//获取search模块数据, 地址:/api/list  请求方式post, 需要带参数
//当前这个函数需不需要按受外部传递参数
//当前这个接口(获取搜索模块的数据),给服务器传递一个默认参数【至少是一个空对象】
//如reqGetSearchInfo({})
export const reqGetSearchInfo = (params)=>request({url:'/list',method:'post',data:params})
//获取产品详细信息 RUL: /api/item/{skuId} 请求方式get
export const reqGetGoodsDetail=(skuId)=>request.get(`/item/${skuId}`)
//存入购物车(或者更新产品数量)
//URL: /api/cart/addToCart/{skuId}/{skuNum} post
export const reqShopCart = (skuId,skuNum)=>request.post(`/cart/addToCart/${skuId}/${skuNum}`)
/*
* 获取购物车列表接口
* URL: /api/cart/cartList
* method = get
* */
export  const  reqCartList = ()=>request.get('/cart/cartList')
/*删除购物车产品
* URL: /api/cart/deleteCart/${skuId}
* method: DELETE
* */
export const reqDeleteCartById = (skuId)=>request.delete(`/cart/deleteCart/${skuId}`);
/*切换商品选中状态
* URL: /api/cart/checkCart/${skuId}/${isChecked}
* method: get
* */
export const reqUpdateCartChecked = (skuId,isChecked)=>request.get(`/cart/checkCart/${skuId}/${isChecked}`)
/*获取验证码
* URL: /api/user/passport/sendCode/${phone}
* method:get
* */
export const reqGetCode = (phone)=>request.get(`/user/passport/sendCode/${phone}`)
/*注册用户
* URL: /api/user/passport/register
* method: post
* */
export const reqUserRegister=(data)=>request.post(`/user/passport/register`,data)
/*登录
* URL: /api/user/passport/login
* method: post
* */
export const reqUserLogin=(data)=>request.post(`/user/passport/login`,data)
/*通过token获取用户信息
* URL: /api/user/passport/auth/getUserInfo
* method: get, 可通过header传递token
* */
export const reqGetUserInfo=()=>request.get(`/user/passport/auth/getUserInfo`)

/*退出登录
* URL: /api/user/passport/logout
* method: get,
* */
export const reqLogout=()=>request.get(`/user/passport/logout`)

/*获取用户地址信息
* URL:/api/user/userAddress/auth/findUserAddressList
* method: get
* */
export const reqUserAddress = ()=>request.get(`/user/userAddress/auth/findUserAddressList`)

/*获取商品清单
* URL:/api/order/auth/trade
* method: get
* */
export const reqUserOrder = ()=>request.get(`/order/auth/trade`)

/*获取商品清单
* URL:/api/order/auth/submitOrder?tradeNo=${tradeNo}
* method: post
* */
export const reqSubmitOrder = (tradeNo,data)=>request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,data)

/*通过订单号获取支付信息
* URL:/api/payment/weixin/createNative/${orderId}
* method: get
* */
export const reqPayInfo = (orderId)=>request.get(`/payment/weixin/createNative/${orderId}`)

/*通过订单号获取支付信息
* URL:/api/payment/weixin/queryPayStatus/${orderId}
* method: get
* */
export const reqPayStatus = (orderId)=>request.get(`/payment/weixin/queryPayStatus/${orderId}`)

/*通过我的订单数据
* URL:/api/order/auth/${page}/${limit}
* method: get
* */
export const reqMyOrders = (page,limit)=>request.get(`/order/auth/${page}/${limit}`)
