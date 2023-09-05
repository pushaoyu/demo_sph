import {reqGetSearchInfo} from '@/api/index'

// search小仓库
const state = {
    searchInfo:{}
}
const actions = {
    // 获取搜索模块的数据
    async getSearchInfo({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHINFO',result.data)
        }
    }
}
const mutations ={
    GETSEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    }
}

// 计算属性,在项目中为了简化仓库中的数据而生
const getters = {
    goodsList(state){
        return state.searchInfo.goodsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList || []
    },
    attrsList(state){
        return state.searchInfo.attrsList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}