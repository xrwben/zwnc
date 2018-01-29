<template>
  <div class="myorder paddingTop">
    <!--我的订单标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          我的订单
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--tab列表-->
    <div class="section">
      <div class="orderTabs display_box">
        <div class="tab-item" v-for="(tabName, index) in tabNames" v-bind:class="{active: index == isActive}" v-on:click="changeNav(index)">
          {{ tabName }}
        </div>
      </div>
    </div>
    <!--内容-->
    <div class="section">
      <order-list :orders="orders"></order-list>
      <div class="orderBg" v-show="!orders.totalCount">
        <img src="../assets/orderBg.png">
        <p v-if="routerQuery == 0">你还没有订单，赶紧下单吧\(0^◇^0)/</p>
        <p v-if="routerQuery == 1">你还没有待发货的订单哦\(0^◇^0)/</p>
        <p v-if="routerQuery == 2">你还没有已发货的订单哦\(0^◇^0)/</p>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderList from '../pages/OrderList.vue'
  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        tabNames: [' 全部 ', '待发货', '已发货'],
        orders: [],
        routerQuery: 0
      }
    },
    components: {
      OrderList
    },
    computed: {
      isActive () {
        return this.$route.query.status
      }
    },
    created () {
      this.getItems()
      this.$router.replace(`/myorder?status=${this.routerQuery}`)
      this.routerQuery = this.isActive
    },
    methods: {
      changeNav (index) {
        if (index === 0) {
          this.$ba.trackEvent('全部TAB', '点击', '订单列表页-点击全部TAB')
        }
        if (index === 1) {
          this.$ba.trackEvent('待发货TAB', '点击', '订单列表页-点击待发货TAB')
        }
        if (index === 2) {
          this.$ba.trackEvent('已发货TAB', '点击', '订单列表页-点击已发货TAB')
        }
        this.routerQuery = index
        this.getItems()
        this.$router.replace(`/myorder?status=${this.routerQuery}`)
      },
      getItems () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        axios({
          method: 'post',
          url: '/zwnc/app/order/list',
          params: {
            status: this.routerQuery
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.orders = result.data.page
          } else {
            return false
          }
          Indicator.close()
        }, () => {
          Indicator.close()
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .myorder{
    padding-bottom: 1rem;
  }
  .orderTabs{
    height: 8.8rem;
    color: #999;
    font-size: 2.8rem;
    line-height: 8.8rem;
    background: #fff;
    border-top: .1rem solid #e6e6e6;
    text-align: center;
  }
  .tab-item{
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
  }
  .active{
    border-bottom: .2rem solid #10bfc7;
    color: #10bfe7;
  }
  .orderBg{
    text-align: center;
    color: #666;
    font-size: 2.6rem;
  }
  .orderBg img{
    width: 43rem;
    height: 26.5rem;
    margin-top: 15rem;
    margin-bottom: 2rem;
  }
</style>
