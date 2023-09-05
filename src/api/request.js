// 二次封装axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 在当前模块下引入store
import store from '@/store'

// 创建实例对象
const req = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 设置请求拦截器
req.interceptors.request.use((config) => {
    // 请求头添加一个字段(userTempId):和后台商量好的
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    // console.log(store.state.detail.uuid_token);
    // 进度条开始
    nprogress.start()
    return config
})

// 设置响应拦截器
req.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(error)
})

export default req