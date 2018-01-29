<template>
  <div class="image paddingTop">
    <!--图片展示区域-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          滋味农场
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <div class="imgCon">
      <img :src="$route.query.srcUrl"/>
    </div>
  </div>
</template>

<script>

</script>

<style>
  .image{
    width: 100%;
    max-width: 100%;
  }
  .imgCon{
    width: 100%;
  }
  .imgCon img{
    width: 100%;
  }
</style>
