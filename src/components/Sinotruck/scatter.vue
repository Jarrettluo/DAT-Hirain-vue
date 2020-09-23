<template> 
  <el-row>
    <el-col :span="24">
      <div id="myChart6" :style="{width: '100%', height: '300px'}"></div>
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
        this.update_scatter_data();
    },
    methods:{
        update_scatter_data(){
            var report_data = this.$parent.report_data
            const path = 'http://localhost:5000/DataAnalysis/STFScatterData/';
            axios
                .get(path, {params: report_data})
                .then(this.get_data)
                .catch()
        },
        // 三个饼状图
        get_data(res){
            var res_data = res.data
            if (res_data.code == 1200){
                var PieData = res_data.data
                var dom = ['myChart6'];
                this.scatterFig(dom[0], PieData)
            }
        },
        scatterFig(dom, source){
            // 基于准备好的DOM， 初始化echarts
            let myChart = this.$echarts.init(document.getElementById('myChart6'))
            var option = {  
                            legend: {
                                show: true,
                                left: "86%",
                                icon: "roundRect",
                                orient: "vertical",
                                padding: [60, 34, 34, 34],
                                itemHeight: 13
                            },
                            xAxis: {},
                            yAxis: {},
                            series: [{
                                symbolSize: 7,
                                name:source.item1.name,
                                data: source.item1.data,
                                type: 'scatter',
                                symbol: "triangle",
                            },{
                                symbolSize: 7,
                                name:source.item2.name,
                                data: source.item2.data,
                                symbol: "triangle",
                                type: 'scatter',
                                large: true,//大数据量的时候开启
                                markLine: {
                                data: [{
                                    name: 'Y 轴值为 100 的水平线',
                                    yAxis: source.top_level,
                                },
                                {
                                    name: 'Y 轴值为 100 的水平线',
                                    yAxis: source.bottom_level,
                                }],
                                silent: true,
                                symbol:NaN,
                                }
                            }]
                        };



            myChart.setOption(option);
        }
    }
    
}
</script>

<style scoped>

</style>