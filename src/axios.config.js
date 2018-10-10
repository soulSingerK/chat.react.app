import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config) {
  Toast.show('加载中')
  return config
})

axios.interceptors.response.use(function(config) {
  console.log(config)
  Toast.hide()
  if (config.status === 200) {
    return config.data
  }
  return config
})