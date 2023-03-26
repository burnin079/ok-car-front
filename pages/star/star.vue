<template>
  <view class="star">
    <view class="star-btn">
      <u-button type="info" shape="circle" text="跳过广告" @click="toAnother"></u-button>
    </view>
    <u-swiper imgMode="AspectFit" :height="$u.addUnit(h, 'px')" :list="list1"></u-swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        'https://img2.baidu.com/it/u=3118936755,4035709499&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png'
      ],
      h: '',
      meter: ''
    }
  },
  methods: {
    timing() {
      this.meter = setTimeout(() => {
        this.toAnother()
      }, 3000)
    },
    toAnother() {
      const token = uni.getStorageSync('token')
      if (!token) {
        this._redirectTo('pages/login/login')
      } else {
        this._switchTab('pages/index/index')
      }
    }
  },
  onShow() {
    this.timing()
  },
  onLoad() {
    const { screenHeight } = uni.$u.sys()
    this.h = screenHeight
  },
  onUnload() {
    console.log(this.meter)
    clearTimeout(this.meter)
  }
}
</script>

<style lang="scss" scoped>
.star-btn {
  position: absolute;
  top: 50px;
  right: 30px;
  z-index: 1001;
}
</style>
