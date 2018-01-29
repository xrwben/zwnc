<template>
  <div class="hintIntegration">
    <div class="shadow">
      <div class="wrapper">
        <p>亲爱的用户</p>
        <p>您的积分不足以支付本订单，</p>
        <p>投资可以赚积分哦!</p>
        <div class="btnTab display_box">
          <div class="btn left" @click="close" v-track-event.click="{category: '返回', action: '点击', opt_label: '确认订单页-积分不够弹窗数量-点击返回'}">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      close: function () {
        this.$emit('hintIntegration')
      }
    }
  }
</script>

<style scoped>
  .shadow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    overflow: hidden;
  }
  .wrapper{
    width: 80%;
    z-index: 9;
    border-radius: 1rem;
    background: #fff;
    position: absolute;
    top: 30%;
    margin-left: 10%;
    text-align: center;
  }
  .wrapper p{
    color: #333;
    font-size: 3rem;
    margin-top: 6.3rem;
  }
  .wrapper p:nth-child(2){
    color: #333;
    font-size: 3rem;
    margin-top: 2.2rem;
  }
  .wrapper p:nth-child(3){
    color: #333;
    font-size: 3rem;
    margin-top: 2.2rem;
  }
  .btn{
    height: 8rem;
    font-size: 3.4rem;
    line-height: 8rem;
    color: #10bfc7;
    margin-top: 5.2rem;
    border-top: .1rem solid #999;
    box-flex: 1.0;
    -moz-box-flex: 1.0;
    -webkit-box-flex: 1.0;
  }
</style>
