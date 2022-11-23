<template>
  <div class="stats-group-card-wrapper">
    <div class="stats-wrapper">
      <div class="stats-load">
        <div class="stats-icon-wrapper">
          <div class="stats-icon">
            <img :src="getBlackWhiteIcon(data.iconName)" />
          </div>
          <p
            class="stats-icon-type stats-title"
            @click="goToPage('ultrasound')"
          >
            {{ group_type }}
          </p>
        </div>
        <div class="load-circle-box">
          <p class="stats-icon-type load">עומס</p>
          <div class="circle-wrapper">
            <vue-circle
              :progress="data.load.percent"
              ref="circle"
              :size="140"
              :reverse="false"
              line-cap="butt"
              :fill="{ color: data.load.color }"
              empty-fill="#042f4c"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="4"
              :animation="{ duration: 2000 }"
              :show-percent="true"
            >
            </vue-circle>
          </div>
        </div>
      </div>
      <div class="stats-main-circles-wrapper hover-card">
        <div @click="goToPage('table')" class="dimot-circle-wrapper">
          <glow-circle-progress-bar
            :percent="data.deciphering.percent"
            :status="4"
            :size="'9.5vw'"
            :color="'#' + '10cccb'"
          />

          <div class="circle-content">
            <p class="circle-content-title">{{ data.deciphering.title }}</p>
            <p class="circle-content-timer">{{ data.deciphering.timer }}</p>
            <p class="circle-content-bottom">{{ data.deciphering.value }}</p>
          </div>
          <div class="circle-title">
            <p>ביצוע</p>
          </div>
        </div>
        <div @click="goToPage('table')" class="dimot-circle-wrapper">
          <glow-circle-progress-bar
            :percent="data.executed.percent"
            :status="1"
            :size="'9.5vw'"
            :color="'#' + '8577d1'"
          />

          <div class="circle-content">
            <p class="circle-content-title">{{ data.executed.title }}</p>
            <p class="circle-content-timer">{{ data.executed.timer }}</p>
            <p class="circle-content-bottom">{{ data.executed.value }}</p>
          </div>
          <div class="circle-title">
            <p>פענוח</p>
          </div>
        </div>
      </div>
      <div @click="goToPage('table')" class="progress-lines-wrapper hover-card">
        <div
          class="progress-content"
          v-for="(chart, index) in data.chart_data"
          :class="chart.clickToTable ? 'highlight-chart-line' : ''"
          :key="index"
          @click.stop.prevent="chart.clickToTable ? goToTransportTable() : null"
        >
          <p class="progress-title">
            {{ chart.title }}
          </p>
          <div class="progressbar">
            <div
              class="bar"
              :style="{
                backgroundColor: chart.percent > 75 ? '#ec5656' : '#10cccb',
                width: chart.percent + '%',
              }"
            ></div>
          </div>
          <p class="progress-value">{{ chart.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    group_type: String,
    data: {},
    unitId: String,
    groupName: String,
    clickToTable: Boolean,
  },
  methods: {
    routerConfig(unit) {
      let config = {
        name: `${this.$route.name}.unit`,
        params: {
          unitId: unit,
        },
      };

      if (unit == 'ultrasound') {
        config['query'] = {
          group: this.group_type,
        };
      } else {
        config['query'] = {
          group:
            this.groupName == 'אשפוז' ? 'hospitalization' : 'emergency_room',
          section: this.group_type.toLowerCase(),
        };
      }

      return config;
    },
    goToPage(unit) {
      this.$router.push(this.routerConfig(unit));
    },
    goToTransportTable() {
      this.$router.push({
        name: `dimot.unit`,
        params: {
          unitId: 'table',
        },
        query: {
          group: 'transport_details',
          section: this.groupName == 'אשפוז' ? 'ishpuz' : 'miun',
          group_type: this.group_type,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.stats-group-card-wrapper {
  width: 100%;
  height: 32vh;
  // border: 2px solid yellow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 15px;
}
.group-title {
  width: 15%;
  height: 15%;
  background-color: #051724;
  border-radius: 23px;
  //   padding: 1rem;
  color: white;
  font-size: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.stats-wrapper {
  height: 100%;
  width: 100%;
  // border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.stats-load {
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.stats-icon-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  height: 20%;
  padding-right: 10px;
}
.stats-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 20px;
}
.stats-title {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 11px rgba(252, 252, 252, 0.322);
  }
}
.stats-icon-type {
  font-size: 1.2vw;
  color: #dae8fc;
}
.load-circle-box {
  background-color: #051724;
  padding: 10px 10px 20px 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1;
}
.load {
  align-self: flex-start;
  padding-right: 10px;
}
.circle-wrapper {
  color: white;
}
.stats-main-circles-wrapper {
  background-color: #051724;
  width: 42%;
  height: 100%;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.hover-card {
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: lighten($color: #051724, $amount: 10%);
  }
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
.circle-content-title {
  color: #69747c;
  font-size: 1.2rem;
}
.circle-content-timer {
  color: #69747c;
  font-size: 1.7rem;
  font-weight: bold;
}
.circle-content-bottom {
  color: #dae8fc;
  font-size: 1.2rem;
  font-weight: bold;
}
.circle-title {
  color: white;
  font-size: 1.4rem;
}
.progress-lines-wrapper {
  width: 35%;
  height: 100%;
  background-color: #042941;
  border-radius: 4px;
  border: solid 1px #023e58;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.progress-content {
  width: 90%;
  //max-width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.progress-title {
  color: #dae8fc;
  font-size: 1.1rem;
  min-width: 10%;
  margin-left: 1rem;
}
.progressbar {
  height: 5px;
  border-radius: 30px;
  background-color: #2f4f67;
  position: relative;
  overflow: hidden;
  // width: 60%;
  // max-width: 65%;
  flex: 1;
  margin-right: auto;
  .bar {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 0.8s ease-in-out;
  }
}
.progress-value {
  color: #dae8fc;
  font-size: 1rem;
  margin-right: 1rem;
  min-width: 10%;
}
.highlight-chart-line {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 11px rgba(252, 252, 252, 0.322);
  }
}
</style>
