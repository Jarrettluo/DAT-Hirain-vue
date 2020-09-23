<template>
<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="func"
      label="Func"
    />
    <el-table-column
      prop="test_id"
      label="ID"
    />
    <el-table-column
      prop="speed"
      label="Speed"
    />
    <el-table-column
      prop="vy_rel"
      label="Vy_Rel(m/s)"
    />
    <el-table-column
      prop="pos"
      label="Pos(m)"
    />
    <el-table-column
      prop="pass"
      label="Pass/Fail"
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
    created() {
      this.get_all_params()
    },
    methods:{
    get_all_params(){
      // 获取父级的参数
      var report_data = this.$parent.report_data
      const path = 'http://localhost:5000/DataAnalysis/STFTestTable/';
      axios
        .get(path, {params:report_data})
        .then(this.updata_params);
    },
    updata_params(res){
        var res_data = res.data
        if (res_data.code==1200){
            this.tableData = res_data.data
        }
    },
    }

}
</script>