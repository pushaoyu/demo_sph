import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 引入store
import store from '@/store'
Vue.use(VueRouter)

// 拷贝一份
let originPush = VueRouter.prototype.push
let originReplacee = VueRouter.prototype.replace

// 重写push和replacce
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplacee.call(this, location, resolve, reject)
    } else {
        originReplacee.call(this.location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    // 路由跳转后的滚动行为
    scrollBehavior() {
        return { y: 0 }
    }
})

// 全局守卫:前置守卫 (在路由跳转之前进行判断)
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由信息
    // from:可以获取到你从哪个路由而来的信息
    // next:放行函数 next()放行 next(path)放行到指定路由
    let token = store.state.user.token //用户登录了才会有token
    let userName = store.state.user.userInfo.name
    next()
    if(token){
        // 用户已经登录
        if(to.path=='/login'){ //登录了还去登录页面
            next('/home')
        }else{ //登录了没去登录页面
            if(userName){ //有了用户名
                next()
            }else{ //没有用户信息,派发action让仓库存储用户信息在跳转
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效(logout)
                    await store.dispatch('LogOut')
                    next('/login')
                }
            }
        }
    }else{
        // 用户还没有登录:不能去交易相关,支付相关[pay|paysuccess],个人中心
        let toPath = to.path
        if(toPath.indexOf('/trade')!==-1 || toPath.indexOf('/pay')!==-1 || toPath.indexOf('/center')!==-1){
            next('/login?redirect='+toPath)
        }
        // 去的不是上面这些路由(home|search|shopCart)
        next()
    }

})

export default router