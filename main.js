import App from './App'
import uView from 'uview-ui'
import tools from './utils/tools'
import routeGuard from './utils/routeGuard'

// #ifndef VUE3
import Vue from 'vue'
import request from 'config/request.js'

Vue.use(uView)
Vue.mixin(tools)
Vue.mixin(routeGuard)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
uni.$u.config.unit = 'rpx'

request(app)

app.$mount()
// #endif
