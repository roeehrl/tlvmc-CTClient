<template>
  <div class="multiple-circle-progress">
    <div class="icon-name smaller-text">
      <img class="icon" :src="getBlackWhiteIcon(iconName)" />
      <p>שינוע</p>
    </div>
    <div class="circles-wrapper">
      <div
        class="dimot-circle-wrapper"
        :key="index"
        v-for="(value, index) in circles_data"
      >
        <glow-circle-progress-bar
          :percent="value.circle.percentage"
          :status="value.circle.status"
          :size="value.circle.size"
          :color="value.circle.color"
        />

        <div class="circle-content">
          <p class="circle-content-timer">{{ value.circle_content.timer }}</p>
          <p class="circle-content-title">{{ value.circle_content.title }}</p>
          <p class="circle-content-bottom">{{ value.circle_content.bottom }}</p>
        </div>
        <div class="circle-title">
          <p>{{ value.circle.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    circles_data: Array,
    iconName: String,
  },

  computed: {},
};
</script>
<style lang="scss" scoped>
.multiple-circle-progress {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-left: 0.5vw;
  height: 100%;
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
.circles-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  width: 80%;
  height: 55%;
}
.dimot-circle-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
</style>
