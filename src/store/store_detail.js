import {reqGetGoodsDetail,reqShopCart} from "@/api";
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsDetail: {},
    //游客临时身份
    uuid_token:getUUID()
};

//action: 处理action, 可以写业务逻辑, 也可以处理异步
const actions = {
    async getDetail({commit},skuId){//获取产品详情
      let result = await reqGetGoodsDetail(skuId);
      if (result.code===200){
          commit('GETDETAIL',result.data)
      }
    },
    async updateShopCart(_, {skuId, skuNum}){//添加购物车
        let result = await reqShopCart(skuId,skuNum);
        //加入购物车服务器不会返回数据
        //当前函数加上了async数返回Promise
        if (result.code===200){//成功
            return 'ok';
        }else {//失败
            return Promise.reject(new Error('faile'));
        }
    }
};
//mutations: 修改state的唯一手段
const mutations = {
    GETDETAIL(state,data){
        state.goodsDetail =data
    },
    UPDATESHOPCART(state,data){
        state.shopCart = data
    }
};
//getters:理解为计算属性, 简化仓库数据, 让组件获取仓库数据更加方便
//可以把将来组件中用到的数据简化, 获取的时候就方便些
const getters = {
    categoryView(state){
        //计算出来的属性为undefined时至少是一个空对象, 不会报错
        return state.goodsDetail.categoryView || {}
    },
    skuInfo(state){
        return state.goodsDetail.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsDetail.spuSaleAttrList || []
    }
};
//对外暴露
export default({
    state,
    mutations,
    actions,
    getters,
});
