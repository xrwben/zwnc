<template>
  <div class="address paddingTop">
    <!--新增收货地址标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          编辑收货地址
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--地址表单-->
    <div class="section" v-if="flag">
      <address-new-edit :addressData="addressData"></address-new-edit>
    </div>
  </div>
</template>

<script>
  import AddressNewEdit from '../pages/AddressNewEdit.vue'
  import axios from 'axios'

  export default {
    components: {
      AddressNewEdit
    },
    data () {
      return {
        flag: false,
        addressId: '',
        addressData: {}
      }
    },
    created () {
      this.addressId = this.$route.params.id
    },
    mounted () {
      axios({
        method: 'post',
        url: '/zwnc/app/address/info',
        params: {
          addressId: this.addressId
        }
      }).then(result => {
        if (result.data.code === 0) {
          this.addressData = result.data.address
          this.flag = true // 数据加载完成才显示子组件
        } else {
          console.log(result.data.msg)
        }
      })
    }
  }
</script>

<style>

</style>
