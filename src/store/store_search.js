import {reqGetSearchInfo} from "@/api";

const state = {
    searchInfo: {}
};

//action: 处理action, 可以写业务逻辑, 也可以处理异步
const actions = {
    async getSearchList({commit},params={}){
        //调用api中reqGetSearchInfo函数时至少传递一个参数
        //params形参, 是用户派发action时, 第二个参数传过来的
        let result =  await reqGetSearchInfo(params);
        // console.log(result)
        if (result.code===200){
            commit('GETSEARCHLIST',result.data)
        }
    }
};
//mutations: 修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,value){
        // console.log(state,value)
        state.searchInfo = value
    }
};
//getters:理解为计算属性, 简化仓库数据, 让组件获取仓库数据更加方便
//可以把将来组件中用到的数据简化, 获取的时候就方便些
const getters = {
    //当前形参state相当于当前仓库的state
    goodsList(state) {
        //如果没有网络goodsList返回是undefined,所以以防万一返回空数组[]
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    attrsList(state) {
        return state.searchInfo.attrsList || []
    },
    getTotal(state){
        return state.searchInfo.total;
    }
};
//对外暴露
export default({
    state,
    mutations,
    actions,
    getters,
});
