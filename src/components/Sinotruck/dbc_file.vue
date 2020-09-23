<template>
  <div style="padding-top:10px;">
    <el-row>
      <el-col :span="8">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>Upload new parser file</span>
          </div>
          <el-upload
            class="upload-demo"
            drag
            action="http://localhost:5000/DataAnalysis/STDbcData/"
            :on-success="handle_success" 
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text"> Drag file to here or <em>Click here</em></div>
            <div class="el-upload__tip" slot ="tip"> You can only upload DBC format file.</div>
          </el-upload>
        </el-card> 
      </el-col>
      <el-col :span="15" :offset="1">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>DBC files list</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              small
              layout="prev, pager, next"
              :total="tableData.length"
              style="float:right;"
            />
          </div>
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize, currentPage*pagesize)" 
            style="width: 100%"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
          >
            <el-table-column
              label="DateTime"
              width="180"
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.timestamp }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="DBC Files"
              width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>DBC filename: {{ scope.row.dbc_name }}</p>
                  <p>DBC ID: {{ scope.row.dbc_id }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.dbc_name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">{{ scope.row.Edit_name }} </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="55"/>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-card v-if="signal_panel" class="box-card" shadow="show" style="margin-top:20px">
      <el-form
        v-model="formDBC"
        ref="formDBC"
      >
        <el-table
          :data="formDBC.tableData1"
          :key="reflush"
          style="width: 100%">
          <el-table-column
            prop="signal_name"
            label="Signalname"
            width="180"
          />

          <el-table-column
            prop="signal_note"
            label="Note"
            width="180"
          />

          <el-table-column
            prop="target_name"
            label="TargetName">
            <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
            <template slot-scope="scope">
              <!-- 级联选择器 -->
              <el-cascader
                v-model="scope.row.target_name"
                :options="options"
                :show-all-levels="false"
                style="width:100%"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="relationship"
            label="Relationship">
            <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.target_value"
                placeholder="请输入内容"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
          formDBC:{},
          tableData1:[],
          reflush : true,
          data_flag:true,

          tableData:[],
          // tableData['Edit_name']:'Edit',
          multipleSelection: [],
          edit_button: true,
          options:[],
          reload: this.reload,
          signal_panel: false,
          // 分页数据
          currentPage:1,
          pagesize:3,
      };
    },
    created(){
      this.get_all_dbc();
    },
    // 用于监听数据更新，如果更新了则刷新表格页面
    watch:{
      'data_flag':function() {
        this.reflush = !this.reflush
      }
    },
    methods: {
      handle_success(res, file) {
        if (res.code===1200){
          this.$message.success(file.name + ' DBC file uploaded!')
          // console.log()
          this.get_all_dbc();// 重新加载所有dbc的信号！
        }
      },
      get_all_dbc(){
        const url = 'http://localhost:5000/DataAnalysis/STDbcData/';
        axios
          .get(url)
          .then(this.get_msg)
          .catch(function(error){
              console.log(error)
          })
      },
      get_msg(res){
        console.log(res)
        var res_data = res.data
        var dbc_msg = [];
        var dbc_msg_1 = []
        if (res_data.code ==1200) {
          this.$message.info('Query success!')
          dbc_msg = res_data.dbc_list // 取到的值赋给表格！
          dbc_msg.forEach(function(value, i){
            value['Edit_name'] = ' Edit'
            dbc_msg_1.push(value)
            })
          this.tableData = dbc_msg_1
        }else {
          this.$message.error('Fail!')
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleEdit(index, row){
        // 用于处理编辑页面！
        if (this.edit_button){
          // 编辑
          this.tableData[index].Edit_name = 'Save';
          this.edit_button = false;
          this.put_dbc_signal(index, row);
          this.signal_panel = true;
        }else {
          if (this.tableData[index].Edit_name == 'Save'){
            this.update_dbc(index, row);
            this.signal_panel = false;
          }else{
            this.$alert("Please save DBC file!")
          }
        }
      },
      update_dbc(index, row){
        if (this.formDBC.tableData1){
          this.submit(row.dbc_id)
          // 用于修改和提交
          // this.$message.success('sfdfsdfsdf')
          this.tableData[index].Edit_name = 'Edit'
          this.edit_button = true;
          
        }
      },
      // 更新DBC的信号名
      put_dbc_signal(index, row){
        const url = 'http://localhost:5000/DataAnalysis/STModifyDbcData/';
        var dbc_id = row.dbc_id // 获取dbc的id
        var data = {'dbc_id':dbc_id}
        axios
          .get(url, {params:data})
          .then(this.dbc_signal_table)
          .catch(function(error){
            console.log(error);
          })
      },
      // 更新DBC信号名的表格
      dbc_signal_table(res){
        var res_data = res.data
        var table_value = []
        var option_list = [] // DBC的信号级联选择器
        if (res_data.code == 1200){
          var dbc_signal = res_data.data['dbc_signal']// 取到dbc的signal
          var signal_names = res_data.data['signal_name']
          var signal_notes = res_data.data['signal_note']

          signal_names.forEach(function(value, i){
            table_value.push({'signal_name':value, 'signal_note':signal_notes[i]})
          })
          this.formDBC.tableData1 = table_value // 这里是

          // 写入级联选择器
          for(var x in dbc_signal){
            option_list.push({value:dbc_signal[x],
                      label:dbc_signal[x]})
          }
          this.options = option_list;
          this.data_flag = false;
        }
      },
      // 提交表单
      submit(dbc_id) {
        var result = this.formDBC.tableData1
        const path = 'http://localhost:5000/DataAnalysis/STModifyDbcData/';
        console.log(result)
        result.push({'dbc_id':dbc_id})
        console.log(result)
        if (result) {
          axios
            .put(path, result)
            .then(this.submit_success)
            .catch(function(error){
              console.log(error);
            })
        }
      },
      // 提交表单数据
      submit_success(res){
        var res_data = res.data
        if (res_data.code == 1200){
          // 重置信号选择框
          this.formDBC.tableData1 = []
          this.data_flag = true; // 更新flag
          this.$alert('Save Successful!')
        }
      },

      handleDelete(index,row){
        // 删除dbc
        const url = 'http://localhost:5000/DataAnalysis/STModifyDbcData/?id=';
        axios
          .delete(url+row.dbc_id)
          .then(this.delete_dbc)
          .catch(function(error){
              console.log(error)
          })
      },
      delete_dbc(res){
        var res_data = res.data
        if (res_data.code==1200){
          this.$message.warning('Delete success!');
          this.get_all_dbc(); // 删除后更新dbc的列表
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        var data = this.multipleSelection[0]
        console.log(data)
        if (this.multipleSelection.length >1){
          this.$refs.multipleTable.clearSelection();
          this.$alert('You can only choose one file!')
        }else{
          // 将数据发送到父组件！
          this.$emit('closeMain', 'dbc',data)
        }
      },

      // 分页的函数
      handleSizeChange(size){
        this.pagesize = size;

      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage;
      },
    }
  }
</script>