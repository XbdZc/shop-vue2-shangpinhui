//导入axios
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//start:进度条开始, done :进度条结束
//引入进度条样式
import 'nprogress/nprogress.css'

//引入store(获取uuid)
import store_detail from "@/store/store_detail";
//引入store_user, 获取token
import store_user from "@/store/store_user";
const myAxios = axios.create({
    //配置对象
    //基础路径, 发请求的时候,路径中会出现api
    baseURL:'/api',
    timeout:5000,//请求超时时间
});
//请求拦截器, 可以在发请求前做一些事
myAxios.interceptors.request.use((config)=>{
    if (store_detail.state.uuid_token){
        //请求头添加字段userTempId--和后台商量好了
        config.headers.userTempId = store_detail.state.uuid_token
    }
    if (store_user.state.token){//如果仓库中有token, 加入到header中
        config.headers.token = store_user.state.token
    }
    //进度条开始动
    nprogress.start();
    return config
});

//响应拦截器
myAxios.interceptors.response.use((response)=>{
    //进度条结算
    nprogress.done();
    //响应成功的回调函数
    return response.data
},(error)=>{
    //响应失败的回调函数
    console.log('响应拦截器-失败')
    return Promise.reject(new Error(error.message))
})

export default myAxios;
