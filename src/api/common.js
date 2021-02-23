import http from './http'

export default {
  // 上传图片
  GoUploadImg(urlParams, data, config) {
    return http({
      url: 'https://...' + urlParams,
      method: 'post',
      data,
      ...config,
    })
  }

}
