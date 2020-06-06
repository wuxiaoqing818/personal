<template>
  <div class="zhu" id="zhu" style="width: 90%;height:450px;">
    <router-link to="/bing">去饼形图</router-link>
  </div>
</template>

<script>
import axios from "axios";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      nameList: [],
      priceList: []
    };
  },
  mounted() {
    axios.get("http://jd.itying.com/api/plist").then(res => {
      console.log(res.data.result);
      res.data.result.forEach(val => {
        this.nameList.push(val.title);
        this.priceList.push(val.price);
      });
      this.initData();
    });
  },
  methods: {
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("zhu"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        axisLabel: {
          formatter: val => {
            let txt = val;
            if (val.length > 3) {
              txt = val.substr(0, 3) + "...";
            }
            return txt;
          }
        },
        xAxis: {
          data: this.nameList
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.priceList
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>