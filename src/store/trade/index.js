import {reqUserAddress,reqOrderInfo} from '@/api'

const state = {
    addressInfo:[],
    orderInfo:{}
}

const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqUserAddress()
        // console.log(result);
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }
    },

    // 获取订单信息
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        // console.log(result);
        if(result.code == 200){
            commit('GETORDERINFO',result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state,addressInfo){
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}

const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}