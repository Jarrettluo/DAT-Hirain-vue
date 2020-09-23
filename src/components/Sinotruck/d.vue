<template>
  <el-table
    :data="tableData"
    :span-method="arraySpanMethod"
    border
    style="width: 100%">
    <el-table-column
      prop="Static"
      align="center"
    />
    <el-table-column
      prop="date"
      label="Ambient"
      align="center"
    >
      <el-table-column
        prop="name"
        label="Sunny"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Cloudy"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Light Rain"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Middle Rain"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Heavy Rain"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Smog"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Light Fog"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Middle Fog"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Heavy Fog"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Light Snow"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Middle Snow"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Light Snow"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Heavy Snow"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Other"
        align="center"
      />
      <el-table-column
        prop="name"
        label="Total"
        align="center"
      />
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    data() {
        return {
                tableData: [{
                Static:'Mile(km)',
                date: '2016-05-02',
                name: '345435435',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                Static:'Time(h)',
                date: '2016-05-04',
                name: '34543',
                address: '上海市普陀区金沙江路 1517 弄'
                }]
            }
    },
    methods:{
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            // row 是行，column 是列，rowindex是行数，columninde是列数
            // 第一个元素代表rowspan，第二个元素代表colspan
            if (rowIndex === 1){
                if (columnIndex == 1){
                    return [1,2];
                }else if (columnIndex==2){
                    return [0,0]
                }
            }
        // if (rowIndex % 2 === 0) {
        //   if (columnIndex === 0) {
        //     return [1, 2, 3];
        //   } else if (columnIndex === 1) {
        //     return [0, 0];
        //   }
        // }
      },
    }
}
</script>

<style scoped>

</style>