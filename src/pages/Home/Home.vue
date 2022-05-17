<template>
    <div>
        <!-- 三级联动导航已在main.js中注册, 不需要引入       -->
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <Recommend></Recommend>
      <Rank></Rank>
      <Like></Like>
<!--采用props方式传给floor
      v-for也可以在自定义标签中使用-->
      <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
      <Brand></Brand>

    </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import {mapState} from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components:{
    ListContainer,Recommend,Rank,Like,Floor,Brand
  },
  mounted() {
    //vuex-action方法获取floorList
    this.$store.dispatch('getFloorList');
/*    //获取用户信息
    this.$store.dispatch('getUserInfo')*/
  },
  computed:{
    //从仓库获取floorLIst
    ...mapState({
      floorList:(state)=>{
        return state.store_home.floorList
      }
    })
  }


}
</script>

<style scoped>

</style>
