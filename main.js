import App from './App'
import uView from 'uview-ui'
import tools from './utils/tools'

// #ifndef VUE3
import Vue from 'vue'

Vue.use(uView)
Vue.mixin(tools)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})

require('config/request.js')(app)

app.$mount()
// #endif
