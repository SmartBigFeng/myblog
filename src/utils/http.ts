
import axios from 'axios'
import store from '@/store'
//基础设置
const instance = axios.create({
  baseURL: "",
  timeout: 5000
});
//请求拦截器
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});
//响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

const http = {
  get(url: any, data?: any) {
    return instance.get(url, {
      params: data
    })
  },
  post(url: any, data?: any, formdata?: any) {
    return instance.post(url, data)
  },
  put(url: any, data?: any) {
    return instance.put(url, data)
  },
  delete(url: any, data?: any) {
    return instance.delete(url, {
      data
    })
  }
};

export default http;