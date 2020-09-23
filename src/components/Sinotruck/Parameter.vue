<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Item"
      prop="name"
    />
    <el-table-column
      label="Early"
      prop="early"
      align="center"
    />
    <el-table-column
      label="Middle"
      prop="mid"
      align="center"
    />
    <el-table-column
      label="Late"
      prop="late"
      align="center"
    />
  </el-table>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            tableData:[],
        }
    },
    created() {
      this.get_all_params()
    },
    methods:{
    get_all_params(){
      const path = 'http://localhost:5000/DataAnalysis/STFuncParams/';
      axios
        .get(path)
        .then(this.updata_params);
    },
    updata_params(res){
        var res_data = res.data
        if (res_data.code==1200){
            console.log(res_data.data)
            this.tableData = res_data.data
        }
    },
    }

}
</script>