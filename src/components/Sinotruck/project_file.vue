<template>
  <el-row>
    <el-col :span="10">
      <Param/>
    </el-col>
    <el-col :span="14" style="padding-left:20px;"> 
      <el-card shadow="hover">
        <br/>
        <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
          <el-form-item label="Test name">
            <el-input v-model="sizeForm.test_name"></el-input>
          </el-form-item>
          <el-form-item label="Test type" >
            <el-radio-group v-model="sizeForm.test_type" size="medium" @change="handle_type(sizeForm.test_type)">
              <el-radio border label="Field test"></el-radio>
              <el-radio border label="Road test"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="ADAS function">
            <el-radio-group v-model="sizeForm.test_func" size="medium" @change="handle_func(sizeForm.test_func)">
              <el-radio border label="LDW">LDW</el-radio>
              <el-radio border label="FCW"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Vicando project file(.project)">
            <el-upload
              class="upload-demo-pro"
              ref="upload_pro"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList_pro"
              :auto-upload="false"
              accept=".project"
              :http-request="httpRequest1">
              <el-button slot="trigger" size="small" type="primary">Choose File</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="CAN source file(.clg)">
            <el-upload
              class="upload-demo"
              ref="upload_clg"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList_clg"
              :auto-upload="false"
              accept=".clg"
              :http-request="httpRequest2">
              <el-button slot="trigger" size="small" type="primary">Choose File</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="GPS data(.gps.data)">
            <el-upload
              class="upload-demo"
              ref="upload_gps"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList_gps"
              :auto-upload="false"
              accept=".gps"
              :http-request="httpRequest3">
              <el-button slot="trigger" size="small" type="primary">Choose File</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-divider/>
          <!-- <el-form-item>
            <el-button type="primary" @click="submitUpload">Create File</el-button>
            <el-button @click="submitUpload">Reset</el-button>
          </el-form-item> -->
          <el-button
            type="primary"
            plain
            @click="submitUpload"
            style="width:100%"
          >
            提交数据
          </el-button>
        </el-form>
        <br/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import param_table from '../Sinotruck/param_table'

  export default {

    data() {
      return {
        ljr:'lljrjlrere',
        fileList: [],
        fileList_pro: [],
        fileList_clg: [],
        fileList_gps: [],
        sizeForm: {
          test_name: '',
          test_type: '',
          test_func: '',
        },
        file_pro:[],
        file_clg:[],
        file_gps:[],

        parent_data:{'type':'','func':''},
      };
    },
    components:{
      Param: param_table,
    },
    methods: {
      submitUpload() {


        var dbc_id = this.$parent.$parent.$parent.dbc_data.dbc_id
        
        var upData = new FormData();
        this.$refs.upload_pro.submit();
        this.$refs.upload_clg.submit();
        this.$refs.upload_gps.submit();

        this.file_pro.forEach(function(file){
          upData.append('file_pro', file, file.name);
        });
        this.file_clg.forEach(function(file){
          upData.append('file_clg', file, file.name);
        });
        this.file_gps.forEach(function(file){
          upData.append('file_gps', file, file.name);
        });
        upData.append("body", JSON.stringify(this.sizeForm)) // 这里需要转换一下格式
        upData.append("dbc_id", dbc_id)// 存入使用的DBC的id

        
        
        axios
          .post('http://localhost:5000/DataAnalysis/STClgData/',upData)
          .then()
          .catch()

      },
      // 存pro数据
      httpRequest1(param){
        this.file_pro.push(param.file)
      },
      // 存clg数据
      httpRequest2(param){
        this.file_clg.push(param.file)
      },
      // 存GPS数据
      httpRequest3(param){
        this.file_gps.push(param.file)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      handle_type(type){
        this.parent_data['type'] = type
        this.$emit('closeMain', 'project', this.parent_data)
      },
      handle_func(func){
        this.parent_data['func'] = func
        this.$emit('closeMain', 'project', this.parent_data)
      }
    }
  }
</script>