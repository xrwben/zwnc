<template>
  <div class="convertSuccess paddingTop">
    <!--兑换成功标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.push(`/`)" v-track-event.click="{category: '返回', action: '点击', opt_label: '兑换成功页-左上角-返回'}">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          兑换
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--兑换成功logo-->
    <div class="section">
      <div class="logo">
        <div class="content">
          <img src="../assets/addressDefault.png">
          <h2>恭喜您兑换成功！</h2>
          <p>我们将于{{ sendGoods }}</p>
          <button class="share" @click="shareBtn()" v-track-event.click="{category: '分享你的成果', action: '点击', opt_label: '兑换成功页-点击分享你的成果'}">分享你的成果</button>
          <button class="lookOrder" @click="lookOrder" v-track-event.click="{category: '查看订单', action: '点击', opt_label: '兑换成功页-点击查看订单'}">查看我的订单</button>
        </div>
      </div>
    </div>

    <div class="shareArrow" v-show="share_isShow" @click="hideShare">
      <img width="100%" src="../assets/shareArrow.png"/>
    </div>

  </div>
</template>

<script>
  import wx from 'weixin-jsapi'
  export default {
    data () {
      return {
        share_isShow: false,
        shareData: JSON.parse(sessionStorage.getItem('shareData')),
        sendGoods: sessionStorage.getItem('sendGoods')
      }
    },
    mounted () {
//      let logoUrl = this.shareData.itemShareImage.replace(/https:\/\/yufeng-zwnc.oss-cn-shenzhen.aliyuncs.com/, 'https://zw.lcfarm.com')
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
        wx.onMenuShareTimeline({
          title: this.shareData.itemName,
          link: 'https://zw.lcfarm.com/goodsdetails/' + this.shareData.itemId,
          imgUrl: 'https://a2.qpic.cn/psb?/V123M85a3Pf0D2/u04lD2QsdNpmZOCYEjO3OE8RPnL2qkE27*Y5xRFRgV4!/b/dGwBAAAAAAAA&bo=lgCWAAAAAAARBzA!&rf=viewer_4',
          success: function () {
            console.log('分享成功')
          },
          cancel: function () {
            console.log('取消')
          }
        })
        wx.onMenuShareAppMessage({
          title: this.shareData.itemName,
          desc: this.shareData.itemIntroduce,
          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link: 'https://zw.lcfarm.com/goodsdetails/' + this.shareData.itemId,
          imgUrl: 'https://a2.qpic.cn/psb?/V123M85a3Pf0D2/u04lD2QsdNpmZOCYEjO3OE8RPnL2qkE27*Y5xRFRgV4!/b/dGwBAAAAAAAA&bo=lgCWAAAAAAARBzA!&rf=viewer_4',
          type: '',
          dataUrl: '',
          success: function () {
            alert
            console.log('分享成功')
          },
          cancel: function () {
            console.log('取消')
          }
        })
        wx.onMenuShareQQ({
          title: this.shareData.itemName,
          desc: this.shareData.itemIntroduce,
          link: 'https://zw.lcfarm.com/goodsdetails/' + this.shareData.itemId,
          imgUrl: 'https://a2.qpic.cn/psb?/V123M85a3Pf0D2/u04lD2QsdNpmZOCYEjO3OE8RPnL2qkE27*Y5xRFRgV4!/b/dGwBAAAAAAAA&bo=lgCWAAAAAAARBzA!&rf=viewer_4',
          success: function () {
            console.log('分享成功')
          },
          cancel: function () {
            console.log('取消')
          }
        })
        wx.onMenuShareQZone({
          title: this.shareData.itemName,
          desc: this.shareData.itemIntroduce,
          link: 'https://zw.lcfarm.com/goodsdetails/' + this.shareData.itemId,
          imgUrl: 'https://a2.qpic.cn/psb?/V123M85a3Pf0D2/u04lD2QsdNpmZOCYEjO3OE8RPnL2qkE27*Y5xRFRgV4!/b/dGwBAAAAAAAA&bo=lgCWAAAAAAARBzA!&rf=viewer_4',
          success: function () {
            console.log('分享成功')
          },
          cancel: function () {
            console.log('取消')
          }
        })
      })
    },
    methods: {
      hideShare: function () {
        this.share_isShow = false
      },
      shareBtn: function () {
        // 判断是否为在App中
        if (sessionStorage.getItem('htmlFrom') === 'fromApp') {
          let logoUrl = this.shareData.itemShareImage.replace(/https:\/\/lcfarm-zwnc.oss-cn-shenzhen.aliyuncs.com/, 'https://zw.lcfarm.com')
          let datas = {
            'title': '',
            'content': '',
            'logoUrl': logoUrl,
            'supportPlatform': 'All'
          }
          window.native.callAppAction(JSON.stringify({'action': 'share', 'data': datas}))
        } else {
          this.share_isShow = true
        }
      },
      close: function () {
        this.share_isShow = false
      },
      lookOrder: function () {
        this.$router.push('/myorder')
      }
    }
  }
</script>

<style scoped>
  .logo{
    text-align: center;
  }
  .logo img{
    width: 10rem;
    height: 10rem;
    margin-top: 8rem;
  }
  .logo h2{
    color: #333;
    font-size: 3.4rem;
    margin-top: 3rem;
  }
  .logo p{
    color: #999;
    font-size: 2.4rem;
    margin-top: 2rem;
  }
  .share{
    width: 100%;
    height: 8.8rem;
    line-height: 8.8rem;
    background: #f93;
    color: #fff;
    font-size: 3.4rem;
    margin-top: 14rem;
    border: 0;
    outline: none;
  }
  .lookOrder{
    width: 100%;
    height: 8.8rem;
    line-height: 8.8rem;
    background: #fff;
    color: #f93;
    font-size: 3.4rem;
    margin-top: 4.8rem;
    border: .1rem solid #e0e0e0;
    outline: none;
  }

  /* 分享弹窗样式 */
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
    width: 65%;
    height: 88rem;
    z-index: 9;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .wrapper h2{
    color: #fff;
    font-size: 4.6rem;
    font-weight: bold;
  }
  .wrapper img{
    margin-top: 2rem;
    width: 100%;
    height: 81rem;
    border-radius: 1rem;
  }
  .shareBox{
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 99;
  }
  .share_list{
    background: #fff;
    padding: 5rem 0 8rem;
  }
  .item{
    box-flex: 1.0;
    -webkit-box-flex: 1.0;
    -moz-box-flex: 1.0;
    text-align: center;
  }
  .item p{
    color: #999;
    font-size: 2.6rem;
    margin-top: 1rem;
  }
  .qxBtn{
    width: 100%;
    line-height: 8rem;
    background: #f93;
    color: #fff;
    font-size: 3.4rem;
    border: 0;
    outline: none;
  }
  .shareArrow{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: rgba(0,0,0,.7);
  }
</style>
