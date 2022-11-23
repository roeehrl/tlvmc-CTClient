<template>
  <app-emergency-card
    :header="header"
    icon-prefix="indicator_"
    class="er-release-card"
  >
    <div class="release-card-content">
      <div class="text">
        <div class="title">{{ title }}</div>
        <div class="time">{{ time }}</div>
      </div>

      <div class="gauge">
        <vue-circle
          :progress="percentage"
          ref="circle"
          :size="gaugeSize.size"
          :reverse="false"
          line-cap="butt"
          :fill="color"
          empty-fill="#022236"
          :animation-start-value="0.0"
          :start-angle="-(Math.PI / 2)"
          insert-mode="append"
          :thickness="6"
          :animation="{ duration: 2000 }"
          :show-percent="false"
        >
        </vue-circle>

        <div class="label">
          <div class="number">{{ gaugeLabel.number }}</div>
          <div class="text">{{ gaugeLabel.text }}</div>
        </div>
      </div>
    </div>
  </app-emergency-card>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';

export default {
  name: 'er-release-card',

  props: {
    data: Object,
    header: {
      type: Object,
      default: () => {
        return {
          icon: 'indicator_awaiting_release',
          title: 'ממתינים לשחרור',
        };
      },
    },
  },

  data() {
    return {};
  },

  computed: {
    title() {
      return (this.data || {}).text;
    },
    time() {
      return (this.data || {}).time;
    },
    percentage() {
      return ((this.data || {}).percentage || 0) * 100;
    },
    color() {
      return {
        color: (this.data || {}).color || '#10cccb',
      };
    },
    gaugeLabel() {
      return {
        number: (this.data || {}).value || 35,
        text: 'מטופלים',
      };
    },
    gaugeSize() {
      if (window.innerWidth === 2160) {
        return {
          size: 260,
        };
      }
      if (window.innerWidth === 2000) {
        return {
          size: 260,
        };
      }
      return {
        size: 137,
      };
    },
  },

  components: { AppEmergencyCard },
};
</script>

<style lang="scss" scoped>
.release-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.release-card-content > .text {
  text-align: center;
  margin-bottom: 40px;

  .title {
    opacity: 0.56;
    font-size: 23px;
    letter-spacing: -0.3px;
    color: #c6d9f5;
  }

  .time {
    font-size: 35px;
    font-weight: bold;
    letter-spacing: -0.45px;
    color: #dae8fc;
  }
}

.gauge {
  position: relative;
  display: inline-flex;

  .label {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .number {
      font-size: 37.6px;
      font-weight: bold;
      letter-spacing: -0.48px;
      color: #dae8fc;
    }

    .text {
      opacity: 0.56;
      font-size: 14.4px;
      letter-spacing: -0.19px;
      color: #c6d9f5;
    }
  }
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .release-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .release-card-content > .text {
    text-align: center;
    margin-bottom: 40px;

    .title {
      opacity: 0.56;
      font-size: 40px;
      letter-spacing: -0.3px;
      color: #c6d9f5;
    }

    .time {
      font-size: 35px;
      font-weight: bold;
      letter-spacing: -0.45px;
      color: #dae8fc;
    }
  }

  .gauge {
    position: relative;
    display: inline-flex;

    .label {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .number {
        font-size: 40.6px;
        font-weight: bold;
        letter-spacing: -0.48px;
        color: #dae8fc;
      }

      .text {
        opacity: 0.56;
        font-size: 35.4px;
        letter-spacing: -0.19px;
        color: #c6d9f5;
      }
    }
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .release-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .release-card-content > .text {
    text-align: center;
    margin-bottom: 40px;

    .title {
      opacity: 0.56;
      font-size: 50px;
      letter-spacing: -0.3px;
      color: #c6d9f5;
    }

    .time {
      font-size: 35px;
      font-weight: bold;
      letter-spacing: -0.45px;
      color: #dae8fc;
    }
  }

  .gauge {
    position: relative;
    display: inline-flex;

    .label {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .number {
        font-size: 47.6px;
        font-weight: bold;
        letter-spacing: -0.48px;
        color: #dae8fc;
      }

      .text {
        opacity: 0.56;
        font-size: 45.4px;
        letter-spacing: -0.19px;
        color: #c6d9f5;
      }
    }
  }
}
</style>
