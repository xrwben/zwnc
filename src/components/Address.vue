<template>
  <div class="address paddingTop">
    <!--选择送货地址标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="toback">
            <i></i><span>返回</span>&nbsp;&nbsp;
          </div>
          选择送货地址
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--地址-->
    <div class="section">
      <!--无地址情况-->
      <div class="addressBg" v-if="!addressDatas.totalCount">
        <img src="../assets/addressBg.png">
        <p>你还没有收货地址哦，赶紧新增一个吧\(0^◇^0)/</p>
      </div>
      <!--有地址情况-->
      <div class="addressList" v-if="addressDatas.totalCount">
        <!--有默认地址-->
        <div class="defaultAddress" v-if="addressDatas.defaultAddress">
          <div class="content">
            <!--<p class="def_hd">默认地址<i></i></p>-->
            <p class="def_hd">默认地址</p>
            <div class="def_bd">
              <div @click="selectAddress(addressDatas.defaultAddress.addressId)">
                <h3>{{ addressDatas.defaultAddress.receiveName }}  {{ addressDatas.defaultAddress.contactPhone}}</h3>
                <p>{{ addressDatas.defaultAddress.provinces }} {{ addressDatas.defaultAddress.city }} {{ addressDatas.defaultAddress.county }} {{ addressDatas.defaultAddress.street }} {{ addressDatas.defaultAddress.fullAddress }}</p>
              </div>
              <p class="del_edit clearfix">
                <a class="del" href="javascript:void(0)" @click="deleteAddress(addressDatas.defaultAddress.addressId)">删除</a>
                <router-link class="edit" :to="{name: 'EditAddress', params: {id: addressDatas.defaultAddress.addressId}}">编辑</router-link>
              </p>
            </div>
          </div>
        </div>
        <!--无默认地址-->
        <div class="defaultAddress" v-if="!addressDatas.defaultAddress">
          <div class="content">
            <p class="def_hd">默认地址</p>
            <div class="def_bd" style="padding-bottom: 2rem">
              <h3>无</h3>
            </div>
          </div>
        </div>
        <!--有其它地址-->
        <div class="otherAddress" v-if="addressDatas.otherAddress">
          <div class="content">
            <p class="def_hd">其他地址</p>
            <div class="def_bd" v-for="address in addressDatas.otherAddress">
              <div @click="selectAddress(address.addressId)">
                <h3>{{ address.receiveName }}  {{ address.contactPhone}}</h3>
                <p>{{ address.provinces }} {{ address.city }} {{ address.county }} {{ address.street }} {{ address.fullAddress }}</p>
              </div>
              <p class="del_edit clearfix">
                <a class="del" href="javascript:void(0)" @click="deleteAddress(address.addressId)">删除</a>
                <router-link class="edit" :to="{name: 'EditAddress', params:{id: address.addressId}}">编辑</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--新增按钮-->
    <div class="section">
      <div class="addBtn" @click="jumpAddress()" v-track-event.click="{category: '新增收货地址', action: '点击', opt_label: '地址管理页-地址不为空状态-点击新增收货地址'}">
        <!--<router-link class="link_a" :to="{name: 'AddAddress'}">-->
          <p>新增收货地址</p>
        <!--</router-link>-->
      </div>
    </div>

    <!--删除提示-->
    <div class="section">
      <hitn-delete v-show="hitndelete_isShow" v-on:hitndelete="hitndelete"></hitn-delete>
    </div>
  </div>
</template>

<script>
  import HitnDelete from '../pages/HintDelete.vue'
//  import axios from 'axios'
  import { Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        hitndelete_isShow: false,
        addressDatas: {
          otherAddress: [],
          defaultAddress: {}
        },
        addressId: ''
      }
    },
    components: {
      HitnDelete
    },
    created () {
      this.getDatas()
    },
    methods: {
      toback: function () {
        this.$router.go(-1)
      },
      jumpAddress: function () {
        this.$router.push(`/AddAddress`)
      },
      selectAddress: function (addressId) {
        sessionStorage.setItem('addressId', addressId)
//        this.$router.replace(`/confirmorder/${sessionStorage.getItem('itemId')}`)
        this.$router.go(-1)
      },
      deleteAddress: function (id) {
        this.hitndelete_isShow = true
        // 要删除的地址id
        this.addressId = id
      },
      hitndelete: function (msg) {
        this.hitndelete_isShow = false
        if (msg === 'confirm') {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          this.axios({
            method: 'post',
            url: '/zwnc/app/address/delete',
            params: {
              addressIds: this.addressId
            }
          }).then((result) => {
            if (result.data.code === 0) {
              this.getDatas()
            } else {
              alert(result.data.msg)
            }
            Indicator.close()
          })
        }
      },
      getDatas: function () {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.axios({
          method: 'post',
          url: '/zwnc/app/address/list'
        }).then((result) => {
          if (result.data.code === 0) {
            let otherTemp = []
            this.addressDatas = result.data.page
            result.data.page.list.forEach(item => {
              if (item.status === 0) {
                otherTemp.push(item)
                this.addressDatas.otherAddress = otherTemp
              } else {
                this.addressDatas.defaultAddress = item
              }
            })
          }
          Indicator.close()
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    watch: {
      '$route': 'getDatas'
    }
  }
</script>

<style scoped>
  .address{
    padding-bottom: 9rem;
  }
  /* 无地址情况 */
  .addressBg{
    text-align: center;
    color: #666;
    font-size: 3rem;
  }
  .addressBg img{
    width: 30%;
    margin-top: 15rem;
    margin-bottom: 2rem;
  }
  /* 有地址情况 */
  .defaultAddress{
    margin-top: 2rem;
    background: #fff;
    font-size: 2.8rem;
    border-top: .1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
  }
  .def_hd{
    color: #999;
    padding: 3rem 0;
  }
  .def_hd i{
    width: 3rem;
    height: 3rem;
    background: url("../assets/addressDefault.png") no-repeat center;
    background-size: cover;
    display: inline-block;
    transform: translateY(-.5rem);
    float: right;
  }
  .def_bd h3{
    color: #333;
    font-weight: 700;
  }
  .def_bd p{
    color: #666;
    padding: 1.6rem 0 1rem;
  }
  .def_bd p.del_edit{
    padding-bottom: 4rem;
   }
  .def_bd p a{
    display: inline-block;
    float: right;
    margin-right: 3rem;
  }
  .def_bd p a.edit{
    color: #10bfc7;
  }
  .def_bd p a.del{
    color: #fe7f72;
  }

  /* 其他地址 */
  .otherAddress{
    background: #fff;
    margin-top: 2rem;
    font-size: 2.8rem;
    border-top: .1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
  }
  .otherAddress .def_bd{
    border-bottom: .1rem solid #e6e6e6;
    margin-bottom: 3rem;
  }

  .addBtn{
    width: 100%;
    height: 9rem;
    color: #fff;
    font-size: 3.2rem;
    background: #f93;
    line-height:9rem;
    text-align: center;
    position: fixed;
    bottom: 0;
  }
  .addBtn .link_a{
    display: block;
  }
</style>
