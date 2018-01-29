<template>
  <div class="home paddingTop">
    <div class="home-wrapper">
      <!--顶部标题-->
      <div class="section">
        <div class="header">
          <div class="content">
            <div class="back header_left" v-show="!discovery_isShow">
              &emsp;&emsp;&emsp;
            </div>
            <div class="back header_left" onclick="native.callAppAction(JSON.stringify({'action': 'close', 'data': {}}));" v-show="discovery_isShow" v-track-event="{category: '发现', action: 'click', opt_label: '首页-左上角-发现'}">
              <i></i><span>发现</span>&nbsp;&nbsp;
            </div>
            滋味农场
            <!--<h2 class="title">滋味农场</h2>-->
            <div class="myorder header_right" @click="isLogin()" v-track-event="{category: '我的订单', action: 'click', opt_label: '首页-右上角-我的订单'}">
              <!--<router-link to="/myorder" class="right_a">-->
              我的订单
              <!--</router-link>-->
            </div>
          </div>
        </div>
      </div>
      <!--轮播图-->
      <div class="section">
        <banner :heightStyle="26" :canClick="1" :slides="slides"></banner>
      </div>
      <!--三个说明-->
      <div class="section">
        <ul class="ad_list display_box">
          <li>
            <i><img src="../assets/home_logo1.png"></i>
            <span>农场直供</span>
          </li>
          <li>
            <i><img src="../assets/home_logo2.png"></i>
            <span>严选货源</span>
          </li>
          <li>
            <i><img src="../assets/home_logo3.png"></i>
            <span>应季美味</span>
          </li>
        </ul>
      </div>
      <!--上期回顾-->
      <div class="section">
        <before-review v-if="before_isShow" :beforeReviews="beforeReviews"></before-review>
      </div>
      <!--本期推荐-->
      <div class="section">
        <current-recommendation v-if="curr_isShow != 0" :recommends="recommends" ></current-recommendation>
      </div>
      <!--下期预告-->
      <div class="section">
        <next-announce v-if="next_isShow" :announces="announces"></next-announce>
      </div>
      <!--往期水果-->
      <div class="section">
        <past-fruit v-if="past_isShow" :pastFruits="pastFruits"></past-fruit>
      </div>

      <!--底部广告-->
      <div class="section">
        <div class="footerAdvertisement display_box">
          <i class="lineLeft"></i>
          <p>{{footerAdvertisement}}</p>
          <i class="lineRight"></i>
        </div>
      </div>

      <input id="btn" style="display: none" type="button" value="test" onclick="native.callAppAction(JSON.stringify({'action': 'login', 'data': {}}));">
    </div>
    <!--<div class="item" onclick="native.callAppAction(JSON.stringify({'action': 'share', 'data': {'title': '111', 'content': '2222', 'linkUrl': 'https://www.baidu.com', 'logoUrl': 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png', 'supportPlatform': 'All'}}))">-->
      <!--<img src="../assets/share_wx.png">-->
      <!--<p>微信好友</p>-->
    <!--</div>-->

  </div>
</template>

<script>
  import axios from 'axios'
  import Banner from '../pages/banner.vue'
  import CurrentRecommendation from '../pages/CurrentRecommendation.vue'
  import NextAnnounce from '../pages/NextAnnounce.vue'
  import PastFruit from '../pages/PastFruit.vue'
  import BeforeReview from '../pages/BeforeReview.vue'
  import { Indicator } from 'mint-ui'

  export default {
    data () {
      return {
        discovery_isShow: false,
//        ad_list: [
//          {item_img: '../../static/home_logo1.png', item_con: '农场直供'},
//          {item_img: '../../static/home_logo2.png', item_con: '严选货源'},
//          {item_img: '../../static/home_logo3.png', item_con: '应季美味'}
//        ],
        slides: [],
        curr_isShow: 0,
        before_isShow: 0,
        recommends: [],
        next_isShow: 0,
        announces: [],
        past_isShow: 0,
        pastFruits: [],
        beforeReviews: [],
        footerAdvertisement: '百果香，诗书滋味长'
      }
    },
    components: {
      Banner,
      BeforeReview,
      CurrentRecommendation,
      NextAnnounce,
      PastFruit
    },
    created () {
      if (window.location.search.substr(1).match(/android/i) || window.location.search.substr(1).match(/ios/i)) {
        sessionStorage.setItem('htmlFrom', 'fromApp')
      }
      if (window.location.search.substr(1).match(/ios/i)) {
        sessionStorage.setItem('appType', 'ios')
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // 判断是否在app中
      if (sessionStorage.getItem('htmlFrom') === 'fromApp') {
        this.discovery_isShow = true
      } else {
        this.discovery_isShow = false
      }
      // 清理地址id获取默认的地址、清理商品数量
      sessionStorage.removeItem('addressId')
      sessionStorage.removeItem('goodsNum')
    },
    mounted () {
      sessionStorage.setItem('havaHome', 'yes')
      function getBanner () {
        return axios({
          method: 'post',
          url: '/zwnc/app/advert/list'
        })
      }
      function getRecommend () {
        return axios({
          method: 'post',
          url: '/zwnc/app/item/recommend'
        })
      }
      function getNextAnnounce () {
        return axios({
          method: 'post',
          url: '/zwnc/app/advert/announce'
        })
      }
      function getPast () {
        return axios({
          method: 'post',
          url: '/zwnc/app/item/pastitem'
        })
      }
      function getBefore () {
        return axios({
          method: 'post',
          url: '/zwnc/app/item/pastitemFirst'
        })
      }
      axios.all([getBanner(), getRecommend(), getNextAnnounce(), getPast(), getBefore()]).then(axios.spread((result1, result2, result3, result4, result5) => {
        this.slides = result1.data.page.list
        this.curr_isShow = result2.data.page.totalCount
        this.recommends = result2.data.page.list
        this.next_isShow = result3.data.page.totalCount
        this.announces = result3.data.page.list
        this.past_isShow = result4.data.page.totalCount
        this.pastFruits = result4.data.page.list
        this.beforeReviews = result5.data.page.list
        this.before_isShow = result5.data.page.totalCount
        Indicator.close()
      })).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      isLogin: function () {
        this.axios({
          method: 'post',
          url: '/zwnc/app/isLogin'
        }).then((result) => {
          if (result.data.code === 0) {
            this.$router.push('/myorder')
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .ad_list{
    height: 9.5rem;
    line-height: 9.5rem;
    text-align: center;
    font-size: 2.4rem;
    background: #fff;
    padding: 0 3rem;
  }
  .ad_list li{
    box-flex:1.0;
    -webkit-box-flex:1.0;
    -moz-box-flex:1.0;
    display: block;
  }
  .ad_list li i{
    display: inline-block;
    width: 3.8rem;
    height: 3.8rem;
    vertical-align: middle;
  }
  .ad_list li i img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .ad_list li {
    color: #666;
  }

  /* 首页底部广告样式 */
  .footerAdvertisement{
    height: 9.4rem;
    text-align: center;
    line-height: 9.4rem;
    font-size: 2.6rem;
    color: #999;
    justify-content: center;
    align-items: center;
  }
  .footerAdvertisement p{
    display: inline-block;
  }
  .lineLeft,.lineRight{
    width: 10rem;
    height: .5rem;
    display: block;
  }
  .lineLeft{
    background: url("../assets/footerLine_left.png") no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .lineRight{
    background: url("../assets/footerLine_right.png") no-repeat center right;
    -webkit-background-size: contain;
    background-size: contain;
  }
</style>
