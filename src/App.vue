<template>
  <div id="app">
    <transition class="fade">
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script>
  import wx from 'weixin-jsapi'
  export default {
    mounted () {
      // 动态获取js-sdk接口参数
      this.axios({
        method: 'get',
        url: '/handler/weixin/sign.js?v=' + new Date().getTime()
      }).then((result) => {
        let timestamp = ''
        let signature = ''
        let sig = result.data.split(',')
        for (let i = 0; i < sig.length; i++) {
          if (sig[i].indexOf('timestamp') > -1) {
            timestamp = sig[i].split(':')[1]
          }
          if (sig[i].indexOf('signature') > -1) {
            signature = sig[i].split(':')[1].replace(/"/g, '')
          }
        }
        wx.config({
          debug: false,
          appId: 'wx2e1ff84ed8bb5a1c',
          timestamp: timestamp,
          nonceStr: 'randomstr123QQ',
          signature: signature,
          jsApiList: [
            'openCard',
            'addCard',
            'chooseCard',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'hideMenuItems',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ]
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style>
  @import "style/common.css";

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
