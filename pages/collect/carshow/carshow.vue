<template>
  <web-view :src="info.url"></web-view>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  onShow() {
    const { currentParams } = this.getRoute()
    this.info = currentParams
  }
}
</script>

<style></style>
