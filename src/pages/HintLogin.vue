<template>
  <div class="login">
    <div class="shadow">
      <div class="wrapper">
        <p><i></i></p>
        <h2>请先登录理财农场账号</h2>
        <div class="btn login">立即登录</div>
        <div class="btn reg">注册拿200元红包</div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
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
    border-radius: 2rem;
    background: #fff;
    position: absolute;
    top: 30%;
    margin-left: 10%;
    text-align: center;
  }
  .wrapper p{
    height: 2.8rem;
    margin: 2rem 2.4rem 0;
  }
  .wrapper p i{
    width: 2.8rem;
    height: 2.8rem;
    background: url("../assets/close.png")no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
    display: block;
    float: right;
  }
  .wrapper h2{
    color: #333;
    font-size: 3rem;
    margin-top: 6rem;
  }
  .btn{
    height: 8rem;
    font-size: 3.4rem;
    line-height: 8rem;
    text-align: center;
    -webkit-border-radius: .4rem;
    -moz-border-radius: .4rem;
    border-radius: .4rem;
  }
  .login{
    color: #fff;
    background: #10bfc7;
    margin: 6rem 4rem 2rem;
  }
  .reg{
    color: #f93;
    border: .1rem solid #f93;
    margin: 2.6rem 4rem 3.8rem;
  }
</style>
