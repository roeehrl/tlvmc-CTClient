<template>
  <div class="bar-chart">
    <div class="chart" :class="[datatype]">
      <apexchart
        type="bar"
        width="245px"
        height="100%"
        :options="chartOptions"
        :series="seriesMri"
      ></apexchart>
      <h1 @click="goToUnit(unitId)" style="cursor: pointer;">{{this.mri.title}}</h1>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";
import moment from "moment";

export default {
  name: "simulation-chart",
  props: ["transfers", "table", "mri", "ct",'datatype',"accelerator", 'unitId', 'maxXValue'],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      currentRoute: this.$route.name
    };
  },

  mounted() {
    console.log(this.maxXValue);
  },
  computed: {
    chartOptions(){
      return  {
        tooltip: {
          x: {
            show: false,
          }
        },
          chart: {
          foreColor: "#fff",
          height: 450,
          width: "100px",
          stacked: true,
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "100%",
            horizontal: true,
            barHeight: "40%"
          },
          column: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        stroke: {
          width: [0, 0, 0],
          curve: "straight",
          dashArray: [0, 0, 0],
        },
        markers: {
          size: 3,
          strokeColor: "#DAE8FC",
          colors: ["#023E58"],
          strokeWidth: 10,
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [0],
          color: "#DAE8FC",
        },
        xaxis: {
          // range: 6,
          // max: 6,
          categories: ["0", "10", "20", "30"],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tickAmount: 1,
          labels: {
            style: {
              fontSize: "16px"
            },
            formatter(value) {
              return Math.floor(value);
            }
          },
        },
        grid: {
          show: true,
          borderColor: "#023E58",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
            labels: {
              show: true,
              color: "#C6D9F5",
            },
          },
        },
        yaxis: {
          title: {
            text: "",
          },
          forceNiceScale: true,
          labels: {
            show: false,
            padding: "10",
            formatter(value) {
              return Math.floor(value);
            }
          },
          min: 0,
        },
      }
    },
    inArrivedMri() {
      return _.map(this.mri.arrived, "Value");
    },
    inStayedMri() {
      return _.map(this.mri.stayed, "Value");
    },
    seriesMri() {
      return [
        {
          name: "נשארו",
          color: "#8577d1",
          data: this.inStayedMri,
        },
        {
          name: "הגיעו",
          color: "#34a9ff",
          data: this.inArrivedMri,
        },
      ];
    },
  },
  methods: {
    goToUnit(val) {
      if (!val) {
        return;
      }

      this.$router.push({
        name: `${this.$route.name}.unit`,
        params: {
          unitId: val,
        },
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.bar-chart {
  .chart{
    &.mri{
      margin: 0 15px;
      border: 1px solid #023e58;
    }
    &.ct{
      border: 1px solid #023e58;
    }
    h1{
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
