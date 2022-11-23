<template>
  <div class="unit malrad-score" v-if="!screen.loading && screen.data">
    <div class="side">
      <p class="title">{{ screen.data.title }}</p>

      <div class="legend">
        <div class="item" v-for="item in legendSeries" @click="toggleSet(item)">
          <span class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 42 40"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-1.000000, 0.000000)">
                  <path
                    d="M22,1.85410197 L2.8401124,15.7745751 L10.1585382,38.2983739 L33.8414618,38.2983739 L41.1598876,15.7745751 L22,1.85410197 Z"
                    id="Polygon"
                    :stroke="item.color"
                    stroke-width="3"
                  />
                  <circle
                    id="Oval"
                    :fill="item.color"
                    cx="22.5"
                    cy="22.5"
                    r="5.5"
                  />
                </g>
              </g>
            </svg>
          </span>
          <span class="label">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="main-inner" dir="ltr">
        <apexchart
          type="radar"
          ref="chart"
          :options="chartOptions"
          :series="series"
          @updated="onChartMount"
          @mounted="onChartMount"
        ></apexchart>

        <div
          class="chart-label"
          v-for="label in labels"
          @click="displayTrend(label)"
          :key="label.text"
          :style="label.style"
        >
          <span class="icon" v-html="$icon(label.icon)"></span>
          <span class="text">
            {{ label.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const colors = ['#f86e2d', '#d2ff53', '#f82e5a', '#79f886'];

const getColor = (index) => {
  while (index >= colors.length) {
    index = index - colors.length;
  }

  index = index <= 0 ? 0 : index;

  return colors[index];
};

export default {
  props: {
    unitId: [String, Number],
  },

  data() {
    return {
      width: '100%',
      labels: [],
    };
  },

  created() {
    this.fetch();
  },

  mounted() {},

  methods: {
    async fetch(refresh = false) {
      await this.$store.dispatch('loadScreen', {
        id: this.unitId,
        refresh,
        type: this.$screenTypes.TYPE_MARLAD_SCORE,
      });
    },

    displayTrend(label) {
      console.log(label);
      this.$store.commit('changeTrendPopupStatus', {
        show: true,
        trend: label.paramId,
        unitId: label.unitId,
      });
    },

    onChartMount(context) {
      this.labels = [];

      const svg = context.el.querySelector('svg');
      const svgRect = svg.getBoundingClientRect();
      const svgLabels = svg.querySelectorAll(
        '.apexcharts-xaxis .apexcharts-datalabel'
      );
      const labels = ((this.screen || { data: {} }).data.data || {}).labels;

      let center = 0;
      let middle = 0;

      for (let labelIndex in labels) {
        const el = svgLabels[labelIndex];

        if (!el) {
          continue;
        }

        const rect = el.getBoundingClientRect();
        let left = 0;
        let top = 0;

        if (labelIndex == 0) {
          center = rect.left - svgRect.left - 50;
          left = center;
          middle = rect.top - svgRect.top - 50;
          top = rect.top - svgRect.top - 80;
        } else {
          const isOnTheLeft = rect.left - svgRect.left - center - 50 < 0;

          left = isOnTheLeft
            ? rect.left - svgRect.left - 100
            : rect.left - svgRect.left;
          top = rect.top - svgRect.top - 40;
        }

        if (labelIndex == 4) {
          left = rect.left - svgRect.left - 50;
          top = rect.top - svgRect.top;
        }

        this.labels.push({
          ...labels[labelIndex],
          style: {
            left: left + 'px',
            top: top + 'px',
          },
        });
      }
    },

    toggleSet(set) {
      set.isVisible = !set.isVisible;

      this.$nextTick(() => {
        this.$forceUpdate();
      });
    },
  },

  computed: {
    legendSeries() {
      return (
        ((this.screen || { data: {} }).data.data || {}).datasets || []
      ).map((set, index) => {
        return {
          isVisible: true,
          color: getColor(index),
          ...set,
        };
      });
    },

    series() {
      return this.legendSeries.filter(function(item) {
        return item.isVisible;
      });
    },

    chartOptions() {
      return {
        chart: {
          type: 'radar',
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: false,
          },
        },
        labels: ((this.screen || { data: {} }).data.data || {}).labels,
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.5,
        },
        markers: {
          size: 4,
        },
        legend: {
          show: false,
        },
        yaxis: {
          show: false,
          min: (this.screen || { data: {} }).data.min || 0,
          tickAmount: (this.screen || { data: {} }).data.tickAmount || 10,
          max: (this.screen || { data: {} }).data.max || 100,
        },

        plotOptions: {
          radar: {
            offsetX: 0,
            offsetY: 0,
            polygons: {
              strokeColors: '#004766',
              connectorColors: '#004766',
              fill: {
                colors: ['transparent'],
              },
            },
          },
        },
        xaxis: {
          labels: {
            offsetX: 0,
            offsetY: 0,
            rotateAlways: false,
            formatter: function(value) {
              return value;
            },
            style: {
              colors: [
                '#C6D9F5',
                '#C6D9F5',
                '#C6D9F5',
                '#C6D9F5',
                '#C6D9F5',
                '#C6D9F5',
              ],
              fontSize: '1px',
              fontFamily: "'Almoni Neue DL 4.0 AAA', sans-serif",
              cssClasses: 'apexcharts-xaxis-label',
            },
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.malrad-score {
  display: flex;
  height: 100%;

  .side {
    width: 220px;
    flex-grow: 0;
    flex-shrink: 0;

    .legend {
      color: #dae8fc;
      border: 1px solid #023e58;
      border-radius: 4px;
      background-color: #042941;
      padding: 20px 25px;
      margin-top: 50px;

      .item {
        display: flex;
        align-items: center;

        + .item {
          margin-top: 16px;
        }
      }

      .indicator {
        display: block;
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }

  .main {
    flex-grow: 1;
    flex-shrink: 1;
    align-self: center;
    padding: 64px;

    .main-inner {
      position: relative;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
    }

    ::v-deep .apexcharts-datalabel {
      opacity: 0;
    }

    .chart-label {
      color: #c6d9f5;
      position: absolute;
      direction: rtl;
      width: 110px;
      height: 80px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      &:hover {
        color: white;
      }

      .icon {
        display: inline-flex;
        width: 44px;
        height: 44px;
      }
    }
  }
}

.title {
  color: #10cccb;
  font-size: 30px;
}

/* שוהים במיון */
@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .malrad-score {
    .main {
      //   padding: 25em;
    }
    .text {
      font-size: 25px;
    }
    .side {
      //   width: unset;
      .legend {
        .indicator {
          width: 40px;
          height: 40px;
        }
        .label {
          font-size: 40px;
        }
      }
    }
    .main {
      .main-inner {
        position: relative;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
      }
      .chart-label {
        .icon {
          width: 75px;
          height: 75px;
        }
      }
    }
  }
  .title {
    color: #10cccb;
    font-size: 40px;
  }
}
@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .malrad-score {
    .main {
      //   padding: 25em;
    }
    .text {
      font-size: 30px;
    }
    .side {
      width: unset;
      .legend {
        .indicator {
          width: 40px;
          height: 40px;
        }
        .label {
          font-size: 40px;
        }
      }
    }
    .main {
      .main-inner {
        position: relative;
        width: 120%;
        max-width: 2000px;
        margin: 0 auto;
      }
      .chart-label {
        .icon {
          width: 75px;
          height: 75px;
        }
      }
    }
  }
  .title {
    color: #10cccb;
    font-size: 40px;
  }
}
</style>
