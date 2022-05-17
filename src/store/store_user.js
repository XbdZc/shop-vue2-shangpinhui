/*登录注册共用仓库*/
import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogout} from "@/api";
const state = {
    code:'',
    token:localStorage.getItem("TOKEN"),
    userInfo:{}
};

//action: 处理action, 可以写业务逻辑, 也可以处理异步
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result =  await reqGetCode(phone)
        if (result.code==200){
            commit('GETCODE',result.data);
            return 'ok'
        }else {
            return Promise.reject(new Error('getCode:',result.message));
        }
    },
    //用户注册,无返回值
    async userRegister(_,data){
        console.log('reg--action')
        let result =  await reqUserRegister(data)
        console.log(result)
        if (result.code==200){
            return 'ok'
        }else {
            return Promise.reject(new Error(result.message))
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if (result.code===200){
            //登录成功存储token
            commit('USERLOGIN',result.data.token);
            //持久化存储token
            localStorage.setItem("TOKEN",result.data.token)
        }else {
            return  Promise.reject(new Error(result.message))
        }
    },
    //通过token获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo();
        if (result.code===200){
            //存储用户信息
            commit('GETUSERINFO',result.data);
        }else {
            return  Promise.reject(new Error(result.message))
        }
    },
    //通过token获取用户信息
    async logout({commit}){
        let result = await reqLogout();
        console.log('logout',result)
        if (result.code===200){
            //清除仓库中的用户信息(action不直接操作state, 交给mutation操作)
            commit('CLEAR');
        }else {
            return  Promise.reject(new Error(result.message))
        }
    },
};
//mutations: 修改state的唯一手段
const mutations = {
    GETCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,value){
        state.token = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    CLEAR(state){
        //把仓库中user信息清空
        state.token = '';
        state.userInfo = {};
        //清除本地token
        localStorage.removeItem('TOKEN')
    }
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
