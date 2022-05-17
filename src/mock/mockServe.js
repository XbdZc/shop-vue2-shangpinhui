//引入mockjs模块
import Mock from  'mockjs';
//引入json数据(json数据没有对外暴露也能引入)
//webpack默认暴露的: 图片, json数据
import banner from './banner.json';
import floor from './floor.json'
//mock数据: 参数1:请求地址,  参数2:请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页轮播图数据
Mock.mock("/mock/floor",{code:200,data:floor});//底部的家用电器数据
