<template>
  <el-container style=" border: 1px solid #eee;">
    <el-main style="display:inline;inline-height:30px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name" />
      </el-breadcrumb>
      <!-- <router-view></router-view> -->
      <el-container direction="vertical">
        <h1>ADAS功能数据库提交</h1>
        <p style="margin-top:-35px;">
          提交ADAS功能的DBC文件
        </p>
        <p><br></p>
                
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="DateTime"
            width="180"
          />
          <el-table-column
            prop="name"
            label="Reports"
          >
            <template slot-scope="scope">
              <a
                :href="'http://localhost:8888/ADAS_Chart/'+scope.row.name"
                target="_blank"
              >
                {{ scope.row.name }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Username"
            width="180"
          />
        </el-table>
      </el-container>
    </el-main>
  </el-container>
</template>


<script>
  import axios from 'axios'

    export default {
      data() {
        return {
          tableData: this.getAllReport(),
        }
      },
      methods:{
        getAllReport(){
          var msg = this.$message;
          const url = 'http://localhost:5000/DataAnalysis/PlotOutcome/';
          var data = [];
          axios
            .get(url)
            .then(function(response){
                // 获取GET到的信息，并返回
                if (response.data.code == 1200){
                  var reports = response.data.data
                  reports.forEach(item => {
                    data.push({
                      'date': item.time,
                      'name': item.url,
                      'address': item.uname
                    })
                  });
                }else {
                  msg.error('链接服务器失败！');
                }
            })
            .catch(function(error){
                console.log(error);
            })
          return data
        },
      }
    }
  </script>