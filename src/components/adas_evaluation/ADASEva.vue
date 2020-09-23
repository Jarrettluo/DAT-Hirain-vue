<template>
  <el-container style=" border: 1px solid #eee;">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          ADAS功能评估
        </el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name" />
      </el-breadcrumb>
      <p />
      <h1>ADAS功能评估</h1>
      <p style="margin-top:-35px;">
        这个页面是ADAS功能评估页面，用于开发ADAS数据绘图的产品。
      </p>
      <p><br></p>
      <h2 style="margin-top:35px;">
        ADAS数据选择
      </h2>
      <p style="margin-top:-10px;">
        ADAS数据选择
      </p>
      <div class="transfer-page">
        <Transfer 
          ref="chooseClgs"
        />
      </div>
      <el-divider />
      <h2 style="margin-top:35px;">
        ADAS功能选择
      </h2>
      <p style="margin-top:-10px;">
        选择以下需要开启的ADAS功能
      </p>
      <AdasFunc 
        ref="pwd"
      />
      <el-divider />
      <h2 style="margin-top:35px;">
        评估功能参数设置
      </h2>
      <p style="margin-top:-10px;">
        对ADAS功能评估参数进行设置
      </p>
      <el-divider />
      <router-view />
      <el-container style="text-align:center;margin:auto;">
        <el-button
          type="primary"
          plain
          @click="submit"
          style="width:100%"
        >
          提交运算
        </el-button>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Transfer from './Transfer'
import AdasFunc from './Function'
import axios from 'axios'

export default {
    components:{
        Transfer: Transfer,
        AdasFunc: AdasFunc,
    },
    methods:{
      submit() {
        const url = 'http://localhost:5000/DataAnalysis/PlotOutcome/'
        var clg_list = this.$refs.chooseClgs.clgs;
        var func_list = []
        var msg = this.$message


        // this.$refs.pwd.xx.checked = false;
        console.log('DGHGXBVCBCV')
        // console.log(this.$refs.pwd.xx.checked)
        // console.log(this.$refs.pwd.xx)

        for (var i in this.$refs.pwd.adas_funcs){
          if(this.$refs.pwd.adas_funcs[i]){
            func_list.push(i);
          }
        }
        // 必须是要提交clg且选择一个功能！
        if (func_list.length && clg_list.length){
          var data = {
            'clgs':clg_list,
            'funcs': func_list
          }

          // 清空列表！
          // this.$refs.pwd.xx.checked = false;
          console.log('GFGSFDGSFDGSFDG')
          // console.log(this.$refs.pwd.xx.checked)
          console.log(this.$refs.pwd.xx)
          console.log(this.$refs.pwd.xx.value)

          axios
            .post(url, data)
            .then(function(response){
                if (response.data.code == 1200){
                  msg.warning('提交成功！')
                }else {
                  msg.error('上传失败！')
                }
            })
            .catch(function(error){
                console.log(error)
            })
        }else{
          this.$alert('Please choose files and turn on a function!')
        }
      }
    }

}
</script>

<style scoped>
    h1{
        font-family: "PingFang SC";
        font-size:24px;
        font-weight: normal;
    }
    h2 {
        font-family: "PingFang SC";
        font-size:20px;
        font-weight: normal;
    }
  .el-container {
      text-align: left;
  }
  .transfer-page {
       background-color:white;
       padding:5px 50px;
       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
       border-radius: 4px;
  }
</style>