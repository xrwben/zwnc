import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    backUrl: 'http://demo.sinsinet.com:8838'
  }
})

export default store

