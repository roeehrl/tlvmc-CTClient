<template>
  <div class="radiations-index">
    <div class="radiations-container">
      <app-statistics
        :stats="screen.data.cards"
        :title="screen.data.title || title"
        :color="screen.data.color"
        :type="$screenTypes.TYPE_RADIATIONS"
      >
      </app-statistics>
      <div class="radiations-wrapper">
        <div class="flex-item-right">
          <AppAccelerators
            :title="screen.data.accelerators.title"
            :icon="screen.data.accelerators.icon"
            :accelerator="screen.data.accelerators.accelerator"
          />
          <app-table
            :table="screen.data.futureinvite"
            :type="$screenTypes.TYPE_RADIATIONS_FUTURE_INVITE"
          >
          </app-table>
        </div>
        <div class="flex-item-left">
          <AppSimulation />
          <div class="doctor-patients">
            <app-table
              :table="screen.data.tabledoctorpatiets"
              :type="$screenTypes.TYPE_RADIATIONS_DOCTOR_PATIENTS"
              :sortTable="sortTable"
              :dataKeyToday="dataKeyToday"
              :sortedBy="sortedBy"
              :dataKeyTommorow="dataKeyTommorow"
            >
            </app-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAccelerators from '../components/AppAccelerators';
import AppSimulation from '../components/AppSimulation';
import {getTodaysDate} from '../util';

export default {
  props: {},
  components: { AppAccelerators, AppSimulation },
  data() {
    return {
      title: 'הקרנות',
      dataKeyToday: null,
      dataKeyTommorow: null,
      sortedBy: {}
    };
  },
  methods: {
    sortTableByValue(val, data) {
      this.sortedBy = {
        order: this.sortedBy.order === "DESC" ? "ASC" : "DESC",
        value: val
      }

      let todayTable = data.sort((a, b) => {
        a = !isNaN(Number(a.patientParams[val === "היום" ? 0 : 1].cellText)) ? Number(a.patientParams[val === "היום" ? 0 : 1].cellText) : 0;
        b = !isNaN(Number(b.patientParams[val === "היום" ? 0 : 1].cellText)) ? Number(b.patientParams[val === "היום" ? 0 : 1].cellText) : 0;
        return a > b && this.sortedBy.order === "DESC" ? 1 : -1;
      });  

      this.screen.data.tabledoctorpatiets.patients = todayTable;
    },

    sortTableAlphabeticly(data) {
      this.sortedBy = {
        order: this.sortedBy.order === "DESC" ? "ASC" : "DESC",
        value: "מטופלים לרופא"
      }

      let todayTable = data.sort((a, b) => {
        return this.sortedBy.order === "DESC" && a.patName > b.patName ? 1 : -1;
      });

      this.screen.data.tabledoctorpatiets.patients = todayTable;
    },

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
    sortTable(val) {
      let data = this.screen.data.tabledoctorpatiets.patients;

      if(val === "מטופלים לרופא") {
        return this.sortTableAlphabeticly(data)
      }
      
      const todayOrTommorow = val === getTodaysDate() ? "היום" : "מחר";

      switch (todayOrTommorow) {
        case 'מחר':
          this.sortTableByValue("מחר", data);
        break;

        case "היום":
          this.sortTableByValue("היום", data);
        break;

        default:
      }
    },
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
</style>
