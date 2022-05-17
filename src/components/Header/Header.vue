<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <span>用户 </span>
                <a >{{userName}}</a>
                <a  class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a>我的尚品汇</a>
          <a>尚品汇会员</a>
          <a>企业采购</a>
          <a>关注尚品汇</a>
          <a>合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input type="text" id="autocomplete"
                 class="input-error input-xxlarge" v-model="keyword"/>
          <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="headerGoSearch"
          >搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data(){
    return{
      keyword:''
    }
  },
  computed:{
    userName(){
      return this.$store.state.store_user.userInfo.name
    }
  },
  methods:{
    //搜索按钮的回调函数:需要想search路由进行跳转
    headerGoSearch(){
      //路由传参,方式一,字符串
      // this.$router.push('/search/'+this.keyword+'?key='+this.keyword.toUpperCase())
      //方式二: 模板字符串
      // this.$router.push(`/search/${this.keyword}?key=${this.keyword.toUpperCase()}`)
      //第三种:对象
      // this.$router.push({name:'search',params:{keyword:this.keyword},query:{key:this.keyword.toUpperCase()}})
      //面试题1: 使用path能不能使用param传参, 可以拼接
      // this.$router.push({path:'/search/'+this.keyword,query:{key:this.keyword.toUpperCase()}})
      //面试题2: 如何指定params参数, 可传可不传, 需要配置路由,在占位的后面添加?号
      // this.$router.push({name:'search',query:{key:this.keyword.toUpperCase()}})
      //面试题3: params如果传入空串, URL出现异常怎么处理
      //使用undefined解决
      //this.$router.push({name:'search',params:{keyword:''||undefined},query:{key:this.keyword.toUpperCase()}})
      //面试题4: 路由组件能不能传递props数据
      let location = {name:'search',params:{keyword:this.keyword || undefined}};
      if (this.$route.query){ //如果有query参数就合并query参数
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    logout(){
      //发请求通知服务器清除token
      //清理本地存储token
      try {
        this.$store.dispatch('logout');
        this.$router.push('/home')
      }catch (error){
        alert(error.message)
      }
    }
  },
  mounted() {
    this.$bus.$on('clearKeyword',()=>{
      this.keyword = ''
    });

  },
  beforeDestroy() {
    this.$bus.$off('clearKeyword');
  }
}
</script>

<style scoped lang="less">
.header {
&>.top {
   background-color: #eaeaea;
   height: 30px;
   line-height: 30px;

.container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;

.loginList {
  float: left;

p {
  float: left;
  margin-right: 10px;

.register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
}
}

.typeList {
  float: right;

a {
  padding: 0 10px;

&+a {
   border-left: 1px solid #b3aeae;
 }
}

}

}
}

&>.bottom {
   width: 1200px;
   margin: 0 auto;
   overflow: hidden;

.logoArea {
  float: left;

.logo {
img {
  width: 175px;
  margin: 25px 45px;
}
}
}

.searchArea {
  float: right;
  margin-top: 35px;

.searchForm {
  overflow: hidden;

input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0 4px;
  border: 2px solid #ea4a36;
  float: left;

&:focus {
   outline: none;
 }
}

button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;

&:focus {
   outline: none;
 }
}
}
}
}
}


</style>
