<template>
  <div class="bar-chart">
    <div class="chart" :class="[datatype]">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";
import moment from "moment";

export default {
  name: "app-stacked-chart",
  
  components: {
    apexchart: VueApexCharts,
  },
  data: {
    series: [
      {
        name: "Marine Sprite",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Striking Calf",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Tank Picture",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Bucket Slope",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: "Reborn Kid",
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "100% Stacked Bar",
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-chart {
  .chart {
    &.mri {
      margin: 0 15px;
      border: 1px solid #023e58;
    }
    &.ct {
      border: 1px solid #023e58;
    }
    h1 {
      font-size: 20px;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.27px;
      text-align: center;
      color: #dae8fc;
    }
  }
}
</style>
