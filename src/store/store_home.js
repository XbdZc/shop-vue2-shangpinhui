import {reqCategoryList, reqMockBannerList, reqMockFloorList} from "@/api";
//home模块小仓库
const state = {
    //state数据默认初始值要和服务器返回的类型一致
    categoryList:[],
    bannerList:[],
    floorList:[]
};

//action: 处理action, 可以写业务逻辑, 也可以处理异步
const actions = {
    async categoryList({commit}){
        let  result = await reqCategoryList();
        if (result.code==200){
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){//获取首页轮播图的数据
        let  result = await reqMockBannerList();
        if (result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){//获取floor数据
        let result = await reqMockFloorList();
        if (result.code == 200){
            commit('REQMOCKFLOORLIST',result.data);
        }
    }
};
//mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,value){
        state.categoryList = value
    },
    GETBANNERLIST(state,value){
        state.bannerList = value
    },
    REQMOCKFLOORLIST(state,value){
        state.floorList = value
    }

};
//getters:理解为计算属性, 简化仓库数据, 让组件获取仓库数据更加方便
const getters = {};
//对外暴露
export default({
    state,
    mutations,
    actions,
    getters,
});
