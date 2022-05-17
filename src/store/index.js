import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
//引入小仓库
import store_home from "@/store/store_home";
import store_search from "@/store/store_search";
import store_detail from "@/store/store_detail";
import store_shopcart from "@/store/store_shopcart";
import store_user from "@/store/store_user";
import store_trade from "@/store/store_trade";
//对外暴露
export default new Vuex.Store({
    //导入模块
    modules:{
        store_search,
        store_home,
        store_detail,
        store_shopcart,
        store_user,
        store_trade
    }
});
