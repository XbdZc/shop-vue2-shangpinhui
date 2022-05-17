import {reqCartList,reqDeleteCartById,reqUpdateCartChecked} from "@/api";
const state = {
    cartList:[]
};

//action: 处理action, 可以写业务逻辑, 也可以处理异步
const actions = {
    async getCartList({commit}){
        let result = await reqCartList();
        if (result.code===200){
            commit('GETCARTLIST',result.data);
        }
    },
    //http://localhost:8080/api/cart/deleteCart/14
    async deleteCartListById(_,skuId){
        let result = await reqDeleteCartById(skuId);
        if (result.code===200){
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    async updateCartChecked(_, {skuId,isChecked}){
        let result = await reqUpdateCartChecked(skuId,isChecked);
        if (result.code===200){
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //全选购物车,更改产品状态
    updateCheckedAllCart(context, isCheched){
        let cartInfoList = context.getters.cartInfoList;//获取购物车产品列表
        if (cartInfoList.length<1){
            return 'no';//没有数据返回
        }
        let promiseAll = []
        cartInfoList.forEach((cart)=>{
            let check = isCheched?1:0;
            let promise =  context.dispatch('updateCartChecked',{skuId:cart.skuId,isChecked:check});
            //把每一次返回的promise放到数组中
            promiseAll.push(promise)
        });
        //只要所有的promise都成功, 结果为成功, 有一个失败就失败
        return Promise.all(promiseAll)
    },
    //删除全部勾选产品
    deleteAllCheckedCart(context){
        let cartInfoList = context.getters.cartInfoList;//获取购物车产品列表
        if (cartInfoList.length<1){
            return 'no';//没有数据返回
        }
        let promiseAll = []
        cartInfoList.forEach((item)=>{
            if (item.isChecked===1){
               let promise =  context.dispatch('deleteCartListById',item.skuId);
               //把每一次返回的promise放到数组中
               promiseAll.push(promise)
            }
        });
        //只要所有的promise都成功, 结果为成功, 有一个失败就失败
        return Promise.all(promiseAll)
    }

};
//mutations: 修改state的唯一手段
const mutations = {
    GETCARTLIST(state,data){
        state.cartList = data
    }
};
//getters:理解为计算属性, 简化仓库数据, 让组件获取仓库数据更加方便
//可以把将来组件中用到的数据简化, 获取的时候就方便些
const getters = {
    cartInfoList(state){
       return state.cartList.length>0?state.cartList[0].cartInfoList : [] ;
    }
};
//对外暴露
export default({
    state,
    mutations,
    actions,
    getters,
});
