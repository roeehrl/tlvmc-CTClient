<template>
  <div class="circle-progress-wrapper">
    <div class="circle-progress-box">
      <div class="title smaller-text">
        <p>{{ title }}</p>
      </div>
      <div class="dimot-circle-wrapper">
        <glow-circle-progress-bar
          :percent="circle.percent"
          :status="circle.status"
          :size="circle.size"
          :color="circle.color"
        />
        <div class="circle-content">
          <p class="circle-content-timer">{{ circle.timer }}</p>
          <p class="circle-content-title">{{ circle.title }}</p>
          <p class="circle-content-bottom">{{ circle.bottom }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    circle: Object,
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
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
.circle-progress-wrapper {
  height: 100%;
  //width: 20%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.circle-progress-box {
  height: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //flex: 1;
  width: 100%;
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-left: 0.5vw;
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
  width: 80%;
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
</style>
