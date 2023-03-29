<template>
  <w-page>
    <w-header :h="h">
      <view class="car-card mgb-30" v-for="(item, index) in carList" :key="index">
        <image class="logo" :src="item.brandIcon" mode="" />
        <view class="car-brand">
          <view class="car-brand-info">
            <view class="car-brand-title mgb-5">
              <u--text :text="item.brandName" size="32" color="#232529"></u--text>
            </view>
            <view class="car-brand-type">
              <u--text :text="item.colorName" size="22"></u--text>
            </view>
          </view>
          <view>
            <u-icon name="play-circle" size="60" @click="carShow(item)"></u-icon>
          </view>
        </view>
      </view>
    </w-header>
  </w-page>
</template>

<script>
import Api from '@/config/api/index'
export default {
  data() {
    return {
      h: '',
      carList: []
    }
  },
  methods: {
    async getCollectList() {
      const result = await Api.getCollectList()
      this.carList = result
      console.log(result)
    },
    carShow(item) {
      console.log(item)
      this._navigateTo('pages/collect/carshow/carshow', item)
    }
  },
  onShow() {
    const { statusBarHeight } = uni.$u.sys()
    this.h = statusBarHeight + 48
    this.getCollectList()
  }
}
</script>

<style lang="scss" scoped>
.car-card {
  @include flex;
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .logo {
    width: 100rpx;
    height: 100rpx;
    border-radius: 10rpx;
  }

  .car-brand {
    @include flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-left: 30rpx;

    .car-brand-info {
      @include flex(column);
      justify-content: center;
    }
  }
}
</style>
<style>
page {
  background-color: #f6f6f6;
}
</style>
