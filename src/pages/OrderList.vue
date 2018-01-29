<template>
  <div class="orderList">
    <div class="orderDetails" v-for="order in orders.list">
      <router-link :to="{name: 'OrderDetails', params:{id: order.orderId}}">
        <div class="content">
          <div class="picAndname clearfix" v-track-event.click="{category: '订单入口', action: '点击', opt_label: '订单列表页-点击订单入口'}">
            <div class="picLeft clearfix">
              <div class="pic left">
                <img :src="order.image">
              </div>
            </div>
            <div class="name right">
              <h2>{{ order.itemName }} {{ order.format }}</h2>
              <span class="ellipsis">{{ order.introduce }}</span>
              <p><span style="color: #f93">{{ order.jifenPrice }}</span>积分<span class="num">x{{ order.num }}</span></p>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="content">
            <div class="status">
              状态：{{ order.status | orderStatus }}<span>合计：{{ order.totalJifenPrice }}积分</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['orders'],
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
//            return '可评论'
            return '已发货'
          case 4:
//            return '已评论'
            return '已发货'
          case 5:
            return '已取消'
        }
      }
    }
  }
</script>

<style scoped>
  .orderDetails{
    background: #fff;
    margin-bottom: 2rem;
    border-top: .1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
  }
  .picAndname{
    width: 100%;
    padding: 2rem 0;
  }
  .picLeft{
    float: left;
    width: 30%;
  }
  .pic{
    width:16rem;
    height: 16rem;
    padding: 1rem;
    float: left;
  }
  .pic img{
    width: 100%;
    height:100%;
    border: .1rem solid #e6e6e6;
  }
  .name{
    width: 69%;
    /*padding-left: 2rem;*/
    float: left;
  }
  .name h2{
    color: #333;
    font-size: 3rem;
    font-weight: 700;
    margin-top: 2rem;
  }
  .name > span{
    font-size: 2.6rem;
    color: #666;
    display: block;
    /*margin-top: 1rem;*/
  }
  .name p{
    font-size: 2.6rem;
    margin-top: 2.5rem ;
    color: #999;
  }
  .name p > span{
    font-size: 3.6rem;
  }
  .name p .num{
    float: right;
    font-size: 2.6rem;
    margin-top: 1rem;
  }
  .footer{
    height: 8rem;
    line-height: 8rem;
    color: #666;
    font-size: 2.6rem;
    border-top: .1rem solid #e6e6e6;
  }
  .status span{
    float: right;
    color: #333;
  }
</style>
