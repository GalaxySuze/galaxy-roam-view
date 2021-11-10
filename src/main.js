import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局样式表
import '../src/assets/css/global.css'
// 导入字体图标
import '../src/assets/fonts/iconfont.css'

import axios from 'axios'

// 配置请求根路径
axios.defaults.baseURL = 'http://galaxyroam.test:8080/api/'
// 配置请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
