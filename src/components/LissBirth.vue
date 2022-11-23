<template>
  <div class="liss-birth">
    <p class="header">
      <span class="icon" v-html="$icon('birth-bed')"></span>
      <span class="text">{{ data.title }}</span>
    </p>

    <div class="rooms">
      <div class="gauge-holder">
        <vue-circle
          :progress="percentage"
          ref="circle"
          :size="245"
          :reverse="false"
          line-cap="butt"
          :fill="color"
          empty-fill="#8577D1"
          :animation-start-value="0.0"
          :start-angle="-(Math.PI / 2)"
          insert-mode="append"
          :thickness="10"
          :animation="{ duration: 2000 }"
          :show-percent="false"
        >
        </vue-circle>

        <div class="label">
          <div class="number">{{ gaugeLabel.number }}</div>
          <div class="text">{{ gaugeLabel.text }}</div>
        </div>
      </div>

      <div class="legend">
        <div class="item">
          <div class="dot" :style="{ 'background-color': color.color }"></div>
          <div class="text">{{ data.subtext }}</div>
        </div>
      </div>
    </div>

    <div class="status">
      <p class="title">סטטוס לידה</p>
      <div class="bars">
        <div class="bar" v-for="status in statuses">
          <div class="bar-progress">
            <div
              class="bar-fill"
              :style="{
                height: `${status.percentage}%`,
                backgroundColor: status.color,
              }"
            >
              <div class="number">{{ status.total }}</div>
            </div>
          </div>
          <div class="bar-text">{{ status.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "liss-birth",

  props: {
    data: Object,
  },

  data() {
    return {
      animationReady: false,
    };
  },

  mounted() {
    setTimeout(() => {
      this.animationReady = true;
    }, 150);
  },

  watch: {
    data() {
      if (!this.$refs.circle) {
        return;
      }

      this.$refs.circle.updateProgress(this.percentage);
    },
  },

  methods: {},

  computed: {
    color() {
      return {
        color: this.data.color || "#10cccb",
      };
    },

    gaugeLabel() {
      return {
        number: this.data.activeRooms || 0,
        text: this.data.activeRoomstext,
      };
    },

    percentage() {
      return (this.data.activeroomsPercentage || 0) * 100;
    },

    statuses() {
      return (this.data.birthStatuses || []).map((status) => ({
        total: status.total,
        color: this.animationReady ? status.color : "rgba(255, 255, 255, 0)",
        text: status.text,
        percentage: this.animationReady ? (status.total / 10) * 100 : 0,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.liss-birth {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  align-items: center;
  color: #dae8fc;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.27px;
  padding: 24px 26px;
  flex-grow: 0;

  .icon {
    width: 35px;
    height: 35px;
    margin-left: 9px;
  }
}

.rooms {
  padding: 50px 26px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;

  .legend {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    .item {
      display: flex;
      align-items: center;

      .dot {
        height: 8px;
        width: 8px;
        border-radius: 100%;
        margin-left: 7px;
      }

      .text {
        opacity: 0.6;
        color: #ecdafc;
        font-size: 19.2px;
        letter-spacing: 0.26px;
      }
    }
  }
}

.gauge-holder {
  position: relative;

  .label {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;

    .number {
      font-size: 73.76px;
      font-weight: bold;
      letter-spacing: 1.01px;
    }

    .text {
      font-size: 24.96px;
      letter-spacing: 0.34px;
    }
  }
}

.status {
  padding: 0 26px 47px;
  flex-grow: 0;

  .title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.27px;
    color: #dae8fc;
    margin-bottom: 58px;
  }
}

.bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 240px;
  flex-grow: 1;

  .bar {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;

    .bar-text {
      opacity: 0.6;
      font-size: 19.2px;
      letter-spacing: 0.26px;
      text-align: center;
      color: #ecdafc;
      margin-top: 13px;
    }
  }

  .bar-progress {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }

  .bar-fill {
    width: 58px;
    min-height: 40px;
    transition: all 0.8s ease-in-out;

    .number {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 0.41px;
      text-align: center;
      color: #ffffff;
      padding: 5px 0 0;
    }
  }
}
</style>
