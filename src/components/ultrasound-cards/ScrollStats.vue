<template>
  <div
    class="scroll-stats-wrapper"
    
    @click="clickToReservation ? goToReservation() : null"
  >
    <div class="top-row row-wrapper">
      <div class="row">
        <div class="first-column-item">
          <div class="icon-title" :style="titleStyle">
            <img v-if="iconName" :src="getBlackWhiteIcon(iconName)" />
            <p>{{ scroll_data.title }}</p>
          </div>
        </div>
        <div class="dates">
          <p
            class="date"
            :key="index"
            v-for="(date, index) in scroll_data.dates"
          >
            {{ date }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="row-wrapper"
      :key="index"
      v-for="(row, index) in scroll_data.rows"
    >
      <div class="row">
        <div class="first-column-item">
          <p class="word">{{ row.title }}</p>
        </div>
        <div class="values">
          <p class="value" :key="index" v-for="(value, index) in row.values">
            {{ value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    scroll_data: {},
    iconName: String,
    clickToReservation:Boolean
  },
  methods: {
    goToReservation() {
      this.$router.push({
        name: `dimot.unit`,
        params: {
          unitId: 'table',
        },
        query: {
          group: 'reservation',
        },
      });
    },
  },
  computed: {
    titleStyle() {
      return this.iconName ? { 'margin-right': '1vw' } : {};
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-stats-wrapper {
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 0.5rem 0 0.5rem 0;
  margin-left: 0.5vw;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.row-wrapper {
  border-top: 1px solid #07111e;
}
.row {
  padding: 0.8vw 1vw 0.5vw 2vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.top-row {
  padding-bottom: 0;
  border: none !important;
}
.first-column-item {
  width: 55%;
}
.icon-title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  p {
    color: #dae8fc;
    font-size: 1.1vw;
    margin-right: 1vw;
  }
}
.dates {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
}
.date {
  color: #dae8fc;
  font-size: 1vw;
  font-weight: normal;
  letter-spacing: 0.27px;
}
.word {
  color: #dae8fc;
  font-size: 0.9vw;
}
.values {
  @extend .dates;
}
.value {
  @extend .date;
}
</style>
