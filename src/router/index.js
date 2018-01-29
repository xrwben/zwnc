import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../components/Home.vue'
// import GoodsDetails from '../components/GoodsDetails.vue'
// import MyOrder from '../components/MyOrder.vue'
// import ConfirmOrder from '../components/ConfirmOrder.vue'
// import ConvertSuccess from '../components/ConvertSuccess.vue'
// import Address from '../components/Address.vue'
// import AddAddress from '../components/AddAddress.vue'
// import EditAddress from '../components/EditAddress.vue'
// import OrderDetails from '../components/OrderDetails.vue'
// import LogisticsTrack from '../components/LogisticsTrack.vue'
// import IntegrationDetails from '../components/IntegrationDetails.vue'
// import IntegrationRules from '../components/IntegrationRules.vue'

const Home = resolve => require(['@/components/Home.vue'], resolve)
// const Home = resolve => require(['@/components/addressTest.vue'], resolve)
const GoodsDetails = resolve => require(['@/components/GoodsDetails.vue'], resolve)
const MyOrder = resolve => require(['@/components/MyOrder.vue'], resolve)
const ConfirmOrder = resolve => require(['@/components/ConfirmOrder.vue'], resolve)
const ConvertSuccess = resolve => require(['@/components/ConvertSuccess.vue'], resolve)
const Address = resolve => require(['@/components/Address.vue'], resolve)
const AddAddress = resolve => require(['@/components/AddAddress.vue'], resolve)
const EditAddress = resolve => require(['@/components/EditAddress.vue'], resolve)
const OrderDetails = resolve => require(['@/components/OrderDetails.vue'], resolve)
const LogisticsTrack = resolve => require(['@/components/LogisticsTrack.vue'], resolve)
const IntegrationDetails = resolve => require(['@/components/IntegrationDetails.vue'], resolve)
const IntegrationRules = resolve => require(['@/components/IntegrationRules.vue'], resolve)
const Image = resolve => require(['@/components/Image.vue'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '__dirname',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      name: 'GoodsDetails',
      path: '/goodsdetails/:id',
      component: GoodsDetails
    },
    {
      name: 'MyOrder',
      path: '/myorder',
      component: MyOrder
    },
    {
      name: 'OrderDetails',
      path: '/orderdetails/:id',
      component: OrderDetails
    },
    {
      name: 'ConfirmOrder',
      path: '/confirmorder/:id',
      component: ConfirmOrder
    },
    {
      name: 'ConvertSuccess',
      path: '/convertsuccess/:id',
      component: ConvertSuccess
    },
    {
      name: 'IntegrationDetails',
      path: '/integrationdetails',
      component: IntegrationDetails
    },
    {
      name: 'IntegrationRules',
      path: '/integrationrules',
      component: IntegrationRules
    },
    {
      name: 'LogisticsTrack',
      path: '/logisticstrack/:id',
      component: LogisticsTrack
    },
    {
      name: 'Address',
      path: '/address',
      component: Address
    },
    {
      name: 'AddAddress',
      path: '/addaddress',
      component: AddAddress
    },
    {
      name: 'EditAddress',
      path: '/editaddress/:id',
      component: EditAddress
    },
    {
      name: 'Image',
      path: '/image',
      component: Image
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
