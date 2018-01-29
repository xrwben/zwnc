<template>
  <div class="currentRecommendation banner-container">
    <h2 class="caption">
      <i></i><span>本期推荐</span>
    </h2>
    <div id="banner" class="banner-block" :style="{padding: '0 ' + clientWidth * 0.04 + 'px', transform: 'translateX(-' + offset + 'px)'}">
      <div v-for="(recommend, index) in recommends">
        <v-touch v-on:swipeleft="next(index)" v-on:swiperight="pre(index)">
          <div class="con" :style="{width: clientWidth * 0.89333333 + 'px', margin: '0 ' + clientWidth * 0.013333333333 + 'px'}">
            <router-link :to="{name: 'GoodsDetails', params: {id: recommend.itemId}}">
              <img :src="recommend.bigImage">
            </router-link>
            <div class="">
              <div class="info_details">
              <div class="info_adv">
                <h3>“{{ recommend.phrase }}”<span>今日剩余:<span style='color: #0dbec6'>{{ recommend.dayNum }}</span></span></h3>
              </div>
              <div class="info_title clearfix">
                <div class="left">
                  <p class="name">{{ recommend.name }} {{ recommend.format }}</p>
                  <p class="price">{{ recommend.jifenPrice }}积分 <span>(价值￥{{ recommend.marketPrice }})</span></p>
                </div>
                <div class="right">
                  <div v-if="recommend.dayNum !==0" class="exchange" @click="ifLogin(recommend.itemId)" v-track-event.click="{category: '立即兑换', action: 'click', opt_label: '首页-本期推荐-立即兑换'}">
                    <!--<router-link class="link_a" :to="{name: 'ConfirmOrder' ,params:{id: recommend.itemId}}">立即兑换</router-link>-->
                    <span class="link_a">立即兑换</span>
                  </div>
                  <div v-if="recommend.dayNum ===0" class="exchange soldOut" v-track-event.click="{category: '立即兑换', action: 'click', opt_label: '首页-本期推荐-立即兑换'}">
                    <span class="link_a">今日售罄</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </v-touch>
      </div>
    </div>
    <!--<input id="btn" style="display: none" type ="button" value="test" onclick="native.callAppAction(JSON.stringify({'action': 'login', 'data': {}}));">-->
  </div>
</template>

<script>
//  import axios from 'axios'
  export default {
    data () {
      return {
        offset: 0,
        clientWidth: document.documentElement.clientWidth
      }
    },
    props: ['recommends'],
    methods: {
      next (index) {
        if (index === this.recommends.length - 1) {
          return
        }
        this.offset = this.clientWidth * 0.92 * (index + 1)
      },
      pre (index) {
        if (index === 0) {
          return
        }
        this.offset = this.clientWidth * 0.92 * (index - 1)
      },
      ifLogin: function (id) {
        this.axios({
          method: 'post',
          url: '/zwnc/app/isLogin'
        }).then((result) => {
          if (result.data.code === 0) {
            this.$router.push(`/confirmorder/${id}`)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .banner-container {
    overflow-x: hidden;
  }
  .banner-block {
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: box;
    /*display: -webkit-flex; !* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 *!*/
    /*display: -moz-flex; !* Firefox 18+ *!*/
    /*display: -ms-flexbox; !* IE 10 *!*/
    /*display: flex; !* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ *!*/
    transition: all .4s linear;
    margin-bottom: 4rem;
  }
  .currentRecommendation{
    margin-top:2rem;
    background: #fff;
    overflow: hidden;
  }
  .con{
    margin-bottom: 5rem;
  }
  .con img{
    width: 100%;
    height: 40rem;
  }
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
  .info_title{
    width: 100%;
    height: 9rem;
  }
  .left{
    float: left;
    width: 60%;
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
   float: right;
    width: 40%;
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
  .soldOut{
    background: #e5e5e5;
  }
  .soldOut .link_a{
    color: #999;
  }
</style>
