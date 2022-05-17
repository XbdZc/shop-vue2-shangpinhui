<template>
  <!-- 轮播图             -->
  <div class="swiper-container"  ref="floorSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="cr in carouselList" :key="cr.id">
        <img :src="cr.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Carousel",
  props:['carouselList'],
  watch: {
    carouselList:{
      immediate:true,//立即监听:不管数据有没有改变, 上来就监听一次
      handler(){//直接监听不到, 因为数据从home传过来就没有改变
        this.$nextTick(()=>{
          new Swiper(this.$refs.floorSwiper, {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable:true //小球点击跳转
            },
            //如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
