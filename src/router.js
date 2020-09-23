import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Login from './components/common/login'
// import DataParse from './components/data_parser/dataparse'
import AdasDbc from './components/adas_evaluation/ADASDbc'
import AdasClg from './components/adas_evaluation/ADASClg'
import ADASEva from './components/adas_evaluation/ADASEva'
import ADASReport from './components/adas_evaluation/ADASReport'
import ADASCom from './components/adas_compare/ADASCom'
import DataManage from './components/data_manage/DataManage'

import first_page from './components/Sinotruck/first_page'

import sinotruck_home from './components/Sinotruck/home'

import team from './components/team_profiles/index'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path:'/', name:'登录页面', component:Login},
    { path: '/Adas_Dbc', name: '数据库文件提交', component: AdasDbc },
    { path: '/Adas_Clg', name: '源文件提交', component: AdasClg },
    { path: '/Adas_Fig', name: 'ADAS功能评估', component: ADASEva },
    { path: '/Adas_Report', name: 'ADAS功能评估', component: ADASReport },
    { path: '/Sinotruck', name: 'Sinotruck', component: first_page },
    { path: '/ADASCom',  name: 'ADAS功能对标', component: ADASCom},
    { path: '/LaderCom',  name: '雷达传感器对标', component: ADASCom},
    { path: '/DataManage',  name: '数据管理', component: DataManage},
    { path: '/sinotruck_home', name: 'LDW function', component: sinotruck_home},
    { path: '/team', name: 'TEAM', component: team}

  ]
})