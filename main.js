import App from './App'
import uView from 'uview-ui'

// #ifndef VUE3
import Vue from 'vue'

Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})

require('config/request.js')(app)

app.$mount()
// #endif
