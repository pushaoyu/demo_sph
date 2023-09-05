import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入store
import store from './store'
// 引入mock.js-->mock数据
import '@/mock/mockServer'
// 引入seiper的css样式
import 'swiper/css/swiper.css'
// 引入API接口将其挂载到Vue原型对象上
import * as API from '@/api'
// 引入element-ui(方式一)
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
// 引入element-ui(方式二)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入vue-lazyload
import VueLazyload from 'vue-lazyload'
// 引入懒加载图片
// import lazyimg from '@/assets/lazyloadimg.gif'
const loadimage = require('@/assets/images/lazyloadimg.gif')
Vue.use(VueLazyload, {
  loading: loadimage,
})

// 引入表单校验的自定义插件
import '@/plugins/validate'

// 引入全局组件
import TypeNav from '@/components/TypeNav'
import CarouselTil from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 注册全局组件 第一个参数:全局组件的名字,第二个参数:是哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(CarouselTil.name,CarouselTil)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router,
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 派发一个action || 获取商品分类的三级列表数据
  mounted() {
    this.$store.dispatch('categoryList')
  }
}).$mount('#app')
