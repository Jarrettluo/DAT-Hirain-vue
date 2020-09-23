<template>
  <div>
    <div id="container" style="width:100%; height:500px"></div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import axios from 'axios'
export default {
  mounted () {
    this.get_gps_data()
  },
  methods: {

      get_gps_data(){
          const path = 'http://localhost:5000/DataAnalysis/gps_data/'
          axios
            .get(path)
            .then(this.update_gps_data)
            .catch()
      },
    update_gps_data(res){
        var res_data = res.data
        if (res_data.code==1200){
            this.init(res_data.data)
        }
    },
    init(source) {
      let map = new AMap.Map('container', {
        center: source[0], // 取源数据的第一个点作为中点
        resizeEnable: true,
        zoom: 10
      })

            // 折线的节点坐标数组，每个元素为 AMap.LngLat 对象
        // var path = [
        //     new AMap.LngLat(116.368904,39.913423),
        //     new AMap.LngLat(116.382122,39.901176),
        //     new AMap.LngLat(116.387271,39.912501),
        //     new AMap.LngLat(116.398258,39.904600)
        // ];
        var path = []

        source.forEach((item,i) => {
            path.push(new AMap.LngLat(item[0], item[1]))
        });

        // 创建折线实例
        var polyline = new AMap.Polyline({
            path: path,  
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
            lineJoin: 'round' // 折线拐点连接处样式
        });

        // 将折线添加至地图实例
        map.add(polyline);
    }
  }
}
</script>

<style scoped>

</style>