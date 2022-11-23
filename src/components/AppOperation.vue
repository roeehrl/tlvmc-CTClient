<template>
  <div class="app-operation wide">
    <div class="app-operation-inner">
      <div class="operation-head">
        <div v-if="$slots.num" class="operation-num">
          <slot name="num" :or="operation"></slot>
        </div>
        <div v-if="showUnitName && operation.OUnitName" class="operation-type">
          {{ operation.OUnitName }}
        </div>
        <div v-if="showUsage" class="operation-usage">
          {{ operation.ORoomUsage }}
        </div>
      </div>
      <div class="operation-body">
        <div
          v-if="operation.ORoomData && operation.ORoomData.length"
          class="operation-data"
        >
          <div v-for="data in operation.ORoomData" class="operation-data-item">
            <div class="data-value">{{ data.Value }}</div>
            <div class="data-text">{{ data.Text }}</div>
          </div>
        </div>
        <div class="operation-time">
          <div class="operation-circle">
            <app-operation-clock
              :percent="operationPercentage"
              :status="operation.ORoomStatus"
              :size="size"
              :color="'#' + operation.ORoomColor"
            >
            </app-operation-clock>
            <div class="operation-circle-body">
              <div
                v-if="operation.ORoomDelay && inOperation"
                class="operation-delay"
                v-html="$icon('clock')"
              ></div>
              <div class="operation-timer">{{ operationTime }}</div>
              <div
                v-if="operationCutTime && inOperation"
                class="operation-timer small"
              >
                {{ operationCutTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { operationStatuses } from '../main';

export default {
  name: 'app-operation',

  props: {
    operation: {
      type: Object,
      default: () => ({}),
    },
    showUnitName: {
      type: Boolean,
      default: true,
    },
    showUsage: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 190,
    },
  },

  data() {
    return {
      operationTimer: null,
      operationCutTime: null,
      operationTime: null,
      operationPercentage: 0,
      statuses: operationStatuses,
    };
  },

  created() {
    this.startOperationTimer();
  },

  destroyed() {
    clearInterval(this.operationTimer);
  },

  computed: {
    inOperation() {
      return this.operation.ORoomStatus == this.statuses.ACTIVE;
    },
  },

  methods: {
    startOperationTimer() {
      if (this.operationTimer) {
        clearInterval(this.operationTimer);
      }

      const startTime = moment(this.operation.ORoomTime);
      const cutTime = this.operation.ORoomCutTime
        ? moment(this.operation.ORoomCutTime)
        : null;

      this.calculateTime(startTime, cutTime);
      this.calculatePercentage();

      this.operationTimer = setInterval(() => {
        const startTime = moment(this.operation.ORoomTime);
        const cutTime = this.operation.ORoomCutTime
          ? moment(this.operation.ORoomCutTime)
          : null;

        this.calculateTime(startTime, cutTime);
        this.calculatePercentage();
      }, 1000);
    },
    calculatePercentage() {
      const startTime = moment(this.operation.ORoomTime);
      const endTime = moment(this.operation.ORoomFinishTime);
      const currentTime = moment();

      // Calculate percentage
      const totalSeconds = endTime.diff(startTime, 'seconds');
      const passedSeconds = currentTime.diff(startTime, 'seconds');
      const percentage = Math.round((passedSeconds * 100) / totalSeconds);

      this.operationPercentage = percentage < 100 ? percentage : 100;
    },

    calculateTime(startTime, cutTime) {
      const currentTime = moment();

      if (this.operation.ORoomStatus === this.statuses.NOT_IN_USE) {
        this.operationTime = '00:00';
        this.operationCutTime = null;

        return;
      }

      const operationEndTime = moment(this.operation.ORoomFinishTime);
      const totalSeconds = operationEndTime.diff(startTime, 'seconds');
      const passedSeconds = currentTime.diff(startTime, 'seconds');

      this.operationTime =
        !this.inOperation || passedSeconds < totalSeconds
          ? this.diff(currentTime, startTime)
          : this.diff(operationEndTime, startTime);

      if (cutTime && this.inOperation) {
        this.operationCutTime = this.diff(currentTime, cutTime);
      }
    },

    diff(form, to) {
      const duration = moment.duration(form.diff(to));

      const HH = duration
        .hours()
        .toString()
        .padStart(2, '0');
      const mm = duration
        .minutes()
        .toString()
        .padStart(2, '0');
      // const ss = (duration.seconds().toString()).padStart(2, '0');

      return `${HH}:${mm}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-operation {
  color: #fff;
  padding: 0 14px;
  flex: 0 25%;
  margin-bottom: 28px;

  &.wide {
    flex: 0 20%;
  }

  .app-operation-inner {
    border-radius: 4px;
    border: solid 1px #023e58;
    background-color: #042941;
    padding: 15px;

    .operation-head {
      display: flex;
      align-items: center;

      .operation-num {
        font-size: 40px;
        font-weight: bold;
        letter-spacing: 0.55px;
        color: #ffffff;
        height: auto;
        padding: 5px;
        text-align: center;
        border-radius: 7.2px;
        background-color: #022236;
        width: 60px;
      }

      .operation-type {
        font-size: 22px;
        letter-spacing: 0.3px;
        color: #dae8fc;
        margin-right: 15px;
      }

      .operation-usage {
        margin-right: auto;
        font-size: 16px;
        letter-spacing: 0.25px;
        color: rgba(218, 232, 252, 0.6);
      }
    }

    .operation-body {
      display: flex;

      .operation-time {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .operation-circle {
          position: relative;

          .operation-circle-body {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .operation-delay {
              display: block;
            }

            .operation-timer {
              font-size: 35px;
              font-weight: bold;
              letter-spacing: 0.56px;
              color: rgba(255, 255, 255, 0.41);

              &.small {
                font-size: 20px;
              }
            }
          }
        }
      }

      .operation-data {
        display: flex;
        flex-direction: column;
        padding-top: 25px;

        .operation-data-item {
          position: relative;
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          padding-right: 7px;

          &:before {
            position: absolute;
            background-color: #fff;
            width: 1px;
            height: 90%;
            content: '';
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }

          .data-value {
            font-size: 21px;
            letter-spacing: 0.31px;
            color: #ffffff;
          }

          .data-text {
            font-size: 16px;
            letter-spacing: 0.2px;
            color: rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .app-operation {
    color: #fff;
    padding: 0 14px;
    flex: 0 25%;
    margin-bottom: 28px;

    &.wide {
      flex: 0 20%;
    }

    .app-operation-inner {
      border-radius: 4px;
      border: solid 1px #023e58;
      background-color: #042941;
      padding: 15px;
      height: 390px;
      .operation-head {
        .operation-usage {
          margin-right: auto;
          font-size: 25px;
          letter-spacing: 0.25px;
          color: rgba(218, 232, 252, 0.6);
        }
      }
      .operation-body {
        .operation-data {
          .operation-data-item {
            .data-text {
              font-size: 20px;
              letter-spacing: 0.2px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
      }
    }
    .operation-circle {
      bottom: 20px;
    }
  }
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .app-operation {
    color: #fff;
    padding: 0 14px;
    flex: 0 25%;
    margin-bottom: 28px;

    &.wide {
      flex: 0 20%;
    }

    .app-operation-inner {
      border-radius: 4px;
      border: solid 1px #023e58;
      background-color: #042941;
      padding: 15px;
      height: 250px;
      .operation-head {
        .operation-usage {
          margin-right: auto;
          font-size: 25px;
          letter-spacing: 0.25px;
          color: rgba(218, 232, 252, 0.6);
        }
      }
      .operation-body {
        .operation-data {
          .operation-data-item {
            .data-text {
              font-size: 20px;
              letter-spacing: 0.2px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
      }
    }
    .operation-circle {
      bottom: 20px;
    }
  }
}
</style>
