import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySucess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// // 引入二级路由
// import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GorupOrder'


export default [
    {
        path: '/center',
        name:'center',
        component:()=>import('@/pages/Center'),
        meta: { show: true },
        children:[
            {
                path:'myorder',
                name:'myorder',
                component:()=>import('@/pages/Center/MyOrder'),
            },{
                path:'grouporder',
                name:'grouporder',
                component:()=>import('@/pages/Center/GorupOrder'),
            },{
                path:'/center',
                redirect:"/center/myorder"
            }
        ]
    },
    {
        path: '/paysuccess',
        name:'paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name:'pay',
        component:()=>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/trade',
        name:'trade',
        component:()=>import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            // 去交易页面,必须是从购物车而来
            if(from.path== '/shopcart'){
                next()
            }else{
                // 其他的路由组件而来,停留在当前
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name:'shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        name: 'search',
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '*',
        redirect: "/home", // 重定向,在项目跑起来的时候,访问/,让他定向到首页
    }
]