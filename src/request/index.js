//在index.js中引入axios
import axios from 'axios';
//引入qs模块，用来序列化post类型的数据
import QS from 'qs';
//antd的message提示组件，大家可根据自己的ui组件更改。
import { message } from 'antd'

//保存环境变量
const isPrd = process.env.NODE_ENV === 'production';

//区分开发环境还是生产环境基础URL
export const basciUrl = isPrd ? 'https://www.production.com' : 'http://www.development.com'

//设置axios基础路径
const service = axios.create({
  baseURL: 'http://192.168.143.188:10010'
})

// 请求拦截器
service.interceptors.request.use(config => { 

if(localStorage.getItem('token'))
  config.headers = {
    'Token': localStorage.getItem('token'),
    // 'Content-Type':'multipart/form-data'
  }
  //序列化请求参数，不然post请求参数后台接收不正常
  config.data = QS.stringify(config.data)
  return config
}, error => { 
    return error;
})

// 响应拦截器
service.interceptors.response.use(response => {
  //根据返回不同的状态码做不同的事情
  // 这里一定要和后台开发人员协商好统一的错误状态码
  if (response.code) {
    switch (response.code) {
      case 200:
        return response.data;
      case 401:
        //未登录处理方法
        break;
      case 403:
        //token过期处理方法
        break;
      default:
        message.error(response.data.msg)
    }
  } else { 
    return response;
  }
})
//最后把封装好的axios导出
export default service