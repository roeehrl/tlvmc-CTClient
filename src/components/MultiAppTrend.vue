<template>
  <div>
    <div class="app-trend-ico">
      <div
        class="isPopUp"
        :class="{ active: toggleCardTable }"
        @click="toggleCard(false)"
      >
      <div class="close-button" @click="toggleCard(false)">
        X
      </div>
        <div
          class="datacards-container"
          v-for="table in datacards"
          :key="table"
        >
          <table class="table-head">
            <tr
              class="table-tr"
              v-bind:style="{ width: `${table.header.length + 1}%` }"
            >
              <th class="table-th header-th">
                {{ table.title }}
              </th>
            </tr>
            <tr
              v-bind:style="{ width: `${table.header.length + 1}%` }"
              v-for="header in table.header"
              :key="header"
              class="table-tr"
            >
              <th class="table-th">{{ header }}</th>
            </tr>
          </table>

          <div class="table-body-container">
            <table class="table-body">
              <tr v-for="item in table.patients" :key="item" class="table-tr">
                <th
                  v-bind:style="{ width: `${table.header.length + 1}%` }"
                  class="table-th empty-th"
                ></th>
                <th
                  v-bind:style="{ width: `${table.header.length + 1}%` }"
                  class="table-th"
                  v-for="x in item.patientParams"
                  :key="x"
                >
                  {{ x.date ? getDateFormat(x.cellText) : x.cellText }}
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
  name: 'multi-app-trend',
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
    datacards: { type: Array },
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
    getDateFormat(date) {
      console.log(date);
      let finalDate = '';
      let split = date.split(':');
      let datePre = date
        .split(' ')[0]
        .split('-')
        .reverse()
        .join('-');
      let hour = split[0].split(' ')[1];
      let minute = split[1];
      let time = hour + ':' + minute;

      finalDate = datePre + ' ' + time;
      return finalDate;
    },
    close() {
      if (!this.isActive || this.trendInline) {
        return;
      }

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
}
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
  overflow-y: auto;
  padding-bottom: 1rem;
  &.active {
    transition: ease-in 0.3s;
    height: 65%;

    width: 100%;
    background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 36%);
    position: fixed;
    z-index: 6000;
    left: 0;
    bottom: 0;
    border-radius: 4px;
    box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
  }
  .isPopUp-container {
    // border: 1px solid red;
    padding: 25px;
  }
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
.datacards-container {
  padding-right: 10px;
  margin-bottom: 5rem;
  margin-top: 2rem;

  overflow: auto;
  .header {
    padding: 15px 0px;

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
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #07111e;

    padding: 0.5rem 0 0.5rem 0;
    .table-tr {
      display: flex;

      justify-content: center;

      .table-th {
        font-size: 1.1rem;
        text-align: center;
        letter-spacing: 0.27px;
        color: #dae8fc;
      }
    }
    .header-th {
      min-width: 7rem;
      font-size: 25px !important;
    }
  }
  .table-body {
    width: 95%;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    height: 100%;
    overflow: auto;
    .table-tr {
      display: flex;
      align-items: center;
      padding: 0.5rem 0 0.5rem 0;
      justify-content: space-between;
      border-bottom: 1px solid #07111e;
      border-top: none;
      .table-th {
        font-size: 1.1rem;
        padding: 15px 0;
        letter-spacing: 0.25px;
        color: #dae8fc;
        width: 100%;
      }
    }
  }
  .empty-th {
    min-width: 7rem;
    // max-width: 6rem;
  }
}

.close-button {
  position: relative;
  top: 15px;
  right: 20px;
  color: white;
  font-size: 1.4rem;
}
</style>
