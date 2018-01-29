<template>
  <div class="CommentSuccess">
    <div class="shadow">
      <div class="wrapper">
        <p>提交成功，感谢您的支持！</p>
        <div class="btnTab">
          <div class="btn left" @click="close">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      close: function () {
        this.$emit('commentSuccess')
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
  .btn{
    height: 8rem;
    font-size: 3.4rem;
    line-height: 8rem;
    border-radius: .4rem;
    color: #10bfc7;
    margin-top: 5.2rem;
    border-top: .1rem solid #999;
  }
</style>
