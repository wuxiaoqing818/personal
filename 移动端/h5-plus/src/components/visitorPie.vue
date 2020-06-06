<template>
  <div class="visitorpie">
    <div id="visitorpie" class style="width: 90%;height:450px;"></div>
    <router-link to="/zhu">去柱状图</router-link>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

export default {
  data() {
    return {
      list: ""
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("visitorpie"));
    this.initData();
    axios.get("http://jd.itying.com/api/plist").then(res => {
      console.log(res.data.result);
      this.list =res.data.result
    });
  },
  // props: ['pieData'],
  methods: {
    initData() {
      const option = {
        title: {
          text: "用户分布",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "上海", "深圳", "杭州", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 200, name: "北京" },
              { value: 333, name: "上海" },
              { value: 3333, name: "深圳" },
              { value: 852, name: "杭州" },
              { value: 3653, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      this.myChart.setOption(option);
    }
  }
  // watch: {
  //     pieData: function (){
  //         this.initData()
  //     }
  // }
};
</script>

<style>
/* @import '../style/mixin'; */
.visitorpie {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
