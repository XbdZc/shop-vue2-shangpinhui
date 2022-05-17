//Vue插件一定暴露一个对象, 指定install方法
let myplugins = {};
myplugins.install = function (Vue,options){
    /*能获取Vue, 可以做很多事,options: 使用插件时传入的值
    * Vue.prototype.$bus: 任何组件都能使用
    * Vue.directive(); 指令 , 主要用来操作DOM
    * Vue.component 全局组件
    * Vue.filter..... 过滤器
    * */
    Vue.directive(options.name,(elment,params)=>{//全局指令
        /*elment: dom元素
        * params: 可以获取dom元素信息
        * */
        //将params值改成大小字母
        elment.innerHTML = params.value.toUpperCase();

    })

}
export default myplugins
