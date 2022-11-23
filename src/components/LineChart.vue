<template>
  <apexchart
    type="bar"
    height="105"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";
import moment from "moment";

export default {
  name: "line-chart",
  props: ["stepsOne", "stepsTwo"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      currentRoute: this.$route.name,
    };
  },
  created() {
    console.log(this.accelerator.values);
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: "bar",
          height: "50px",
          offsetX: -10,
          offsetY: -35,
          stacked: true,
          stackType: "100%",
          borderRadius: 4,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "12%",
             borderRadius: 4,
            toolbar: {
              show: false,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
        },
        xaxis: {
          type: "category",
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
            formatter: undefined,
            offsetY: 0,
            style: {
              fontSize: 0,
              fontFamily: 0,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          offsetX: -10,
          labels: {
            show: false,
          },
        },
        tooltip: {
          show: false,
        },
        title: {
          show: false,
        },
        legend: {
          show: false,
        },
      };
    },
    series() {
      return [
        {
          name: "ממתינים",
          color: "#34a9ff",
          data: [this.stepsTwo],
        },
        {
          name: "טופלו",
          color: "#8577d1",
          data: [this.stepsOne],
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
