import {getCode,reRegisterUser,reqUserLogin,reqUserInfo,reqLogOut} from '@/api/index'
import {setToken,getToken,removeToken} from'@/utils/token.js'

const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}

const actions = {
    // 获取注册时的验证码
    async getCode({commit},phone){
        let result = await getCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject('error')
        }
    },

    // 注册用户
    async reRegisterUser({commit},data){
        let result = await reRegisterUser(data)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject('error')
        }
    },

    // 用户登录
    async UserLogin({commit},data){
        let result = await reqUserLogin(data)
        // console.log(result);
        if(result.code == 200){
            // 持久化存储token
            setToken(result.data.token)
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject('error')
        }
    },

    // 获取用户信息
    async getUserInfo({commit}){
       let result =  await reqUserInfo()
    //    console.log(result);
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
        }
    },

    // 退出登录
    async LogOut({commit}){
        let result = await reqLogOut()
        if(result.code==200){
            commit('LOGOUT')
            return 'ok'
        }else{
            return Promise.reject('file')
        }
    }
}

const mutations ={
    GETCODE(state,code){
        state.code = code
    },

    USERLOGIN(state,token){
        state.token = token
    },

    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },

    LOGOUT(state){
        state.code = ''
        state.userInfo = {}
        state.token = removeToken()
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}