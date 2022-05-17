<template>
  <div id="app">
    <h1 v-upper="msg"></h1>
    <Header/>
    <!-- 路由组件的出口   -->
    <router-view></router-view>
  <!--在HOME.Search显示, 登录注册隐藏    -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
export default {
  name: 'App',
  data(){
    return{msg:''}
  },
  components: {
    Header,Footer
  },
  mounted() {
    //派发一个action, 获取分类三级列表数据
    this.$store.dispatch('categoryList');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
