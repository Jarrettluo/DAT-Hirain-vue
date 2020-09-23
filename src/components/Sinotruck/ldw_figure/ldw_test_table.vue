<template>
  <div>
    <el-table
      :data="testTableData"
      border
      style="width: 100%"
      >
      <el-table-column
        prop="func"
        label="Function"
        width="90"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nfp"
        label="Number of False Positive(NFP)"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ne"
        label="Number of Earlier Alarm(NE)"
        align="center">
      </el-table-column>
        <el-table-column
        prop="nl"
        label="Number of Later Alarm(NL)"
        align="center">
      </el-table-column>
        <el-table-column
          prop="nfn"
          label="Number of False Negative(NFN)"
          align="center">
        </el-table-column>
        <el-table-column
          prop="total"
          label="Total Alarm(T)"
          align="center">
        </el-table-column>
    </el-table>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      show-header=false>
      <el-table-column
        prop="date"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="Urban"
        align="center">
        <el-table-column
          prop="date"
          label="NFP"
          align="center"
          min-width="20px"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NE"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NL"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NFN"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="T"
          align="center"
          min-width="20px"
          >
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Country"
        align="center"
        >
        <el-table-column
          prop="date"
          label="NFP"
          align="center"
          min-width="20px"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NE"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NL"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NFN"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="T"
          align="center"
          min-width="20px"
          >
        </el-table-column>

      </el-table-column>
      <el-table-column
        prop="address"
        label="Highway"
        align="center">
        <el-table-column
          prop="date"
          label="NFP"
          align="center"
          min-width="20px"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NE"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NL"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NFN"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="T"
          align="center"
          min-width="20px"
          >
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="address"
        label="National"
        align="center">
        <el-table-column
          prop="date"
          label="NFP"
          align="center"
          min-width="20px"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NE"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NL"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="NFN"
          align="center"
          min-width="20px"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="T"
          align="center"
          min-width="20px"
          >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        testTableData:[{
          func:'LDW', nfp:2, ne:0, nl:0, nfn:0, total:1480
        }],
        tableData: [{
          date: '10',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '1',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '34',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '616',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>