import tools from './tools'

export default {
  data() {
    return {}
  },
  methods: {
    // 白名单
    _blackList() {
      return ['pages/login/login']
    },
    // 方法
    _navigateTo(url, params) {
      this._routeGraud({
        type: 'navigateTo',
        url,
        params
      })
    },
    _redirectTo(url, params, delta) {
      this._routeGraud({
        type: 'redirectTo',
        url,
        params,
        delta
      })
    },
    _switchTab(url, params, delta) {
      this._routeGraud({
        type: 'tab',
        url,
        params,
        delta
      })
    },
    // 简易路由守卫
    _routeGraud({ type, url, params, delta }) {
      if (!this._blackList().includes(url) && !uni.getStorageSync('token')) {
        tools.methods._showToast('请先登录', () => {
          uni.$u.route({ type: 'redirectTo', url: 'pages/login/login' })
        })
        return
      }
      uni.$u.route({ type, url, params, delta })
    },
    // 获取页面路由及参数
    getRoute() {
      const routes = getCurrentPages()
      const currentRoute = routes[routes.length - 1].route
      const currentParams = routes[routes.length - 1].options

      return { currentRoute, currentParams }
    }
  }
}
