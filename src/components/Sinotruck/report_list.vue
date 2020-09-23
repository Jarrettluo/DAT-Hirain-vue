<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @row-click="select_report">
    <el-table-column
      prop="date"
      label="Datetime"
    />
    <el-table-column
      prop="clg_id"
      label="Report Name"
    />
    <el-table-column
      prop="test_type"
      label="Test Type"
    />
    <el-table-column
      prop="test_func"
      label="Test Func"
    />
    <el-table-column
      prop="test_person"
      label="Test Person"
    />
</el-table>
</template>

<script>
import axios from 'axios'
export default {
    data() {
    return {
        tableData: []
    }
    },
    created(){
        this.update_data()
    },
    mounted(){
        
    },
    methods:{
        update_data(){
            const path = 'http://localhost:5000/DataAnalysis/STClgData/'
            axios
                .get(path)
                .then(this.update_table)
                .catch
        },
        update_table(res){
            var res_data = res.data
            if (res_data.code == 1200){
                var xx = res_data.data
                xx = xx.reverse()
                this.tableData =  xx// 更新表格数据
                this.init_report()
            }else{
                this.$message.info('Update data failed')
            }
        },

        select_report(row, column, event){
            this.$emit('showReport',row)
        },
        init_report(){
            if (this.tableData.length >0){
                this.$emit('showReport',this.tableData[0])
            }else{
                this.$message.error('Please Fresh page')
            }
            
        }
    }
}
</script>