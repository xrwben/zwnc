<template>
  <div class="address paddingTop">
    <!--新增收货地址标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          新增收货地址
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--地址表单-->
    <div class="section">
      <address-new-edit :addressData="addressData"></address-new-edit>
    </div>
  </div>
</template>

<script>
  import AddressNewEdit from '../pages/AddressNewEdit.vue'
  export default {
    data () {
      return {
        addressData: {}
      }
    },
    components: {
      AddressNewEdit
    }
  }
</script>

<style>

</style>
