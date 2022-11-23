<template>
  <div>
    <apexchart
      v-if="currentRoute === 'transporations.unit'"
      type="line"
      width="100%"
      height="100%"
      class="x"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <apexchart
      v-else-if="currentRoute == 'transporations'"
      type="line"
      width="100%"
      height="240"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";
import moment from "moment";

export default {
  name: "transform-chart",
  props: ["transfers", "table"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      currentRoute: this.$route.name,
    };
  },
  created() {
    console.log(this.chartHours);
  },
  computed: {
    chartHours() {
      let currentMoment = moment();
      let categories = [];

      categories.push(currentMoment.format("HH:00"));

      for (let i = 0; i < 23; i++) {
        currentMoment = currentMoment.subtract(1, "h");
        const subHour = currentMoment.format("HH:00");

        categories.push(subHour);
      }

      return categories.reverse();
    },
    chartOptions() {
      return {
        chart: {
          foreColor: "#dce8fd",
          height: 450,
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
            columnWidth:
              this.$route.name == "transporations.unit" ? "35%" : "50%",
            endingShape: "rounded",
          },
          line: {
            columnWidth:
              this.$route.name == "transporations.unit" ? "35%" : "25%",
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
          categories: this.chartHours,

          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            offsetY: this.$route.name == "transporations.unit" ? 35 : 0,
            offsetX: this.$route.name == "transporations.unit" ? -11 : 0,
          },
        },
        grid: {
          borderColor: "#027e51",
          opacity: 0.1,
          strokeDashArray: 0.1,
          row: {
            opacity: 0.1,
            borderColor: "#000",
          },
        },
        yaxis: [
          {
            show: false,
            borderColor: "#c2c2c2",
            borderWidth: 0,
            borderRadius: 0,
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: true,
              color: "#008FFB",
            },
            tooltip: {
              show: false,
            },
            title: {
              text: "Yearly Results",
              offsetX: 45,
            },
          },
          {
            seriesName: "בתהליך",
            opposite: true,
            labels: {
              show: true,
              align:
                this.$route.name == "transporations.unit" ? "right" : "left",
              width: 0,
              padding: this.$route.name == "transporations.unit" ? "25" : "-8",
              style: {
                colors: ["#dce8fd"],
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
              },
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
            },
          },
          {
            seriesName: "זמן ממוצע",
            opposite: false,
            labels: {
              show: true,
              align:
                this.$route.name == "transporations.unit" ? "right" : "left",
              width: 0,
              padding: this.$route.name == "transporations.unit" ? "0" : "20",
              style: {
                colors: ["#dce8fd"],
                fontSize: "11px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 400,
              },
            },
          },
        ],
      };
    },
    inProgress() {
      return _.map(this.transfers.MovementsInProgress, "Value");
    },
    inDone() {
      return _.map(this.transfers.MovementsDone, "Value");
    },
    inAvg() {
      return _.map(this.transfers.MovementsAvg, "Value");
    },
    inTimeLine() {
      return _.map(this.transfers.MovementsInProgress, "Unit");
    },
    series() {
      return [
        {
          name: "בתהליך",
          type: "column",
          color: "#8577d1",
          data: this.inProgress,
        },
        {
          name: "בוצעו",
          type: "column",
          color: "#10cccb",
          data: this.inDone,
        },
        {
          name: "זמן ממוצע",
          type: "line",
          color: "#dae8fc",
          data: this.inAvg,
        },
        // {
        //   type: "bar",
        //   name: "זמן ממוצע",
        //   color: "#dae8fc",
        //   data: this.inAvg,
        // },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.apexcharts-toolbar {
  display: none;
}
.x {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.27px;
  text-align: right;
  color: #dce8fd;
  padding: 25px 25px;
}
</style>
