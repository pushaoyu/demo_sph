import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建实例对象
const mockReq = axios.create({
    baseURL:'/mock',
    timeout:5000
})

// 设置请求拦截器
mockReq.interceptors.request.use((config)=>{
    nprogress.start()
    return config
})

// 设置响应拦截器
mockReq.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(error)
})

export default mockReq

