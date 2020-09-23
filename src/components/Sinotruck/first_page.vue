<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        home
      </el-breadcrumb-item>
      <el-breadcrumb-item v-text="this.$router.currentRoute.name" />
    </el-breadcrumb>
    <el-row
      :gutter="10"
      style="margin-top: 10px;"
    >
      <el-col :span="content_width">
        <div class="main-container" style="padding:20px;">
          <div>
            <el-row>
              <el-col :span="12" style="text-align:left;">
                <div>
                  <el-link type="primary"  @click="previous_click()" v-if="previous" ><i class="el-icon-arrow-left">{{ pre_title }}</i></el-link>
                  <p></p>
                </div>
              </el-col>
              <el-col :span="12" style="text-align:right;">
                <el-link type="primary" @click="next_click()" v-if="next">{{ next_title }}<i class="el-icon-arrow-right"></i></el-link>
                <!-- <a href="javascript:void(0)" @click="tabChange(chooseFile)"><i class="el-icon-arrow-right"></i></a> -->
              </el-col>
            </el-row>
          </div>
          <!--
            动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。
          -->
          <div :is="tabindex" @closeMain="closeMain"></div>
          <el-row style="padding-top:10px;">
            <el-col :span="12" style="text-align:left;">
              <el-button type="" @click="previous_click()" v-if="previous">Previous</el-button>
              <h1> </h1>
            </el-col>
            <el-col :span="12" style="text-align:right;">
              <el-button type="" @click="next_click()" v-if="next">Next</el-button>
            </el-col>
          </el-row>
        </div>                
      </el-col>
      <el-col 
        :span="4"
        v-if="side_bar"
      >
        <div
          class="aside-step"
          style="padding:10px;"
        >
          <el-steps
            direction="vertical"
            :active="active"
          > 
            <el-step
              title="CAN parser file"
              description="Choose a .dbc file"
              icon="el-icon-document-copy"
              @click.native="xxxx(131)"
            >
              <template slot="description">
                Choose a .dbc file
                <div class="upload_panel" v-if='dbc_name'>
                  <el-tag type="info" v-if='dbc_name'>{{ dbc_name }}</el-tag>
                </div>
              </template>
            </el-step>
            <el-step 
              title="Project files upload"
              icon="el-icon-upload"
              description="Project files upload"
              @click.native="xxxx()"
            >
              <template slot="description">
                Choose a .dbc file
                <div
                  class="upload_panel"
                  v-if="work_file"
                >
                  <el-tag 
                    type="info"
                    v-for="item in work_file" 
                    v-bind:key="item.id"
                    v-if="item"
                    >
                    {{ item }}
                  </el-tag>
                </div>
              </template>
            </el-step>
            <el-step
              title="Process work flow"
              description="LDW and FCW data process work flow"
              icon="el-icon-s-data"
              @click.native="xxxx()"
            />
          </el-steps>
        </div>
      </el-col>
    </el-row>
    <el-container style="margin-top:10px;" />
  </div>
</template>

<style scoped>
  .upload_panel {
    margin: 10px 0px;
    padding:10px;
    border:1px dashed #c2c2c2;
    border-radius:3px;
  }
  .aside-step {
    border: 1px solid #f5f7fa;
    background-color: #ffffff;
    border-radius: 3px;
    min-height: 720px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .main-container {
    border: 1px solid #f5f7fa;
    background-color: #ffffff;
    border-radius: 3px;
    min-height: 720px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .upload_panel{
    padding-bottom: 0px;
  }
  .el-tag{
    margin: 0px 10px 10px 0px;
  }
</style>

<script>
import dbcUpload from '../Sinotruck/dbc_file'
import clgUpload from '../Sinotruck/project_file'
import chooseFile from '../Sinotruck/reports'

  export default {

    data() {
      return {
      dbcUpload: 'dbcUpload',
      clgUpload: 'clgUpload',
      chooseFile: 'chooseFile',
      tabindex: 'dbcUpload', // 默认选中第一项
      item: ['dbcUpload', 'clgUpload', 'chooseFile'],
      previous:false,
      next:true,
      active:1,
      pre_title:'xxx',
      next_title: 'Project files upload',
      side_bar:true,
      content_width:20, // 右侧内容区域的宽度
      ljr:234,
      dbc_name:'',
      dbc_data:{},
      work_file:'',
      };
    },
    components:{
    dbcUpload: dbcUpload,
    clgUpload,
    chooseFile,
    },
    created(){
        window.addEventListener('resize', this.handleResize)  // 判断页面变化
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize) // 页面变化
    },
    methods: {
      handleResize (event) {
          var sceenWidth = document.documentElement.clientWidth;
          if(sceenWidth>1200){
            this.side_bar=true;
            this.content_width=20;
          }else{
            this.side_bar=false;
            this.content_width=24;
          }
        },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      xxxx(e) {
        this.$message.info(e)
      },
      tabChange(index) {
       this.tabindex = index;
       console.log(index)
     },
     previous_click(){
       var item_index;
       item_index = this.item.indexOf(this.tabindex) // 获取当前item的索引
       if(item_index==0){
          console.log(item_index)
          this.previous = false;
       }else if (item_index==1){
          this.tabindex = 'dbcUpload';
          this.previous = false;
          this.next = true;
          this.active = 1;
          this.next_title = "Project files upload";
       }else{
          this.tabindex = 'clgUpload';
          this.previous = true;
          this.next = true;
          this.active = 2;
          this.pre_title = "CAN parser file"
       }
     },
     next_click() {
       var item_index;
       item_index = this.item.indexOf(this.tabindex) // 获取当前item的索引
       if(item_index==0){
         if (this.dbc_name==''){
           this.$message.error('Please choose one dbc file!')
         }else{
          this.tabindex = 'clgUpload';
          this.previous = true;
          this.active = 2; // TODO
          this.pre_title = "CAN parser file"
          this.next_title = "Process work flow"
         }
       }else if (item_index==1){
          this.tabindex = 'chooseFile';
          this.previous = true;
          this.next = false
          this.active = 3; // TODO
          this.pre_title = "Project files upload"
       }else{
          console.log(item_index)
          this.previous = true;
       }
     },
     closeMain(page, data){
      // 两种情况下传输数据
      if (page=='dbc'){
        this.dbc_name = data.dbc_name;
        this.dbc_data = data;
      }else if(page=='project'){
        this.work_file = data;
      }

     },
     record_dbc(data){
      //  console.log('==================fdsfsdfsdfsdfsd========')
      //  console.log(data)
     }

    }
  }
</script>