<template>
  <div class="confirmOrder paddingTop">
    <!--我的订单标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)" v-track-event.click="{category: '返回', action: '点击', opt_label: '确认订单页-左上角-点击返回'}">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          确认订单
          <div class="header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--收货地址-->
    <div class="section">
      <div class="address" v-if="address">
        <router-link :to="{name: 'Address'}">
          <div class="content display_box" v-track-event.click="{category: '地址编辑入口', action: '点击', opt_label: '确认订单页-已填入地址状态-点击地址编辑入口'}">
            <div class="car">
              <img class="" src="../assets/order_address.png">
            </div>
            <div class="address_con">
              <h2 class="accept_people">收货人：{{ address.receiveName }}<span>{{ address.contactPhone }}</span></h2>
              <p>收货地址：{{ address.provinces }} {{ address.city }}{{ address.county }}{{ address.street}}{{ address.fullAddress }}</p>
            </div>
            <div class="arrow">
              <img class="" src="../assets/order_logistics.png">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!--无收货地址-->
    <div class="section">
      <div class="noAddress" v-if="!address"  :class="{borderWarn: redBorder}">
        <router-link :to="{name: 'Address'}">
          <div class="content display_box" v-track-event.click="{category: '地址编辑入口', action: '点击', opt_label: '确认订单页-未填入地址状态-点击地址编辑入口'}">
            <div class="car">
              <img class="" src="../assets/order_address.png">
            </div>
            <div class="address_con">
              <p>请选择一个收货地址</p>
            </div>
            <div class="arrow">
              <img class="" src="../assets/order_logistics.png">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!--商品信息-->
    <div class="section">
      <div class="goods">
        <div class="content">
          <div class="picAndname clearfix">
            <div class="picLeft">
              <div class="pic left">
                <img :src="item.bigImage">
              </div>
            </div>
            <div class="name right">
              <h2>{{ item.name }} &nbsp; {{ item.format }}</h2>
              <span>{{ item.introduce }}</span>
              <p><span class="integration">{{ item.jifenPrice }}</span>积分<span class="num">今日剩余：{{ item.dayNum }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--商品数量-->
    <div class="section">
      <div class="goodsNum">
        <div class="content">
          <div class="numLeft">数量</div>
          <div class="numRight">
            <a @click="reduceNum()">－</a>
            <span class="buyNum">{{ num }}</span>
            <a @click="addNum()">＋</a>
          </div>
        </div>
      </div>
    </div>
    <!--合计-->
    <div class="section">
      <div class="integrationCount goodsNum">
        <div class="content clearfix">
          <div class="numLeft">合计</div>
          <div class="numRight">
            <p>{{ totalIntegration }}<span>积分</span></p>
            <span>(可用积分：{{ availableIntegration }})</span>
          </div>
        </div>
      </div>
    </div>
    <!--确认兑换按钮-->
    <div class="section">
      <div class="nowBuy">
        <p v-track-event.click="{category: '确认兑换', action: '点击', opt_label: '确认订单页-点击确认兑换'}">
          <span class="buy" @click.prevent.stop="confirmBuy(address.addressId)">确认兑换</span>
        </p>
      </div>
    </div>

    <!--积分不足提示-->
    <hint-lessintegration v-show="lessIntegration" v-on:hintIntegration="hintIntegration"></hint-lessintegration>

    <!--商品下架提示-->
    <hint-undercarriage v-show="underCarriage" v-on:hintUndercarriage="hintUndercarriage"></hint-undercarriage>

    <!--限购提示-->
    <hint-limitbuy v-show="limitBuy" v-on:hintLimit="hintLimit" :item="item"></hint-limitbuy>

    <!--库存提示-->
    <hint-stock v-show="stock" v-on:hintStock="hintStock"></hint-stock>

    <!--地址不支持提示-->
    <hint-address v-show="limitAddress" :id="otherComment" v-on:hintAddress="hintAddress"></hint-address>
  </div>
</template>

<script>
  import HintLessintegration from '../pages/HintLessintegration.vue'
  import HintUndercarriage from '../pages/HintUndercarriage.vue'
  import HintLimitbuy from '../pages/HintLimitbuy.vue'
  import HintStock from '../pages/HintStock.vue'
  import HintAddress from '../pages/HintAddress.vue'
//  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        redBorder: false, // 红色框警告
        address: {}, // 地址
        item: {}, // 商品信息
        num: 1,
        availableIntegration: 0,
        underCarriage: false,  // 下架提示
        limitBuy: false,  // 限购提示
        stock: false,  // 库存提示
        limitAddress: false, // 地址不支持提示
        otherComment: '',
        lessIntegration: false // 积分不够提示
      }
    },
    components: {
      HintLessintegration,
      HintUndercarriage,
      HintLimitbuy,
      HintStock,
      HintAddress
    },
    created () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.getProduct()
      this.getIntegration()
      this.num = sessionStorage.getItem('goodsNum') || this.num
    },
    methods: {
      // 增加按钮
      addNum: function () {
        if (this.num >= this.item.dayNum) {
          this.stock = true
        } else if (this.num >= this.item.limiter) {
          this.limitBuy = true
        } else {
          this.num++
          sessionStorage.setItem('goodsNum', this.num || 1)
        }
      },
      reduceNum: function () {
        if (this.num <= 1) {
          return false
        } else {
          this.num--
          sessionStorage.setItem('goodsNum', this.num || 1)
        }
      },
      // 子组件给父组件传输数据
      hintLimit: function () {
        this.limitBuy = false
      },
      hintUndercarriage: function () {
        this.underCarriage = false
      },
      hintAddress: function () {
        this.limitAddress = false
      },
      hintStock: function () {
        this.stock = false
      },
      hintIntegration: function () {
        this.lessIntegration = false
      },
      // 请求商品订单数据
      getProduct: function () {
        this.axios({
          method: 'post',
          url: '/zwnc/app/order/immediatelyBuy',
          params: {
            itemId: this.$route.params.id,
            addressId: sessionStorage.getItem('addressId') ? sessionStorage.getItem('addressId') : ''
          }
        }).then(result => {
          if (result.data.code === 0) {
            this.item = result.data.item
            this.address = result.data.defaultAddress
            // 存储分享的数据
//            let logoUrl = result.data.item.shareImage
            const shareData = {
              'itemName': result.data.item.name,
              'itemIntroduce': result.data.item.introduce,
              'itemId': result.data.item.itemId,
              'itemShareImage': result.data.item.shareImage
            }
            sessionStorage.setItem('shareData', JSON.stringify(shareData))
          } else {
            console.log(result)
          }
          Indicator.close()
        }).catch((error) => {
          console.log(error)
        })
      },
      getIntegration: function () {
        this.axios({
          method: 'post',
          url: '/mapi/integral/store/userIntegralDetail.htm',
          params: {
            currentPage: 1,
            pageSize: 1
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.availableIntegration = result.data.data.personalIntegral.availableIntegral
          } else {
            console.log(result.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      confirmBuy: function (addressId) {
        if (this.num > this.item.limiter) {   // 限购验证
          this.limitBuy = true
        } else if (this.num > this.item.dayNum) {   // 库存不够验证
          this.stock = true
        } else if (!this.address) {   // 地址为空
          this.redBorder = true
        } else {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          this.axios({
            method: 'post',
            url: '/zwnc/app/order/save',
            params: {
              addressId: addressId || '',
              num: this.num,
              itemId: this.item.itemId
            }
          }).then((result) => {
            if (result.data.code === 100) {
              this.$ba.trackEvent('下架', '弹窗', '确认订单页-商品下架')
              this.underCarriage = true
            } else if (result.data.code === 101) {
              this.$ba.trackEvent('个人限购', '弹窗', '确认订单页-超过个人限购弹窗数量')
              this.limitBuy = true
            } else if (result.data.code === 102) {
              this.stock = true
            } else if (result.data.code === 103) {
              this.redBorder = true
            } else if (result.data.code === 104) {
              this.$ba.trackEvent('地址不支持', '弹窗', '确认订单页-地址不支持弹窗数量')
              this.limitAddress = true
              this.otherComment = result.data.otherComment
            } else if (result.data.code === 105) {
              this.$ba.trackEvent('积分不够', '弹窗', '确认订单页-积分不够弹窗数量')
              this.lessIntegration = true
            } else if (result.data.code === 106) {
              this.$ba.trackEvent('积分不够', '弹窗', '确认订单页-积分不够弹窗数量')
              this.lessIntegration = true
            } else if (result.data.code === 0) {
              this.$router.push('/convertsuccess/' + result.data.orderId)
              // 保存发货日期数据
              sessionStorage.setItem('sendGoods', result.data.deliverTime)
            } else {
              alert('网络异常')
              alert(result.data)
            }
            Indicator.close()
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    },
    computed: {
      totalIntegration: function () {
        return (this.item.jifenPrice || 0) * this.num
      }
    }
  }
</script>

<style scoped>
  .address{
    background: #fff;
    border-top: .1rem solid #e6e6e6;
    padding: 3rem 0;
  }
  .borderWarn{
    border: .1rem solid red;
    margin-top: .1rem;
  }
  .car{
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
  }
  .address_con{
    width: 80%;
  }
  .accept_people{
    color: #333;
    font-size: 3.2rem;
    font-weight: 400;
  }
  .accept_people span{
    float: right;
  }
  .address_con p{
    color: #999;
    font-size: 2.6rem;
    margin-top: 1.5rem;
    line-height: 3rem;
  }
  .arrow{
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
    text-align: right;
  }
  .address img{
    width: 50%;
    margin-top: 3rem;
  }
  .noAddress{
    padding: 3rem 0;
    background: #fff;
    vertical-align: middle;
  }
  .noAddress img{
    width: 50%;
    margin-top: .6rem;
  }
  .noAddress .address_con p{
    color: #666;
    margin: 0;
    line-height: 5rem;
    font-size: 3rem;
    margin-top: .1rem;
  }
  .noAddress .arrow img{
    margin-top: 1.2rem;
  }
  /* 商品信息 */
  .goods{
    border-top: 0.1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
    background: url("../assets/lineBg.png") repeat-x;
  }
  .picAndname{
    padding: 6rem 0 4rem;
    width: 100%;
  }
  .picLeft{
    float: left;
    width: 30%;
  }
  .pic{
    width: 16rem;
    height: 16rem;
    box-flex: 1.0;
    -webkit-box-flex: 1.0;
    -moz-box-flex: 1.0;
    float: left;
  }
  .pic img{
    width: 100%;
    height: 100%;
    border: .1rem solid #e6e6e6;
    display: block;
  }
  .name{
    width: 69%;
    /*padding-left: 3rem;*/
    float: left;
  }
  .name h2{
    color: #333;
    font-size: 3rem;
    font-weight: 700;
    margin-top: 2rem;
  }
  .name span{
    color: #666;
    font-size: 2.6rem;
  }
  .name p{
    color: #999;
    font-size: 2.6rem;
    margin-top: 1.5rem ;
  }
  .name p .integration{
    color: #f93;
    font-size: 3.6rem;
  }
  .name p .num{
    font-size: 2.6rem;
    float: right;
    margin-top: 1rem;
  }
  /* 商品数量 */
  .goodsNum{
    width: 100%;
    height: 11rem;
    color: #333;
    font-size: 2.8rem;
    line-height: 11rem;
    border-bottom: 0.1rem solid #e6e6e6;
    background: #fff;
  }
  .numLeft{
    width: 30%;
    float: left;
  }
  .numRight{
    width: 70%;
    float: right;
    text-align: right;
  }
  .numRight a{
    width: 7rem;
    height: 7rem;
    font-size: 4rem;
    border: .1rem solid #e6e6e6;
    display: inline-block;
    line-height: 7rem;
    text-align: center;
    background: #f1f1f1;
  }
  .numRight span{
    margin: 0 1rem;
  }
  .buyNum{
    width: 3rem;
    display: inline-block;
    text-align: center;
  }
  /* 合计 */
  .integrationCount .numRight{
    line-height: 3rem;
    text-align: right;
  }
  .integrationCount .numRight p{
    color: #333;
    font-size: 3.6rem;
    margin-top: 3rem;
  }
  .integrationCount .numRight p > span {
    color: #333;
    font-size: 2.8rem;
  }
  .integrationCount .numRight span{
    color: #999;
    font-size: 2.6rem;
    margin: 0;
  }

  /* 确认兑换 */
  .nowBuy{
    width: 100%;
    height: 9rem;
    line-height: 9rem;
    background: #f93;
    font-size: 3.2rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .buy{
    color: #fff;
    display: block;
  }
</style>
