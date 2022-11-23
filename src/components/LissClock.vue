<template>
  <div class="liss-clock">
    <p class="clock-header">
      <span class="icon" v-html="$icon(icon)"></span>
      <span class="text">{{ data.cardTitle }}</span>
    </p>

    <div class="row">
      <div class="col gauge">
        <div class="gauge-holder">
          <vue-circle
            :progress="percentage"
            ref="circle"
            :size="148"
            :reverse="false"
            line-cap="butt"
            :fill="color"
            empty-fill="#022236"
            :animation-start-value="0.0"
            :start-angle="-(Math.PI / 2)"
            insert-mode="append"
            :thickness="5"
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
  </div>
</template>

<script>
export default {
  name: "liss-clock",

  props: {
    data: Object,
    index: Number,
  },

  watch: {
    data() {
      if (!this.$refs.circle) {
        return;
      }

      this.$refs.circle.updateProgress(this.percentage);
    },
  },

  data() {
    return {};
  },

  methods: {},

  computed: {
    icon() {
      switch (this.index) {
        case 0: {
          return "woman";
        }
        case 1: {
          return "birth";
        }
        case 2: {
          return "birth-bed";
        }
      }
    },
    color() {
      return {
        color: this.data.color || "#10cccb",
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
        title: this.data.time || "",
        subtitle: this.data.timeText || "",
      };
    },

    percentage() {
      return (this.data.percentage || 0) * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.liss-clock {
}

.clock-header {
  color: #dae8fc;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.27px;
  line-height: 21px;
  display: flex;
  align-items: center;

  .icon {
    display: block;
    height: 35px;
    width: 35px;
    margin-left: 9px;
  }
}

.row {
  display: flex;
  align-items: center;
}

.gauge-holder {
  position: relative;
  padding: 23px;
  margin-left: 14px;

  .label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    .number {
      display: block;
      color: #ecdafc;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 0.44px;
    }

    .text {
      display: block;
      opacity: 0.49;
      color: #ecdafc;
      font-size: 17px;
      letter-spacing: 0.23px;
    }
  }
}

.description {
  text-align: center;
  flex-grow: 1;

  .subtitle {
    color: #c6d9f5;
    font-size: 17.28px;
    letter-spacing: -0.22px;
  }

  .title {
    color: #ecdafc;
    font-size: 28.8px;
    font-weight: bold;
    letter-spacing: -0.37px;
  }
}
</style>
