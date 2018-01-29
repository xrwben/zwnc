<template>
  <div class="beforeReview">
    <h2 class="caption">
      <i></i><span>上期回顾</span>
    </h2>
    <div class="content" v-for="beforeReview in beforeReviews">
      <router-link :to="{name: 'GoodsDetails', params: {id: beforeReview.itemId}}">
        <img :src="beforeReview.bigImage">
      </router-link>
      <div class="info_details">
        <div class="info_adv">
          <h3>“{{ beforeReview.phrase }}”
            <span v-if="!beforeReview.status">今日剩余：0</span>
            <span v-if="beforeReview.status">今日剩余：<span style='color: #0dbec6'>{{ beforeReview.dayNum }}</span></span>
          </h3>
        </div>
        <div class="info_title display_box">
          <div class="left">
            <p class="name">{{ beforeReview.name }}</p>
            <!--<p class="price">{{ beforeReview.jifenPrice }}积分 (价值￥{{ beforeReview.price }})</p>-->
            <p class="price">{{ beforeReview.jifenPrice }}积分 <span>(价值￥{{ beforeReview.marketPrice }})</span></p>
          </div>
          <div class="right">
            <router-link :to="{name: 'GoodsDetails', params: {id: beforeReview.itemId}}">
              <div class="exchange">查看详情</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['beforeReviews']
  }
</script>

<style scoped>
  .beforeReview{
    margin-top:2rem;
    background: #fff;
    overflow: hidden;
  }
  .content{
    margin-bottom: 5rem;
  }
  .content img{
    width: 100%;
    height: 40rem;
  }
  /*.info_adv{*/
    /*height: 9rem;*/
    /*line-height: 9rem;*/
  /*}*/
  /*.info_adv h3{*/
    /*font-size: 3.4rem;*/
    /*color: #333;*/
  /*}*/
  /*.info_adv span{*/
    /*float: right;*/
    /*font-size: 2.6rem;*/
    /*color: #666;*/
  /*}*/
  /*.left{*/
    /*-webkit-box-flex: 2.0;*/
    /*-moz-box-flex:2.0;*/
    /*box-flex:2.0;*/
    /*line-height: 4rem;*/
  /*}*/
  /*.name{*/
    /*font-size: 3rem;*/
    /*color: #666;*/
  /*}*/
  /*.price{*/
    /*font-size: 2.6rem;*/
    /*color: #666;*/
  /*}*/
  /*.right{*/
    /*-webkit-box-flex: 1.0;*/
    /*-moz-box-flex: 1.0;*/
    /*box-flex: 1.0;*/
  /*}*/
  /*.exchange{*/
    /*float: right;*/
    /*width: 18rem;*/
    /*height: 7rem;*/
    /*-webkit-border-radius:5px;*/
    /*-moz-border-radius:5px;*/
    /*border-radius:5px;*/
    /*background: #f93;*/
    /*font-size: 3.4rem;*/
    /*text-align: center;*/
    /*line-height: 7rem;*/
    /*color: #fff;*/
  /*}*/
  .info_adv{
    height: 9rem;
    line-height: 9rem;
  }
  .info_adv h3{
    font-size: 3.4rem;
    color: #333;
  }
  .info_adv span{
    float: right;
    font-size: 2.6rem;
    color: #666;
    font-weight: 400;
  }
  .left{
    -webkit-box-flex: 2.0;
    -moz-box-flex:2.0;
    box-flex:2.0;
    line-height: 4rem;
  }
  .name{
    font-size: 3rem;
    color: #666;
  }
  .price{
    font-size: 2.6rem;
    color: #333;
  }
  .price span{
    color: #666;
  }
  .right{
    -webkit-box-flex: 1.0;
    -moz-box-flex: 1.0;
    box-flex: 1.0;
  }
  .exchange{
    float: right;
    width: 18rem;
    height: 8rem;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    background: #f93;
    font-size: 3.4rem;
    text-align: center;
    line-height: 8rem;
    color: #fff;
  }
</style>
