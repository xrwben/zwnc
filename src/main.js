// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/reset.css'
import axios from './http'
// 百度统计插件引入
import ba from 'vue-ba'

import VueTouch from 'vue-touch'

Vue.prototype.axios = axios
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {
  direction: 'horizontal'
}

Vue.use(Vuex)
// Vue.use(ba, '63a378ff155d9129fba63c18f5b35ff9')
Vue.use(ba, 'a041a0f4ff93aef6aa83f34134331a1d')

Vue.config.productionTip = false
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
