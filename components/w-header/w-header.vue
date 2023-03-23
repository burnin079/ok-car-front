<template>
  <view class="header">
    <view class="header-block" :style="{ height: $u.addUnit(h) }"> </view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    h: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  height: 300rpx;
  width: 100%;
  background-image: linear-gradient(0deg, #f6f6f6, #89f7fe 60%, #66a6ff 100%);
  padding: 30rpx;
}
</style>
