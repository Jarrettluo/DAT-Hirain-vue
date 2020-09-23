import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import router from './router'
import locale from 'element-ui/lib/locale/lang/en' // 国际化支持


Vue.use(ElementUI, { locale }) //使用elementUI

Vue.config.productionTip = false

import axios from 'axios'   // 全局引入axios
Vue.prototype.$axios = axios
axios.interceptors.response.use(res => {
    if (!res.data)
        return res
    if (!res.data.errorCode || res.data.errorCode != 302)
        return res
    sessionStorage.removeItem('user')
    location.reload()
    return res
})

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import htmlToPdf from '@/components/utils/htmlToPdf' // html导出为pdf的内容
Vue.use(htmlToPdf)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
