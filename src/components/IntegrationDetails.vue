<template>
  <div class="integrationDetails paddingTop">
    <!--我的积分标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left">
            <i></i><span>返回&emsp;</span>
          </div>
          我的积分
          <div class="myorder header_right" v-track-event.click="{category: '积分规则', action: '点击', opt_label: '我的积分页-右上角-点击积分规则'}">
            <router-link class="right_a" to="/integrationrules">
              积分规则
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!--积分总计-->
    <div class="section">
      <div class="integrationCount">
        <div class="content display_box">
          <div class="countItem">
            <h3>{{ personalIntegral.availableIntegral }}</h3>
            <b>可用积分</b>
          </div>
          <div class="countItem">
            <h3>{{ personalIntegral.accumulateIntegral }}</h3>
            <b>累计赚取</b>
          </div>
          <div class="countItem">
            <h3>{{ personalIntegral.accumulatedConsumptionIntegral }}</h3>
            <b>累计消耗</b>
          </div>
        </div>
      </div>
    </div>
    <!--积分详情-->
    <div class="section">
      <div class="details">
        <div class="content">
          <mt-loadmore @bottom-status-change="handleBottomChange"
                       :bottom-method="loadBottom"
                       :bottom-all-loaded="allLoaded" bottom-pull-text="加载更多"
                       ref="loadmore">

            <div class="integrationDetails-list clearfix" v-for='item in pagesResultData'>
              <div class="conAndTime">
                <p class="tab-con">{{ item.integralSource }}</p>
                <p class="tab-time">{{ item.operatingTime  | time }}</p>
              </div>
              <div class="num">
                {{ item.integralAmount }}
              </div>
            </div>

            <div slot="bottom" class="mint-loadmore-bottom footer">
              <span v-show="bottomStatus === 'pull'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
              <span v-show="bottomStatus === 'loading'">Loading...</span>
              <span v-show="bottomStatus === 'drop'">释放更新</span>
            </div>
          </mt-loadmore>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        personalIntegral: {},
        pagesResult: {},
        pagesResultData: [],
        bottomStatus: '',
        allLoaded: false,
        total: 0,
        pageNo: 1
      }
    },
    created: function () {
      this.getData()
    },
    methods: {
      getData: function () {
        axios({
          method: 'post',
          url: '/mapi/integral/store/userIntegralDetail.htm',
          params: {
            currentPage: 1,
            pageSize: 10
          }
        }).then((result) => {
          if (result.data.code === 0) {
            this.personalIntegral = result.data.data.personalIntegral
            this.pagesResult = result.data.data.pagesResult
            this.pagesResultData = result.data.data.pagesResult.data
            console.log(this.pagesResultData)
          } else {
            console.log(result.data.message)
          }
        })
      },
      loadBottom: function () {
        this.pageNo ++
        if (this.pageNo > this.pagesResult.pages) {
          this.bottomStatus = '没有更多数据'
          this.allLoaded = true    //  若数据已全部获取完毕
        } else {
          setTimeout(() => {
            axios({
              method: 'post',
              url: '/mapi/integral/store/userIntegralDetail.htm',
              params: {
                currentPage: this.pageNo,
                pageSize: 10
              }
            }).then((result) => {
              if (result.data.code === 0) {
                console.log(this.pageNo)
                console.log(result.data.data.pagesResult.data)
                this.pagesResultData = this.pagesResultData.concat(result.data.data.pagesResult.data)
              } else {
                console.log(result.data.message)
              }
            })
            this.$refs.loadmore.onBottomLoaded()
          }, 2000)
        }
      },
      handleBottomChange: function (status) {
        this.bottomStatus = status
      }
    },
    filters: {
      time: function (value) {
        let year = new Date(value).getFullYear()
        let month = new Date(value).getMonth() + 1
        let date = new Date(value).getDate()
        let hour = new Date(value).getHours()
        let minute = new Date(value).getMinutes()
        let second = new Date(value).getSeconds()
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
      }
    }
  }
</script>

<style>
  .integrationCount{
    border-top: .1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
    background: #0dbfc6;
    padding: 6rem 0 4.5rem;
  }
  .countItem{
    text-align: center;
    -webkit-box-flex: 1.0;
    -moz-box-flex:1.0;
    box-flex:1.0;
  }
  .countItem h3{
    color: #fff;
    font-size: 3.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .countItem b{
    color: #5cfff3;
    font-size: 2.4rem;
    font-weight: 300;
  }

  /* 积分消费情况 */
  .details{
    background: #fff;
  }
  .integrationDetails-list{
    border-bottom: .1rem solid #e6e6e6;
    padding:3rem 0px;
  }
  .conAndTime{
    float: left;
  }
  .conAndTime .tab-con{
    color: #333;
    font-size: 2.8rem;
  }
  .conAndTime .tab-time{
    color: #b3b3b3;
    font-size: 2.2rem;
    margin-top: 2.4rem;
  }
  .num{
    float: right;
    color: #f93;
    font-size: 3rem;
    margin-top: 3rem;
  }
  .footer span{
    font-size: 2.4rem;
  }
</style>
