<template>
  <div>
    <!-- 环境表格 -->
    <el-table
      :data="ambientTableData"
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
          prop="Day"
          label="Day"
          align="center"
        />
        <el-table-column
          prop="Dusk"
          label="Dusk"
          align="center"
        />
        <el-table-column
          prop="Night"
          label="Night"
          align="center"
        />
        <el-table-column
          prop="Unknown"
          label="Not Recognized"
          align="center"
        />
        <el-table-column
          prop="Total"
          label="Total"
          align="center"
        />
      </el-table-column>
      
      <el-table-column
        prop="Static"
        align="center"
      />
      <el-table-column
        prop="road"
        label="Road"
        align="center"
      >
        <el-table-column
          prop="Urban"
          label="Urban"
          align="center"
        />
        <el-table-column
          prop="Country"
          label="Country"
          align="center"
        />
        <el-table-column
          prop="Highway"
          label="Highway"
          align="center"
        />
        <el-table-column
          prop="National"
          label="National"
          align="center"
        />
        <el-table-column
          prop="Total"
          label="Total"
          align="center"
        />
      </el-table-column>
    </el-table>
    <br>
    <!-- 天气表格 -->
    <el-table
      :data="weatherTableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%">
      <el-table-column
        prop="Static"
        align="center"
      />
      <el-table-column
        prop="date"
        label="Weather"
        align="center"
      >
        <el-table-column
          prop="Sunny"
          label="Sunny"
          align="center"
        />
        <el-table-column
          prop="Cloudy"
          label="Cloudy"
          align="center"
        />
        <el-table-column
          prop="Light_Rain"
          label="Light Rain"
          align="center"
        />
        <el-table-column
          prop="Middle_Rain"
          label="Middle Rain"
          align="center"
        />
        <el-table-column
          prop="Heavy_Rain"
          label="Heavy Rain"
          align="center"
        />
        <el-table-column
          prop="Smog"
          label="Smog"
          align="center"
        />
        <el-table-column
          prop="Light_Fog"
          label="Light Fog"
          align="center"
        />
        <el-table-column
          prop="Middle_Fog"
          label="Middle Fog"
          align="center"
        />
        <el-table-column
          prop="Heavy_Fog"
          label="Heavy Fog"
          align="center"
        />
        <el-table-column
          prop="Light_Snow"
          label="Light Snow"
          align="center"
        />
        <el-table-column
          prop="Middle_Snow"
          label="Middle Snow"
          align="center"
        />
        <el-table-column
          prop="Light_Snow"
          label="Light Snow"
          align="center"
        />
        <el-table-column
          prop="Heavy_Snow"
          label="Heavy Snow"
          align="center"
        />
        <el-table-column
          prop="Others"
          label="Others"
          align="center"
        />
        <el-table-column
          prop="Total"
          label="Total"
          align="center"
        />
      </el-table-column>
    </el-table>
    <br>
    <!-- 饼状图分布图 -->
    <el-row>
      <el-col :span="8">
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
      </el-col>
      <el-col :span="8">
        <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
      </el-col>
      <el-col :span="8">
        <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
      </el-col>
    </el-row>
    <br>
    <!-- 速度分布图 -->
    <el-table
      :data="speedTableData"
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
          prop="1"
          label="0~10"
          align="center"
          width="70px"
        />
        <el-table-column
          prop="2"
          label="10~20"
          align="center"
          width="70px"
        />
        <el-table-column
          prop="3"
          label="20~30"
          align="center"
          width="70px"
        />
        <el-table-column
          prop="4"
          label="30~40"
          align="center"
          width="70px"
        />
        <el-table-column
          prop="5"
          label="40~50"
          align="center"
        />
        <el-table-column
          prop="6"
          label="50~60"
          align="center"
        />
        <el-table-column
          prop="7"
          label="60~70"
          align="center"
        />
        <el-table-column
          prop="8"
          label="70~80"
          align="center"
        />
        <el-table-column
          prop="9"
          label="80~90"
          align="center"
        />
        <el-table-column
          prop="10"
          label="90~100"
          align="center"
        />
        <el-table-column
          prop="11"
          label="100~110"
          align="center"
        />
        <el-table-column
          prop="12"
          label="110~120"
          align="center"
        />
        <el-table-column
          prop="13"
          label="120~130"
          align="center"
        />
        <el-table-column
          prop="14"
          label="130~140"
          align="center"
        />
        <el-table-column
          prop="15"
          label=">140"
          align="center"
        />
        <el-table-column
          prop="16"
          label="Total"
          align="center"
        />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
          ambientTableData:[],
          weatherTableData:[],
          speedTableData:[],
        }
    },
    created(){
      this.acquire_data()
    },
    methods:{
        acquire_data() {
          const path = 'http://localhost:5000/DataAnalysis/STTTableData'
          var report_data = this.$parent.report_data // 获取父组件的参数
          axios
            .get(path, {params:report_data})
            .then(this.update_data)
            .catch()
        },
        update_data(res) {
          var res_data = res.data
          if (res_data.code == 1200){
            // 一共有四类图分别是Ambient，Weather， Pie， Speed
            var ambient = res_data.data.code_name_33.Table.Ambient_Road // 为环境图赋值
            ambient[0]['Static'] = 'Mile(km)'
            ambient[1]['Static'] = 'Time(h)'
            this.ambientTableData = ambient // 放入表格中

            var weather = res_data.data.code_name_33.Table.Weather // 取天气数据
            weather[0]['Static'] = 'Mile(km)'
            weather[1]['Static'] = 'Time(h)'
            this.weatherTableData = weather

            var PieData = res_data.data.code_name_33.Piechat
            var pie_chart_data = []
            for (var key in PieData){
              var chart_data = {'item':[],'data':[]} // 单个饼状图的格式
              var PieData_item = PieData[key]
              for (var item_key in PieData_item){
                 chart_data['item'].push(item_key)
                 chart_data['data'].push({'name': item_key, 'value': PieData_item[item_key]})
              }
              pie_chart_data.push(chart_data)
            }
            var dom = ['myChart', 'myChart1', 'myChart2']
            pie_chart_data.forEach((item, i) =>{
              this.drawPie(dom[i], item)
            });
            
            var speed = res_data.data.code_name_34 // 速度图
            var row = {}
            var speed_table = []
            for (var key in speed){
              speed[key].forEach((item, index) => {
                row[index+1] = item 
              });
              speed_table.push(row)
              row = {}
            }
            speed_table[0]['Static'] = 'Mile(km)'
            speed_table[1]['Static'] = 'Percent'
            speed_table[2]['Static'] = 'Time(h)'
            speed_table[3]['Static'] = 'Percent'
            this.speedTableData = speed_table
          }
        },
        // 饼状图
        drawPie(dom, source){
            // 基于准备好的DOM， 初始化echarts
            let myChart = this.$echarts.init(document.getElementById(dom))
            var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: source.item,
                        },
                        series: [
                            {
                                name: 'Mile(km)',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: source.data,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                        };
            myChart.setOption(option);
        },
      },
    }
</script>

<style scoped>

</style>