<template>
  <div class="app-operation-clock">
    <svg
      class="progress"
      :width="size"
      :height="size"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="progress-mask">
          <!-- <circle
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-dasharray="0, 3.8"
            class="progress__value"
            cx="60"
            cy="60"
            r="54"
          /> -->
        </mask>
        <filter id="blur-filter" x="-2" y="-2" width="180" height="180">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>

      <circle
        fill="transparent"
        stroke="#04304e"
        transform="scale(0.85)"
        transform-origin="50% 50%"
        stroke-width="5"
        cx="60"
        cy="60"
        r="54"
      />
      <circle
        class="main-circle"
        ref="progress_value"
        fill="transparent"
        :stroke="getColor"
        transform="scale(0.85)"
        transform-origin="50% 50%"
        stroke-width="5"
        cx="60"
        cy="60"
        r="54"
      />

      <circle
        class="static__circle"
        ref="progress_value2"
        v-if="active"
        fill="transparent"
        :stroke="getColor"
        transform="scale(0.85)"
        transform-origin="50% 50%"
        stroke-width="5"
        cx="60"
        cy="60"
        r="54"
      />

      <!-- <circle
        class="progress__meter"
        mask="url(#progress-mask)"
        cx="60"
        cy="60"
        r="54"
      /> -->

      <!-- <circle
        v-if="active && status === statuses.ACTIVE"
        mask="url(#progress-mask)"
        ref="progress_value"
        class="progress__value"
        cx="60"
        cy="60"
        r="54"
      /> -->
    </svg>
  </div>
</template>

<script>
import { operationStatuses } from '../main';

export default {
  props: {
    color: {
      type: String,
      default: '#10cccb',
    },
    status: {
      type: String | Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 50,
    },
    operation: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: Number,
      default: 190,
    },
  },
  data() {
    return {
      statuses: operationStatuses,
      RADIUS: 54,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateClock();
    });
  },
  watch: {
    percent() {
      this.calculateClock();
    },
  },
  computed: {
    getColor() {
      return this.active ? this.color : '#022236';
    },
    active() {
      return this.status != this.statuses.NOT_IN_USE;
    },
    CIRCUMFERENCE() {
      return 2 * Math.PI * this.RADIUS;
    },
  },
  methods: {
    progress(value) {
      const progressValue = this.$refs['progress_value'];
      const progressValue2 = this.$refs['progress_value2'];

      const progress = value / 100;
      const dashoffset = this.CIRCUMFERENCE * (1 - progress);

      progressValue.style.strokeDashoffset = dashoffset;
      progressValue2.style.strokeDashoffset = dashoffset;
    },
    calculateClock() {
      const progressValue = this.$refs['progress_value'];
      const progressValue2 = this.$refs['progress_value2'];
      if (!progressValue) {
        return;
      }

      progressValue.style.strokeDasharray = this.CIRCUMFERENCE;
      progressValue2.style.strokeDasharray = this.CIRCUMFERENCE;

      this.progress(this.percent);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-operation-clock {
  /*padding: 50px;*/
  display: flex;
  justify-content: center;
  .progress {
    transform: rotate(-90deg);
  }

  .static__circle {
    filter: url(#blur-filter);
  }

  .progress__meter,
  .progress__value {
    fill: none;
  }

  .progress__meter {
    stroke: rgba(2, 34, 54, 0.6);
    stroke-width: 3px;
  }

  .progress__value {
    stroke-width: 3px;
    stroke: #9bafb8;
    transition: all 0.2s ease-in-out;
  }
  // .main-circle{
  //   stroke-dashoffset: 135.717;
  //   stroke-dasharray: 339.292;
  // }
}
</style>
