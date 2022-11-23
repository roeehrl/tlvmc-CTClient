<template>
  <div
    class="protocol-waiting-wrapper"
    @click="clickToTable ? goToTable() : null"
    :class="clickToTable ? 'hover-item' : null"
  >
    <div class="info-box protocol-waiting">
      <p class="info-box-title">{{ values_title }}</p>
      <div class="protocol-bottom">
        <div
          class="protocol-bottom-info"
          :key="index"
          v-for="(value, index) in values"
        >
          <p class="protocol-bottom-info-value">{{ value.value }}</p>
          <p class="protocol-bottom-info-title">{{ value.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    values_title: String,
    values: Array,
    clickToTable: Boolean,
  },
  methods: {
    goToTable() {
      this.$router.push({
        name: `dimot.unit`,
        params: {
          unitId: 'table',
        },
        query: {
          group: 'ambulatory',
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.protocol-waiting-wrapper {
  display: flex;
  height: 100%;
  margin-left: 0.5vw;
  // width: 10%;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}
.icon-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    color: #dae8fc;
    margin-right: 1rem;
    font-size: 1.3vw;
  }
}
.smaller-text {
  p {
    font-size: 1.2vw;
  }
}
.icon {
  height: 2.2vw;
}
.info-box {
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 1rem;
  margin-left: 0.5vw;
}
.protocol-waiting {
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.info-box-title {
  color: #dae8fc;
  font-size: 1.1vw;
}
.protocol-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.protocol-bottom-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.protocol-bottom-info-value {
  color: #d8e7ff;
  font-size: 1.3vw;
}
.protocol-bottom-info-title {
  color: #6f8297;
  font-size: 1vw;
}
.hover-item {
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: lighten($color: #051724, $amount: 10%);
  }
}
</style>
