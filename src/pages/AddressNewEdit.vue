<template>
  <div class="addressForm" v-show="1">
    <div class="content">
      <div class="address-item display_box">
        <div class="item-title">收货人</div>
        <div class="item-con">
          <input type="text" value="" v-model="receiveName" />
        </div>
      </div>
      <div class="address-item display_box">
        <div class="item-title">联系手机</div>
        <div class="item-con">
          <input type="text" value="" v-model="tel" />
        </div>
      </div>
      <div class="address-item display_box">
        <div class="item-title">所在地区</div>
        <div @click="popupToggle1" class="item-con">
          <!--<span>请选择 <i>&gt;</i></span>-->
          <!--<input type="text" v-model="addressProvince" value="" readonly placeholder="请选择 >" @click="popupVisible = true" />-->
          <!--<p v-show="address_isShow" class="ellipsis">{{ addressProvince }} - {{ addressCity }} - {{ addressXian }}</p>-->
          <p v-show="address_isShow" class="ellipsis">{{ provinceValue }} - {{ cityValue }} - {{ xianValue }}</p>
        </div>
      </div>
      <div class="address-item display_box">
        <div class="item-title">街道</div>
        <div @click="popupToggle2" class="item-con">
          <!--<span>请选择 <i>&gt;</i></span>-->
          <!--<input type="text" readonly placeholder="请选择 >" />-->
          <!--<p v-show="street_isShow" class="ellipsis">{{ addressStreet }}</p>-->
          <p v-show="street_isShow" class="ellipsis">{{ streetValue }}</p>
        </div>
      </div>
      <div class="texearea-item">
        <div class="textarea-title">详细地址</div>
        <textarea class="textarea-con" v-model="addressDetails"></textarea>
      </div>
      <div class="address-item clearfix">
        <div class="item-title item-default">设为默认</div>
        <div class="item-switch">
          <mt-switch v-model="value"></mt-switch>
        </div>
      </div>
    </div>
    <!--按钮-->
    <div class="section">
      <!--新增-->
      <div class="addBtn" v-show="!addressData.addressId">
        <span @click="addAddress">保存</span>
      </div>
      <!--编辑-->
      <div class="addBtn" v-show="addressData.addressId">
        <span @click="editAddress">保存</span>
      </div>
    </div>
    <!--picker省市区联动插件-->
    <mt-popup v-model="popupVisible" position="bottom" class="popup">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" style="" @click="cancleaddress">返回</span>
        <span class="mint-datetime-action " style="color: #666666;">请选择地址</span>
        <span class="mint-datetime-action mint-datetime-confirm" style="" @click="selectaddress">确定</span>
      </div>
      <mt-picker :slots="addressSlots"
                 @change="onAddressChange"
                 v-show="addressSlots_isShow"
                 :itemHeight="addressHeight"
                 :visible-item-count="5"></mt-picker >

      <mt-picker :slots="streetSlots"
                 @change="onStreetChange"
                 v-show="streetSlots_isShow"
                 :itemHeight="addressHeight"
                 :visible-item-count="5" ></mt-picker >
    </mt-popup>
  </div>
</template>

<script>
  import s from '../../static/address4.json'
  import axios from 'axios'
  import { Toast, Indicator } from 'mint-ui'
  export default {
    data () {
      return {
        receiveName: '',
        tel: '',
        addressDetails: '',
        value: true,
        address_isShow: false,
        street_isShow: false,
        popupVisible: false,  // 弹出阴影层控制
        addressSlots_isShow: false, // 所在地区
        streetSlots_isShow: false, // 街道
        addressProvince: '北京市',
        addressCity: '市辖区',
        addressXian: '东城区',
        addressStreet: '东华门街道办事处',
        provinceValue: '',
        cityValue: '',
        xianValue: '',
        streetValue: '',
        flag: 0, //
        addressHeight: 80,
        addressSlots: [
          {
            flex: 1,
            values: Object.keys(s),
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: Object.keys(s['北京市']),
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: Object.keys(s['北京市']['市辖区']),
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        streetSlots: [
          {
            flex: 1,
            values: Object.keys(s['北京市']['市辖区']['东城区']),
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    props: ['addressData'],
    created () {
      if (sessionStorage.getItem('appType') === 'ios') {
        this.addressHeight = 40
      }
    },
    methods: {
      // 地区选择弹窗
      popupToggle1: function () {
        this.popupVisible = true
//        this.address_isShow = true
        this.addressSlots_isShow = true
        this.streetSlots_isShow = false
      },
      // 街道选择弹窗
      popupToggle2: function () {
        if (this.address_isShow) {
//          this.street_isShow = true
          this.popupVisible = true
          this.addressSlots_isShow = false
          this.streetSlots_isShow = true
          this.flag = 1
        } else {
          Toast({
            message: '请选择所在地区',
            duration: 2000
          })
        }
      },
      onAddressChange (picker, values) {
        if (Object.keys(this.addressData).length) {
//          values[0] = !values[0] ? this.addressData.provinces : values[0]
//          values[1] = !values[1] ? this.addressData.city : values[1]
//          values[2] = !values[2] ? this.addressData.county : values[2]
          if (!values[0]) {
            this.addressSlots[2].values = Object.keys(s[this.addressData.provinces])
            values[0] = this.addressData.provinces
          }
          if (!values[1]) {
            this.addressSlots[4].values = Object.keys(s[values[0]][this.addressData.city])
            values[1] = this.addressData.city
          }
          if (!values[2]) {
            values[2] = this.addressData.county
          }
          if (values[0] !== this.addressProvince) {
            if (s[values[0]]) {
              picker.setSlotValues(1, Object.keys(s[values[0]]))
            }
            if (s[values[0]][values[1]]) {
              picker.setSlotValues(2, Object.keys(s[values[0]][values[1]]))
            }
          } else if (values[1] !== this.addressCity) {
            if (s[values[0]][values[1]]) {
              picker.setSlotValues(2, Object.keys(s[values[0]][values[1]]))
            }
          } else {
            // 变街道
          }
          this.addressProvince = values[0]
          this.addressCity = values[1]
          this.addressXian = values[2]
        } else {
          values[0] = !values[0] ? '北京市' : values[0]
          values[1] = !values[1] ? '市辖区' : values[1]
          values[2] = !values[2] ? '东城区' : values[2]
          if (values[0] !== this.addressProvince) {
            if (s[values[0]]) {
              picker.setSlotValues(1, Object.keys(s[values[0]]))
            }
            if (s[values[0]][values[1]]) {
              picker.setSlotValues(2, Object.keys(s[values[0]][values[1]]))
            }
          } else if (values[1] !== this.addressCity) {
            if (s[values[0]][values[1]]) {
              picker.setSlotValues(2, Object.keys(s[values[0]][values[1]]))
            }
          } else {
            // 变街道
          }
          this.addressProvince = values[0]
          this.addressCity = values[1]
          this.addressXian = values[2]
        }
      },
      onStreetChange (picker, values) {
        if (Object.keys(this.addressData).length) {
          if (!values[0]) {
            this.streetSlots[0].values = s[this.addressData.provinces][this.addressData.city][this.addressData.county]
            console.log(this.streetSlots[0].values)
            values[0] = this.addressData.street
          }
        }
        this.addressStreet = values[0]
      },
      // 确定选择地址
      selectaddress: function () {
        if (Object.keys(this.addressData).length) {
          this.provinceValue = this.addressProvince
          this.cityValue = this.addressCity
          this.xianValue = this.addressXian
          this.streetValue = this.addressStreet
          this.popupVisible = false
          this.address_isShow = true
        } else {
          this.provinceValue = this.addressProvince
          this.cityValue = this.addressCity
          this.xianValue = this.addressXian
//          this.streetValue = this.addressStreet
          this.popupVisible = false
          this.address_isShow = true
          if (this.flag) {
            this.streetValue = this.addressStreet
            this.street_isShow = true
          }
          console.log(this.streetValue)
//
//          this.addressProvince = this.provinceValue
//          this.addressCity = this.cityValue
//          this.addressXian = this.xianValue
//          this.addressStreet = this.streetValue
//          this.addressSlots_isShow = false
//          if (this.streetSlots_isShow) {
//            this.streetSlots_isShow = false
//          }
        }
      },
      // 取消选择地址
      cancleaddress: function () {
        this.popupVisible = false
        if (this.addressSlots_isShow) {
          this.addressSlots_isShow = false
        }
        if (this.streetSlots_isShow) {
          this.streetSlots_isShow = false
        }
      },
      // 表单验证
      validate: function () {
        if (this.receiveName.trim() === '') {
          Toast({
            message: '请输入收货人姓名',
            duration: 2000
          })
        } else if (this.receiveName.trim().length < 2) {
          Toast({
            message: '收货人不能低于2个字符',
            duration: 2000
          })
        } else if (this.tel.trim() === '') {
          Toast({
            message: '联系手机不能为空',
            duration: 2000
          })
        } else if (!(/^\d{11}$/.test(this.tel.trim()))) {
          Toast({
            message: '联系手机仅支持11位数字',
            duration: 2000
          })
        } else if (this.provinceValue === '') {
          Toast({
            message: '请选择所在地区',
            duration: 2000
          })
        } else if (this.streetValue === '') {
          Toast({
            message: '请选择街道',
            duration: 2000
          })
        } else if (this.addressDetails.trim().length < 5) {
          Toast({
            message: '详细地址不能低于5个字符',
            duration: 2000
          })
        } else {
          return true
        }
      },
      // 新增地址
      addAddress: function () {
        if (this.validate()) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          axios({
            method: 'post',
            url: '/zwnc/app/address/save',
            params: {
              receiveName: this.receiveName,
              contactPhone: this.tel,
//              provinces: this.addressProvince,
//              city: this.addressCity,
//              county: this.addressXian,
//              street: this.addressStreet,
              provinces: this.provinceValue,
              city: this.cityValue,
              county: this.xianValue,
              street: this.streetValue,
              fullAddress: this.addressDetails,
              status: this.value
            }
          }).then((result) => {
            if (result.data.code === 0) {
//              this.$router.replace({path: '/address'})
              this.$router.go(-1)
            } else {
              Toast({
                message: result.data.msg,
                duration: 2000
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      // 编辑地址
      editAddress: function () {
        if (this.validate()) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          axios({
            method: 'post',
            url: '/zwnc/app/address/update',
            params: {
              addressId: this.$route.params.id,
              receiveName: this.receiveName,
              contactPhone: this.tel,
//              provinces: this.addressProvince,
//              city: this.addressCity,
//              county: this.addressXian,
//              street: this.addressStreet,
              provinces: this.provinceValue,
              city: this.cityValue,
              county: this.xianValue,
              street: this.streetValue,
              fullAddress: this.addressDetails,
              status: this.value
            }
          }).then((result) => {
            if (result.data.code === 0) {
//              this.$router.replace({path: '/address'})
              this.$router.go(-1)
            } else {
              Toast({
                message: result.data.msg,
                duration: 2000
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    },
    watch: {
      'addressXian': {
        handler (val, oval) {
          let street = s[this.addressProvince][this.addressCity][this.addressXian]
          this.streetSlots[0].values = street
          if (Object.keys(this.addressData).length) {
            this.streetSlots[0].values = street
            this.addressStreet = street[0]
          }
        }
      }
    },
    mounted () {
      // 判断新增还是编辑地址
      if (Object.keys(this.addressData).length) {
        this.receiveName = this.addressData.receiveName
        this.tel = this.addressData.contactPhone
        this.provinceValue = this.addressData.provinces
        this.cityValue = this.addressData.city
        this.xianValue = this.addressData.county
        this.streetValue = this.addressData.street
//        this.addressProvince = this.addressData.provinces
//        this.addressCity = this.addressData.city
//        this.addressXian = this.addressData.county
//        this.addressStreet = this.addressData.street
        this.addressDetails = this.addressData.fullAddress
        if (this.addressData.status) {
          this.value = true
        } else {
          this.value = false
        }
        this.address_isShow = true
        this.street_isShow = true
      } else {
        let street = s[this.addressProvince][this.addressCity][this.addressXian]
        this.streetSlots[0].values = street
      }
    }
  }
</script>

<style>
  .addressForm{
    margin-top: 2rem;
    background: #fff;
    border-top: .1rem solid #e6e6e6;
    border-bottom: .1rem solid #e6e6e6;
  }
  .address-item{
    height: 8.8rem;
    line-height: 8.8rem;
    border-bottom: .1rem solid #e6e6e6;
  }
  .address-item:last-child{
    border: none;
  }
  .item-title{
    width: 18rem;
    color: #666;
    font-size: 3rem;
  }
  .item-con{
    height: 8.8rem;
    box-flex: 1.0;
    -webkit-box-flex: 1.0;
    -moz-box-flex: 1.0;
  }
  .item-con span{
    color: #666;
    font-size: 3rem;
    position: absolute;
    right: 3.5rem;
  }
  .item-con p{
    width: 100%;
    line-height: 8.8rem;
    color: #333;
    font-size: 3rem;
  }
  .item-con input{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #333;
    font-size: 3rem;
    padding: 0;
  }
  .picker-slot{
    font-size: 3rem !important;
  }
  .picker-toolbar{
    height: 8.8rem;
    border-bottom: .1rem solid #e6e6e6;
  }
  .picker-toolbar > span{
    width: 33%;
    font-size: 3rem;
    line-height: 8.8rem;
  }
  /*.picker-slot-wrapper{*/
  /*height: 40rem !important;*/
  /*!*transform: translate(0px, 16rem) translateZ(0px) !important;*!*/
  /*}*/
  /*.picker-item{*/
  /*height: 8rem !important;*/
  /*line-height: 8rem !important;*/
  /*padding: 0 1rem;*/
  /*}*/
  /*.picker-center-highlight{*/
  /*height: 8rem !important;*/
  /*margin-top: -1.8rem !important;*/
  /*}*/
  .texearea-item{
    border-bottom: .1rem solid #e6e6e6;
    padding-bottom: 2rem;
  }
  .textarea-title{
    color: #666;
    font-size: 3rem;
    padding-top: 3rem;
  }
  .textarea-con{
    width: 100%;
    color: #333;
    font-size: 3rem;
    border: none;
    outline: none;
    padding: 2rem 0;
    resize: none;
  }
  .item-default{
    float: left;
  }
  .item-switch{
    height: 8.8rem;
    line-height: 8.8rem;
    float: right;
    /*transform: translateY(2.5rem);*/
  }
  .mint-switch{
    display: inline-block;
    margin-top: 1.9rem;
    /*height: 8.8rem;*/
    /*line-height: 8.8rem;*/
  }
  .mint-switch-core{
    width: 8.4rem;
    height: 5rem;
    border-radius: 2.5rem;
  }
  .mint-switch-core::before{
    width: 8.2rem;
    height: 4.6rem;
    border-radius: 2.5rem;
  }
  .mint-switch-core::after{
    width: 4.8rem;
    height: 4.6rem;
    border-radius: 2.5rem;
  }
  .mint-switch-input:checked + .mint-switch-core::after{
    transform: translateX(3.3rem);
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
  .addBtn span{
    display: block;
  }
  .popup{
    width: 100%;
  }
  .slot1,.slot2,.slot3,.slot4,.slot5{
    font-size: 3rem !important;
  }
  .mint-toast-text{
    font-size: 3rem !important;
  }
</style>
