<template>
  <div class="orderDetails paddingTop">
    <!--订单详情标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          订单详情
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--物流追踪-->
    <div class="section">
      <div class="logistics" v-if="Object.keys(this.logistics).length">
        <router-link :to="{name:'LogisticsTrack', params:{id: order.orderId}}">
          <div class="content display_box">
            <div class="car">
              <img class="" src="../assets/order_car.png">
            </div>
            <!-- 根据物流状态码判断是否为问题件 -->
            <div v-if="logistics.State !== '0'" class="logistics_con">
              <h2>{{ traces.AcceptStation }}</h2>
              <p>{{ traces.AcceptTime }}</p>
            </div>
            <div v-if="logistics.State === '0'" class="logistics_con">
              <p>{{ logistics.Reason }}</p>
            </div>
            <div class="arrow">
              <img class="" src="../assets/order_logistics.png">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!--收货人地址-->
    <div class="section">
      <div class="address logistics">
        <div class="content display_box">
          <div class="car">
            <img class="" src="../assets/order_address.png">
          </div>
          <div class="logistics_con">
            <h2>{{ address.receiveName }}  {{ address.contactPhone}}</h2>
            <p>{{ address.provinces }}{{ address.city }}{{ address.county }}{{address.street}}{{ address.fullAddress }}</p>
          </div>
          <div class="arrow">&emsp;&emsp;</div>
        </div>
      </div>
    </div>
    <!--购买商品详情-->
    <div class="section">
      <div class="goods" v-track-event.click="{category: '物流跟踪', action: '点击', opt_label: '订单详情页-已发货状态-点击物流跟踪入口'}">
        <router-link :to="{name: 'GoodsDetails', params:{id: order.itemId}}">
          <div class="content">
            <div class="picAndname clearfix">
              <div class="picLeft">
                <div class="pic left">
                  <img :src="order.image">
                </div>
              </div>
              <div class="name right">
                <h2>{{ order.itemName }} {{ order.format }}</h2>
                <span class="ellipsis">{{ order.introduce }}</span>
                <p><span style="color: #f93;font-size: 3.6rem;">{{ order.jifenPrice }}</span>积分<span class="num">x{{ order.num }}</span></p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!--订单信息-->
    <div class="section">
      <div class="orderInfo">
        <div class="content">
          <p>订单编号<span>{{ order.orderId }}</span></p>
          <p>兑换完成时间<span>{{ order.paymentTime | time }}</span></p>
        </div>
      </div>
    </div>
    <!--物流信息-->
    <div class="section">
      <div class="logisticsInfo orderInfo">
        <!--已发货-->
        <div class="delivered">
          <div class="content" v-if="order.status === 2 || order.status === 3 || order.status === 4">
            <p>订单状态 <span>{{ order.status | orderStatus}}</span></p>
            <p>发货时间 <span>{{ order.consignTime | time }}</span></p>
            <p>物流公司 <span>{{ order.shippingName }}</span></p>
            <p>物流单号 <span>{{ order.shippingCode }}</span></p>
          </div>
        </div>
        <!--待发货-->
        <div class="undelivered" v-if="order.status === 1">
          <div class="content">
            <p>订单状态 <span>{{ order.status | orderStatus}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!--订单合计-->
    <div class="section">
      <div class="orderIntegration">
        <div class="content">
          <p>订单合计 <span>{{ order.totalJifenPrice }}积分</span></p>
        </div>
      </div>
    </div>
    <!--我的反馈内容-->
    <div class="section">
      <div class="commentContent" v-if="order.comment">
        <div class="content">
          <h2>我的评价</h2>
          <p>{{ order.comment }}</p>
        </div>
      </div>
    </div>
    <!--联系客服按钮-->
    <div class="section">
      <div class="customerService" v-track-event.click="{category: '联系客服', action: '点击', opt_label: '订单详情页-已发货状态-点击联系客服'}">
        <a href="javascript:void(0)" @click="customerServiceBtn()">联系客服</a>
      </div>
    </div>
    <!--我要反馈按钮-->
    <div class="section">
      <div class="feedBack" v-show="commentBtn_isShow" @click="commentBtn">
        请写下您的评价
      </div>
    </div>

    <!--反馈评论弹窗-->
    <feed-back v-show="comment_isShow" v-on:feedBack="feedBack"></feed-back>
    <!--评论成功弹窗-->
    <comment-success v-show="commentSs_isShow" v-on:commentSuccess="commentSuccess"></comment-success>
    <!--客服热线弹窗-->
    <customer-service v-show="phone_isShow"  v-on:customerSerice="customerSerice"></customer-service>
  </div>
</template>

<script>
  import FeedBack from '../pages/FeedBack.vue'
  import CustomerService from '../pages/CustomerService.vue'
  import CommentSuccess from '../pages/CommentSuccess.vue'
//  import axios from 'axios'
  import { Indicator } from 'mint-ui'

  export default {
    data () {
      return {
        logistics_isShow: false,
        logistics: {}, // 物流
        traces: {},
        address: {},  // 地址
        order: {},  // 订单
        commentBtn_isShow: false,  // 我要反馈
        comment_isShow: false, // 评论弹窗
        commentSs_isShow: false, // 评论成功
        phone_isShow: false  // 客服电话弹窗
      }
    },
    components: {
      FeedBack,
      CustomerService,
      CommentSuccess
    },
    created () {
      this.getData()
    },
    methods: {
      feedBack: function (msg) {  //  关闭评论弹窗
        this.comment_isShow = false
        if (msg === 'success') {
          this.commentSs_isShow = true
        }
      },
      commentBtn: function () {  // 我要反馈按钮
        this.comment_isShow = true
      },
      commentSuccess: function () {  // 关闭评论成功
        this.commentSs_isShow = false
        this.commentBtn_isShow = false
        // 评论成功重新请求数据
        this.getData()
      },
      customerServiceBtn: function () {  // 客服按钮
        this.phone_isShow = true
      },
      customerSerice: function () {  // 关闭客服
        this.phone_isShow = false
      },
      getData: function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.axios({
          method: 'post',
          url: '/zwnc/app/order/orderDetial',
          params: {
            orderId: this.$route.params.id
          }
        }).then(result => {
          if (result.data.code === 0) {
            this.logistics = result.data.wuliu
            if (Object.keys(this.logistics).length !== 0 && this.logistics.Traces.length) { // 判断对象是否为空
              this.traces = result.data.wuliu.Traces[result.data.wuliu.Traces.length - 1]
            }
            this.address = result.data.address
            this.order = result.data.order
            if (this.order.status === 3) {
              this.commentBtn_isShow = true
            }
            if (this.order.status === 4) {
              this.commentBtn_isShow = false
            }
          }
          Indicator.close()
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    filters: {
      orderStatus: function (value) {  // 订单状态
        switch (value) {
          case 0:
            return '未支付'
          case 1:
            return '待发货'
          case 2:
            return '已发货'
          case 3:
            return '可评论'
          case 4:
            return '已评论'
          case 5:
            return '已取消'
        }
      },
      time: function (value) {
        let year = new Date(value).getFullYear() || 0
        let month = (new Date(value).getMonth() + 1 || 0) < 10 ? '0' + (new Date(value).getMonth() + 1 || 0) : (new Date(value).getMonth() + 1 || 0)
        let date = (new Date(value).getDate() || 0) < 10 ? '0' + (new Date(value).getDate() || 0) : (new Date(value).getDate() || 0)
        let hour = (new Date(value).getHours() || 0) < 10 ? '0' + (new Date(value).getHours() || 0) : (new Date(value).getHours() || 0)
        let minute = (new Date(value).getMinutes() || 0) < 10 ? '0' + (new Date(value).getMinutes() || 0) : (new Date(value).getMinutes() || 0)
        let second = (new Date(value).getSeconds() || 0) < 10 ? '0' + (new Date(value).getSeconds() || 0) : (new Date(value).getSeconds() || 0)
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
      }
    }
  }
</script>

<style scoped>
  .orderDetails{
    padding-bottom: 9rem;
  }
  .logistics{
    background: #fff;
    border-top: .2rem solid #e6e6e6;
    padding: 3rem 0;
  }
  .car{
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
  }
  .logistics_con{
    width: 80%;
  }
  .logistics_con h2{
    color: #333;
    font-size: 3rem;
    font-weight: 400;
  }
  .logistics_con p{
    color: #999;
    font-size: 2.6rem;
    margin-top: 2.2rem;
  }
  .arrow{
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
    text-align: right;
   }
  .logistics img{
    width: 60%;
    margin-top: 2.5rem;
  }
  /* 商品信息 */
  .goods{
    border-bottom: .1rem solid #e6e6e6;
    background: url("../assets/lineBg.png")repeat-x;
  }
  .picAndname{
    padding: 6rem 0 4rem;
  }
  .picLeft{
    float: left;
    width: 30%;
  }
  .pic{
    width: 16rem;
    height: 16rem;
    border: .1rem solid #e6e6e6;
    float: left;
  }
  .pic img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .name{
    width: 69%;
    /*padding-left: 3rem;*/
    float: left;
  }
  .name > span{
    font-size: 2.6rem;
    color: #666;
    display: block;
    /*margin-top: 1rem;*/
  }
  .name h2{
    color: #333;
    font-size: 3rem;
    font-weight: 700;
    margin-top: 2rem;
  }
  .name p{
    font-size: 2.6rem;
    margin-top: 1.5rem ;
    color: #999;
  }
  .name p > span{
    font-size: 3.6rem;
    margin-top: .1rem
  }
  .name p .num{
    font-size: 2.6rem;
    margin-top: 1rem;
    float: right;
  }
  /* 订单信息 */
  .orderInfo{
    border-bottom: .1rem solid #e6e6e6;
    background: #fff;
    margin-bottom: 2rem;
  }
  .orderInfo p{
    width: 100%;
    height: 8.8rem;
    line-height: 8.4rem;
    color: #666;
    font-size: 2.8rem;
    border-bottom: .1rem solid #e6e6e6;
  }
  .orderInfo p:last-child{
    border: 0;
  }
  .orderInfo p span{
    color: #333;
    float: right;
  }
  /* 订单合计 */
  .orderIntegration{
    border-bottom: .1rem solid #e6e6e6;
    background: #fff;
  }
  .orderIntegration p{
    height: 8.8rem;
    line-height: 8.8rem;
    color: #666;
    font-size: 2.8rem;
  }
  .orderIntegration p span{
    color: #333;
    float: right;
  }
  /* 反馈内容 */
  .commentContent{
    margin-top: 2rem;
    background: #fff;
    padding: 2.6rem 0;
  }
  .commentContent h2{
    font-size: 2.6rem;
    color: #999;
    padding-bottom: 2rem;
  }
  .commentContent p{
    font-size: 2.6rem;
    color: #333;
    line-height: 3.5rem;
  }
  /* 联系客服 */
  .customerService{
    padding: 12rem 0 6.6rem;
    text-align: center;
  }
  .customerService a{
    color: #01bfc7;
    font-size: 2.8rem;
    margin-top: 2rem;
    text-decoration: underline;
    text-align: center;
  }
  /* 反馈按钮 */
  .feedBack{
    width: 100%;
    height: 8rem;
    background: #F93;
    line-height: 8rem;
    text-align: center;
    font-size: 3.2rem;
    color: #fff;
    margin-top: 8rem;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
