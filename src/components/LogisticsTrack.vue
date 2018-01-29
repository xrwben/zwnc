<template>
  <div class="logisticsTrack paddingTop">
    <!--物流状态标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          物流状态
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--物流信息-->
    <div class="section">
      <div class="goods">
        <div class="content">
          <div class="picAndname display_box">
            <div class="pic left">
              <img :src="order.image">
            </div>
            <div class="name right">
              <p>物流状态<span>{{ logisticsInfo.State | logisticsState }}</span></p>
              <p>物流公司<span>{{ order.shippingName }}</span></p>
              <p>运单编号<span>{{ logisticsInfo.LogisticCode }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--物流追踪-->
    <div class="section">
      <div class="track">
        <div class="content">
          <ul>
            <li v-for="traces in logisticsInfo.Traces">
              <i></i>
              <div>
                <p>{{ traces.AcceptStation }}</p>
                <span>{{ traces.AcceptTime }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        logisticsInfo: {
          Traces: []
        },
        order: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData: function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.axios({
          method: 'post',
          url: '/zwnc/app/order/orderDetial',
          params: {
            orderId: this.$route.params.id
          }
        }).then(result => {
          if (result.data.code === 0) {
            this.logisticsInfo = result.data.wuliu
            this.logisticsInfo.Traces = result.data.wuliu.Traces.reverse()
            this.order = result.data.order
          }
          Indicator.close()
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    filters: {
      logisticsState: function (value) {  // 物流状态
        let state = ''
        switch (value) {
          case '0':
            state = '无轨迹'
            break
          case '1':
            state = '已揽收'
            break
          case '2':
            state = '在途中'
            break
          case '201':
            state = '到达派件城市'
            break
          case '3':
            state = '已签收'
            break
          case '4':
            state = '问题件'
            break
          default:
            state = value
            break
        }
        return state
      }
    }
  }
</script>

<style scoped>
  .goods{
    border-top: 0.1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
    background: #fff;
  }
  .picAndname{
    padding: 5rem 0 4rem;
  }
  .pic{
    width: 16rem;
    height: 16rem;
    border: .1rem solid #e6e6e6;
    box-flex: 1.0;
    -webkit-box-flex: 1.0;
    -moz-box-flex: 1.0;
  }
  .pic img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .name{
    box-flex: 9.0;
    -webkit-box-flex: 9.0;
    -moz-box-flex: 9.0;
    padding-left: 3rem;
  }
  .name p{
    color: #999;
    font-size: 2.6rem;
    margin-top: 1.6rem;
  }
  .name p span{
    margin-left: 3.8rem;
    color: #333;
  }
  /* 物流追踪 */
  .track{
    background: #fff;
    margin-top: 2rem;
  }
  .track ul{
    padding: 0 2rem;
  }
  .track ul li{
    padding-left: 5rem;
    border-left: .2rem solid #bdbdbd;
    position: relative;
  }
  .track ul li i{
    width: 2.4rem;
    height: 2.4rem;
    background: url("../assets/trackCircle_1.png")no-repeat;
    background-size: cover;
    display: block;
    position: absolute;
    left: -1.4rem;
    top: 50%;
    margin-top: -1.2rem;
  }
  .track ul li:first-child i{
    background: url("../assets/trackCircle_2.png")no-repeat;
    background-size: cover;
    left: -1.4rem;
  }
  .track ul li > div{
    border-bottom: .1rem solid #e6e6e6;
    padding: 3rem 0;
  }
  .track ul li p{
    color: #333;
    font-size: 2.8rem;
  }
  .track ul li span{
    color: #999;
    font-size: 2.6rem;
    line-height:4rem;
  }
</style>
