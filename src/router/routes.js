//引入路由组件
// import Home from "@/pages/Home/Home";
/*let Home = ()=>{
    return import("@/pages/Home/Home");
}*/
// let Home = ()=> import("@/pages/Home/Home");
/*
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Search from "@/pages/Search/Search";
import Detail from "@/pages/Detail/Detail";
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess'
import ShopCart from '@/pages/ShopCart/ShopCart'
import Trade from "@/pages/Trade/Trade";
import Pay from "@/pages/Pay/Pay";
import PaySuccess from "@/pages/PaySuccess/PaySuccess";
import Center from "@/pages/Center/Center";
//二级组件
import MyOrder from "@/pages/Center/children/MyOrder";
import GroupOrder from "@/pages/Center/children/GroupOrder";*/

/*如果我们能把不同路由对应的组件分割成不同的代码块,
*然后当路由被访问的时候才加载对应组件,这样就更加高效了。
*/
export default [
    {
        path:'/home',
        component:()=> import("@/pages/Home/Home"),
        meta:{show:true}
    },
    {
        path:'/login',
        component:()=> import("@/pages/Login/Login"),
        meta:{show:false}

    },
    {
        path:'/register',
        component:()=> import("@/pages/Register/Register"),
        meta:{show:false}
    },
    {
        path:'/search/:keyword?',
        component:()=> import("@/pages/Search/Search"),
        meta:{show:true},
        name:'search',
        //路由组件能不能传递props数据
        //布尔值写法: 只能传递params参数
        // props:true
        //对象写法:额外的给路由组件传递一些props参数
        // props:{a:1,b:2}
        //函数写法(常用),可以接收params参数,query参数,通过props传递
        /*            props:($route)=>{
                        return {keyword:$route.params.keyword,k:$route.query.k}
                    }*/
        //简写
        // props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    {//重定向, /访问首页
        path:'*',
        // component:Home,
        redirect:'/home',//重定向到home
        meta:{show:true}
    },
    {
        path:'/detail/:skuId',//查询商品详细需要传递id
        component:()=> import("@/pages/Detail/Detail"),
        meta:{show:true}
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=> import("@/pages/AddCartSuccess/AddCartSuccess"),
        meta:{show:true}
    },
    {
        path: '/shopcart',
        component: ()=> import("@/pages/ShopCart/ShopCart"),
        meta:{show:true}
    },
    {
        path: '/trade',
        component: ()=> import("@/pages/Trade/Trade"),
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            console.log(to,from)
            //只能是购物车来的地址才放行, 或者当前页面(刷新)
            if (from.path === '/shopcart' || from.path==='/'){
                next()
            }else {
                next(false);//从哪来回哪去
                // next(from)
            }
        }
    },
    {
        path: '/pay',
        component: ()=> import("@/pages/Pay/Pay"),
        meta:{show:true},
        beforeEnter:(to,from,next)=>{
            console.log(to,from)
            if (from.path === '/trade' || from.path==='/'){//只能是结算页面来的地址才放行, 或者当前页面(刷新)
                next()
            }else {
                next(false);//从哪来回哪去
                // next(from)
            }
        }
    },
    {
        path: '/paysuccess',
        component: ()=> import("@/pages/PaySuccess/PaySuccess"),
        meta:{show:true},
/*        beforeEnter:(to,from,next)=>{
            if (from.path === '/pay' || from.path==='/'){//只能是支付页面来的地址才放行, 或者当前页面(刷新)
                next()
            }else {
                next(false);//从哪来回哪去
                // next(from)
            }
        }*/
    },
    {
        path: '/center',
        component: ()=> import("@/pages/Center/Center"),
        meta:{show:true},
        redirect: '/center/my',//默认进入我的订单
        children:[
            {
                path:'my',
                component:()=> import("@/pages/Center/children/MyOrder"),
            },
            {
                path:'group',
                component:()=> import("@/pages/Center/children/GroupOrder"),
            }
        ]
    }
]
