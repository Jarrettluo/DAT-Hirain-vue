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
      label="Vhicle Speed(km/h)"
      align="center"
    >
      <el-table-column
        prop="name"
        label="0~10"
        align="center"
        width="70px"
      />
      <el-table-column
        prop="name"
        label="10~20"
        align="center"
        width="70px"
      />
      <el-table-column
        prop="name"
        label="20~30"
        align="center"
        width="70px"
      />
      <el-table-column
        prop="name"
        label="30~40"
        align="center"
        width="70px"
      />
      <el-table-column
        prop="name"
        label="40~50"
        align="center"
      />
      <el-table-column
        prop="name"
        label="50~60"
        align="center"
      />
      <el-table-column
        prop="name"
        label="60~70"
        align="center"
      />
      <el-table-column
        prop="name"
        label="70~80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="80~90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="90~100"
        align="center"
      />
      <el-table-column
        prop="name"
        label="100~110"
        align="center"
      />
      <el-table-column
        prop="name"
        label="110~120"
        align="center"
      />
      <el-table-column
        prop="name"
        label="120~130"
        align="center"
      />
      <el-table-column
        prop="name"
        label="130~140"
        align="center"
      />
      <el-table-column
        prop="name"
        label=">140"
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
                name: '23.5',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                Static:'Percent',
                date: '2016-05-04',
                name: '34543',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                Static:'Time(h)',
                date: '2016-05-04',
                name: '34543',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                Static:'Percent',
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