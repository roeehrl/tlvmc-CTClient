<template>
  <td @click="onCellClick" :class="cellCssClass">
    <div
      class="column-body"
      :class="{
        dinamic: type === $screenTypes.TYPE_RADIATIONS_DOCTOR_PATIENTS,
        invite: type === $screenTypes.TYPE_RADIATIONS_FUTURE_INVITE,
      }"
    >
      <div :class="valueCssClass">
        <span v-if="!hasTick">{{ displayText }}</span>
        <span class="check" v-if="hasTick && showTick" v-html="$icon('check')">
        </span>
        <span v-else-if="hasTick && !showTick">-</span>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'app-table-cell',
  props: {
    text: [String, Number],
    kpi: [String, Number],
    index: Number,
    isTransports: Boolean,
    isTransportsUnit: Boolean,
    direction: [String, Number],
    link: [String],
    isSmall: Boolean,
    isSmaller: Boolean,
    isBig: Boolean,
    type: Number,
    isDinamic: Boolean,
    isInvite: Boolean,
  },

  methods: {
    onCellClick() {
      if (this.link) {
        const win = window.open(this.link, '_blank');
        win.focus();

        return;
      }

      this.$emit('click');
    },
  },

  computed: {
    showTick() {
      if (this.isTransports) {
        switch (this.index) {
          case 5: {
            if (this.displayText == 1) {
              return true;
            }
          }
          default: {
            return false;
          }
        }
      }

      if (this.isTransportsUnit) {
        switch (this.index) {
          // case 3: {
          //   if (this.displayText == 1) {
          //     return true;
          //   }
          // }
          default: {
            return false;
          }
        }
      }

      return false;
    },
    hasTick() {
      if (this.isTransports) {
        switch (this.index) {
          case 5: {
            return true;
          }
          default: {
            return false;
          }
        }
      }

      if (this.isTransportsUnit) {
        switch (this.index) {
          // case 3: {
          //   return true;
          // }
          default: {
            return false;
          }
        }
      }

      return false;
    },
    cellCssClass() {
      return [
        'column',
        {
          'is-small': this.isSmall,
          'is-dinamic': this.isDinamic,
          'is-invite': this.isInvite,
          'is-smaller': this.isSmaller,
          'is-big': this.isBig,
        },
      ];
    },

    valueCssClass() {
      return [
        {
          warn: this.kpi === 2,
          light: this.kpi === 1,
          'has-color': this.kpi > 0,
          'arrow-up': this.direction >= 1,
          'arrow-down': this.direction < 0,
          alignTextToRight: this.index === 11 || this.index === 12,
        },
        `kpi-${this.kpi}`,
        'value',
      ];
    },

    displayText() {
      const text = ((this.text || '') + '').toLowerCase();

      if (this.type === this.$screenTypes.TYPE_URGENT_TRANSPORTS) {
        if (this.index == 6 && !text.length) {
          return '-';
        }

        if (this.index == 8 || this.index == 9) {
          if (text == 0) {
            return '';
          }
        }
      }

      if (this.type === this.$screenTypes.TYPE_CHANGES_TRANSPORTS) {
        if (
          (this.index == 4 && !text.length) ||
          (this.index == 3 && !text.length)
        ) {
          return '-';
        }
      }

      if (text === 'true') {
        return 'כן';
      }

      if (text === 'false') {
        return 'לא';
      }

      return this.text;
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  text-align: center;
  vertical-align: middle;
  line-height: 0.8;

  &.is-big {
    .column-body {
      &.dinamic {
        .value {
          span {
            font-size: 22px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.3px;
            color: #ffffff;
          }
        }
      }
      &.invite {
        .value {
          span {
            font-size: 20px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.27px;
            text-align: center;
            color: #d8e7ff;
          }
        }
      }
    }
  }
  &.trend-column {
    cursor: pointer;
  }

  .value {
    font-size: 43px;
    letter-spacing: 0.59px;

    span {
      display: inline-block;
      padding: 8px 10px;
      border-radius: 8px;
    }

    &.arrow-down,
    &.arrow-up {
      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &::before {
          content: '';
          display: block;
          width: 12px;
          height: 6px;
          background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' viewBox='0 0 12 6'%3E%3Cpath fill='%23fff' d='M.9 5.85c-.21 0-.42-.09-.57-.27-.27-.33-.21-.78.09-1.05l5.1-4.2c.27-.24.69-.24.96 0l5.1 4.2c.33.27.36.75.09 1.05-.27.3-.75.36-1.05.09L6 1.86 1.38 5.67c-.15.12-.3.18-.48.18z'/%3E%3C/svg%3E%0A");
          background-repeat: no-repeat;
          background-position: center center;
          margin-left: 5px;
        }
      }
    }

    &.arrow-down span::before {
      transform: rotate(180deg);
    }
  }

  .percent {
    font-size: 43px;
    letter-spacing: 0.59px;
  }

  &.is-small {
    .column-body {
      .value {
        font-weight: 100;
        &.has-color {
          span {
            padding: 8px 10px;
            border-radius: 8px;
          }
        }
      }
    }

    .value {
      font-size: 20px;
      letter-spacing: 0.34px;
    }

    .percent {
      font-size: 25px;
      letter-spacing: 0.34px;
    }
  }
  &.is-smaller {
    .column-body {
      .value {
        &.has-color {
          span {
            padding: 8px 10px;
            border-radius: 8px;
          }
        }
      }
    }

    .value {
      font-size: 18px;
      letter-spacing: 0.34px;
    }

    .percent {
      font-size: 20px;
      letter-spacing: 0.34px;
    }
  }
}
.warn {
  span {
    background-color: #ec5656;
  }
}

.light {
  span {
    background-color: #ecae56;
  }
}

.alignTextToRight {
  text-align: right;
}
</style>
