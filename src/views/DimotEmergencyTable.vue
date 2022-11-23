<template>
  <div class="radiations-index">
    <div class="radiations-container">
      <app-statistics
        v-if="screen.data"
        :stats="screen.data.cards"
        :title="screen.data.title || title"
        :color="screen.data.color"
        :type="$screenTypes.TYPE_DIMOT"
      >
      </app-statistics>
    </div>
    <LargeScrollStats
      v-if="screen.data"
      :scroll_data="screen.data.scroll_data"
    />
  </div>
</template>
<script>
import AppAccelerators from '../components/AppAccelerators';
import AppSimulation from '../components/AppSimulation';
import LargeScrollStats from '../components/ultrasound-cards/LargeScrollStats';
export default {
  props: {
    unitId: String,
  },
  components: {
    AppAccelerators,
    AppSimulation,
    LargeScrollStats,
  },

  methods: {
    handleCard(val) {
      this.cardstatus = val;
    },
    async fetch(refresh = false) {
      let groupBuilder = [];
      if (this.$route.query.group) {
        groupBuilder.push({ key: 'group', value: this.$route.query.group });
      }
      if (this.$route.query.section) {
        groupBuilder.push({ key: 'section', value: this.$route.query.section });
      }
      if (this.$route.query.group_type) {
        groupBuilder.push({
          key: 'group_type',
          value: this.$route.query.group_type,
        });
      }
      await this.$store.dispatch('loadScreen', {
        id: this.$route.params.unitId,
        refresh,
        type: this.$screenTypes.TYPE_UNITS,
        group: groupBuilder,
      });
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
.table-wrapper {
  width: 90%;
  height: 20vh;
  background-color: #032a43;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
