<template>
  <div
    v-if="
      currentRoute !== 'transporations' &&
        currentRoute !== 'transporations.unit'
    "
    @click="
      clickToTable
        ? goToTable('secretary')
        : goToUnit(currentRoute === 'tipulnimraz')
    "
    :class="[
      currentRoute,
      currentRoute === 'dimot.unit' ? 'dimot-unit' : '',
      `card-type-${type}`,
      { clickable: unitId },
      'app-card',
      type == 10 ? 'app-card-squeezed' : '',
    ]"
  >
    <div
      class="app-card-inner"
      :class="{
        active: active,
        'is-small': isSmall,
        isTipulnimraz: 'is-tipulnimraz',
        toggleCardTable: toggleCardTable,
      }"
    >
      <div
        class="app-card-item"
        v-if="
          (type === TYPE_ICON && icon) ||
            type === TYPE_PIE ||
            type === TYPE_CIRCLE_PROGRESS ||
            type === TYPE_TIMER_ICON ||
            type === TYPE_TIMER_ICON_TOGETHER
        "
      >
        <template v-if="type === TYPE_ICON || type === TYPE_TIMER_ICON">
          <span class="app-card-icon" v-html="this.$icon(this.icon)"></span>
        </template>
        <template v-else-if="type === TYPE_PIE">
          <div class="app-card-progress">
            <!-- first circle -->
            <vue-circle
              :progress="percentage"
              ref="circle"
              :size="isSmall ? 68 : 88"
              :reverse="false"
              line-cap="line"
              :fill="getColor(percentage, min, max)"
              :empty-fill="emptyFill"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="4"
              :animation="{ duration: 2000 }"
              :show-percent="true"
            >
            </vue-circle>
          </div>
        </template>
        <template v-if="type === TYPE_CIRCLE_PROGRESS">
          <div class="progress-circles-wrapper">
            <div
              class="app-card-progress"
              :key="index"
              v-for="(item, index) in circles"
            >
              <vue-circle
                :progress="item.percentage"
                ref="circle"
                :size="isSmall ? 68 : 88"
                :reverse="false"
                line-cap="butt"
                :fill="item.color ? { color: item.color } : fill"
                :empty-fill="emptyFill"
                :animation-start-value="0.0"
                :start-angle="0"
                insert-mode="append"
                :thickness="4"
                :animation="{ duration: 2000 }"
                :show-percent="true"
              >
                <p class="circle-value">{{ item.value }}</p>
              </vue-circle>
            </div>
            <div @click.stop.prevent="openBottom" class="hours-load">
              <p>עומס בשעות</p>
            </div>
          </div>
        </template>
      </div>

      <div class="app-card-info">
        <template
          v-if="
            type === TYPE_TIMER_ICON_TOGETHER ||
              type === TYPE_ICON_VALUES ||
              type === TYPE_ICON_TITLED_VALUES ||
              (type === TYPE_CIRCLE_PROGRESS && this.icon)
          "
        >
          <span class="app-card-icon" v-html="this.$icon(this.icon)"></span>
        </template>

        <div
          v-if="typeof displayValue === 'string'"
          class="app-card-value"
          v-bind:style="{
            color: getColor(displayValue, min, max),
          }"
        >
          {{ displayValue }}
        </div>
        <div v-if="text" class="app-card-title">
          {{ text }}
        </div>
      </div>

      <div
        class="app-card-timer"
        v-if="
          type === TYPE_TIMER_ICON ||
            type === TYPE_TIMER_ICON_TOGETHER ||
            type === TYPE_ICON_VALUES ||
            type === TYPE_ICON_TITLED_VALUES
        "
      >
        <template
          v-if="
            type != TYPE_TIMER_ICON_TOGETHER &&
              type != TYPE_ICON_VALUES &&
              type != TYPE_ICON_TITLED_VALUES
          "
        >
          <!-- CHANGE COLOR -->
          <div class="app-card-timer-wrap" v-if="values[0]">
            <p
              class="timer-value"
              v-bind:style="{
                color:
                  values[0].value > values[0].max ||
                  values[0].value < values[0].min
                    ? '#c93d5e'
                    : 'white',
              }"
            >
              {{ values[0].value }}
            </p>
            <p class="timer-title">{{ values[0].title }}</p>
          </div>
          <div class="app-card-timer-wrap transports" v-if="values[1]">
            <p
              class="timer-value"
              v-bind:style="{
                color:
                  values[1].value > values[1].max ||
                  values[1].value < values[1].min
                    ? '#c93d5e'
                    : 'white',
              }"
            >
              {{ values[1].value }}
            </p>
            <p class="timer-title">{{ values[1].title }}</p>
          </div>
        </template>
        <template
          v-else-if="
            type != TYPE_ICON_VALUES && type != TYPE_ICON_TITLED_VALUES
          "
        >
          <div class="app-card-timer-wrap" v-if="values[0]">
            <p class="timer-value">{{ values[0].value }}</p>
            <p class="timer-title">{{ values[0].title }}</p>
          </div>
          <div class="app-card-timer-wrap transports" v-if="values[1]">
            <p class="timer-value">{{ values[1].value }}</p>
            <p class="timer-title">{{ values[1].title }}</p>
          </div>
        </template>
        <template v-if="type == TYPE_ICON_VALUES">
          <div
            class="app-card-timer-wrap"
            :key="index"
            v-for="(value, index) in values"
          >
            <p class="timer-value">{{ value.value }}</p>
            <p class="timer-title">{{ value.title }}</p>
          </div>
        </template>
        <template v-if="type == TYPE_ICON_TITLED_VALUES">
          <div
            :class="['groups-wrap', index == 1 ? 'first-group' : '']"
            :key="index"
            v-for="(group, index) in values"
            @click.stop.prevent="
              index == 0
                ? goToTable('ambulatory')
                : goToTable('emergency_action')
            "
          >
            <div class="group-name">
              {{ group.group_title }}
            </div>
            <div class="group-content">
              <div
                class="app-card-timer-wrap"
                :key="groupIndex"
                v-for="(value, groupIndex) in group.group_values"
              >
                <p class="timer-value">{{ value.value }}</p>
                <p class="timer-title">{{ value.title }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- Bottom pop up -->

    <div v-if="toggleCardTable">
      <div v-if="filterVal[0].multiTable">
        <multi-app-trend
          v-if="currentRoute === 'tipulnimraz'"
          :datacards="filterVal[0].tables"
          :toggleCardTable="toggleCardTable"
        >
        </multi-app-trend>
      </div>
      <div v-else>
        <app-trend
          v-if="currentRoute === 'tipulnimraz'"
          :datacards="filterVal[0]"
          :toggleCardTable="toggleCardTable"
        >
        </app-trend>
      </div>
    </div>
  </div>
  <div v-else class="app-card-trans">
    <div
      v-bind:class="[
        type === TYPE_ICON
          ? 'app-card-inner-o'
          : '' || type === TYPE_ONE_VALUE
          ? 'app-card-inner-t'
          : '' || type === TYPE_TWO_VALUE_TEXT
          ? 'app-card-inner-tr'
          : '' || type === TYPE_TWO_VALUE_ICON
          ? 'app-card-inner-f'
          : '' || type === TYPE_PIE
          ? 'app-card-inner-fv'
          : '',
      ]"
    >
      <div class="app-card-item">
        <template v-if="type === TYPE_ICON || type === TYPE_TWO_VALUE_ICON">
          <span
            v-if="icon"
            class="app-card-icon"
            v-html="this.$icon(this.icon)"
          ></span>
        </template>
        <template
          v-else-if="type === TYPE_PIE || type === TYPE_CIRCLE_PROGRESS"
        >
          <div class="app-card-progress">
            <vue-circle
              :progress="percentage"
              ref="circle"
              :size="isSmall ? 68 : 88"
              :reverse="false"
              line-cap="butt"
              :fill="color ? { color: color } : fill"
              :empty-fill="emptyFill"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="4"
              :animation="{ duration: 2000 }"
              :show-percent="true"
            >
            </vue-circle>
          </div>
        </template>

        <template>
          <div class="app-card-progress">
            <vue-circle
              :progress="20"
              ref="circle"
              :size="isSmall ? 68 : 88"
              :reverse="false"
              line-cap="butt"
              :fill="color ? { color: color } : fill"
              :empty-fill="emptyFill"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="4"
              :animation="{ duration: 2000 }"
              :show-percent="true"
            >
            </vue-circle>
          </div>
        </template>
      </div>
      <div class="app-card-info">
        <div
          v-if="text"
          class="app-card-title"
          :class="{
            transport: type === TYPE_TWO_VALUE_ICON || type === TYPE_ONE_VALUE,
          }"
        >
          <span v-if="type !== TYPE_PIE">{{ value }}</span>
          <span>{{ text }}</span>
        </div>
      </div>
      <div class="app-urgent-val">
        <div
          class="app-urgent-wrap"
          v-bind:class="[
            currentRoute === 'transporations.unit' ? 'active' : '',
          ]"
        >
          <div v-if="values" class="app-urgent-wrap">
            <span>{{ values[0].value }}</span>
            <h1>{{ values[0].title }}</h1>
          </div>
        </div>
      </div>
      <div class="app-urgent-wait">
        <div v-if="values && values[1]" class="app-urgent-wrap">
          <span>{{ values[1].value }}</span>
          <h1>{{ values[1].title }}</h1>
        </div>
      </div>
      <div v-if="type === 4" class="app-urgent-avail">
        <div v-if="values && values[1]" class="app-urgent-wrap">
          <span>{{ values[1].value }}</span>
          <h1>{{ values[1].title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppTrend from './AppTrend.vue';
import MultiAppTrend from './MultiAppTrend.vue';
export default {
  components: { AppTrend, MultiAppTrend },
  data() {
    return {
      TYPE_ICON: 1,
      TYPE_PIE: 2,
      TYPE_ICON_EXTENDED: 3,
      TYPE_ONE_VALUE: 4,
      TYPE_TWO_VALUE_TEXT: 5,
      TYPE_TWO_VALUE_ICON: 6,
      TYPE_TIMER_ICON: 7,
      TYPE_TIMER_ICON_TOGETHER: 8,
      TYPE_CIRCLE_PROGRESS: 9,
      TYPE_ICON_VALUES: 10,
      TYPE_ICON_TITLED_VALUES: 11,
      currentRoute:
        this.$route.name === 'radiations.unit'
          ? this.$route.name.replace('.', '-')
          : this.$route.name,
      // isSmall: false,
      toggleCardTable: false,
    };
  },
  name: 'app-card',
  props: {
    icon: {
      type: String | Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    hasTrend: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String | Boolean,
      default: false,
    },
    unitId: {
      type: String | Boolean,
      default: false,
    },
    color: {
      type: String | Boolean,
      default: false,
    },
    value: {
      type: Number | Boolean,
      default: false,
    },
    percentage: {
      type: Number,
      default: null,
    },
    circles: {
      type: Array,
      default: () => {
        [];
      },
    },
    fill: {
      type: Object,
      default: () => ({
        color: '#ec5656',
      }),
    },
    emptyFill: {
      type: String,
      default: '#04304d',
    },
    active: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isTipulnimraz: {
      type: Boolean,
      default: false,
    },
    urgentVal: {
      type: String,
      default: null,
    },
    urgentText: {
      type: String,
      default: null,
    },
    urgentWaitVal: {
      type: String,
      default: null,
    },
    urgentWaitText: {
      type: String,
      default: null,
    },
    avail: {
      type: String,
      default: null,
    },
    availVal: {
      type: String,
      default: null,
    },
    trans: {
      type: String,
      default: null,
    },
    transVal: {
      type: String,
      default: null,
    },
    values: {
      title: '',
      value: '',
    },
    iconName: {
      type: String,
      default: null,
    },
    activeCard: {
      type: Boolean,
    },
    itempath: {
      type: Number,
    },
    clickToTable: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
  },
  watch: {
    percentage() {
      if (this.$refs.circle) {
        this.$refs.circle.updateProgress(this.percentage);
      }
    },
  },
  methods: {
    getColor(value, min, max) {
      console.log('CIRCLE!!');
      console.log(min, max);
      if (min && value < min) {
        return '#c93d5e';
      }
      if (max && value > max) {
        return '#c93d5e';
      }
      return 'white';
    },
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
          group: unit,
          section: this.group_type.toLowerCase(),
        };
      }

      return config;
    },
    viewTrend() {
      this.$emit('viewTrend');
    },
    goToTable(type) {
      this.$router.push({
        name: `${this.$route.name}.unit`,
        params: {
          unitId: 'table',
        },
        query: {
          group: type,
        },
      });
    },

    goToUnit(val) {
      //    this.$store.commit('changeTrendPopupStatus', {
      //   show: true,
      //   trend: column.paramId,
      //   unitId: unit.unitId,
      // });

      if (!val) {
        if (!this.unitId) {
          return;
        }
        this.$router.push({
          name: `${this.$route.name}.unit`,
          params: {
            unitId: this.unitId,
          },
        });
      }
      this.toggleCardTable = !this.toggleCardTable;
    },
    openBottom() {
      this.$store.commit('changeTrendPopupStatus', {
        dimotTrend: true,
        trend: 123,
        unitId: 456,
      });
    },
  },
  computed: {
    displayValue() {
      if (
        this.type === this.TYPE_TIMER_ICON ||
        this.type === this.TYPE_TIMER_ICON_TOGETHER ||
        this.type === this.TYPE_ICON_VALUES ||
        this.type === this.TYPE_ICON_TITLED_VALUES ||
        this.type === this.TYPE_CIRCLE_PROGRESS
      ) {
        if (!this.value) {
          if(this.text !== "ממתינים לייעוץ" && this.unitId !== 13) {
            return false;
          }
        }
      }

      return this.value + '';
    },
    filterVal() {
      //console.log('DATA!!!', this.screen.data.datacards[0]);
      return this.screen.data.datacards.filter((f) => {
        if (f.multiTable) {
          console.log('MULTI', f.tables[0]);
        }
        return f.itempath === this.itempath;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .app-card-squeezed{
//   flex:0 !important;
// }
.app-card {
  flex: 1;
  padding: 0 9px;
  &.clickable {
    cursor: pointer;
  }
  .circle-value {
    color: #5f7285;
  }
  &.dimot,
  &.dimot-unit {
    &.card-type-11 {
      .groups-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
      }
      .first-group {
        border-right: 1px solid rgba(16, 204, 203, 0.28);
      }
      .group-name {
        margin-bottom: 15px;
        color: #dae8fc;
      }
      .group-content {
        display: flex;
        flex-direction: row;
      }
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;

            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;
          padding: 15px;
          //flex-direction: row-reverse;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;
            width: 70%;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            flex: 1;
            justify-content: space-between;
            .app-card-timer-wrap {
              // padding: 0px 15px;
              // &:nth-of-type(2) {
              //   border-right: 1px solid rgba(16, 204, 203, 0.28);
              // }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: start;

        .app-card-info {
          padding: 0 15px;
          // border-left: solid 1px rgba(16, 204, 203, 0.28);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .app-card-value,
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
            // font-size: 20px;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          flex: 1;
          justify-content: space-around;
          .app-card-timer-wrap {
            // padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-10 {
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;

            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;
          padding: 15px;
          //flex-direction: row-reverse;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;
            width: 70%;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            flex: 1;
            justify-content: space-between;
            .app-card-timer-wrap {
              // padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: start;

        .app-card-item {
          .app-card-icon {
          }
        }
        .app-card-info {
          padding: 0 15px;
          border-left: solid 1px rgba(16, 204, 203, 0.28);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .app-card-value,
          .app-card-title {
            text-align: center;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          flex: 1;
          justify-content: space-around;
          .app-card-timer-wrap {
            // padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-9 {
      .progress-circles-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        //width: 100%;
        flex: 1;
      }
      .hours-load {
        font-size: 0.7vw;
        align-self: flex-end;
        color: #dae8fc;
        letter-spacing: 1px;
        transition: all 0.2s ease-in-out;
        &:hover {
          transform: scale(1.05);
        }
      }
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;

            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0px 10px;
            .app-card-timer-wrap {
              padding: 0px 10px;
              &:nth-of-type(3) {
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;

          padding-left: 2rem;
          flex-direction: row-reverse;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;
            width: 70%;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-width: 20%;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0 15px;
            .app-card-timer-wrap {
              padding: 0px 0px;
              margin: 0 10px;
              &:nth-of-type(3) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
                padding: 0 10px;
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: space-between;

        .app-card-item {
          .app-card-icon {
          }
        }
        .app-card-info {
          padding: 0 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .app-card-value,
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          .app-card-timer-wrap {
            // padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-8 {
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0px 10px;
            .app-card-timer-wrap {
              padding: 0px 10px;
              &:nth-of-type(3) {
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-width: 20%;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0 15px;
            .app-card-timer-wrap {
              padding: 0px 0px;
              margin: 0 10px;
              &:nth-of-type(3) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
                padding: 0 10px;
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: space-between;
        .app-card-item {
          .app-card-icon {
          }
        }
        .app-card-info {
          padding: 0 15px;
          .app-card-value,
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          .app-card-timer-wrap {
            // padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }

    &.card-type-7 {
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0px 10px;
            .app-card-timer-wrap {
              padding: 0px 10px;
              &:nth-of-type(3) {
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-width: 20%;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0 15px;
            .app-card-timer-wrap {
              padding: 0px 0px;
              margin: 0 10px;
              &:nth-of-type(3) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
                padding: 0 10px;
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: space-between;
        .app-card-item {
          .app-card-icon {
          }
        }
        .app-card-info {
          padding: 0 15px;
          .app-card-value,
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          .app-card-timer-wrap {
            padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-1 {
      -webkit-box-flex: 0;
      -ms-flex: 0;
      flex: 0;
      padding: 0 9px;
      .app-card-inner {
        justify-content: space-evenly;
        .app-card-icon {
          margin: 0 10px;
        }
        padding: 0 10px;
        .app-card-item {
          padding-right: 0px;
        }
        .app-card-info {
          padding: 0 10px;
          .app-card-title,
          .app-card-value {
            text-align: center;
            font-size: 1.3vw;
          }
        }
      }
    }
    &.card-type-2 {
      &.isTipulnimraz {
        color: red;
        .app-card-item {
          padding-right: 8px;
        }
      }
    }
  }

  &.radiations {
    &.card-type-7 {
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0px 10px;
            .app-card-timer-wrap {
              padding: 0px 10px;
              &:nth-of-type(3) {
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-width: 20%;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0 15px;
            .app-card-timer-wrap {
              padding: 0px 0px;
              margin: 0 10px;
              &:nth-of-type(3) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
                padding: 0 10px;
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: space-between;
        .app-card-item {
          .app-card-icon {
          }
        }
        .app-card-info {
          padding: 0 15px;
          .app-card-value,
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          .app-card-timer-wrap {
            padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-1 {
      -webkit-box-flex: 0;
      -ms-flex: 0;
      flex: 0;
      padding: 0 9px;
      .app-card-inner {
        justify-content: space-evenly;
        .app-card-icon {
          margin: 0 10px;
        }
        padding: 0 10px;
        .app-card-item {
          padding-right: 0px;
        }
        .app-card-info {
          padding: 0 10px;
          .app-card-title {
            width: 100px;
          }

          .app-card-title,
          .app-card-value {
            text-align: center;
            font-size: 1.3vw;
          }
        }
      }
    }
    &.card-type-2 {
      &.isTipulnimraz {
        color: red;
        .app-card-item {
          padding-right: 8px;
        }
      }
    }
  }
  &.tipulnimraz {
    &.card-type-7 {
      &:nth-of-type(2) {
        .app-card-inner {
          justify-content: space-around;
          .app-card-item {
            padding-right: 0px;
            .app-card-icon {
              &:nth-child(3n) {
              }
            }
          }
          .app-card-info {
            padding: 0 0px;
            .app-card-value,
            .app-card-title {
              text-align: center;
              font-size: 1.3vw;
              padding: 0 0px;
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 10px;

              &:nth-of-type(1) {
              }
              .timer-title {
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          // justify-content: space-evenly;
          justify-content: space-around;
          .app-card-item {
            padding-right: 0px;
            .app-card-icon {
              margin-top: 15px;
              &:nth-child(3n) {
              }
            }
          }
          .app-card-info {
            padding: 0 0px;
            .app-card-value,
            .app-card-title {
              text-align: center;
              padding: 0 -0px;
              width: 70px;
              font-size: 1.3vw;
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                padding: 0px 0px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(6) {
        .app-card-inner {
          justify-content: space-around;
          .app-card-item {
            padding-right: 0px;

            .app-card-icon {
              margin-top: 25px;
              &:nth-child(3n) {
              }
            }
          }
          .app-card-info {
            padding: 0 0px;
            .app-card-value,
            .app-card-title {
              text-align: center;
              padding: 0 10px;
              font-size: 1.3vw;
              // width: 60px;
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                padding: 0px 0px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        .app-card-item {
          padding-right: 0px;
          .app-card-icon {
            &:nth-child(3n) {
            }
          }
        }
        .app-card-info {
          padding: 0 0px;
          .app-card-value,
          .app-card-title {
            text-align: center;
            padding: 0 25px;
            font-size: 1.3vw;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          .app-card-timer-wrap {
            padding: 0px 24px;
            &:nth-of-type(2) {
              border-right: 1px solid rgba(16, 204, 203, 0.28);
            }
            .timer-title {
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              // width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-1 {
      flex: 0;
      .app-card-inner {
        .app-card-item {
          padding-right: 0px;
          &:nth-of-type(1) {
            .app-card-info {
              padding: 0 0px;
              .app-card-value {
                text-align: center;
              }
              .app-card-title {
                text-align: center;
                font-size: 1.3vw;
              }
            }
          }
        }
        .app-card-info {
          padding: 0 15px;
          .app-card-value {
            text-align: center;
          }
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
          }
        }
      }
    }
    &.card-type-2 {
      flex: 0;
      .app-card-inner {
        .app-card-item {
          padding-right: 18px;
        }
      }
      .isTipulnimraz {
        padding-left: 10px;
        .app-card-info {
          
          .app-card-value {
            text-align: center;
          }
          
          .app-card-title {
            text-align: center;
            padding: 0 0px;
            font-size: 1.3vw;
          }
        }
        .app-card-inner {
          border: 1px solid red;
        }
      }
    }
  }
  &.radiations-unit {
    &.card-type-7 {
      &:nth-of-type(4) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
            }
          }
          .app-card-info {
            padding: 0 15px;
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0px 10px;
            .app-card-timer-wrap {
              padding: 0px 10px;
              &:nth-of-type(3) {
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(1) {
        .app-card-inner {
          margin-right: 15px;
          .app-card-item {
            padding-right: 0px;
            padding-left: 0px;

            .app-card-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 20px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            border-right: 1px solid rgba(16, 204, 203, 0.28);
            padding: 0px 10px;
            .app-card-timer-wrap {
              padding: 0px 10px;
              &:nth-of-type(3) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
                padding: 0 10px;
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      &:nth-of-type(5) {
        .app-card-inner {
          .app-card-item {
            padding-right: 0px;
            padding: 0 15px;
            .app-card-icon {
              ::v-deep svg {
                width: 100%;
                height: 100%;
                display: block;
                margin-top: 16px;
              }
            }
          }
          .app-card-timer {
            display: flex;
            flex-direction: row;
            .app-card-timer-wrap {
              padding: 0px 15px;
              &:nth-of-type(2) {
                border-right: 1px solid rgba(16, 204, 203, 0.28);
              }
              .timer-title {
                opacity: 0.56;
                font-size: 17.3px;
                text-align: center;
                color: #c6d9f5;
                // width: 80px;
              }
              .timer-value {
                font-size: 25px;
                font-weight: bold;
                letter-spacing: -0.32px;
                text-align: center;
                color: #d8e7ff;
                padding-bottom: 10px;
              }
            }
          }
        }
      }
      .app-card-inner {
        justify-content: space-between;
        .app-card-item {
          .app-card-icon {
          }
        }
        .app-card-info {
          padding: 0 15px;
          .app-card-value,
          .app-card-title {
            text-align: center;
            font-size: 1.3vw;
          }
        }
        .app-card-timer {
          display: flex;
          flex-direction: row;
          .app-card-timer-wrap {
            padding: 0px 25px;
            &:nth-of-type(3) {
            }
            .timer-title {
              opacity: 0.56;
              font-size: 17.3px;
              text-align: center;
              color: #c6d9f5;
              width: 80px;
            }
            .timer-value {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: -0.32px;
              text-align: center;
              color: #d8e7ff;
              padding-bottom: 10px;
            }
          }
        }
      }
    }
    &.card-type-1 {
      -webkit-box-flex: 0;
      -ms-flex: 0;
      flex: 0;
      padding: 0 9px;

      .app-card-inner {
        justify-content: space-evenly;

        padding: 0 10px;
        .app-card-item {
          padding-right: 0px;
        }
        .app-card-info {
          padding: 0 10px;
          .app-card-title,
          .app-card-value {
            text-align: center;
            font-size: 1.3vw;
          }
        }
      }
    }
    &.card-type-2 {
      &.isTipulnimraz {
        color: red;
        .app-card-item {
          padding-right: 8px;
        }
      }
    }
  }
  .app-card-inner {
    border-radius: 3px;
    background-color: #051724;
    display: flex;
    align-items: center;
    min-height: 122px;
    position: relative;
    transition: ease-in 0.3s;

    &.isTipulnimraz:nth-child(1) {
      .app-card-info {
        padding-left: 12.5px !important;
        padding-right: 12.5px !important;
      }
    }
    &.active {
      background-color: #035c7c;
    }
    &.toggleCardTable {
      background: #023e58;
      transition: ease-in 0.3s;
    }
    .app-card-item {
      padding-right: 28px;
      .app-card-icon {
        display: block;
        width: 59px;
        height: 59px;

        ::v-deep svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .app-card-progress {
        min-width: 88px;
        margin-left: 15px;
        .circle {
          span {
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
    .app-card-info {
      font-size: 30px;
      line-height: 0.94;
      letter-spacing: 0.41px;
      color: #dae8fc;
      padding-right: 25px;
      .app-card-value {
        font-weight: bold;
      }
      .app-card-title {
        /*padding-left: 80px;*/
        font-size: 1.3vw;
      }
    }
    a.view-trend {
      position: absolute;
      bottom: 5px;
      left: 12px;
      font-size: 15px;
      font-weight: normal;
      letter-spacing: 0.2px;
      color: #dae8fc;
      cursor: pointer;
    }
    &.is-small {
      .app-card-item {
        padding-right: 18px;
      }
      .app-card-info {
        font-size: 22px;
        padding-right: 15px;
      }
      .app-card-progress {
        min-width: 67px;
        ::v-deep .percent-text {
          font-size: 22px !important;
        }
        .circle {
          span {
            font-size: 28px;
            font-weight: bold;
          }
        }
      }
    }
  }
}

.app-card-trans {
  // flex: auto;
  flex: 1;
  padding: 0 9px;
  .app-card-inner-o {
    display: flex;
    align-items: center;
    // justify-content: center;
    border-radius: 3px;
    background-color: #051724;
    display: flex;
    align-items: center;
    min-height: 122px;
    position: relative;
    // width: 100%;
    // padding: 0 0px;
    padding-left: 0px;
    .app-card-item {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      .app-card-icon {
        display: block;
        width: 59px;
        ::v-deep svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .app-card-progress {
        min-width: 88px;

        .circle {
          span {
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
    .app-card-info {
      font-size: 30px;
      line-height: 0.94;
      letter-spacing: 0.41px;
      color: #dae8fc;
      width: 175px;
      .app-card-value {
        font-weight: bold;
      }
      .app-card-title {
        display: flex;
        font-size: 1.3vw;
        flex-direction: column;
        span:nth-child(1) {
          font-weight: bold;
          text-align: center;
          font-size: 25px;
          line-height: 1.06;
        }
        span {
          font-size: 17px;
          line-height: 1.06;
          font-weight: 300;
          text-align: center;
          padding: 0px 25px;
        }
      }
    }
  }
  .app-card-inner-t {
    border-radius: 3px;
    background-color: #051724;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 122px;
    position: relative;
    // width: 380px;
    .app-card-item {
      padding-right: 15px;
      .app-card-icon {
        display: block;
        width: 59px;
        height: 59px;

        ::v-deep svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .app-card-progress {
        min-width: 88px;

        .circle {
          span {
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
    .app-card-info {
      font-size: 30px;
      line-height: 0.94;
      letter-spacing: 0.41px;
      color: #dae8fc;
      padding-right: 0px;
      border-left: 1px solid rgba(16, 204, 203, 0.28);
      width: 170px;
      .app-card-value {
        font-weight: bold;
      }
      .app-card-title {
        font-size: 1.3vw;
        &.transport {
          text-align: center;
          padding: 0 25px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 25px;
          font-weight: bold;
          span:nth-child(1) {
          }
          span:nth-child(2) {
            margin: 0;
            color: #dae8fc;
            font-size: 17px;
            line-height: 1.06;
            padding-top: 0px;
            font-weight: 300;
          }
        }

        span {
          margin-left: 0px;
        }
      }
    }
    .app-urgent-val {
      max-width: 100%;
      height: 113px;
      display: flex;
      flex-direction: column;
      align-items: center;

      text-align: center;

      justify-content: center;

      padding: 10px 40px;
      .app-urgent-wrap {
        height: 63px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #dae8fc;
        font-weight: bold;
        // border: 1px solid red;

        span {
        }
        h1 {
          margin: 0;
          color: #dae8fc;
          font-size: 17px;
          line-height: 1.06;
          padding-top: 0px;
          font-weight: 300;
        }
      }
    }
  }
  .app-card-inner-tr {
    border-radius: 3px;
    background-color: #051724;
    display: flex;
    align-items: center;
    min-height: 122px;
    position: relative;
    // width: 400px;

    .app-card-item {
      padding-right: 0px;
      .app-card-icon {
        display: block;
        width: 59px;
        height: 59px;

        ::v-deep svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .app-card-progress {
        min-width: 88px;

        .circle {
          span {
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
    .app-card-info {
      font-size: 30px;
      line-height: 0.94;
      letter-spacing: 0.41px;
      color: #dae8fc;
      padding-left: 0px;
      border-left: 1px solid rgba(16, 204, 203, 0.28);
      .app-card-value {
        font-weight: bold;
      }
      .app-card-title {
        display: flex;
        font-size: 1.3vw;
        flex-direction: column;
        // width: 125px;
        span:nth-child(1) {
          font-weight: bold;
          font-size: 25px;
          text-align: center;
        }
        span {
          margin: 0;
          color: #dae8fc;
          font-size: 17px;
          padding-top: 0px;
          font-weight: 300;
          text-align: center;
          padding: 0px 30px;
        }
      }
    }
    .app-urgent-val {
      min-width: 125px;
      height: 113px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .app-urgent-wrap {
        min-width: 125px;
        height: 63px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #dae8fc;
        font-weight: bold;
        &.active {
          color: #dae8fc;
        }
        span {
        }
        h1 {
          margin: 0;
          color: #dae8fc;
          font-size: 17px;
          line-height: 1.06;
          padding-top: 0px;
          font-weight: 300;
          padding: 0px 25px;
          text-align: center;
        }
      }
    }
    .app-urgent-wait {
      width: 125px;
      height: 113px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .app-urgent-wrap {
        width: 125px;
        height: 55px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #dae8fc;
        font-weight: bold;
        border-right: 1px solid rgba(16, 204, 203, 0.28);
        text-align: center;
        span {
          text-align: center;
        }
        h1 {
          margin: 0;
          color: #dae8fc;
          font-size: 17px;
          line-height: 1.06;
          padding-top: 0px;
          font-weight: 300;
        }
      }
    }
  }
  .app-card-inner-f {
    border-radius: 3px;
    background-color: #051724;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 122px;
    position: relative;
    // width: 301px;
    .app-card-item {
      width: 125px;
      padding-right: 0px;
      .app-card-icon {
        width: 80px;
        border: 1px solid transparent;
        ::v-deep svg {
          height: 100%;
          display: block;
          margin: 0 auto;
        }
      }
      .app-card-progress {
        min-width: 88px;
        .circle {
          span {
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
    .app-card-info {
      font-size: 30px;
      line-height: 0.94;
      letter-spacing: 0.41px;

      color: #dae8fc;
      padding-right: 0px;
      .app-card-value {
        font-weight: bold;
      }
      .app-card-title {
        font-size: 1.3vw;
      }
    }
    .app-urgent-avail {
      // min-width: 100px;
      height: 113px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .app-urgent-wrap {
        border-left: 1px solid rgba(16, 204, 203, 0.28);
        width: 100px;
        height: 63px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #dae8fc;
        font-weight: bold;

        h1 {
          margin: 0;
          color: #dae8fc;
          font-size: 17px;
          line-height: 1.06;
          padding-top: 0px;
          font-weight: 300;
        }
      }
    }
    .app-urgent-trans {
      height: 113px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .app-urgent-wrap {
        width: 100px;
        height: 63px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #dae8fc;
        font-weight: bold;
        h1 {
          margin: 0;
          color: #dae8fc;
          font-size: 17px;
          line-height: 1.06;
          padding-top: 0px;
          font-weight: 300;
        }
      }
    }
    .app-urgent-val {
      width: 125px;
      text-align: center;
      font-size: 25px;
      color: #dae8fc;
      font-weight: bold;
      border-left: 1px solid rgba(16, 204, 203, 0.28);
      border-right: 1px solid rgba(16, 204, 203, 0.28);
      span {
      }
      h1 {
        color: #dae8fc;
        font-size: 17px;
        line-height: 1.06;
        padding-top: 0px;
        font-weight: 300;
      }
    }
    .app-urgent-wait {
      width: 125px;
      text-align: center;
      font-size: 25px;
      color: #dae8fc;
      font-weight: bold;
      text-align: center;
      span {
        text-align: center;
      }
      h1 {
        color: #dae8fc;
        font-size: 17px;
        line-height: 1.06;
        padding-top: 0px;
        font-weight: 300;
      }
    }
  }
  .app-card-inner-fv {
    border-radius: 3px;
    background-color: #051724;
    display: flex;
    align-items: center;
    min-height: 122px;
    position: relative;
    // width: 245px;

    .app-card-item {
      padding-right: 28px;
      .app-card-icon {
        display: block;
        width: 59px;
        height: 59px;

        ::v-deep svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .app-card-progress {
        min-width: 88px;

        .circle {
          span {
            font-size: 36px;
            font-weight: bold;
          }
        }
      }
    }
    .app-card-info {
      font-size: 30px;
      line-height: 0.94;
      letter-spacing: 0.41px;
      color: #dae8fc;
      padding-right: 25px;
      .app-card-value {
        font-weight: bold;
      }
      .app-card-title {
        font-size: 1.3vw;
        /*padding-left: 80px;*/
      }
    }
  }
}
</style>
