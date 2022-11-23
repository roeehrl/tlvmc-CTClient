<template>
  <div class="radiations-index">
    <div class="radiations-container">
      <app-statistics
        :stats="screen.data.cards"
        :title="screen.data.title || title"
        :color="screen.data.color"
        :type="$screenTypes.TYPE_TIPULNIMRAZE"
      >
      </app-statistics>
    </div>
    <!-- <div>{{ screen.data.cards }}</div>
    <app-statistics
      :stats="screen.data.cards"
      :title="screen.data.title || title"
      :color="screen.data.color"
      :type="$screenTypes.TYPE_TIPULNIMRAZE"
    >
    </app-statistics> -->
    <div class="ico-wrapper">
      <AppIco :ico="screen.data.ico" />
    </div>
  </div>
</template>

<script>
import AppIco from '../components/AppIco';
import AppAccelerators from '../components/AppAccelerators';
import AppSimulation from '../components/AppSimulation';
export default {
  props: {},
  components: { AppIco, AppAccelerators, AppSimulation },
  data() {
    return {
      title: 'טיפול נמרץ',
      dataKeyToday: null,
      dataKeyTommorow: null,
    };
  },
  methods: {
    async fetch(refresh = false) {
      await this.$store.dispatch('loadScreen', {
        id: this.unitId,
        refresh,
        type: this.$screenTypes.TYPE_UNITS,
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

//
<style lang="scss" scoped>
// .tipul-nimraz-container{
//   // padding: 15px;
//   .ico-wrapper{
//   }
// }
//
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
