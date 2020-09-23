<template>
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请搜索数据"
    v-model="clgs"
    :titles="['备选数据','已选数据']"
    panel-width="500"
    :data="data"
  />
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        data: this.getMessage(),
        clgs: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    },
    methods:{
    getMessage() {
      const path = 'http://localhost:5000/DataAnalysis/ClgData/';
      var msgs = ''
      var data = []
      axios
        .get(path)
        .then(res => {
          if (res.data.code == 1200){
            msgs = res.data.data
            msgs.forEach((msg, index) => {
              data.push({
                label: msg['file_name'] + '--' + msg['note'],
                key: msg['file_id'],
                pinyin: msg['file_name'] + msg['note']
              })
            })
          }
        })
        .catch(error => {
          console.error(error);
        });
      return data;
    }
    }
  };
</script>

<style >
.el-transfer-panel__list.is-filterable{
    width:400px !important;
    height:500px !important;
}
 
.el-transfer-panel{
    width: 400px !important;
    height: 500px !important;
}
</style>