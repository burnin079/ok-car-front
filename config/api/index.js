const request = uni.$u.http

export default {
  // 登录
  login: (data) => request.post('/user/login', data),
  // 发送短信验证码
  sendSms: (params) => request.get('/common/sendSms', { params }),
  // 获取用户信息
  getUserInfo: (params) => request.get('/user/info', params),
  // 更新用户头像
  updateAvatar: (params) => request.get('/user/update', params),
  // 上传文件
  uploadFile: (data) => request.upload('/common/uploadFile', data),
  // 获取车辆品牌列表
  getBrandList: (params) => request.get('/car/brand/list', params),
  // 获取车辆型号
  getBrandModelList: (params) => request.get('/car/model/list', { params }),
  // 获取车辆热门颜色列表
  getHotColorList: (params) => request.get('/car/color/hot/list', { params }),
  // 获取车辆颜色列表
  getColorList: (params) => request.get('/car/color/list', { params }),
  // 添加收藏
  addCollect: (data) => request.post('/collect/add', data),
  // 取消收藏
  cancelCollect: (params) => request.get('/collect/del', { params }),
  // 获取收藏列表
  getCollectList: (params) => request.get('/collect/list', params),
  // 退出登录
  logout: (params) => request.get('/user/logout', params),
  // app设置
  getAppConfig: (params) => request.get('/app/config', params),
  // 启动页广告
  getAppAdv: (params) => request.get('/app/adv', params)
}
