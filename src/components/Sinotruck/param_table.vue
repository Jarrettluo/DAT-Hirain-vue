<template>
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
      <span>LDW & FCW Parameters</span>
    </div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @cell-dblclick="dblhandleCurrentChange"
      :span-method="arraySpanMethod">
      <el-table-column
        label="Item"
        prop="name"
        width="90"/>
      <el-table-column
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="search"/>
        </template>
      </el-table-column>

      <el-table-column
        label="Early"
        prop="early"
        width="70">
        <template scope="scope">
          <!-- 输入框属性设置，blur失去焦点后触发 --> 
          <el-input 
            v-if="scope.row.earlyFlag"
            size="small"
            v-model="scope.row.early" 
            placeholder="scope.row.early"
            @blur="handleChange(scope.row, scope.row.early)"
          />
          <span v-if="!scope.row.earlyFlag">{{ scope.row.early }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Middle"
        prop="mid"
        width="70">
        <template scope="scope">
          <!-- 输入框属性设置，blur失去焦点后触发 --> 
          <el-input 
            v-if="scope.row.midFlag"
            size="small"
            v-model="scope.row.mid" 
            placeholder="scope.row.mid"
            @blur="handleChange(scope.row, scope.row.mid)"
          />
          <span v-if="!scope.row.midFlag">{{ scope.row.mid }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Late"
        prop="late"
        width="70">
        <template scope="scope">
          <!-- 输入框属性设置，blur失去焦点后触发 --> 
          <el-input 
            v-if="scope.row.lateFlag"
            size="small"
            v-model="scope.row.late" 
            placeholder="scope.row.late"
            @blur="handleChange(scope.row, scope.row.late)"
          />
          <span v-if="!scope.row.lateFlag">{{ scope.row.late }} </span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        //
        earlyFlag:false,
      }
    },
    created() {
      this.get_all_params()
    },
    methods: {
      // 用于第1、2列文字合并
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      get_all_params(){
        const path = 'http://localhost:5000/DataAnalysis/STFuncParams/';
        axios
          .get(path)
          .then(this.updata_params);
      },
      updata_params(res){
        var res_data = res.data
        if (res_data.code==1200){
          var xxx = res_data.data
          var yyy = []
          xxx.forEach(item => {
            item['earlyFlag'] = false
            item['midFlag'] = false
            item['lateFlag'] = false
            yyy.push(item)  
          });
          this.tableData = yyy
        }
      },
      dblhandleCurrentChange(row, column, cell, event){
        switch (column.property){
          case 'early':
            row.earlyFlag=true;
            break;
          case 'mid':
            row.midFlag=true;
            break;
          case 'late':
            row.lateFlag=true;
            break;            
        }
      },
      handleChange(row, value){
        if (value && row.early && row.mid && row.late) {
          row.earlyFlag=false;
          row.midFlag=false;
          row.lateFlag=false;
          this.$message.success(row.name + ' has been changed!')
          // 以下内容为准备上传！
          this.postTable() 
        }
      },
      // 修改功能参数，采用PUT提交
      postTable(){
        const path = 'http://localhost:5000/DataAnalysis/STFuncParams/';
        axios
          .put(path, this.tableData)
          .then()
      },
    }
  }
</script>

<style scoped>
</style>