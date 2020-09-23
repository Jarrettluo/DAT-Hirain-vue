<template>
  <el-menu
    :default-active="path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    active-text-color="#108ee9"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location" />
        <span>ADAS功能评估</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/Adas_Dbc">
          ADAS功能DBC文件
        </el-menu-item>
        <el-menu-item index="/Adas_Clg">
          ADAS数据提交
        </el-menu-item>
        <el-menu-item index="/Adas_Fig">
          ADAS功能绘图
        </el-menu-item>
        <el-menu-item index="/Adas_Report">
          评估报告查看
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item
      index="/Sinotruck"
    >
      <i class="el-icon-menu" />
      <span slot="title">Sinotruck</span>
    </el-menu-item>

    <el-menu-item
      index="/ADASCom"
    >
      <i class="el-icon-document" />
      <span slot="title">ADAS功能对标</span>
    </el-menu-item>

    <el-menu-item index="/LaderCom">
      <i class="el-icon-setting" />
      <span slot="title">传感器对标</span>
    </el-menu-item>

    <el-menu-item index="/DataManage">
      <i class="el-icon-star-on" />
      <span slot="title">数据管理</span>
    </el-menu-item>
  </el-menu>
</template>


<script>
  export default {
    data () {
    return {
      path: '',
      }
    },
    created () {
      this.onRouteChanged() // 路由变化
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'onRouteChanged'
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
        // console.log('这里是打印的内容')
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      onRouteChanged () {
        let that = this
        that.path  = that.$route.path
      }
    }
  }
</script>

<style scoped>
.el-menu{
 border-right: 0px solid red; 
 /* border: right 0px; */

}
.el-menu-item.is-active {
  border-left:3px solid #108ee9;
}
.el-menu-vertical-demo .el-menu{
  border: 0px;
}
</style>