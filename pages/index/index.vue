<template>
  <view class="home-page">
    <view :style="{ height: $u.addUnit(h) }"></view>
    <view class="main">
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
          <u--text
            :text="currentModel.name"
            size="26"
            color="#1c1d23"
            @click="show = true"
          ></u--text>
          <u-icon
            class="mgl-10"
            size="16"
            name="arrow-down"
            color="#1c1d23"
            @click="show = true"
          ></u-icon>
        </view>
        <view class="brand-model-control">
          <u-icon
            class="mgl-20"
            :name="isCollect ? 'star-fill' : 'star'"
            size="40"
            :color="isCollect ? 'red' : '#313333'"
            @click="clickCollect"
          ></u-icon>
          <u-icon
            class="mgl-20"
            name="share-square"
            size="40"
            color="#313333"
            @click="clipboard"
          ></u-icon>
        </view>
      </view>
      <view class="brand-webview mgb-10" id="webviewContainer">
        <web-view :src="wvURL"></web-view>
      </view>
      <view class="brand-carshow mgb-20">
        <view class="brand-carshow-current_color">
          <u--text
            :text="activeColor.name || '--'"
            size="32"
            color="#1c1d23"
            align="center"
            bold
          ></u--text>
          <u--text text="当前颜色" size="20" color="#a1a5a6" align="center"></u--text>
        </view>
      </view>
      <view class="brand-carcolor-hot">
        <u-scroll-list :indicator="false">
          <div class="flex">
            <view
              v-for="(item, index) in hotList"
              :key="index"
              :class="[item.color === activeColor.color ? 'active-color' : 'default-color']"
              :style="{ backgroundColor: item.color }"
              class="brand-carcolor-hostlist brand-carcolor-block"
              @click="clickHotColor(item)"
            ></view>
          </div>
        </u-scroll-list>
      </view>
      <view class="brand-carcolor-all">
        <view class="brand-carcolor-all-header mgb-20">
          <u--text text="全部色彩" size="26" color="#1c1d23" bold></u--text>
          <u--input
            placeholder="色号/助记码"
            prefixIcon="search"
            :prefixIconStyle="{ fontSize: '40rpx' }"
            border="none"
            v-model="searchValue"
            :customStyle="{ backgroundColor: '#f6f6f6', padding: '10rpx' }"
            @confirm="search"
          ></u--input>
        </view>
        <swiper :indicator-dots="true" class="swiper">
          <swiper-item class="swiper-item" v-for="(item, index) in colorList" :key="index">
            <view
              :style="{ width: $u.addUnit(blockWidth, 'px'), height: '130rpx' }"
              class="brand-carcolor-all-block"
              v-for="(subItem, subIndex) in item"
              :key="subIndex"
            >
              <view
                :class="[subItem.color === activeColor.color ? 'active-color' : 'default-color']"
                :style="{ backgroundColor: subItem.color }"
                class="brand-carcolor-block brand-carcolor-all-item"
                @click="clickHotColor(subItem)"
              ></view>
              <u--text
                :text="subItem.name"
                size="16"
                color="#1c1d23"
                align="center"
                lines="1"
              ></u--text>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <u-picker
      closeOnClickOverlay
      keyName="name"
      :show="show"
      :columns="modelList"
      @confirm="modelClick"
      @cancel="show = false"
    ></u-picker>
  </view>
</template>

<script>
import Api from '@/config/api/index'
export default {
  data() {
    return {
      h: '',
      brandList: [],
      modelList: [],
      currentModel: {},
      hotList: [],
      colorList: [],
      allColorList: [],
      activeColor: {},
      searchValue: '',
      wv: '',
      wvURL: 'https://pano275.p.kujiale.com/xiaoguotu/pano/3FOEBXO63YMD',
      swiperList: [
        'integral',
        'kefu-ermai',
        'coupon',
        'gift',
        'scan',
        'pause-circle',
        'wifi',
        'email',
        'list',
      ],
      show: false,
      blockWidth: '',
      pageCount: 0,
      isCollect: 0,
      collectBus: {},
    }
  },
  methods: {
    // 品牌选择
    clickBrand({ name, index }) {
      this.getBrandModelList(this.brandList[index].id)
    },
    // 型号选择
    async modelClick({ index, value }) {
      this.currentModel = value[0]
      await this.getHotColorList()
      await this.getColorList()
      this.show = false
    },
    clickHotColor(item) {
      this.activeColor = item
      if (typeof this.collectBus[item.id] !== 'undefined') {
        this.isCollect = this.collectBus[item.id]
      } else {
        this.collectBus[item.id] = item.isCollect
        this.isCollect = this.collectBus[item.id]
        console.log(this.isCollect)
      }
    },
    // 获取用户详情
    async getUserInfo() {
      const result = await Api.getUserInfo()
      uni.setStorageSync('userInfo', JSON.stringify(result))
    },
    // 获取品牌列表
    async getBrandList() {
      const result = await Api.getBrandList()
      this.brandList = result
      this.getBrandModelList(result[0].id)
    },
    // 获取型号列表
    async getBrandModelList(id) {
      const result = await Api.getBrandModelList({ brandId: id })
      console.log(result)
      this.currentModel = result[0]
      this.modelList = [result]
      await this.getHotColorList()
      await this.getColorList()
    },
    // 获取热门颜色列表
    async getHotColorList() {
      const result = await Api.getHotColorList({ modelId: this.currentModel.id })
      this.hotList = result
      this.activeColor = result[0] || []
      console.log(this.activeColor)

      this.collectBus[this.activeColor.id] = this.activeColor.isCollect
      this.isCollect = this.activeColor.isCollect
      console.log(this.collectBus)
    },
    // 获取颜色列表
    async getColorList() {
      const result = await Api.getColorList({ modelId: this.currentModel.id })
      const total = Math.ceil(result.length / this.pageCount)
      this.allColorList = uni.$u.deepClone(result)
      const _temp = []
      for (let i = 0; i < total; i++) {
        _temp.push(result.splice(0, this.pageCount))
      }
      console.log(_temp)
      this.colorList = _temp
    },
    // 收藏
    async clickCollect() {
      const { brandId, id, modelId } = this.activeColor
      if (this.collectBus[id]) {
        const result = await Api.cancelCollect({
          colorId: id,
        })
      } else {
        const result = await Api.addCollect({
          brandId,
          modelId,
          colorId: id,
        })
      }
      console.log(this.collectBus[id])
      this.collectBus[id] = !this.collectBus[id]
      this.isCollect = this.collectBus[id]
    },
    // 搜索
    async search() {
      const result = await Api.getColorList({
        modelId: this.currentModel.id,
        search: this.searchValue,
      })
      const total = Math.ceil(result.length / this.pageCount)
      const _temp = []
      for (let i = 0; i < total; i++) {
        _temp.push(result.splice(0, this.pageCount))
      }
      console.log(_temp)
      this.colorList = _temp
    },
    // 设置粘贴板
    async clipboard() {
      uni.setClipboardData({
        data: '123',
        success: function () {},
      })
    },
  },
  onShow() {
    const { statusBarHeight, screenWidth, windowWidth } = uni.$u.sys()
    this.h = statusBarHeight + 48
    const count = parseInt((screenWidth - uni.$u.getPx('60rpx')) / uni.$u.getPx('135rpx'))
    this.pageCount = count * 3
    this.blockWidth = parseInt((screenWidth - uni.$u.getPx('60rpx')) / count)
    this.getUserInfo()
    this.getBrandList()
  },
  onReady() {
    console.log('onReady')
    // #ifdef APP-PLUS
    var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
    const wv = currentWebview.children()[0]
    setTimeout(() => {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#webviewContainer')
        .boundingClientRect((data) => {
          wv.setStyle({ top: data.top, height: data.height })
        })
        .exec()
    }, 1000) //如果是页面初始化调用时，需要延时一下
    // #endif
  },
}
</script>
<style lang="scss">
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
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
.brand-webview {
  flex: 1;
}

.brand-carshow {
  box-sizing: border-box;
  @include flex(column);
  align-items: center;
  padding: 0 30rpx;

  .brand-carshow-current_color {
    flex: 1;
    @include flex(column);
    justify-content: center;
    align-items: center;
  }
}

.brand-carcolor-hot {
  padding: 0 30rpx;
}

.brand-carcolor-all-block {
  @include flex(column);
  align-items: center;
}

.brand-carcolor-block {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
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

.swiper {
  height: 460rpx;

  .swiper-item {
    @include flex;
    flex-wrap: wrap;
    align-content: flex-start;
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
