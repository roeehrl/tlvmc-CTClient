<template>
  <apexchart
    type="radialBar"
    height="210"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";
import moment from "moment";

export default {
  name: "circle-chart",
  props: ["percentage"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      currentRoute: this.$route.name,
      series: [this.percentage],
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          height: 210,
          type: "radialBar",
          offsetY: 0,
        },
        plotOptions: {
          radialBar: {
            startAngle: -115,
            endAngle: 115,
            columnWidth: "15%",
            offsetY:10,
            dataLabels: {
              name: {
                fontSize: "14px",
                opacity: 0,
                color:"#dae8fc",
                fontWeight: 300,
                offsetY: 9,

              },
              value: {
                offsetY: -25,
                fontSize: "25px",
                color:this.percentage < 100 ?  "#dae8fc":"#ec3e60", //circle-max
                //color:this.percentage < 100 ?  "#dae8fc":"#ec3e60",
                fontWeight: "bold",
                fontFamily: "Heebo",
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
            track: {
              show: true,
              startAngle: undefined,
              endAngle: undefined,
              background: "#023d57",
              strokeWidth: "97%",
              opacity: 1,
              margin: 5,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5,
              },
            },
            hollow: {
              margin: 5,
              size: "75%",
              background: "transparent",
              image: undefined,
              imageWidth: 150,
              imageHeight: 150,
              imageOffsetX: 0,
              imageOffsetY: 0,
              imageClipped: true,
              position: "back",
            },
          },
        },
        fill: {
          colors: [
            function ({ value}) {
              if (value < 100) {
                return "#10cccb";
              } else if (value >= 55 && value < 80) {
                return "#10cccb";
              } else {
                return "#ec3e60";
              }
            },
          ],
        },
        stroke: {
          dashArray: 0,
          color: "#000000",
        },
        labels: ["תפוסה כללית"],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
