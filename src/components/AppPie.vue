<template>
  <div class="app-pie">
    <la-polar
      v-if="width"
      :data="values"
      :width="width"
      autoresize
      fillContainer
      :colors="colors"
    >
      <la-pie prop="value" :radius="radius" animated> </la-pie>
    </la-polar>

    <div class="label">
      <div class="number">{{ number }}</div>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-pie',

  props: {
    data: Array,
    number: Number,
    text: String,
    radius: {
      type: Array,
      default: () => [58, 42],
    },
  },

  data() {
    return {
      width: null,
    };
  },

  created() {
    this.$nextTick(() => {
      this.width = this.$el.clientWidth;
    });
  },

  computed: {
    colors() {
      return this.data.map(function(item) {
        return item.color;
      });
    },

    values() {
      return this.data.map(function(item) {
        return {
          value: item.value,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-pie {
  position: relative;
  direction: ltr;
  width: 100%;

  @media only screen and (max-width: 1200px) {
    @supports (-webkit-appearance:none) and (stroke-color:transparent) {
      g {
        transform: translate(35%, 35%) !important;
      }
    }
  }

  ::v-deep path {
    stroke: transparent;
    stroke-width: 0;
  }
}

.label {
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.number {
  font-size: 46.2px;
  font-weight: bold;
  letter-spacing: 0.63px;
  color: #dae8fc;
}

.text {
  opacity: 0.6;
  font-size: 16px;
  letter-spacing: 0.22px;
  color: #dae8fc;
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .label {
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .number {
    font-size: 46.2px;
    font-weight: bold;
    letter-spacing: 0.63px;
    color: #dae8fc;
  }

  .text {
    opacity: 0.6;
    font-size: 16px;
    letter-spacing: 0.22px;
    color: #dae8fc;
  }
}
</style>
