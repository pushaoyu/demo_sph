import { reqCartList, reqDeleteCart, reqUpdateChecked } from '@/api/index'

const state = {
    cartList: []
}

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },

    // 删除购物车商品
    async DeleteCart({ commit }, skuId) {
        let result = reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject('error')
        }
    },

    // 修改某个商品的勾选状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = reqUpdateChecked(skuId, isChecked)
        if (result.code = 200) {
            return 'ok'
        } else {
            return Promise.reject('error')
        }
    },

    // 删除选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取当前购物车商品列表
        // console.log(getters.cartList.cartInfoList);
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let result = item.isChecked == 1 ? dispatch('DeleteCart', item.skuId) : ''
            promiseAll.push(result)
        });
        return Promise.all(promiseAll)
    },

    // 修改全选框的勾选状态
    updateAllChecked({ dispatch, state }, isChecked) {
        // 获取购物车中所有的商品
        
        console.log(state.cartList[0].cartInfoList,isChecked);
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promiseItem = dispatch('updateChecked', { skuId: item.skuId, isChecked:isChecked })
            promiseAll.push(promiseItem)
        })
        return Promise.all(promiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}