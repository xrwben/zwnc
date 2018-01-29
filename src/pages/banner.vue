<!-- 首页轮播图组件 -->
<template>
  <div class="swiper-container" ref="slider">
    <!--<div class="swiper-wrapper">-->
      <!--<div class="swiper-slide" v-for="slide in slides">-->
        <!--<a :href="slide.htmlUrl || slide.htmlImage" target="_blank">-->
          <!--<img :style="{width: '100%', height: heightStyle + 'rem'}" :src="slide.image"/>-->
        <!--</a>-->
      <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash; Add Pagination &ndash;&gt;-->
    <!--<div class="swiper-pagination" ref="pagination"></div>-->

    <mt-swipe :auto="5000" :style="{width: '100%', height: heightStyle + 'rem'}">
      <mt-swipe-item  v-for="slide in slides">
        <a v-if="slide.htmlUrl && !slide.htmlImage && canClick" :href="slide.htmlUrl" target="_blank">
          <img :style="{width: '100%', height: heightStyle + 'rem'}" :src="slide.image"/>
        </a>
        <router-link v-if="slide.htmlImage && canClick" :to="{path: `/image?srcUrl=${slide.htmlImage}`}">
          <img :style="{width: '100%', height: heightStyle + 'rem'}" :src="slide.image"/>
        </router-link>
        <a v-if="!canClick">
          <img :style="{width: '100%', height: heightStyle + 'rem'}" :src="slide.image"/>
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  /* eslint-disable no-new */
//  import Swiper from 'swiper'
//  import 'swiper/dist/css/swiper.css'
  export default {
    props: ['slides', 'heightStyle', 'canClick']
//    mounted () {
//      new Swiper(this.$refs.slider, {
//        effect: 'fade',
//        pagination: this.$refs.pagination,
//        centeredSlides: true,
//        paginationClickable: true,
//        autoplayDisableOnInteraction: false,
//        autoplay: 5000,
//        loopAdditionalSlides: 3,
//        observer: true,
//        observeParents: true
//      })
//    }
  }
</script>

<style scoped>
  img{
    display: block;
  }
</style>
