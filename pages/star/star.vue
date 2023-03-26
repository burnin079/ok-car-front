<template>
  <view class="star">
    <view class="star-btn">
      <u-button type="info" shape="circle" text="跳过广告" @click="toAnother"></u-button>
    </view>
    <u-swiper imgMode="AspectFit" :height="$u.addUnit(h, 'px')" :list="list1"></u-swiper>
  </view>
</template>

<script>
import Api from '@/config/api/index'
export default {
  data() {
    return {
      list1: [],
      h: '',
      meter: ''
    }
  },
  methods: {
    async getAppAdv() {
      const result = await Api.getAppAdv()
      this.list1 = result
    },
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
    this.getAppAdv()
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
