<template>
  <div>
    <apexchart
      v-if="currentRoute !== 'transporations.unit'"
      type="line"
      width="100%"
      height="245"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <apexchart
      v-if="currentRoute === 'transporations.unit'"
      type="line"
      width="100%"
      height="225"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";

export default {
  name: "changes-chart",
  props: ["transfers", "table"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      currentRoute: this.$route.name,
      chartOptions: {
        chart: {
          foreColor: "#fff",
          height: 250,
          width: "100px",
          stacked: true,
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          bar: {
            borderRadius: this.$route.name === "transporations.unit" ? 0 : 0,
            columnWidth:
              this.$route.name == "transporations.unit" ? "80%" : "80%",
            endingShape: "rounded",
          },
          line: {
            borderRadius: this.$route.name === "transporations.unit" ? 0 : 0,
            columnWidth:
              this.$route.name == "transporations.unit" ? "35%" : "45%",
          },

          column: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        stroke: {
          width: [0, 0, 1],
          curve: "straight",
          dashArray: [0, 8, 4],
        },
        markers: {
          size: 3,
          strokeColor: "#dae8fc",
          colors: ["#023e58"],
          strokeWidth: 1,
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [10],
          color: "#dae8fc",
        },
        xaxis: {
          categories: ["1", "2", "3", "4", "5"],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        grid: {
          borderColor: "#fff",
          opacity: 0.1,
          strokeDashArray: 0.1,
          row: {
            opacity: 0.1,
            borderColor: "#dce8fd",
          },
        },
        yaxis: {
          title: {
            text: "",
          },
          forceNiceScale: true,
          labels: {
            show: true,
            padding: this.$route.name == "transporations.unit" ? "10" : "10",
          },
          min: 0,
        },
      },
    };
  },
  created() {
    console.log(this.inTimeLine, "inTimeLine");
  },
  computed: {
    inNormal() {
      return _.map(this.screen.data.movementsByComplexity.Normal, "Value");
    },
    inUrgent() {
      return _.map(this.screen.data.movementsByComplexity.Urgent, "Value");
    },

    series() {
      return [
        {
          name: "רגילים",
          type: "bar",
          color: "#8577d1",
          data: this.inNormal,
        },
        {
          name: "דחופים ",
          type: "bar",
          color: "#10cccb",
          data: this.inUrgent,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.apexchart-transform {
  height: 400px;
  border: 1px solid red;
}
</style>
