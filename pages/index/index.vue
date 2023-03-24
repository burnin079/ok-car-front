<template>
  <view class="home">
    <view :style="{ height: $u.addUnit(h) }"></view>
    <view class="relative">
      <u-tabs
        class="mgb-30"
        lineHeight="0"
        :list="brandList"
        @click="clickBrand"
        :activeStyle="{ color: '#1e2021', fontSize: '36rpx', fontWeight: 'blod' }"
        :inactiveStyle="{ color: '#989ca0', fontSize: '24rpx' }"
        :itemStyle="{ padding: '0 30rpx' }"
      ></u-tabs>
    </view>
    <view class="brand-model mgb-20 relative">
      <view class="brand-model-info">
        <u--text text="Model 3" size="26" color="#1c1d23" @click="modelClick"></u--text>
        <u-icon
          class="mgl-10"
          size="16"
          name="arrow-down"
          color="#1c1d23"
          @click="modelClick"
        ></u-icon>
      </view>
      <view class="brand-model-control">
        <u-icon class="mgl-20" name="star" size="40" color="#313333"></u-icon>
        <u-icon class="mgl-20" name="share-square" size="40" color="#313333"></u-icon>
      </view>
    </view>
    <view class="brand-carshow">
      <view class="brand-carshow-webview mgb-20">
        <web-view :src="wvURL"></web-view>
      </view>
      <view class="brand-carshow-current_color">
        <u--text text="千山翠" size="32" color="#1c1d23" align="center" bold></u--text>
        <u--text text="当前颜色" size="20" color="#a1a5a6" align="center"></u--text>
      </view>
    </view>
    <view class="brand-carcolor-hot">
      <u-scroll-list :indicator="false">
        <div class="flex">
          <view
            v-for="(item, index) in hotList"
            :key="index"
            :class="[item === activeColor ? 'active-color' : 'default-color']"
            :style="{ backgroundColor: item }"
            class="brand-carcolor-hostlist"
            @click="clickHotColor(item)"
          ></view>
        </div>
      </u-scroll-list>
    </view>
    <view class="brand-carcolor-all">
      <view class="brand-carcolor-all-header">
        <u--text text="全部色彩" size="26" color="#1c1d23" bold></u--text>
        <u--input
          placeholder="色号/助记码"
          prefixIcon="search"
          :prefixIconStyle="{ fontSize: '40rpx' }"
          border="none"
          v-model="searchValue"
          :customStyle="{ backgroundColor: '#f6f6f6', padding: '10rpx' }"
        ></u--input>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      h: '',
      brandList: [
        { name: '特斯拉' },
        { name: '比亚迪' },
        { name: '蔚来' },
        { name: '理想' },
        { name: '小鹏' }
      ],
      hotList: ['#111111', '#999999', 'green', 'greenyellow', 'grey', 'blue', 'red'],
      activeColor: '#111111',
      searchValue: '',
      wv: '',
      wvURL: 'https://pano275.p.kujiale.com/xiaoguotu/pano/3FOEBXO63YMD'
    }
  },
  onLoad() {},
  methods: {
    clickBrand({ name, index }) {
      console.log(name, index)
      this.wvURL = 'https://www.baidu.com'
    },
    modelClick() {
      this.wvURL = 'https://www.baidu.com'
      console.log(this.wvURL)
    },
    clickHotColor(item) {
      this.activeColor = item
    }
  },
  onShow() {
    const { statusBarHeight } = uni.$u.sys()
    this.h = statusBarHeight + 48
  },
  onReady() {
    // #ifdef APP-PLUS
    var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
    setTimeout(function () {
      this.wv = currentWebview.children()[0]
      this.wv.setStyle({ top: 130, height: 200 })
    }, 1000) //如果是页面初始化调用时，需要延时一下
    // #endif
  }
}
</script>

<style lang="scss" scoped>
.brand-model {
  @include flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;

  .brand-model-info {
    @include flex;
    align-items: center;
  }

  .brand-model-control {
    @include flex;
  }
}
.brand-carshow {
  box-sizing: border-box;
  @include flex(column);
  align-items: center;
  padding: 0 30rpx;

  .brand-carshow-webview {
    height: 300rpx;
  }

  .brand-carshow-current_color {
    flex: 1;
    @include flex(column);
    justify-content: center;
    align-items: center;
  }
}

.brand-carcolor-hot {
  padding: 0 30rpx;

  .brand-carcolor-hostlist {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    transform: scale(0.5);
    transform-origin: 0% center;

    &:nth-child(n + 2) {
      margin-left: -40rpx;
    }
  }
}
.active-color {
  border: 20rpx solid #e9e9e8;
}

.default-color {
  border: 20rpx solid #fff;
}

.brand-carcolor-all {
  padding: 0 30rpx;

  .brand-carcolor-all-header {
    @include flex;
    align-content: center;
  }
}

.mgl-10 {
  margin-left: 10rpx;
}
.mgl-20 {
  margin-left: 20rpx;
}

.flex {
  @include flex;
}

.relative {
  position: relative;
  z-index: 10010;
}
</style>
