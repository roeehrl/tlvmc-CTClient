<template>
  <app-emergency-card
    class="er-half-circle-card"
    :class="{ 'is-big': isBig }"
    icon-prefix="indicator_"
    :header="header"
  >
    <div class="row">
      <div class="col gauge">
        <div class="gauge-holder">
          <vue-circle
            :progress="percentage"
            ref="circle"
            :size="isBig ? gaugeSize.size1 : gaugeSize.size2"
            :reverse="false"
            line-cap="butt"
            :fill="color"
            empty-fill="#022236"
            :animation-start-value="0.0"
            :start-angle="-(Math.PI / 2)"
            insert-mode="append"
            :thickness="4"
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

      <div class="col description">
        <div class="subtitle">
          {{ description.subtitle }}
        </div>

        <div class="title">
          {{ description.title }}
        </div>
      </div>
    </div>
  </app-emergency-card>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';

export default {
  name: 'er-half-circle-card',

  props: {
    data: Object,
    header: Object,
    isBig: Boolean,
  },

  data() {
    return {};
  },

  watch: {
    data() {
      if (!this.$refs.circle) {
        return;
      }

      this.$refs.circle.updateProgress(this.percentage);
    },
  },

  computed: {
    color() {
      return {
        color: this.data.color || '#10cccb',
      };
    },

    gaugeLabel() {
      return {
        number: this.data.value || 0,
        text: this.data.text,
      };
    },

    description() {
      return {
        title: this.data.time || '',
        subtitle: this.data.timeText || '',
      };
    },

    percentage() {
      return (this.data.percentage || 0) * 100;
    },

    gaugeSize() {
      if (window.innerWidth >= 2160) {
        return {
          size1: 260,
          size2: 260,
        };
      }
      if (window.innerWidth === 2000) {
        return {
          size1: 160,
          size2: 160,
        };
      }
      return {
        size1: 120,
        size2: 97,
      };
    },
  },

  components: { AppEmergencyCard },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}

.gauge {
  flex-grow: 0;
  flex-shrink: 0;
}

.gauge-holder {
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
      font-size: 24.1px;
      font-weight: bold;
      letter-spacing: -0.31px;
      color: #dae8fc;
    }

    .text {
      opacity: 0.56;
      font-size: 12.6px;
      letter-spacing: -0.16px;
      color: #c6d9f5;
    }
  }
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 1;

  .subtitle {
    opacity: 0.56;
    font-size: 17.3px;
    letter-spacing: -0.22px;
    color: #c6d9f5;
  }

  .title {
    font-size: 28.8px;
    font-weight: bold;
    letter-spacing: -0.37px;
    color: #dae8fc;
  }
}

.is-big {
  .col.gauge {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .gauge-holder {
    position: relative;
    display: inline-flex;

    .label {
      .number {
        font-size: 30px;
      }

      .text {
        font-size: 18px;
      }
    }
  }
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .gauge-holder {
    .label {
      .number {
        font-size: 40px;
      }
      .text {
        font-size: 35px;
      }
    }
  }
  .is-big {
    .col.gauge {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .gauge-holder {
      position: relative;
      display: inline-flex;

      .label {
        .number {
          font-size: 40px;
        }

        .text {
          font-size: 35px;
        }
      }
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;

    .subtitle {
      opacity: 0.56;
      font-size: 30.3px;
      letter-spacing: -0.22px;
      color: #c6d9f5;
    }

    .title {
      font-size: 28.8px;
      font-weight: bold;
      letter-spacing: -0.37px;
      color: #dae8fc;
    }
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .gauge-holder {
    .label {
      .number {
        font-size: 50px;
      }
      .text {
        font-size: 50px;
      }
    }
  }
  .is-big {
    .col.gauge {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .gauge-holder {
      position: relative;
      display: inline-flex;

      .label {
        .number {
          font-size: 50px;
        }

        .text {
          font-size: 50px;
        }
      }
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;

    .subtitle {
      opacity: 0.56;
      font-size: 35.3px;
      letter-spacing: -0.22px;
      color: #c6d9f5;
    }

    .title {
      font-size: 40.8px;
      font-weight: bold;
      letter-spacing: -0.37px;
      color: #dae8fc;
    }
  }
}
</style>
