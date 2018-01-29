<template>
  <div class="feedBackPop paddingTop">
    <div class="shadow">
      <div class="comment">
        <div class="content">
          <div class="headers">
            <div class="header_left">
              <span @click="close">取消</span>
            </div>
            请写下您的评价
            <div class="header_right">
              <span @click="commitBtn">确定</span>
            </div>
          </div>
          <div class="comment_con">
            <textarea id="commentContent" v-model="commentContent" placeholder="快写下您对水果品质，物流速度，性价比等看法吧～"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        commentContent: ''
      }
    },
//    mounted () {
//      let textArea = document.getElementById('shadow')
//      if (textArea.onresize) {
//        alert('1')
//      }
//    },
    methods: {
      close: function () {
        this.$emit('feedBack')
      },
      commitBtn: function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        axios({
          method: 'post',
          url: '/zwnc/app/order/comment',
          params: {
            orderId: this.$route.params.id,
            comment: this.commentContent
          }
        }).then(result => {
          if (result.data.code === 0) {
            this.$emit('feedBack', 'success')
          } else {
            alert('系统网络异常')
          }
          Indicator.close()
        })
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
  .headers{
    width: 100%;
    height: 8.8rem;
    line-height: 8.6rem;
    background: #fff;
    text-align: center;
    font-size: 3.6rem;
    color: #333;
  }
  .comment{
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .header_right span{
    color: #10bfc7;
    font-size: 3rem;
  }
  .comment_con{
    height: 15rem;
    margin-bottom: 9.4rem;
  }
  .comment_con textarea{
    width: 96%;
    height: 70%;
    border-radius: 1rem;
    padding: 1rem;
    color: #333;
    font-size: 2.6rem;
    outline: none;
    background: #f6f6f6;
    border-color: #e6e6e6;
  }
</style>
