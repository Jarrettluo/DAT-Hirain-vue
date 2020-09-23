<template> 
  <el-row>
    <el-col :span="8">
      <div id="myChart3" :style="{width: '100%', height: '300px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="myChart4" :style="{width: '100%', height: '300px'}"></div>
    </el-col>
    <el-col :span="8">
      <div id="myChart5" :style="{width: '100%', height: '300px'}"></div>
      <!-- <div style="margin-top:-20px">fddsjljf</div> -->
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
    name:'pie_charts',
    data() {
        return {

        }
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        update_pie_data(){
            const path = '';
            axios
                .get(path)
                .then(this.get_data)
                .catch()
        },
        get_data(res){
            var res_data = res.data
            if (res_data.code == 1200){
                console.log(res_data.data)
            }
        },
        drawLine(){
            // 基于准备好的DOM， 初始化echarts
            let myChart = this.$echarts.init(document.getElementById('myChart3'))
            let myChart1 = this.$echarts.init(document.getElementById('myChart4'))
            let myChart2 = this.$echarts.init(document.getElementById('myChart5'))
            var option = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                y: 'bottom',
                                x: 'center',
                                data:['A','B','C']
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: [0, 2, 4, 6, 8, 10, 12],
                                name: '瞎写内容',
                            },
                            yAxis: {
                                type: 'value',
                                name: 'TLC(s)',
                                min: function (value) {
                                    return -5000;
                                }
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                smooth: true,
                                name: 's1',
                            },{
                                data: [23, 34, 43, 43, 324, 43, 34],
                                type: 'line',
                                smooth: true,
                                name: 's2',
                            },{
                                data: [20, 324, 301, 333, 1290, 43, 4343],
                                type: 'line',
                                smooth: true,
                                name: 's3',
                            },{
                                data: [20, 14, 1, 33, 1290, 43, 4343],
                                type: 'line',
                                smooth: true,
                                name: 's4',
                            }

                            ]
                        };


            myChart.setOption(option);
            myChart1.setOption(option);
            myChart2.setOption(option);
        }
    }
    
}
</script>

<style scoped>

</style>