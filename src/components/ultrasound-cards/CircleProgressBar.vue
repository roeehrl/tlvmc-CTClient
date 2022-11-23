<template>
  <div
    class="circle-progress-box"
    @click="clickToTable ? goToTable() : null"
    :class="clickToTable ? 'hover-item' : null"
  >
    <div class="icon-name smaller-text">
      <img class="icon" :src="getBlackWhiteIcon(iconName)" />
      <p v-on:click="testFunc">{{ title }}</p>
    </div>
    <div class="dimot-circle-wrapper">
      <glow-circle-progress-bar
        :percent="circle.percent"
        :status="circle.status"
        :size="circle.size"
        :color="circle.color"
      />
      <div class="circle-content-no-title">
        <p class="circle-content-timer">{{ circle.timer }}</p>
        <p class="circle-content-title">{{ circle.title }}</p>
        <p class="circle-content-bottom">{{ circle.bottom }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    circle: Object,
    iconName: String,
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
          group: 'secretary',
        },
      });
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
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
.circle-progress-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-left: 0.5vw;
  height: 100%;
}
.dimot-circle-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.circle-content {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 60%;
  height: 55%;
}
.circle-content-no-title {
  @extend .circle-content;
  top: 50%;
}
.circle-content-title {
  color: #69747c;
  font-size: 0.7vw;
  //font-size: 1.2rem;
}
.circle-content-timer {
  color: #69747c;
  font-size: 1.2vw;
  //font-size: 1.7rem;
  font-weight: bold;
}
.circle-content-bottom {
  color: #dae8fc;
  font-size: 12px;
  //font-size: 1.2rem;
  font-weight: bold;
}
.circle-title {
  color: #c6d9f5;
  font-size: 1.4rem;
  margin-top: -5px;
  p {
    font-size: 1vw;
  }
}
.hover-item {
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: lighten($color: #051724, $amount: 10%);
  }
}
</style>
