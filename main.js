// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 1. 导入 store 的实例对象
import store from '@/store/store.js'

uni.$http = $http
// 配置请求根路径
// $http.baseUrl = 'https://www.uinav.com'

import Mock from './mock/mock.js' //引入mock目录的mock.js进行ajax请求的拦截,返回mock目录下data.js的数据
import { $http } from '@escook/request-miniprogram'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  // 将 store 挂载到 Vue 实例上
  store,
  // 重新编译的时候需要清空vuex的StorageSync
  created() {
    uni.clearStorageSync();
  }
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
