<template>
  <div class="stats-group-wrapper">
    <div class="group-title" >{{ items.group_title }}</div>
    <div class="stats-cards-wrapper">
      <dimot-stats-card :data="items.us" group_type="US" :groupName="items.group_title" unitId="ultrasound"/>
      <dimot-stats-card :data="items.ct" group_type="CT" :groupName="items.group_title" unitId="table"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    group_title: String,
    items: {},
  },
  methods: {
    goToPage(unit) {
      this.$router.push({
        name: `${this.$route.name}.unit`,
        params: {
          //unitId: 'ct',
          unitId: 'ultrasound',
        },
      });
      //Open bottom graph
      // this.$store.commit('changeTrendPopupStatus', {
      //   dimotTrend: true,
      //   trend: 123,
      //   unitId: 456,
      // });
    },
  },
  mounted() {
    console.log(this.items);
  },
};
</script>
<style lang="scss" scoped>
.stats-group-wrapper {
  width: 50vw;
  //border: 2px solid red;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 15px;
}
.group-title {
  width: 15%;
  height: 5rem;
  padding: 0.5rem;
  background-color: #051724;
  border-radius: 23px;
  margin: 0.5rem;
  color: white;
  font-size: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stats-cards-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
