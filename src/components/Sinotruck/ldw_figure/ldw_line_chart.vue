<template> 
  <div>
    <div v-for="(v, i) in list ">
        <el-divider content-position="center">{{ i+1 }} active </el-divider>
      <el-row>
        <el-col :span="12">
          <div :id="v.id[0]" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <el-col :span="12">
          <div :id="v.id[1]" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div :id="v.id[2]" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
        <el-col :span="12">
          <div :id="v.id[3]" :style="{width: '100%', height: '300px'}"></div>
        </el-col>
      </el-row>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'

export default {

    data() {
        return {
            list:[],
            data:[],
        }
    },
    created(){
        this.connect_back() // 首先连接后台
    },
    updated(){
        this.updata_dom()
    },
    methods:{
        connect_back(){
            const path = 'http://localhost:5000/DataAnalysis/STTLineChart/';
            var report_data = this.$parent.report_data // 获取父组件的参数
            axios
                .get(path, {params: report_data})
                .then(this.get_data)
                .catch()
        },
        get_data(res){
            var res_data = res.data
            if (res_data.code == 1200){
                this.data = res_data.data
                // 首先为dom赋值
                for (var i = 0; i < this.data.length; i++) {
                    this.list.push({'id': [i+'_ldw_1', i+'_ldw_2', i+'_ldw_3', i+'_ldw_4']})
                }
            }
        },
        // 更新dom
        updata_dom(){
            // 为dom绘图
            var that = this
            this.list.forEach(function (item, i) {
                    that.drawLine(item.id[0], that.data[i].first);
                    that.drawLine2(item.id[1], that.data[i].second);
                    that.drawLine3(item.id[2], that.data[i].third);
                    that.drawLine4(item.id[3], that.data[i].forth);
            })
        },
        drawLine(dom, source){
            // 原始数据，source,里面需要tlc_data, tlc_warning, tlc_setting
            // 基于准备好的DOM， 初始化echarts
            let myChart = this.$echarts.init(document.getElementById(dom))
            var option = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            grid: {
                                // left: '3%',
                                // right: '4%',
                                bottom: '3%',
                                top:'3%',
                                containLabel: true
                            },
                            legend: {
                                y: 'bottom',
                                x: 'center',
                                data:['A','B','C']
                            },

                            xAxis: {
                                name:"t(s)",
                                nameLocation: "middle",
                                nameGap:20,
                            },
                            yAxis: {
                                type: 'value',
                                name: 'TLC(s)',
                                min: function (value) {
                                    return 0;
                                },
                                nameLocation: "middle",
                                nameGap:30,
                            },
                            series: [{
                                data: source.tlc_data,  // 源数据
                                type: 'line',
                                smooth: false,
                                name: 'TLC',
                                showSymbol: false, // 关闭symbol
                                lineStyle:{
                                    color:"#2f80ed",
                                },
                                itemStyle:{
                                    color:"#2f80ed",
                                },
                                markLine: {
                                data: [{
                                    name: 'TLC',
                                    yAxis: source.tlc_setting, // tlc设置点
                                }],
                                silent: true,
                                symbol:NaN,
                                label:{
                                    show:true,
                                    formatter: '{b}({c}s)',
                                    position: 'insideStartTop',
                                },
                                lineStyle:{
                                    width:2,                                    
                                    color:"#d62728",
                                }
                                },
                                markPoint: {
                                data: [{
                                    name:'TLC_EQ',
                                    coord:source.tlc_warning, // tlc报警点
                                    symbolSize: 10,
                                    symbol: "triangle",
                                    label: {
                                        show: true,
                                        formatter: '{b}: 23423',
                                        color:"#000",
                                        fontStyle:"normal",
                                        position: 'top',
                                    }
                                }]
                                }
                            }]
                        };
            myChart.setOption(option);
        },
        drawLine2(dom, source){
            // souce的源数据，pos是数据
            // 基于准备好的DOM， 初始化echarts
            let myChart = this.$echarts.init(document.getElementById(dom))
            var option = {
                legend: {
                    data: ['高度(km)与气温(°C)变化关系'],
                    show:false,
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: 'Position : <br/>pos : {c}, {b}'
                },
                grid: {
                    // left: '3%',
                    // right: '4%',
                    bottom: '3%',
                    top:'3%',
                    containLabel: true
                },
                xAxis: {
                    name:"Horizontal Position(m)",
                    nameLocation:"middle",
                    splitLine: {
                        show: false,
                    },
                    nameGap:20,
                },
                yAxis: [
                    {
                    name:"T(s)",
                    nameLocation:"middle",
                    nameGap:30,
                    },{
                    show:true,
                    position:"right",
                    }
                ],
                series: [
                    {
                        name: '高度(km)与气温(°C)变化关系',
                        type: 'line',
                        smooth: true,
                        data: source.pos, // 源数据，data的pos ！！！！！！！！！！
                        showSymbol: false, // 关闭symbol
                        markLine:{
                            data: [
                            {xAxis:source.late_warning, // 迟报警线
                            name:'Latest warning line',
                            lineStyle:{
                                width:1,                            
                                color:"#079bf9",
                            }
                            },
                            {xAxis:source.warning_pos,  // 报警线
                            neme: 'Warning Position',
                            lineStyle:{
                                width:1,                            
                                color:"#447fcb",
                            }
                            },
                            {xAxis:source.warning_tlc, // 报警时间点
                            name:'Warning TLC',
                            lineStyle:{
                                width:1,                            
                                color:"#a84f7f",
                            }
                            },
                            {xAxis:source.early_warning, // 过早报警
                            name: 'Earliest warning line',
                            lineStyle:{
                                width:1,                            
                                color:"#e8324f",
                            }
                            }],
                            silent: true,
                            symbol:NaN,
                            label:{
                                show:true,
                                formatter: '{b}({c}s)',
                                position: 'insideStartTop',
                            },
                        },
                        markPoint: {
                            data: [{
                                name:'Warning Point',
                                coord:[1.5,0.4],
                                symbolSize: 10,
                                symbol: "triangle",
                                label: {
                                    show: true,
                                    formatter: '{b}: 1.5',
                                    color:"#000",
                                    fontStyle:"normal",
                                    position: 'top',
                                }
                            }]
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        drawLine3(dom, source){
            let myChart = this.$echarts.init(document.getElementById(dom))
            var option = {
                tooltip: {
                    trigger: 'axis',
                    // formatter: '{c}, {b}'
                    formatter: function(params) {
                        return (
                        params[0].name +
                        "<br/>" +
                        params[0].seriesName +
                        "：" +
                        params[0].data +
                        "%" +
                        "<br/>" +
                        params[1].seriesName +
                        "：" +
                        params[1].data +
                        "%"
                        );
                    }
                },
                legend: {
                    show:true,
                    padding:[20,0]
                },
                grid: {
                    // left: '3%',
                    // right: '4%',
                    bottom: '7%',
                    top:'13%',
                    containLabel: true
                },
                xAxis: {
                    name:"T(s)",
                    nameLocation:"middle",
                    nameGap:30,
                    splitLine: {
                        show: false,
                    }
                    },
                // },{
                //     positon:"top",
                //     // axisLine:{
                //     //     show:true,
                //     // }
                // }],
                yAxis: [
                    {
                        name:"LDW, Brake, Accel (%)",
                        nameLocation:"middle",
                        nameGap:30,
                        splitLine: {
                            show: true,
                        },
                        show:true,
                        position:"left",
                    },{
                        name: "Steer Angle Speed(deg/s)",
                        show:true,
                        position:"right",
                        nameLocation:"middle",
                        nameGap:30,
                        splitLine: {
                            show: false,
                        }
                    }
                ],
                series: [
                {   name: 'Accel Padel',
                    data: source.acc_padel, // 油门踏板
                    type: 'line',
                    smooth: true,
                    yAxisIndex:0,
                    showSymbol: false, // 关闭symbol
                },{
                    name: 'LDW_L',
                    data: source.ldw_l, // ldw激活
                    type: 'line',
                    smooth: false,
                    yAxisIndex:0,
                    showSymbol: false, // 关闭symbol
                },{
                    name: 'Brake Padel',
                    data: source.brake_padel,
                    type: 'line',
                    smooth: false,
                    yAxisIndex:0,
                    showSymbol: false, // 关闭symbol
                },{
                    name: 'Steering',
                    data: source.steering_wheel,
                    type: 'line',
                    smooth: false,
                    yAxisIndex:1,
                    showSymbol: false, // 关闭symbol
                },
                ]
            };
            myChart.setOption(option);


             // 实现自动播放tooltip的方法
            // var index = 0; //播放所在下标
            // var mTime = setInterval(function() {
            //     myChart.dispatchAction({
            //         type: 'showTip',
            //         seriesIndex: 0,
            //         dataIndex: index
            //     });
            //     index++;
            //     if(index > data.length) {
            //         index = 0;
            //     }
            // }, 1000);
        },
        drawLine4(dom, source){
            let myChart = this.$echarts.init(document.getElementById(dom))
            var option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    show:true,
                    padding:[20,0]
                },
                grid: {
                    bottom: '7%',
                    top:'13%',
                    containLabel: true
                },
                xAxis: {
                    name:"T(s)",
                    nameLocation:"middle",
                    nameGap:30,
                    splitLine: {
                        show: false,
                    }
                    },
                yAxis: [
                    {
                        name:"Vehicle Speed(km/h)",
                        nameLocation:"middle",
                        nameGap:30,
                        splitLine: {
                            show: true,
                        },
                        show:true,
                        position:"left",
                    },{
                        name: "Relative Speed(m/s)",
                        show:true,
                        position:"right",
                        nameLocation:"middle",
                        nameGap:30,
                        splitLine: {
                            show: false,
                        }
                    }
                ],
                series: [
                {   name: 'Vehicle Speed',
                    data: source.vehicle_speed,
                    type: 'line',
                    smooth: true,
                    yAxisIndex:0,
                    showSymbol: false, // 关闭symbol

                },{
                    name: 'Relative Speed',
                    data: source.relative_speed,
                    type: 'line',
                    smooth: false,
                    yAxisIndex:1,
                    showSymbol: false, // 关闭symbol
                    lineStyle: {
                        type: "dashed"
                    }
                },
                ]
            };
            myChart.setOption(option);
        },
    }
    
}
</script>

<style scoped>

</style>