import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//三级联动组件---全局组件1
import TypeNav from "@/components/TypeNav/TypeNav";
//参数1, 全局组件名, 参数2哪个组件
Vue.component('TypeNav',TypeNav)
//注册轮播图---全局组件2
import Carousel from "@/components/Carousel/Carousel";
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Carousel',Carousel)
//分页器---全局组件3
import Pagination from "@/components/Pagination/Pagination";
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Pagination',Pagination)
//引入路由
import router from './router'
//引入仓库
import store from './store'
//测试
/*import {reqCategoryList} from "@/api";
reqCategoryList()*/
//引入MockServe.js
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入api
import * as API from '@/api'

//按需引入ElementUI
import {Button, MessageBox,Form,FormItem,Input,Select,Col,Row,Checkbox,Footer,Header,Main,Container} from 'element-ui'
Vue.use(Button);//注册全局组件
Vue.use(Form);//注册全局组件
Vue.use(Input);//注册全局组件
Vue.use(Select);//注册全局组件
Vue.use(FormItem);//注册全局组件
Vue.use(Col);//注册全局组件
Vue.use(Row);//注册全局组件
Vue.use(Checkbox);//注册全局组件
Vue.use(Footer);//注册全局组件
Vue.use(Header);//注册全局组件
Vue.use(Main);//注册全局组件
Vue.use(Container);//注册全局组件
//另一种方式,挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//8.4引入图片懒加载
import VueLazyload from 'vue-lazyload';
import gif from '../assets/1.gif';//引入图片
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: gif,
  error:gif,//错误图片
});
//引入自定义插件
import myplugins from '@/plugins/myplugins';
Vue.use(myplugins,{
  name:'upper',//可以传入参数
});
import 'babel-polyfill'
new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库: 组件实例上就会多一个$store属性
  store,
  beforeCreate() {//注册全局时间总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
