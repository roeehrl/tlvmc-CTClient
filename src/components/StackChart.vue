<template>
  <apexchart
    class="stack"
    type="bar"
    height="120"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import _ from 'lodash';
import moment from 'moment';

export default {
  name: 'stack-chart',
  props: ['percentage'],
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
  methods: {
    getColor(value, min, max) {
      if (min && value < min) {
        return '#c93d5e';
      }
      if (max && value > max) {
        return '#c93d5e';
      }
      return '#8577d1';
    },
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 120,
          stacked: false,

          offsetY: 25,
          toolbar: {
            show: false,
          },

          zoom: {
            enabled: false,
          },
        },
        colors: ['#dae8fc', '#dae8fc', 'red', 'blue'],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            barWidth: '22%',
            offsetX: 50,
          },
        },
        xaxis: {
          type: 'category',
          categories: this.inTitle,
          labels: {
            show: true,
            style: {
              colors: ['#dae8fc', '#dae8fc', '#dae8fc', '#dae8fc'],
              opacity: 0.6,
              borderLeft: '1px solid #fff',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        grid: {
          show: true,
          borderColor: '#90A4AE',
          strokeDashArray: 0,
          position: 'back',
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
        legend: {
          show: false,
        },
        fill: {
          // colors: ['#F44336', '#E91E63', '#9C27B0'],
          opacity: 1,
        },
      };
    },
    inValue() {
      return _.map(this.percentage, 'value');
    },
    inTitle() {
      return _.map(this.percentage, 'title');
    },
    inMin() {
      //console.log(this.percentage?.min);
      return _.map(this.percentage, 'min');
    },
    inMax() {
      return _.map(this.percentage, 'max');
    },
    series() {
      return [
        {
          colors: ['#F44336', '#E91E63', '#9C27B0', '#9C27B0'],
          data: this.inValue.map((bar, index) => ({
            x: 'a',
            y: bar,
            fillColor: this.getColor(bar, this.inMin[index], this.inMax[index]),
          })),
          name: [],
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped></style>
