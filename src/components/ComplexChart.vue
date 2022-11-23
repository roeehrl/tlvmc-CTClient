<template>
  <div
    class="patients-history"
    :class="{
      'patients-history active': currentRoute === 'transporations.unit',
    }"
    ref="patientHistory"
  >
    <div class="graph" :class="{ 'is-small': steps.length > 8 }">
      <div
        :class="{
          'graph-inner': currentRoute === 'transporations',
          'graph-inner-active': currentRoute === 'transporations.unit',
        }"
      >
        <div
          class="col is-active"
          v-for="(step, idx) in stepBars"
          :key="idx"
          :style="{ height: `${step.height}%` }"
        >
          <div class="bar" :style="{ height: `${step.urgentHeight}%` }">
            <div class="top-label">
              <div class="month">{{ step.stepMonth }}</div>
            </div>
          </div>
          <div class="bottom-label">{{ step.Unit }}</div>
        </div>
      </div>
    </div>
    <div class="labels">
      <div class="labels-wrap" v-for="lab in stepsArr" :key="lab">
        <p>{{ lab }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";

export default {
  name: "changes-chart",
  props: ["steps"],
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      historyHeight: "240px",
      animate: true,
      currentRoute: this.$route.name,
      labels: [20, 15, 10, 5, 0],
    };
  },
  created() {
    console.log(this.stepBars);
  },
  computed: {
    normal() {
      return this.steps.Normal;
    },
    urgent() {
      return this.steps.Urgent;
    },
    stepsCount() {},
    maxStepsValue() {
      const maxUrgent = _.maxBy(this.urgent, "Value");
      const maxNormal = _.maxBy(this.normal, "Value");

      return Math.round(maxUrgent.Value + maxNormal.Value);
    },
    stepsArr() {
      let stepsArr = [];

      for (let i = Math.ceil(this.maxStepsValue / 5); i >= 0; i--) {
        stepsArr.push(i * 5);
      }

      return stepsArr;
    },
    stepBars() {
      let bars = [];

      this.normal.forEach((normal, index) => {
        let urgentValue = this.urgent[index].Value;
        let totalValue = parseInt(normal.Value) + parseInt(urgentValue);
        let height = (totalValue * 100) / this.maxStepsValue;
        let normalHeight = (normal.Value * 100) / this.maxStepsValue;
        let urgentHeight =
          (this.urgent[index].Value * 100) / this.maxStepsValue;

        console.log(totalValue, this.maxStepsValue);

        bars.push({
          height: height,
          normalHeight: normalHeight,
          urgentHeight: urgentHeight,
          unit: normal.Unit,
        });
      });

      return bars;
    },
    stepItems() {
      let steps = this.steps.Urgent;
      let highestNumber = 0;
      for (let step of steps) {
        if (step.Value > highestNumber) {
          highestNumber = step.Value;
        }
      }
      return steps.map((item, index) => {
        return {
          isActive: index === steps,
          height: (item.Value / highestNumber) * 100 + "%",
          ...item,
        };
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.patients-history {
  border-radius: 4px;
  // box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 37%);
  padding: 30px 20px;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  height: 210px;
  &.active {
    width: 690px;
    height: 220px;
  }
  .labels {
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -4px;
    .labels-wrap {
      p {
        color: #dae8fc;
        font-size: 15px;
        text-align: left;
      }
    }
  }
  .history-title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.27px;
    color: #dae8fc;
    flex-shrink: 0;
    flex-grow: 0;
    margin-bottom: 10px;
  }
  .h {
    height: 280px;
  }
  .graph {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    .graph-inner {
      height: 100%;
      background-image: linear-gradient(
          to bottom,
          rgba(245, 245, 245, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px);
      background-size: 1px 36px;
      background-position: top;
      padding: 0 20px;
      display: flex;
      align-items: flex-end;
    }
    .graph-inner-active {
      height: 100%;
      background-image: linear-gradient(
          to bottom,
          rgba(245, 245, 245, 0.05) 1px,
          transparent 1px
        ),
        linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px);
      background-size: 1px 38px;
      background-position: top;
      padding: 0 20px;
      display: flex;
    }

    &.is-small {
      .col + .col {
        margin-right: 42px;
      }
    }

    .col {
      flex-grow: 0;
      flex-shrink: 1;
      height: 100%;
      width: 100%;
      max-width: 134px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      background-color: #022236;
      + .col {
        margin-right: 37px;
      }

      .bar {
        width: 73px;
        height: 0;
        position: relative;
        background-color: #022236;
        transition: height 0.3s ease;
      }

      .bottom-label {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        font-size: 18px;
        letter-spacing: 0.25px;
        text-align: center;
        color: #dae8fc;
        padding: 8px 0;
      }

      &.is-active {
        .bar {
          width: 100%;
          background-color: transparent;
          background-image: linear-gradient(159deg, #1fd487 -10%, #38bee2 110%);
          transition: height 0.9s;
          .top-label {
            background-color: #dae8fc;
            color: #032b45;
          }
        }
      }
    }
  }
}
</style>
