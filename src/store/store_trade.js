/*登录注册共用仓库*/
import {reqUserAddress,reqUserOrder} from "@/api";
const state = {
    addressList:[],
    orderList:[]
};

//action: 处理action, 可以写业务逻辑, 也可以处理异步
const actions = {
    //获取用户地址
    async getUserAddress({commit}){
        let result = await reqUserAddress();
        if (result.code===200){
            commit('GETUSERADDRESS',result.data);
        }else {
            return  Promise.reject(new Error('getUserAddress',result.message))
        }
    },
    //获取商品清单
    async getUserOrder({commit}){
        let result = await reqUserOrder();
        if (result.code===200){
            commit('GETUSERORDER',result.data);
        }else {
            return  Promise.reject(new Error('getUserOrder',result.message))
        }
    }
};
//mutations: 修改state的唯一手段
const mutations = {
    GETUSERADDRESS(state,data){
        state.addressList = data
    },
    GETUSERORDER(state,data){
        state.orderList = data
    },
};
//getters:理解为计算属性, 简化仓库数据, 让组件获取仓库数据更加方便
//可以把将来组件中用到的数据简化, 获取的时候就方便些
const getters = {

};
//对外暴露
export default({
    state,
    mutations,
    actions,
    getters,
});
