// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import Qs from 'qs'
import axios from 'axios'
import uploader from 'vue-simple-uploader'

Vue.prototype.axios = axios
Vue.prototype.Qs = Qs
Vue.use(ElementUI)
Vue.use(uploader)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 替换目标
  router,
  render: h => h(App),
  // 使用路由
  components: { App },
  // 使用内容
  template: '<App/>',
  // 包装
  data () {
    return {
      Name: 'main_name',
      Key: 'main_key',
      Check: ''
    }
  }
})
