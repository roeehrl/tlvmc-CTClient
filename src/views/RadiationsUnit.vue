<template>
  <div class="radiations-container">
    <app-statistics
      :stats="screen.data.cards"
      :title="screen.data.title || title"
      :color="screen.data.color"
      :type="$screenTypes.TYPE_RADIATIONS"
    >
    </app-statistics>
    
    <app-table :table="screen.data.table" :type="$screenTypes.TYPE_RADIATIONS"></app-table>
    <app-table v-if="screen.data.secondTable" :table="screen.data.secondTable" :type="$screenTypes.TYPE_RADIATIONS"></app-table>
  </div>
</template>

<script>
export default {
  props: {
    unitId: [String, Number]
  },
  components: {},
  data() {
    return {
      title: 'הקרנות',
    };
  },
  created() {
    this.fetch();
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
  },
};
</script>

<style lang="scss" scoped>
.radiations-container {
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
  .radiations-body {
    display: flex;
    .flex-item-left {
      flex: 70%;
      padding-left: 10px;
    }
    .flex-item-right {
      padding-right: 10px;
      flex: 30%;
    }
  }
}
</style>
