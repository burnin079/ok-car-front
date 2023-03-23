<template>
  <w-page>
    <view class="login">
      <view class="login-bg">
        <video
          src="../../static/images/login/bg-video.mp4"
          :autoplay="true"
          :loop="true"
          :muted="true"
          object-fit="cover"
          :controls="false"
          class="login-video"
          id="videoRef"
        ></video>
      </view>
      <cover-view class="login-box">
        <image class="login-box__logo mgb-10" src="../../static/images/login/logo.png" mode="" />
        <h2 class="mgb-140">欢迎来到以可</h2>
        <cover-view class="login-form">
          <u--form class="mgb-20" labelPosition="left" :model="form" ref="form">
            <u-form-item prop="telephone" borderBottom>
              <u-input
                v-model="form.telephone"
                border="none"
                color="#fff"
                fontSize="20"
                placeholder="请输入电话"
                placeholderStyle="color:#fff;"
              >
                <template slot="prefix">
                  <u--text
                    :text="nationalCode"
                    size="20"
                    color="#fff"
                    suffixIcon="arrow-down"
                    iconStyle="font-size: 20px;color:#fff;padding: 0 20rpx"
                  ></u--text>
                </template>
              </u-input>
            </u-form-item>
            <u-form-item prop="code" borderBottom>
              <u-input
                v-model="form.code"
                border="none"
                color="#fff"
                fontSize="20"
                placeholder="请输入验证码"
                placeholderStyle="color:#fff;"
              >
                <template slot="suffix">
                  <u-code
                    ref="uCode"
                    seconds="60"
                    changeText="X秒重新获取"
                    @change="codeChange"
                  ></u-code>
                  <u-button
                    @click="getCode"
                    :text="tips"
                    plain
                    shape="circle"
                    :customStyle="{ background: 'rgba(0, 0, 0, 0)', color: '#fff' }"
                  ></u-button>
                </template>
              </u-input>
            </u-form-item>
          </u--form>
          <u-button shape="circle" text="登录/注册" @click="login"></u-button>
        </cover-view>
      </cover-view>
      <view class="login-private">
        <u-checkbox-group placement="column" @change="checkboxChange">
          <u-checkbox shape="circle" name="1" activeColor="white" iconColor="grey"> </u-checkbox>
        </u-checkbox-group>
        <u--text text="登录即表示你同意障私政策" color="#fff"></u--text>
      </view>
    </view>
  </w-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        telephone: '',
        code: ''
      },
      nationalCode: '+86',
      show: false,
      columns: [['+86', '+96', '+76']],
      tips: '',
      checkboxValue: []
    }
  },
  methods: {
    // 选择区号
    changeNationalCode(item) {
      this.nationalCode = item.value[0]
      this.show = false
    },
    // 获取验证码
    getCode() {
      this.$refs.uCode.start()
    },
    codeChange(text) {
      this.tips = text
    },
    // 勾选协议
    checkboxChange(detail) {
      console.log(detail)
      this.checkboxValue = detail
      console.log(this.checkboxValue)
    },
    // 登录
    login() {
      if (!this.form.telephone && !this.form.code) {
        return this._showToast('请输入电话/验证码')
      }
      if (!this.checkboxValue.length) return this._showToast('请先勾选用户协议')
    }
  },
  onShow() {
    // 当app切到后台再切回前台的时候会触发onShow这个时候视频应该继续播放，不这样做视频会暂停的
    this.$nextTick(() => {
      this.VideoContext = uni.createVideoContext('videoRef')
      this.VideoContext.play()
    })
  }
}
</script>

<style lang="scss" scoped>
$font-color: #fff;

.login {
  @include flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  width: 100vw;

  .login-bg {
    position: absolute;
    height: 100vh;
    width: 100vw;

    .login-video {
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }

  .login-box {
    position: relative;
    z-index: 10001;
    width: 80%;
    color: $font-color;

    .login-box__logo {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }

  .login-private {
    @include flex;
    position: absolute;
    bottom: 5%;
    z-index: 10001;
  }
}
</style>
