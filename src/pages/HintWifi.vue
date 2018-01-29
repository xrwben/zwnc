<template>
  <div class="hintWifi">
    <div class="shadow">
      <div class="wrapper">
        <h2>温馨提示</h2>
        <p>您正在使用手机流量观看，视频大小为43.4M</p>
        <div class="btnTab display_box">
          <div class="btn left" @click="continueLook">土豪继续</div>
          <div class="btn right" @click="colseLook">下次再看</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   methods: {
     continueLook: function () {
       this.$emit('hintWifi', 'Y')
     },
     colseLook: function () {
       this.$emit('hintWifi', 'N')
     }
   }
 }
</script>

<style scoped>
  .hintWifi{
    height: 100%;
  }
  .shadow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
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
  .wrapper h2{
    color: #333;
    font-size: 3.6rem;
    margin-top: 4.5rem;
    font-weight: 400;
  }
  .wrapper p{
    color: #999;
    font-size: 2.4rem;
    margin-top: 3.6rem;
  }
  .btnTab{
    margin-top: 6rem;
  }
  .btnTab{
    height: 8.8rem;
    color: #666;
    font-size: 3.4rem;
    border-top: .1rem solid #999;
    line-height: 8.8rem;
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
