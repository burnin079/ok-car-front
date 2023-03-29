module.exports = (vm) => {
  uni.$u.http.setConfig(() => ({
    baseURL: 'http://8.142.135.242:9000',

    header: {},
    timeout: 10000
  }))

  // 请求拦截
  uni.$u.http.interceptors.request.use(
    (config) => {
      config.data = config.data || {}

      if (uni.getStorageSync('token')) {
        config.header.token = uni.getStorageSync('token')
      }

      return config
    },
    (config) => {
      return Promise.reject(config)
    }
  )

  // 响应拦截
  uni.$u.http.interceptors.response.use(
    (response) => {
      const { data } = response
      console.log(response)
      if (data.code) {
        uni.showToast({
          icon: 'none',
          title: data.msg,
          duration: 3000
        })
        throw new Error(data.msg)
      }

      if (response && response.statusCode !== 200) {
        let message = ''
        switch (response.statusCode) {
          case 401:
            uni.showToast({
              icon: 'none',
              title: '登录过期，请重新登录',
              duration: 3000
            })
            uni.$u.route('pages/login/login')
            break
          case 400:
            message = '请求错误（400）'
            break
          case 403:
            message = '拒绝访问（403）'
            break
          case 404:
            message = '请求出错（404）'
            break
          case 408:
            message = '请求超时（408）'
            break
          case 500:
            message = '服务器错误（500）'
            break
          case 501:
            message = '服务器未实现（501）'
            break
          case 502:
            message = '网络错误（502）'
            break
          case 503:
            message = '服务不可用（503）'
            break
          case 504:
            message = '网络超时（504）'
            break
          default:
            message = `连接出错（${response.statusCode}）`
            return Promise.reject(message)
        }

        message &&
          uni.showToast({
            icon: 'none',
            title: message || '服务器连接失败',
            duration: 3000
          })
        return Promise.reject(message)
      }

      return data.data
    },
    (response) => {
      console.log(response)
      if (response && response.statusCode !== 200) {
        switch (statusCode) {
          case 401:
            uni.showToast({
              icon: 'none',
              title: '登录过期，请重新登录',
              duration: 3000
            })

            uni.$u.route('pages/login/login')
            break
          case 400:
            error.message = '请求错误（400）'
            break
          case 403:
            error.message = '拒绝访问（403）'
            break
          case 404:
            error.message = '请求出错（404）'
            break
          case 408:
            error.message = '请求超时（408）'
            break
          case 500:
            error.message = '服务器错误（500）'
            break
          case 501:
            error.message = '服务器未实现（501）'
            break
          case 502:
            error.message = '网络错误（502）'
            break
          case 503:
            error.message = '服务不可用（503）'
            break
          case 504:
            error.message = '网络超时（504）'
            break
          default:
            error.message = `连接出错（${error.statusCode}）`
            return Promise.reject(error)
        }
      } else {
        console.log(response)
        response.message = '连接服务器失败'
        return Promise.reject(error)
      }
      response.message &&
        uni.showToast({
          icon: 'none',
          title: error.message,
          duration: 3000
        })
      return Promise.reject(error)
    }
  )
}
