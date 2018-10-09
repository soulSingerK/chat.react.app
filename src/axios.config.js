import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config) {
  console.log('加载中')
  return config
})

axios.interceptors.response.use(function(config) {
  console.log('加载完成')
  return config
})