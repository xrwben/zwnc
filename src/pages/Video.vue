<template>
  <div class="video">
    <video id="videoObj" controls>
      <source :src="vedioSrc" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="shadow" v-show="shadow_isShow" @click="ifWifi"></div>

    <!--视频播放温馨提示-->
    <div class="section">
      <hint-wifi v-show="wifi" v-on:hintWifi="hintWifi"></hint-wifi>
    </div>
  </div>
</template>

<script>
  import HintWifi from './HintWifi.vue'
  export default {
    data () {
      return {
        wifi: false,
        shadow_isShow: true,
        flag: 0
      }
    },
    components: {
      HintWifi
    },
    props: ['vedioSrc'],
    mounted () {
      let videoObj = document.getElementById('videoObj')
      let con = navigator.connection
      if (navigator.connection) {
        navigator.connection.onchange = function () {
          if (con) {
            let network = con.type
            if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
              this.wifi = true
              videoObj.pause()
            } else {
              videoObj.play()
            }
          }
        }
      }
    },
    methods: {
      hintWifi: function (msg) {
        if (msg === 'Y') {
          this.wifi = false
          this.shadow_isShow = false
          document.getElementById('videoObj').play()
        } else {
          this.wifi = false
          document.getElementById('videoObj').pause()
        }
      },
      // 判断是否为WiFi
      ifWifi: function () {
        let videoObj = document.getElementById('videoObj')
        let con = navigator.connection || {type: 'wifi'}
        let network = con.type
        if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
          this.wifi = true
        } else {
          if (this.flag === 0) {
            this.shadow_isShow = false
            videoObj.play()
            this.flag = 1
          } else {
            this.shadow_isShow = true
            videoObj.pause()
            this.flag = 0
          }
        }
      }
    }
  }
</script>

<style scoped>
  .video{
    width: 100%;
    height: 40rem;
    position: relative;
  }
  .video video{
    width: 100%;
    height: 100%;
  }
  .shadow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
