<template>
  <div class="radiations-index">
    <div class="radiations-container">
      <app-statistics
        :stats="screen.data.cards"
        :title="screen.data.title || title"
        :color="screen.data.color"
        :type="$screenTypes.TYPE_DIMOT"
      >
      </app-statistics>
    </div>
    <div class="dimot-stats-groups-wrapper">
      <dimot-stats-group :items="screen.data.items.miun" group_title="מיון" />
      <dimot-stats-group
        :items="screen.data.items.ishpuz"
        group_title="אשפוז"
      />
    </div>
  </div>
</template>

<script>
import AppAccelerators from '../components/AppAccelerators';
import AppSimulation from '../components/AppSimulation';
import AppTrendGraph from '../components/AppTrendGraph';
import DimotTrendsGraph from '../components/DimotTrendsGraph';
export default {
  components: {
    AppAccelerators,
    AppSimulation,
    AppTrendGraph,
    DimotTrendsGraph,
  },
  data() {
    return {
      title: 'דימות',
      dataKeyToday: null,
      dataKeyTommorow: null,

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
  methods: {
    handleCard(val) {
      this.cardstatus = val;
    },
    async fetch(refresh = false) {
      await this.$store.dispatch('loadScreen', {
        id: this.unitId,
        refresh,
        type: this.$screenTypes.TYPE_UNITS,
      });
    },
    // sortTable(val) {
    //   let data = this.screen.data.tabledoctorpatiets.patients;
    //   let today = data.map((item) => item.patientParams[0].cellText);
    //   let tommorow = data.map((item) => item.patientParams[1].cellText);

    //   // findMaxValToday
    //   let maxValToday = Math.max.apply(Math, today);
    //   // findMaxValTommorow
    //   let maxValTommorow = Math.max.apply(Math, tommorow);

    //   switch (val) {
    //     case 'היום':
    //       let todayTable = data.sort((a, b) => {
    //         let hayom = a.patientParams[0].cellText;
    //         return hayom <= maxValToday ? -1 : '';
    //       });
    //       todayTable = this.screen.data.tabledoctorpatiets.patients;
    //       break;
    //     case 'מחר':
    //       let tommorowTable = data.sort((a, b) => {
    //         let hayom = a.patientParams[0].cellText;
    //         return hayom <= maxValTommorow ? -1 : '';
    //       });
    //       tommorowTable = this.screen.data.tabledoctorpatiets.patients;
    //       break;
    //     default:
    //   }
    // },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.radiations-index {
  padding: 0px 0px 0 0px;

  .radiations-container {
    ::-webkit-scrollbar {
      width: 6px;
      border-left: 1px solid transparent;
    }

    height: 100%;
    .statistics-title {
      font-size: 35px;
      font-weight: bold;
      word-break: break-word;
      width: 400px;
      color: #10cccb;
      padding-left: 15px;
      padding-right: 5px;
      padding: 5px 0;
    }
    .radiations-wrapper {
      display: flex;
      // flex-wrap: wrap;
      padding: 0 15px;
      .flex-item-right {
        flex: 65%;
      }
      .flex-item-left {
        flex: 35%;
        .doctor-patients {
          padding-right: 19px;
        }
      }
    }
  }
}
.dimot-stats-groups-wrapper {
  display: flex;
  flex-direction: row;
  // flex-wrap: wrap;
}
</style>
