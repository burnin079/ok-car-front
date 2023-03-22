export default {
  data() {
    return {}
  },
  methods: {
    // 弹窗完成后再执行回调
    _showToast(title, callback, time) {
      const second = time || 2000
      uni.showToast({
        icon: 'none',
        title: title,
        duration: second,
        success: () => {
          callback &&
            setTimeout(() => {
              callback()
            }, second)
        }
      })
    }
  }
}
