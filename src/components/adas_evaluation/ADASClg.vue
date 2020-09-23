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
      <!-- <router-view></router-view> -->
      <el-container direction="vertical">
        <el-form
          ref="form"
          v-model="newData"
          label-width="80px"
          label-position="right"
          size="mini"
        >
          <h1>ADAS功能数据提交</h1>
          <p style="margin-top:-35px;">
            提交需要运算的ADAS数据
          </p>
          <p><br></p>
          <h2 style="margin-top:0px;">
            提交ADAS数据
          </h2>
          <p style="margin-top:-10px;">
            选择本地的数据上传
          </p>
          <div class="clg-upload">
            <!-- 这里是上传页面 -->
            <el-upload
              class="upload"
              ref="upload"
              action=""
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :before-remove="beforeRemove"
              :file-list="fileList"
              :auto-upload="false"
              accept=".clg"
              :http-request="httpRequest"
            >
              <el-button
                slot="trigger"
                size="small"
                type="primary"
              >
                点击上传
              </el-button>
              <!-- 这里是上传到服务器的按钮 -->
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              <div
                slot="tip"
                class="el-upload__tip"
              >
                只能上传.clg文件，且不超过50MB
              </div>
            </el-upload>
          </div>
          <el-divider />      
          <h2 style="margin-top:35px;">
            DBC文件选择
          </h2>
          <p style="margin-top:-10px;">
            请选择对应的DBC文件
          </p>
          <div style="width:100%;padding:0px 0px;">
            <div
              class=""
              style="width:45%;float:left;"
            >
              <el-select
                v-model="newData.dbc"
                placeholder="请选择"
                style="width:100%"
              >
                <!-- dbc选择页面 -->
                <el-option-group
                  v-for="group in options"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-option-group>
              </el-select>
            </div>
            <div
              class=""
              style="width:10%;float:left;text-align:center;"
            >
              <p style="margin-top:10px;">
                或
              </p>
            </div>
            <div
              class=""
              style="width:45%;float:left;"
            >
              <router-link to="/Adas_Dbc">
                <el-button
                  plain
                  style="width:100%"
                >
                  提交DBC文件
                </el-button>
              </router-link>
            </div>
          </div>
          <br>
          <br>
          <el-divider />
          <h2>添加备注信息</h2>
          <p style="margin-top:-10px;">
            为提交的文件信息添加备注信息
          </p>
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="newData.note"
            maxlength="10"
            show-word-limit
          />
          <el-divider />
          <el-button
            type="primary"
            plain
            @click="newForm"
            style="width:100%"
          >
            提交数据
          </el-button>
        </el-form>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
// import request from "@/utils/request";
import axios from 'axios';

export default {
    data() {
        return {
            newData:{},
            file:[],
            fileList: [],
            options: [{
          label: '历史选择',
          options: [ ]
        }, {
          label: '已上传的DBC',
          options: [ ]
        }],
        }
    },
    created: function() {
        this.allDbc(); // created以后获取所有的DBC文件
    },
    methods:{
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        httpRequest(param){
            this.file.push(param.file); //一般情况下在这里创建FormData对象，但我们需要上传多个文件，因此这里只进行文件的获取
        },
        // 提交
        newForm() {
            var upData = new FormData();
            var msg = this.$message
            this.$refs.upload.submit(); // 这里执行文件上传的函数
            this.file.forEach(function(file){//因为要上传多个文件，所以需要遍历
                    upData.append('file', file, file.name);
            });
            upData.append("body", JSON.stringify(this.newData)) // 这里需要转换一下格式传入
            // 提交的文件和选择的dbc文件不为空，则提交
            if (this.newData.dbc && this.file.length){
              this.$refs.upload.clearFiles() // 清空文件列表
              this.file = []; // 清空上传的文件
              var item = {'value':this.newData.dbc, // 历史选择里的选项
                          'label':this.newData.dbc,};
              this.options[0].options.push(item);
              item = {}
              this.$message.info('正在上传！')

              axios
              .post('http://localhost:5000/DataAnalysis/ClgData/', upData)
              .then(function(response){
                  upData = ''; //清空该表
                  if (response.data.code == 1200){
                      msg.warning('上传成功！')
                  }
              })
              .catch(function(error){
                  console.log(error)
              })
            }else{
                this.$message.error('请填写完整！')
            }
        },
        // 获取所有的DBC文件信息
        allDbc() {
            const path = 'http://localhost:5000/DataAnalysis/DbcData/';
            axios
                .get(path)
                .then(res => {
                    // this.msg = res.data;
                    if (res.data.code == 1200){
                        var item = {};
                        var dbc_list = [];
                        var dbc_value = '';
                        res.data.data.dbc_list.forEach(function(dbc){
                            dbc_value = JSON.stringify(dbc.dbc_id)+ "  " + dbc.dbc_name // 获取id和名字
                            item['value'] = dbc_value;
                            item['label'] = dbc_value;
                            dbc_list.push(item);
                            item = {};
                            dbc_value = '';
                        });
                        this.options[1].options = dbc_list;
                        }
                })
                .catch(error => {
                console.error(error);
                })
        }
    }

}
</script>

<style scoped>
    .clg-upload {
        border: 1px solid #cccccc;
        padding:20px;
        border-radius: 4px;
    }
</style>

