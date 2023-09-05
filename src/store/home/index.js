import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'

// home小仓库
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}


const actions = {
    // 发送请求获取三级联动数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
        }
    },

    // 发送请求获取Banner数据
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },

    // 发送请求获取floor数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}

const mutations ={
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },

    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },

    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}