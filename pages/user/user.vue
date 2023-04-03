<template>
  <w-page>
    <w-header :h="h">
      <view class="user">
        <view class="user-card mgb-30">
          <u-avatar :src="userInfo.avatar" size="100"></u-avatar>
          <view class="user-card-info">
            <view class="user-card-info-title">
              <view class="user-card-info-name mgb-5">
                <u--text :text="userInfo.nickname" size="32" color="#202127" bold></u--text>
              </view>
              <view class="user-card-info-type">
                <u--text mode="phone" :text="userInfo.tel" size="22" format="encrypt"></u--text>
              </view>
            </view>
            <view>
              <u-upload :useBeforeRead="true" maxCount="1" @afterRead="afterRead">
                <u-icon name="arrow-right" size="30"></u-icon>
              </u-upload>
            </view>
          </view>
        </view>
        <view class="user-cell-group mgb-50">
          <view
            class="user-cell"
            v-for="(item, index) in cellList"
            :key="index"
            @click="clickCell(item)"
          >
            <view class="user-cell-left">
              <u-icon
                :customStyle="{ marginRight: '20rpx' }"
                :name="item.icon"
                size="30"
                color="#202127"
              ></u-icon>
              <u--text :text="item.name" size="26" color="#202127"></u--text>
            </view>
            <view class="user-cell-right">
              <u-icon name="arrow-right" size="30"></u-icon>
            </view>
          </view>
        </view>
        <u-button text="退出登录" @click="logout"></u-button>
      </view>
    </w-header>
  </w-page>
</template>

<script>
import telphone from '@/utils/telphone.js'
import Api from '@/config/api/index'

export default {
  data() {
    return {
      h: '',
      userInfo: {},
      cellList: [
        {
          icon: 'star',
          name: '我的收藏',
          url: ''
        },
        {
          icon: 'setting',
          name: '设置',
          url: ''
        },
        {
          icon: 'phone',
          name: '联系我们',
          url: ''
        }
      ]
    }
  },
  methods: {
    // 登出
    logout() {
      Api.logout()
      this._redirectTo('pages/login/login')
      uni.clearStorage()
    },
    // 点击
    clickCell(item) {
      switch (item.icon) {
        case 'star':
          this._switchTab('pages/collect/collect')
          break
        case 'setting':
          this._navigateTo('pages/user/setting/setting')
          break
        case 'phone':
          telphone(15757115639)
          break
      }
    },
    // 图片上传
    async afterRead({ file }) {
      uni.showLoading({ title: '图片上传中...' })
      console.log(file)
      const result = await Api.uploadFile({
        filePath: file.url,
        name: 'file'
      })
      console.log(result)
      this.userInfo.avatar = 'http://8.142.135.242:9000/' + result
      uni.hideLoading()
    }
  },
  onShow() {
    const { statusBarHeight } = uni.$u.sys()
    this.h = statusBarHeight + 48
  },
  onLoad() {
    this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
    console.log(this.userInfo)
  }
}
</script>
<style lang="scss" scoped>
.user {
  .user-card {
    @include flex;
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;

    .user-card-avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
    }

    .user-card-info {
      @include flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      margin-left: 30rpx;

      .user-card-info-title {
        @include flex(column);
        justify-content: center;
      }
    }
  }

  .user-cell-group {
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;

    .user-cell {
      @include flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1px solid #f8f8f8;

      .user-cell-left {
        @include flex;
      }
    }
  }
}
</style>
<style>
page {
  background-color: #f6f6f6;
}
</style>
