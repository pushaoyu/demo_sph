import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodsInfo:{},
    uuid_token:getUUID()
}


const actions = {
    // 跳转到商品详情页发送的请求
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODSINFO',result.data)
        }
    },

    // 加入购物车返回的解构
    // 加入购物车以后(发请求),前台将参数带给服务器
    // 服务器写入数据成功,并没有返回其他的数据,只是返回code=200,代表这次操作成功
    // 因为服务器没有返回其余数据,因此咱们不需要三连环存储数据
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error)
        }
    }
}

const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },

    // 简化产品信息的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },

    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}