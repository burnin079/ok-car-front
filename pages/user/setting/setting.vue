<template>
  <w-page>
    <u-cell-group>
      <u-cell
        title="系统更新"
        :isLink="true"
        arrow-direction="right"
        @click="systemUpdate"
      ></u-cell>
    </u-cell-group>
  </w-page>
</template>

<script>
export default {
  methods: {
    systemUpdate() {
      const appConfig = JSON.parse(uni.getStorageSync('appConfig'))
      plus.runtime.getProperty(plus.runtime.appid, (info) => {
        console.log(uni.$u.os())
        if (uni.$u.os() === 'android') {
          console.log(1)
          if (info.version !== appConfig.androidVersion)
            return plus.runtime.openURL(appConfig.androidUrl)

          this._showToast('当前为最新版本')
        } else if (uni.$u.os() === 'ios') {
          if (info.version !== appConfig.iosVersion) return plus.runtime.openURL(appConfig.iosUrl)
          this._showToast('当前为最新版本')
        } else {
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
