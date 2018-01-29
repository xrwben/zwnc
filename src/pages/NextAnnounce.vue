<template>
  <div class="nextAnnounce">
    <h2 class="caption">
      <i></i><span>下期预告</span>
    </h2>
    <div class="content" v-for="announce in announces">
      <!-- 不是图片不是链接 -->
      <div v-if="!announce.htmlImage & !announce.htmlUrl" class="info_details clearfix" v-track-event.click="{category: '下期预告', action: 'click', opt_label: '首页-下期预告'}">
        <div class="left">
          <img :src="announce.image">
        </div>
        <div class="right">
          <p class="name">{{ announce.title }}</p>
          <p class="publish">发布时间</p>
          <p class="time"><span>{{ announce.nextAdvert | month }}</span>月<span>{{ announce.nextAdvert | date }}</span>日<span>{{ announce.nextAdvert | hours }}</span>时<span>{{ announce.nextAdvert | minutes }}</span>分</p>
        </div>
      </div>
      <!--<a class="tz" :href="announce.htmlImage || announce.htmlImage" target="_blank">-->
      <!-- 是图片 -->
      <router-link v-if="announce.htmlImage && !announce.htmlUrl" :to="{path: `/image?srcUrl=${announce.htmlImage}`}">
        <div class="info_details clearfix" v-track-event.click="{category: '下期预告', action: 'click', opt_label: '首页-下期预告'}">
          <div class="left">
            <img :src="announce.image">
          </div>
          <div class="right">
            <p class="name">{{ announce.title }}</p>
            <p class="publish">发布时间</p>
            <p class="time"><span>{{ announce.nextAdvert | month }}</span>月<span>{{ announce.nextAdvert | date }}</span>日<span>{{ announce.nextAdvert | hours }}</span>时<span>{{ announce.nextAdvert | minutes }}</span>分</p>
          </div>
        </div>
      </router-link>
      <!--</a>-->
      <!-- 是链接不是图片 -->
      <a class="tz" v-if="announce.htmlUrl && !announce.htmlImage" :href="announce.htmlUrl" target="_blank">
        <div class="info_details clearfix" v-track-event.click="{category: '下期预告', action: 'click', opt_label: '首页-下期预告'}">
          <div class="left">
            <img :src="announce.image">
          </div>
          <div class="right">
            <p class="name">{{ announce.title }}</p>
            <p class="publish">发布时间</p>
            <p class="time"><span>{{ announce.nextAdvert | month }}</span>月<span>{{ announce.nextAdvert | date }}</span>日<span>{{ announce.nextAdvert | hours }}</span>时<span>{{ announce.nextAdvert | minutes }}</span>分</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['announces'],
    filters: {
      month: function (value) {
        return (new Date(value).getMonth() + 1 || 0) < 10 ? '0' + (new Date(value).getMonth() + 1 || 0) : (new Date(value).getMonth() + 1 || 0)
      },
      date: function (value) {
        return (new Date(value).getDate() || 0) < 10 ? '0' + (new Date(value).getDate() || 0) : (new Date(value).getDate() || 0)
      },
      hours: function (value) {
        return (new Date(value).getHours() || 0) < 10 ? '0' + (new Date(value).getHours() || 0) : (new Date(value).getHours() || 0)
      },
      minutes: function (value) {
        return (new Date(value).getMinutes() || 0) < 10 ? '0' + (new Date(value).getMinutes() || 0) : (new Date(value).getMinutes() || 0)
      }
    }
  }
</script>

<style scoped>
  .nextAnnounce{
    margin-top:2rem;
    background: #fff;
    overflow: hidden;
    padding-bottom: 2rem;
  }
  .info_details{
    width: 100%;
    height: 24rem;
    background: #f4f4f4;
    border-radius: 5px;
    margin-bottom: 2rem;
  }
  .left{
    float: left;
    text-align: center;
    margin-left: 3rem;
    transform: translateY(4rem);
  }
  .left img{
    width: 16rem;
    height: 16rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    border: 0.1rem solid #e6e6e6;
  }
  .right{
    float: left;
    padding-left: 4.9rem;
  }
  .name{
    font-size: 3.4rem;
    color: #333;
    font-weight: 700;
    margin-top: 4rem;
  }
  .publish{
    font-size: 2.4rem;
    color: #666;
    margin-top: 1rem;
  }
  .time{
    margin: 1rem 0;
    color: #666;
    font-size: 2.6rem;
    line-height: 6rem;
    overflow: hidden;
  }
  .time span{
    width: 5rem;
    height: 6rem;
    background: #f93;
    display: inline-block;
    font-size: 2.8rem;
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #fff;
    margin: 0 0.5rem;
  }
  .time span:first-child{
    margin-left: 0;
  }

</style>
