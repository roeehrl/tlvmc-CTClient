<template>
  <div
    class="app-trend"
    v-if="currentRoute !== 'tipulnimraz'"
    :class="{ 'is-fixed': !trendInline, 'is-inline': trendInline, 'shrink' : $store.getters.shrink === true }"
  >
    <div class="close-trend" @click="close"></div>

    <app-trend-graph
      :small-change-loading="smallChangeLoading"
      :trends="trends"
      :active-rage="activeRage"
      :title="title"
      @range-clicked="changeRange"
      ref="graph"
      :range="range"
      :values="values"
    >
    </app-trend-graph>

    <div class="disable" v-if="disabled">
      <p>בקרוב.</p>
    </div>
  </div>

  <div v-else>
    <div class="app-trend-ico">
      <div
        class="isPopUp"
        :class="{ active: toggleCardTable }"
        @click="toggleCard(false)"
      >
      <div class="close-button" @click="toggleCard(false)">
        X
      </div>
        <div class="datacards-container">
          <div class="header">
            <span>{{ datacards.title }}</span>
          </div>
          <table class="table-head">
            <tr
              v-for="header in datacards.header"
              :key="header"
              class="table-tr"
            >
              <th class="table-th">{{ header }}</th>
            </tr>
          </table>

          <div class="table-body-container">
            <table class="table-body">
              <tr
                v-for="item in datacards.patients"
                :key="item"
                class="table-tr"
              >
                <th class="table-th" v-for="x in item.patientParams" :key="x">
                  {{ x.cellText }}
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutSide from 'vue-click-outside';
import AppTrendGraph from './AppTrendGraph';

const defaultTitle = 'טוען...';

export default {
  name: 'app-trend',
  components: { AppTrendGraph },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    itempath: {},
    activeCard: {
      type: Boolean,
      default: false,
    },
    toggleCardTable: {
      type: Boolean,
      default: false,
    },
    datacards: { type: Object },
  },
  data() {
    return {
      isActive: false,
      loading: false,
      smallChangeLoading: false,
      title: defaultTitle,
      activeTrends: [],
      trends: [],
      currentRoute: this.$route.name,
      values: [],

      legend: null,

      activeRage: 'daily',
      tableData: [],
      chartSize: {
        width: 600,
        height: 200,
      },

      range: {
        hourly: {
          label: 'שעתי',
          unit: 'H',
          unitBack: 7,
        },
        daily: {
          label: 'יומי',
          unit: 'D',
          unitBack: 7,
        },
        weekly: {
          label: 'שבועי',
          unit: 'W',
          unitBack: 7,
        },
        monthly: {
          label: 'חודשי',
          unit: 'M',
          unitBack: 12,
        },
        annual: {
          label: 'שנתי',
          unit: 'Y',
          unitBack: 7,
        },
      },
    };
  },
  directives: {
    ClickOutSide,
  },
  mounted() {
    setTimeout(() => {
      this.isActive = true;
    }, 100);

    this.fetchData();
  },
  methods: {
    close() {
      this.$store.commit('changeTrendPopupStatus', { show: false });
    },

    changeRange(rangeId) {
      this.activeRage = rangeId;
      this.fetchData(true);
    },

    async fetchData(smallChange = false) {
      const range = this.range[this.activeRage];
      const screen = this.screen.data;

      if (!smallChange) {
        this.values = [];
        this.activeTrends = [];
        this.$refs.graph.startLoading();
      } else {
        this.smallChangeLoading = true;
      }

      let title,
        data,
        trends,
        legend = null;

      if (!smallChange && (this.trend || {}).preLoaded) {
        ({ title, data, trends, legend = null } = this.trend);
      } else {
        ({ title, data, trends, legend = null } = await this.api.fetchTrend(
          this.trend.unitId || screen.unitId || this.$route.params.unitId,
          this.trend.id,
          range.unit,
          this.time.live ? null : this.time.time
        ));
      }

      this.values = data;
      this.trends = trends.map((item) => {
        return {
          hide: false,
          ...item,
        };
      });
      this.legend = legend;
      this.smallChangeLoading = false;

      this.title = title;
      this.$refs.graph.stopLoading();
    },
  },
  computed: {
    filterData() {
      console.log(this.$screen);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-trend {
  height: 331px;
  width: 100%;
  background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 36%);

  &.is-fixed {
    position: fixed;
    z-index: 6000;
    left: 0;
    bottom: 0;
    border-radius: 4px;
    box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
  }

  .main-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
  }

  .close-trend {
    position: relative;
    background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23DAE8FC' stroke-linecap='round' stroke-width='1.5'%3E%3Cpath d='M0 14L15 0M0 0L15 14' transform='translate(1 1)'/%3E%3C/g%3E%3C/svg%3E%0A");
    width: 15px;
    height: 14px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    top: 45px;
    right: 23px;
    cursor: pointer;
    z-index: 5;
  }

  // .shrink-trend {
  //   background-color: red;
  //   position: relative;
  //   width: 15px;
  //   height: 14px;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   background-position: center;
  //   top: 45px;
  //   right: 23px;
  //   cursor: pointer;
  //   z-index: 5;
  // }

  &.is-inline .trend-body {
    margin: 0 70px 0 60px;
    padding: 35px 0;

    .trend-body-inner {
      padding-bottom: 0;
      flex-grow: 0;

      .chart {
        height: 250px;
      }
    }
  }

  .small-change-loader {
    min-width: 20px;
    min-height: 20px;
    width: 30px;
    height: 30px;
  }
}

.disable {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  color: white;
}

.app-trend-ico {
  position: relative;
  .isPopUp {
    height: 0;
    width: 100%;
    background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 36%);
    position: fixed;
    z-index: -6000;
    left: 0;
    bottom: 0;
    border-radius: 4px;
    box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
    transition: ease-in 0.3s;
    &.active {
      transition: ease-in 0.3s;
      height: 400px;
      //height: 331px;
      width: 100%;
      background-image: radial-gradient(
        circle at 10% 11%,
        #042840,
        #032b45 36%
      );
      position: fixed;
      z-index: 6000;
      left: 0;
      bottom: 0;
      border-radius: 4px;
      box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
      .isPopUp-container {
        // border: 1px solid red;
        padding: 25px;
        .isPopUp-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          h1 {
            font-size: 30px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.41px;
            text-align: right;
            color: #dae8fc;
          }
          img {
            width: 19px;
            height: 19px;
          }
        }
        .isPopUp-table {
          width: 75%;
          .isPopUp-table-x {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border: 1px solid #07111e;
          }
        }
      }
    }
  }
  .datacards-container {
    padding-right: 75px;
    height: 100%;
    overflow: auto;
    .header {
      padding: 15px 0px;
      // position: fixed;
      span {
        font-size: 30px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.41px;
        text-align: right;
        color: #dae8fc;
      }
    }
    .table-head {
      width: 80%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border: 1px solid #07111e;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 0.5rem 0 0.5rem 0;
      .table-tr {
        display: flex;
        // // align-items: center;
        // align-items: flex-start;
        justify-content: center;
        // border-top: 1px solid #07111e;
        width: 100%;
        margin: 0 auto;
        .table-th {
          padding: 15px;
          padding-right: 25px;
          font-size: 20px;
          text-align: center;
          letter-spacing: 0.27px;
          color: #dae8fc;
        }
      }
    }
    .table-body {
      width: 80%;
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      height: 100%;
      overflow: auto;
      .table-tr {
        display: flex;
        // align-items: center;
        align-items: flex-start;
        justify-content: space-around;
        border: 1px solid #07111e;
        border-top: none;
        .table-th {
          font-size: 18px;
          padding: 15px 0;
          letter-spacing: 0.25px;
          color: #dae8fc;
          width: 100%;
        }
      }
    }
  }
}

.close-button {
  position: relative;
  top: 15px;
  right: 20px;
  color: white;
  font-size: 1.4rem;
}

.shrink {
    height: 150px;
}
</style>
