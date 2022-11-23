<template>
  <app-emergency-card :header="header" class="er-operation-timers">
    <div class="sections">
      <div class="section" v-for="section of sections">
        <div class="title">{{ section.title }}</div>

        <div class="time">{{ section.time }}</div>

        <div class="bar">
          <div class="bar-progress" :style="section.progressStyle"></div>
        </div>
      </div>
    </div>
  </app-emergency-card>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';
export default {
  name: 'er-operation-timers',
  components: { AppEmergencyCard },
  props: {
    header: Object,
    data: [Object, Array],
  },

  data() {
    return {};
  },

  computed: {
    sections() {
      return (this.data.data || []).map((section) => {
        return {
          title: section.timeText,
          time: section.time,
          progressStyle: {
            backgroundColor: section.color || '#34a9ff',
            width: (section.percentage || 0) * 100 + '%',
          },
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.emergency-card {
  flex-grow: 0 !important;
}

.sections {
  display: flex;
  height: 100%;
}

.section {
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: relative;
  height: 130px;

  + .section::before {
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    height: 109px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(16, 204, 203, 0.28);
  }
}

.title {
  font-size: 17px;
  line-height: 1.06;
  letter-spacing: 0.23px;
  color: #dae8fc;
  max-width: 100px;
  min-height: 36px;
}

.time {
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -0.32px;
  color: #dae8fc;
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .title {
    font-size: 25px;
    line-height: 1.06;
    letter-spacing: 0.23px;
    color: #dae8fc;
    max-width: 100px;
    min-height: 80px;
  }

  .time {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.32px;
    color: #dae8fc;
  }

  .section {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: relative;
    height: 160px;

    + .section::before {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      height: 109px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(16, 204, 203, 0.28);
    }
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .title {
    font-size: 25px;
    line-height: 1.06;
    letter-spacing: 0.23px;
    color: #dae8fc;
    max-width: 100px;
    min-height: 80px;
  }

  .time {
    font-size: 30px;
    font-weight: 400;
    letter-spacing: -0.32px;
    color: #dae8fc;
  }

  .section {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: relative;
    height: 260px;

    + .section::before {
      content: '';
      position: absolute;
      right: 0;
      width: 1px;
      height: 109px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(16, 204, 203, 0.28);
    }
  }
}

.bar {
  position: relative;
  width: 100%;
  background-color: #022236;
  height: 6px;
  overflow: hidden;
  border-radius: 10px;
  max-width: 120px;

  .bar-progress {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 10px;
    transition: width 1s ease-out;
  }
}
</style>
