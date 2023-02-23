<template>
  <div class="dataView">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>

<script>
import {dataView} from "@/api/dataView";

export default {
  data() {
    return {
      main1: {}
    }
  },
  created() {

  },
  mounted() {
    this.getData()
    this.main1Draw()
  },
  methods: {
    main1Draw(){
      let myChart = this.$echarts.init(document.getElementById('main1'))
      myChart.setOption({
        title: {
          text: '人数统计'
        },
        tooltip: {},
        xAxis: {
          data: [1,2,3,4,5,6]
        },
        yAxis: {},
        series: [
          {
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]

      })
    },
    getData() {
      dataView().then(res => {
        if (res.data.status === 200) {
          let {legend, xAxis, series} = res.data.data
          this.draw(legend,xAxis,series,'main2')
        }
      }).catch(error => {
        throw error
      })
    },
    draw(legend, xAxis, series, id) {
      let myChart = this.$echarts.init(document.getElementById(id))
      let option = {
        title: {
          text: '会话量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend:{
          data: legend,
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value',
        },
        series: series
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.dataView {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 50%;

    #main1, #main2 {
      height: 500px;
    }
  }
}
</style>