<template> 
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
        this.update_pie_data();
    },
    methods:{
        update_pie_data(){
            const path = 'http://localhost:5000/DataAnalysis/PieData';
            axios
                .get(path)
                .then(this.get_data)
                .catch()
        },
        // 三个饼状图
        get_data(res){
            var res_data = res.data
            if (res_data.code == 1200){
                var PieData = res_data.data
                var dom = ['myChart', 'myChart1', 'myChart2']
                PieData.forEach((item, i) =>{
                    this.drawPie(dom[i], item)
                });
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
                                name: '访问来源',
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
        }
    }
    
}
</script>

<style scoped>

</style>