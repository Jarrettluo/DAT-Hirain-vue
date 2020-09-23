<template>
  <div class="sss" style="height:700px;">
    <Report @showReport="show_report"></Report>
    <br>
    <div class="row" id="pdfDom" style="background-color:#fff;">
      <div class="report_header" style="background-color:#fafafa;padding: 25px 0px;">
        <el-row>
          <el-col :span="24" align="center"><h2>ADAS LDW & FCW Test Report</h2>
          <span>{{ report_data.clg_id }}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="4" align="left" style="padding-left:20px;"><small>Test Type: {{ report_data.test_type }}</small><br>
            <small>Test Function: {{ report_data.test_func }}</small></el-col>
          <el-col :span="5" :offset="15" align="left"><small>Report Time: {{ report_data.date }}</small><br>
            <small>Report person: {{ report_data.test_person }}</small></el-col>
        </el-row>
      </div>
      <!-- //给自己需要导出的ui部分.定义id为"pdfDom".此部分将就是pdf显示的部分 -->

      <!-- type:1,场地测试报告；type：2，LDW 道路测试；type：3，FCW场地测试；type4：FCW道路测试 -->
      <div v-if="report_type==1" :key="page_flag">
        <Parameter></Parameter>  
        <br>
        <FieldTable></FieldTable>
        <br>
        <MI></MI>
      </div>
      <div v-else-if="report_type==2">
        <!-- 地图暂时不用 -->
        <!-- <MAP></MAP> --> 
        <br>
        <!-- 表格图和饼状图 -->
        <Ambient ></Ambient>
        <br>
        <!-- 测试结果的图 -->
        <TestTable></TestTable>
        <!-- 散点图 -->
        <MI></MI>
        <br>
        <LdwLineChart></LdwLineChart>
        <F></F>
      </div>
      <div v-else-if="report_type==3">
        <br>
        <F></F>
      </div>

      <div v-else-if="report_type==4">
        <br>
        <F></F>
      </div>

      <div v-else-if="report_type==5">
        <br>
        <A></A>
      </div>
    </div>

    <el-row>
      <el-button style="display:block;margin:0 auto" v-on:click="getPdf()" type="primary" round  >Save as PDF</el-button>
    </el-row>
  </div>
</template>

<script>
import report_list from '../Sinotruck/report_list'
// import MAP from '../Sinotruck/map'
import Parameter from '../Sinotruck/Parameter'
import FieldTable from '../Sinotruck/FieldTable'
import a from '../Sinotruck/xxx' // 
import ambient from '../Sinotruck/templates/ambient' // 
import ldw_test_table from '../Sinotruck/ldw_figure/ldw_test_table'
import ldw_line_chart from '../Sinotruck/ldw_figure/ldw_line_chart'
import d from '../Sinotruck/d'
import e from '../Sinotruck/e'
import f from '../Sinotruck/f' // 这里是要修改的！
import gI from '../Sinotruck/scatter'

export default {
  data () {
    return {
      content: '',
      htmlTitle: 'DAT_report_2020_',
      report_type:'0',
      report_data:{},
      page_flag:true,
    }
  },
  components:{
    Report: report_list,
    // MAP,
    Parameter,
    FieldTable,
      A:a,
      Ambient:ambient,
      TestTable: ldw_test_table,
      LdwLineChart: ldw_line_chart,
      D:d,
      E:e,
      F:f,
      MI:gI,
  },
  watch:{
    // 监测 改变了
    report_data:{
      handler(){
        this.page_flag = !this.page_flag
      }
    }
  },
  created() {
    this.change_report_name()
  },
  methods:{
    show_report(data){
      this.report_data = data // 报告所需的报告全部赋值给report_data!
      // 根据表格列表中选中的来
      if (data.test_type == 'Field_test'){
        if (data.test_func == 'LDW'){
          this.report_type = 1
        }else{
          this.report_type = 3
        }
      }else{
        if (data.test_func == 'LDW'){
          this.report_type = 2
        }else{
          this.report_type = 4
        }
      }
    },
    change_report_name(){
      var aData = new Date();
      var value = aData.getFullYear() + "-" + (aData.getMonth() + 1)
                   + "-" + aData.getDate();
      this.htmlTitle = 'DAT-reports-'+ value
    }
  }
}
</script>

<style scoped>
  .sss {
    overflow-x: scroll; 
    white-space: nowrap;
  }

   ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;
     height: 0;
   }
</style>