<<template>
  <div class="hintDelete">
    <div class="shadow">
      <div class="wrapper">
        <h2>确认删除吗？</h2>
        <div class="btnTab display_box">
          <div class="btn left" @click="cancel">取消</div>
          <div class="btn right" @click="confirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  import axios from 'axios'
  export default {
    methods: {
      cancel: function () {
        this.$emit('hitndelete', 'cancel')
      },
      confirm: function () {
        this.$emit('hitndelete', 'confirm')
      }
    }
  }
</script>

<style scoped>
  .hintDelete{
    height: 100%;
  }
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
    width: 80%;
    z-index: 9;
    border-radius: 1rem;
    background: #fff;
    position: absolute;
    top: 30%;
    margin-left: 10%;
    text-align: center;
  }
  .wrapper h2{
    color: #333;
    font-size: 3.6rem;
    margin-top: 4rem;
  }
  .wrapper p{
    color: #999;
    font-size: 2.4rem;
    margin-top: 3.6rem;
  }
  .btnTab{
    margin-top: 3rem;
  }
  .btnTab{
    height: 8rem;
    color: #666;
    font-size: 3.4rem;
    border-top: .1rem solid #999;
    line-height: 8rem;
    text-align: center;
  }
  .btn{
    box-flex: 1;
    -moz-box-flex: 1;
    -webkit-box-flex: 1;
  }
  .right{
    color: #10bfca;
    border-left: .1rem solid #999;
  }
</style>
