//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'
//使用插件
Vue.use(VueRouter)
//配置路由
//引入routes
import routes from "@/router/routes";
//先把vueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;
//重写push | replace
//第一个参数:告诉原来push方法,你往哪里跳转(传递哪些参数)
//二:成功的回调,   三: 失败的回调
VueRouter.prototype. push = function(location, resolve, reject){
    if(resolve && reject){
        //call] |apply区别
        //相同点,都可以调用函数一次,都可以算改函数的上下文一次
        //不同点: call与apply传递参数: cal1传递参数用逗号隔开, apply方法执行,传递数组
        originPush.call(this, location,resolve, reject);
    }else {
        originPush.call(this, location, ()=>{}, ()=>{});
    }
}
VueRouter.prototype.replace = function (location,resolve,reject){
    if (resolve && reject){
        orginReplace.call(this,location,resolve,reject);
    }else {
        orginReplace.call(this,location,()=>{},()=>{})
    }
}

let router= new VueRouter({
    mode:'history',
    //配置路由
    routes,
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { y: 0 }//这里只关心纵向位置, 只留Y即可
    }
})
/*全局前置守卫,  在路由跳转之前拦截
*  to: 获取跳转的路由信息
*  from: 从哪个路由来的信息
*  next: 放行函数
*       next()直接放行
*       next('/login')---放行到指定路由
*       next(false)   中断当前导航, 重置到 from路由地址
* */
router.beforeEach(async (to, from, next)=>{
    // console.log(to,from,next)
    let token = store.state.store_user.token;
    let name = store.state.store_user.userInfo.name
    let path = to.fullPath
    // console.log(token,name,path)
    if (token ){ //已登录情况
        if (path==='/login'){//不能去login
            alert('您已登录!  重新登录点击退出登录');
            next(from.fullPath)
        }else {//去其他 home-search-detail-shopcart
            if (name){
                next()
            }else {
                try {
                    //没有用户名, 派发action查询用户
                    await store.dispatch('getUserInfo');
                    next()
                }catch (error){
                    //token失效
                    await store.dispatch('logout');
                    alert('身份已失效, 请重新登录')
                    next('/login');
                }
            }
        }
    }else {//未登录情况
        // console.log(to)
        //未登录不能去的地址
        let noPath = ['/center','/trade','/pay'];
        if (noPath.find(item=>path.indexOf(item)!==-1)){
            alert('您还没有登录, 请登录后重试');
            if (path.indexOf('/pay')===0){ //不保存pay页面
                next('/login');
                return
            }
            //将上次点击的页面保存参数传给login
            next('/login'+'?redirect='+to.path);
        }else {
            next()
        }
    }
})


export default router
