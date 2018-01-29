<template>
  <div class="customerService">
    <div class="shadow">
      <div class="wrapper">
        <p>拨打客服热线</p>
        <p>400-6038-999</p>
        <span class="serviceTime">服务时间:9:00-20:00(周末:9:00-17:00)</span>
        <div class="btnTab display_box">
          <div class="btn left" @click="close">取消</div>
          <div class="btn right">
            <a href="tel:400-6038-999">拨打</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      close: function () {
        this.$emit('customerSerice')
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
  .serviceTime{
    color: #333;
    font-size: 3rem;
    margin-top: 2rem;
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
    border-left: .1rem solid #999;
  }
  .right a{
    color: #10bfca;
  }
</style>
