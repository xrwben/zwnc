<template>
 <div class="goodsdetails paddingTop">
   <!--header-->
   <div class="section">
     <div class="header">
       <div class="content">
         <div class="back header_left" @click="toBack()" v-track-event.click="{category: '返回', action: 'click', opt_label: '商品详情页-商品可购状态-左上角-滋味农场'}">
           <i></i><span>返回</span>
         </div>
         商品详情
         <div class="myorder header_right" @click="shareBtn()" v-track-event.click="{category: '分享', action: 'click', opt_label: '商品详情页-商品可购状态-右上角-分享'}">
           &emsp;&emsp;<img src="../assets/shareButton.png">
         </div>
       </div>
     </div>
   </div>
   <!--视频或轮播图-->
   <div class="section">
     <banner :heightStyle="40" :canClick="0" v-if="banner_isShow" :slides="items.slides"></banner>
     <vedio v-else :vedioSrc="items.bannerVideo"></vedio>
   </div>
   <!--水果参数-->
   <div class="section">
     <div class="productParameters">
       <div class="content">
         <h2>{{ items.name }} {{ items.format }}</h2>
         <h3 class="ellipsis">“{{ items.introduce }}”</h3>
         <!--<p>￥ <span class="price">{{ items.price }}</span>+<span class="price">{{ items.jifenPrice }}</span>积分（价值￥{{ items.marketPrice }}）<span class="remain">今日剩余：{{ items.dayNum }}</span></p>-->
         <p>
           <span class="price">{{ items.jifenPrice }}</span>积分（价值￥{{ items.marketPrice }}）
           <span class="remain" v-if="items.status !== 0">今日剩余：{{ items.dayNum }}</span>
           <span class="remain" v-if="items.status === 0">今日剩余：0</span>
         </p>
       </div>
     </div>
   </div>
   <!--农户说-->
   <div class="section">
     <div class="farmerSay" v-if="items.speech">
       <div class="content">
         <div class="farmer_con display_box">
           <!--<span>农户说</span>-->
           <div class="left">
             <img src="../assets/famer.png">
           </div>
           <div class="right">
             <div v-if="flag">
               <button type="button" class="audio" @click="playOrpause" v-track-event.click="{category: '农户说', action: 'play', opt_label: '商品详情页-商品可购状态-农户说语音'}">
                 <span>{{ audioTime }}</span>
                 <i id="audioIcon" v-show="audioPlay"></i>
                 <audio id="audioName" controls="controls" style="display: none;">
                   <source :src="items.speech" type="audio/mpeg">
                   Your browser does not support the audio element.
                 </audio>
               </button>
             </div>
             <p>点击播放语音</p>
            </div>
         </div>
       </div>
     </div>
   </div>
   <!--商品详情-->
   <div class="section">
     <div class="productDetails">
       <h2 class="caption">
         <i></i><span>商品详情</span>
       </h2>
       <div class="content">
         <div class="wrapper" v-html="items.detialImage">
           {{ items.detialImage }}
         </div>
       </div>
     </div>
   </div>
   <!--基本信息-->
   <div class="section">
     <div class="baseInfo">
       <h2 class="caption">
         <i></i><span>基本信息</span>
       </h2>
       <div class="content">
         <ul class="info_con">
           <li>产地：<span>{{ items.orign }}</span></li>
           <li>商品编号：<span>{{ items.itemId }}</span></li>
           <li>规格：<span>{{ items.format }}</span></li>
           <li>发货时间：<span>{{ items.deliverTime }}</span></li>
           <li v-if="!items.deliverScope">配送范围：<span>全国</span></li>
           <li v-if="items.deliverScope">配送范围：<span>暂不支持{{ items.deliverScope }}</span></li>
         </ul>
       </div>
     </div>
   </div>
   <!--兑换须知-->
   <div class="section">
     <div class="exchangeNotes" v-if="buyerReading">
       <h2 class="caption">
         <i></i><span>兑换须知</span>
       </h2>
       <div class="content">
         <div class="notes_con">
           <img :src="buyerReading.content">
         </div>
       </div>
     </div>
   </div>
   <!--其他推荐-->
   <div class="section">
     <div class="otherRecommend" v-if="otherItemList.length !== 0">
       <h2 class="caption">
         <i></i><span>其他推荐</span>
       </h2>
       <div class="content">
         <div class="other_con" v-for="other in otherItemList">
           <router-link :to="{name: 'GoodsDetails', params: {id: other.itemId}}" v-track-event.click="{category: '其他推荐', action: '点击', opt_label: '商品详情页-商品可购状态-其他推荐-点击商品图片'}">
             <img :src="other.bigImage">
           </router-link>
         </div>
       </div>
     </div>
   </div>
   <!--立即兑换、无库存、下架-->
   <div class="section">
     <div class="nowBuy" v-if="items.dayNum !==0 && items.status === 1" @click="isLogin">
       <!--<p @click="setRoute">-->
       <p v-track-event.click="{category: '立即兑换', action: '点击', opt_label: '商品详情页-商品可购状态-立即兑换'}">
         <!--router-link修改为span-->
         <span class="buy">立即兑换</span>
       </p>
       <!--<p>今日售罄</p>-->
     </div>
     <div v-if="items.dayNum === 0  && items.status === 1" class="nowBuy soldOut">
       <p><span class="buy">今日售罄</span></p>
     </div>
     <div v-if="items.status === 0" class="nowBuy soldOut">
       <p><span class="buy">已下架</span></p>
     </div>
   </div>
   <!--微信分享蒙层-->
   <div class="shareArrow" v-show="share_isShow" @click="hideShare">
     <img width="100%" src="../assets/shareArrow.png"/>
   </div>
   <!--登录提示-->
   <!--<div class="section">-->
     <!--<hint-login v-show="login_isShow"></hint-login>-->
   <!--</div>-->
 </div>
</template>

<script>
  import Banner from '../pages/banner.vue'
  import Vedio from '../pages/Video.vue'
  import HintWifi from '../pages/HintWifi.vue'
  import HintLogin from '../pages/HintLogin.vue'
//  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  import wx from 'weixin-jsapi'

  export default {
    data () {
      return {
        banner_isShow: 1,
        items: {
          slides: []
        },
        buyerReading: {},
        otherItemList: [],
        playFlag: true, // 语音是否播放标志
        audioPlay: false, // 语音gif图片展示
        audioTime: '24',
        timer: null,
        timerEnd: null,
        share_isShow: false,
        flag: false
      }
    },
    components: {
      Banner,
      Vedio,
      HintWifi,
      HintLogin
    },
    created () {
      this.getData()
      // 清理地址id获取默认的地址、清理商品数量
      sessionStorage.removeItem('addressId')
      sessionStorage.removeItem('goodsNum')
    },
    mounted () {
      // 动态获取js-sdk接口参数
      this.axios({
        method: 'get',
        url: '/handler/weixin/sign.js?v=' + new Date().getTime()
      }).then((result) => {
        let timestamp = ''
        let signature = ''
        let sig = result.data.split(',')
        for (let i = 0; i < sig.length; i++) {
          if (sig[i].indexOf('timestamp') > -1) {
            timestamp = sig[i].split(':')[1]
          }
          if (sig[i].indexOf('signature') > -1) {
            signature = sig[i].split(':')[1].replace(/"/g, '')
          }
        }
        wx.config({
          debug: false,
          appId: 'wx2e1ff84ed8bb5a1c',
          timestamp: timestamp,
          nonceStr: 'randomstr123QQ',
          signature: signature,
          jsApiList: [
            'openCard',
            'addCard',
            'chooseCard',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'hideMenuItems',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ]
        })
      }).catch((error) => {
        console.log(error)
      })
      // 判断音频是否播放完毕
      this.timerEnd = setInterval(() => {
        let audioName = document.getElementById('audioName')
        if (audioName && audioName.ended) {
          this.audioPlay = false
        }
      }, 500)
    },
    // 离开页面清楚定时器
    beforeDestroy () {
      clearInterval(this.timer)
      clearInterval(this.timerEnd)
    },
    methods: {
      // 后退按钮
      toBack: function () {
        // 判断是否去过首页
        if (sessionStorage.getItem('havaHome') === 'yes') {
          sessionStorage.removeItem('havaHome')
          this.$router.go(-1)
        } else {
          sessionStorage.removeItem('havaHome')
          this.$router.push('/')
        }
      },
      // 点击隐藏分享蒙层
      hideShare: function () {
        this.share_isShow = false
      },
      shareBtn: function () {
        // 判断是否为在App中
        if (sessionStorage.getItem('htmlFrom') === 'fromApp') {
          let logoUrl = this.items.shareImage.replace(/https:\/\/lcfarm-zwnc.oss-cn-shenzhen.aliyuncs.com/, 'https://zw.lcfarm.com')
          let datas = {
            'title': '',
            'content': '',
            'logoUrl': logoUrl,
            'supportPlatform': 'All'
          }
          window.native.callAppAction(JSON.stringify({'action': 'share', 'data': datas}))
        } else {
          this.share_isShow = true
        }
      },
      isLogin: function () {
        this.axios({
          method: 'post',
          url: '/zwnc/app/isLogin'
        }).then((result) => {
          if (result.data.code === 0) {
            this.$router.push(`/confirmorder/${this.items.itemId}`)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      getData: function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.flag = false
        this.axios({
          method: 'post',
          url: '/zwnc/app/item/info',
          params: {'itemId': this.$route.params.id}
        }).then((result) => {
          let titleShare = result.data.map.item.name
          let descShare = result.data.map.item.introduce
          let linkSrc = 'https://zw.lcfarm.com/goodsdetails/' + result.data.map.item.itemId
          let logoUrl = 'https://a2.qpic.cn/psb?/V123M85a3Pf0D2/u04lD2QsdNpmZOCYEjO3OE8RPnL2qkE27*Y5xRFRgV4!/b/dGwBAAAAAAAA&bo=lgCWAAAAAAARBzA!&rf=viewer_4'
          wx.onMenuShareTimeline({
            title: titleShare,
            link: linkSrc,
            imgUrl: logoUrl,
            success: function () {
              console.log('分享成功')
            },
            cancel: function () {
              console.log('取消')
            }
          })
          wx.onMenuShareAppMessage({
            title: titleShare,
            desc: descShare,
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            link: linkSrc,
            imgUrl: logoUrl,
            type: '',
            dataUrl: '',
            success: function () {
              alert
              console.log('分享成功')
            },
            cancel: function () {
              console.log('取消')
            }
          })
          wx.onMenuShareQQ({
            title: titleShare,
            desc: descShare,
            link: linkSrc,
            imgUrl: logoUrl,
            success: function () {
              console.log('分享成功')
            },
            cancel: function () {
              console.log('取消')
            }
          })
          wx.onMenuShareQZone({
            title: titleShare,
            desc: descShare,
            link: linkSrc,
            imgUrl: logoUrl,
            success: function () {
              console.log('分享成功')
            },
            cancel: function () {
              console.log('取消')
            }
          })
          if (result.data.code === 0) {
            this.flag = true
            this.items = result.data.map.item
            if (this.items.speech) {
              setTimeout(() => {
                let time = document.getElementById('audioName').duration
//                console.log(time)
                if (!isNaN(time)) {
                  this.audioTime = Math.round(time)
//                  console.log('isNaN' + this.audioTime)
                } else {
                  this.timer = setInterval(() => {
                    time = document.getElementById('audioName').duration
//                    console.log(time)
                    if (!isNaN(time)) {
                      clearInterval(this.timer)
                      this.audioTime = Math.round(time)
                    }
                  }, 500)
                }
              }, 800)
            }
            this.buyerReading = result.data.map.buyerReading
            this.otherItemList = result.data.map.otherItemList
            if (this.items.banner) {
              this.banner_isShow = 1
              const temp = this.items.banner.split(',')
              this.items.slides = []
              temp.forEach(item => {
                this.items.slides.push({image: item})
              })
            } else {
              this.banner_isShow = 0
            }
          } else {
            alert('系统网络异常')
          }
          Indicator.close()
        }).catch((error) => {
          console.log(error)
        })
      },
      // 点击播放语音
      playOrpause: function () {
        let audioName = document.getElementById('audioName')
        if (this.playFlag) {
          audioName.load()  // 重新加载重头播放
          audioName.play()
          this.playFlag = false
          this.audioPlay = true
        } else {
          audioName.pause()
          this.playFlag = true
          this.audioPlay = false
        }
      }
    },
    // 监听路由变化获取数据
    watch: {
      '$route': 'getData'
    }
  }
</script>

<style scoped>
  .goodsdetails{
    max-width: 100%;
    padding-bottom: 12rem;
  }
  .share img{
    vertical-align: middle;
  }
  .productParameters{
    background: #fff;
    border-bottom: .1rem solid #e6e6e6;
    margin-bottom: 2rem;
  }
  .productParameters h2{
    color: #333;
    font-size: 3.6rem;
    padding-top: 3.4rem;
    font-weight: 700;
  }
  .productParameters h3{
    color: #999;
    font-size: 2.8rem;
    margin-top: 2.2rem;
    font-weight: 400;
  }
  .productParameters p{
    margin-top: 2.4rem;
    color: #666;
    font-size: 2.6rem;
    padding-bottom: 3.6rem;
  }
  .productParameters p .price{
    color: #f93;
    font-size: 3rem;
  }
  .productParameters p .remain {
    color: #999;
    font-size: 2.8rem;
    float: right;
  }
  .farmerSay {
    margin-top: 2rem;
    background: #fff;
    padding: 3rem 0;
  }
  .farmer_con{
    height: 30rem;
    /*padding: 10rem 0 4.5rem;*/
    background:#fff url("../assets/farmerSayBg.png")no-repeat top center;
    background-size: 100% 100%;
    position: relative;
  }
  /*.farmer_con > span{*/
    /*font-size: 3.2rem;*/
    /*color: #666;*/
    /*position: absolute;*/
    /*left: 43%;*/
    /*top: 5rem;*/
  /*}*/
  .farmer_con .left{
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
    text-align: center;
    margin-top: 11rem;
  }
  .farmer_con .left img{
    width: 16rem;
    height: 16rem;
    border: .2rem solid #e6e6e6;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-left: 1rem;
  }
  .farmer_con .right{
    box-flex: 6.0;
    -moz-box-flex: 6.0;
    -webkit-box-flex: 6.0;
    margin-top: 11rem;
  }
  .audio{
    width: 95%;
    height: 7.5rem;
    background: url("../assets/audio1.png")no-repeat;
    -webkit-background-size: 99% 100%;
    background-size: 99% 100%;
    margin-top: 4rem;
    text-align: right;
    border: 0;
    outline: none;
  }
  .audio span{
    color: #999;
    font-size: 2.6rem;
    margin-right: 3rem;
  }
  .audio i{
    width: 2.7rem;
    height: 3rem;
    float: left;
    margin-left: 2rem;
    background: url("../assets/audioPlay.gif")no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .farmer_con .right p{
    color: #999;
    font-size: 2.8rem;
    text-align: right;
    padding: 1rem 2rem;
  }
  .productDetails{
    max-width: 100%;
    background: #fff;
    border-top: .1rem solid #e6e6e6;
  }
.wrapper{
    width: 100% !important;
    max-width: 100% !important;
    padding-bottom: 3rem !important;
    font-size: 2.8rem !important;
    color: #666 !important;
    /*position: relative;*/
  /*overflow: hidden;*/
  }
.wrapper div{
    max-width: 100% !important;
  }
.wrapper img{
    width: 100% !important;
    max-width: 100% !important;
  }
  .baseInfo{
    background: #FFF;
    margin-top: 2rem;
    padding-bottom: 2.4rem;
  }
  .info_con li{
    /*height: 7.2rem;*/
    border-bottom: .2rem dashed #cfcfcf;
    line-height: 7.2rem;
    color: #999;
    font-size: 2.8rem;
  }
  .info_con li:first-child{
    border-top: .2rem dashed #cfcfcf;
  }
  .info_con li span{
    color: #333;
  }
  .exchangeNotes{
    margin-top: 2rem;
    background: #fff;
    padding-bottom: 2.5rem;
  }
  /*.notes_con{*/
    /*background: #f4f4f4;*/
    /*border-radius: 0.5rem;*/
    /*color: #666;*/
    /*font-size: 2.8rem;*/
    /*padding: 3.2rem 1rem;*/
  /*}*/
  .notes_con img{
    width: 100%;
    max-width: 100%;
    border-radius: 1rem;
  }
  .otherRecommend{
    background: #fff;
    margin-top: 2rem;
  }
  .other_con{
    width: 100%;
    height: 30rem;
    padding-bottom: 5rem;
  }
  .other_con img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .nowBuy{
    width: 100%;
    height: 9rem;
    line-height: 9rem;
    background: #f93;
    font-size: 3.2rem;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
  }
  .soldOut{
    background: #e5e5e5;
  }
  .buy{
    color: #fff;
    display: block;
  }
  .soldOut .buy{
    color: #999;
  }
  .shareArrow{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: rgba(0,0,0,.7);
  }
</style>
