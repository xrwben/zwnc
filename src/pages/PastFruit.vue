<template>
  <div class="pastfruit">
    <h2 class="caption">
      <i></i><span>往期商品</span>
    </h2>
    <div class="content">
      <div class="fruits_lists">
        <ul class="fruit_item clearfix">
          <li v-for="pastFruit in pastFruits">
            <router-link :to="{name: 'GoodsDetails', params: {id: pastFruit.itemId}}">
              <div class="col-3">
                <div class="name_time">
                  <p class="name ellipsis">{{ pastFruit.name }}</p>
                  <p class="time">{{ pastFruit.putawayTime | formDate }}—{{ pastFruit.soldOutTime | formDate}}</p>
                </div>
                <img :src="pastFruit.simpleImage">
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['pastFruits'],
    filters: {
      formDate: function (value) {
        let month = new Date(value).getMonth() + 1 || '0'
        let date = new Date(value).getDate() || '0'
        return month + '月' + date + '日'
      }
    }
  }
</script>

<style scoped>
  .pastfruit{
    margin-top:2rem;
    background: #fff;
    overflow: hidden;
    padding-bottom: 4rem;
  }
  .fruit_item li{
    width:33.3%;
    float: left;
  }
  .fruit_item li .col-3{
    height: 30rem;
    padding:1rem;
    position: relative;
    overflow: hidden;
  }
  .fruit_item li .col-3 img{
    width: 100%;
    height: 100%;
  }
  /*.name_time{*/
    /*border:1px solid green;*/
    /*text-align: center;*/
    /*padding-top:3.7rem;*/
  /*}*/
  .name_time{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    margin:auto;
    text-align: center;
    padding-top:3.7rem;
  }
  .name{
    font-size: 2.8rem;
    color: #333;
    font-weight: 700;
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
  }
  .time{
    line-heihgt:35px;
    font-size: 2.2rem;
    color: #999;
  }

</style>
