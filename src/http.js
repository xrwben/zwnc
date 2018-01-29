/**
 * http配置
 */
import axios from 'axios'
// http响应拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.code === 401) {
      if (sessionStorage.getItem('htmlFrom') === 'fromApp') {
        window.native.callAppAction(JSON.stringify({'action': 'login', 'data': {}}))
      } else {
        // window.location.href = `http://119.145.28.209:8686/html_finance/login.html?_z=${window.location.href}`
        // window.location.href = `http://10.1.10.210:8080/html_finance/login.html?_z=${window.location.href}`
        window.location.href = `https://m.lcfarm.com/html_finance/login.html?_z=${window.location.href}`
      }
    }
    return response
  },
  error => {
    // if (error.response) {
      // switch (error.response.status) {
      //   case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // window.location.href = `http://10.1.10.210:8080/html_finance/login.html?_z=${window.location.href}`
    //   }
    // }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

export default axios
