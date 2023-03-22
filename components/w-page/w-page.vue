<template>
  <view>
    <slot></slot>
    <u-loading-page :loading="loading"></u-loading-page>
  </view>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
