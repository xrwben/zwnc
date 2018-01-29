<template>
  <div class="hintAddress">
    <div class="shadow">
      <div class="wrapper">
        <p>抱歉，由于保鲜问题</p>
        <p>鲜果暂不支持发往此地址</p>
        <div class="btnTab display_box">
          <div class="btn left" @click="close" v-track-event.click="{category: '返回', action: '点击', opt_label: '确认订单页-地址不支持弹窗-点击返回'}">返回</div>
          <div class="btn right" @click="lookOther" v-track-event.click="{category: '看看其他', action: '点击', opt_label: '确认订单页-地址不支持弹窗-点击看看其他'}">看看其它</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    methods: {
      close: function () {
        this.$emit('hintAddress')
      },
      lookOther: function () {
        if (this.id === '') {
          this.$router.push('/')
        } else {
          this.$router.push(`/goodsdetails/${this.id}`)
        }
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
  .btnTab{
    margin-top: 5.2rem;
    border-top: .1rem solid #999;
  }
  .btnTab{
    height: 8rem;
    color: #666;
    font-size: 3.4rem;
    line-height: 8rem;
    text-align: center;
  }
  .btn{
    box-flex: 1;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
  }
  .right{
    color: #10bfca;
    border-left: .1rem solid #999;
  }
</style>
