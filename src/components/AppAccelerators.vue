<template>
  <div class="app-accelerators">
    <div class="app-accelerators-container">
      <!-- <div class="app-accelerators-header">
        <span
          v-if="icon"
          class="app-card-icon"
          v-html="this.$icon(this.icon)"
        ></span>
        <p>{{ title }}</p>
      </div> -->
      <div class="app-accelerators-cards">
        <div
          class="accelerator-card"
          v-for="(card, index) in accelerator"
          :key="index"
          @click="goToUnit(card.unitId)"
        >
          <div class="app-accelerators-header">
            <img src="@/assets/icons/accelerators.svg" alt="" />
            <p>{{ title }}</p>
          </div>
          <div class="accelerator-title">
            <p>{{ card.title }}</p>
          </div>
          <div class="accelerator-sub-title">
            <p>{{ card.subtitle }}</p>
          </div>
          <div class="accelerator-timer">
            <p>{{ card.standbytimer }}</p>
          </div>
          <div class="accelerator-delay">
            <p>{{ card.delaytext }}</p>
            <p>{{ card.delaytimer }}</p>
          </div>
          <div class="accelerator-fake"></div>
          <div class="chart-line">
            <div class="chart-line-wrapper">
              <line-chart
                :stepsOne="stepsOne[index]"
                :stepsTwo="stepsTwo[index]"
              ></line-chart>
            </div>
          </div>
          <div class="accelerator-values" v-if="card.values">
            <div class="waiting">
              <p class="value">{{ card.values[0].value }}</p>
              <div class="waiting-wrapper">
                <div class="point-box"></div>
                <p class="title">{{ card.values[0].title }}</p>
              </div>
            </div>
            <div class="waiting">
              <p class="value">{{ card.values[1].value }}</p>
              <div class="waiting-wrapper">
                <div class="point-box-l"></div>
                <p class="title">{{ card.values[1].title }}</p>
              </div>
            </div>
          </div>
          <div class="accelerator-fake"></div>
          <div class="acceleratir-bottomvalues" v-if="card.bottomvalues">
            <div class="doctor-visit">
              <p class="title">{{ card.bottomvalues[0].title }}</p>
              <p class="value">{{ card.bottomvalues[0].value }}</p>
            </div>
            <div class="chimo">
              <p class="title">{{ card.bottomvalues[1].title }}</p>
              <p class="value">{{ card.bottomvalues[1].value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart.vue';
import _ from 'lodash';
export default {
  data() {
    return {
      currentRoute: this.$route.name,
      flexlinepatient: null,
      flexlinewaiting: null,
      acceleratorData: 'acceleratorData',
    };
  },
  name: 'app-accelerators',
  components: {BarChart, LineChart},
  props: {
    icon: {
      type: String | Boolean,
      default: false,
    },
    title: {
      type: String | Boolean,
      default: false,
    },
    accelerator: {
      type: Array,
      default: false,
    },
    unitId: {
      type: String | Boolean,
      default: false,
    },
  },
  methods: {
    goToUnit(val) {
      if (!val) {
        return;
      }

      this.$router.push({
        name: `${this.$route.name}.unit`,
        params: {
          unitId: val,
        },
      });
    },
    CalcLine() {
      console.log('alex');
    },
  },
  mounted() {},
  computed: {
    stepsOne() {
      return this.accelerator.map((element) => {
        return element.values[0].value;
      });
    },
    stepsTwo() {
      return this.accelerator.map((element) => {
        return element.values[1].value;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-accelerators {
  .app-accelerators-container {
    margin-top: 19px;
    object-fit: contain;
    border-radius: 3px;
    background-color: #051724;
    position: relative;
    .app-accelerators-cards {
      display: flex;
      flex-wrap: wrap;
      padding: 0px 0;
      position: relative;
      .accelerator-card {
        flex: 25%;
        height: 100%;
        border-right: solid 1px #023e58;
        cursor: pointer;
        background-color: #051724;
        padding: 0px 0;
        position: relative;
        &:nth-of-type(2) {
          .app-accelerators-header {
            p,
            img {
              opacity: 0;
            }
          }
        }
        &:nth-of-type(3) {
          .app-accelerators-header {
            p,
            img {
              opacity: 0;
            }
          }
        }
        &:nth-of-type(4) {
          .app-accelerators-header {
            p,
            img {
              opacity: 0;
            }
          }
        }
        .app-accelerators-header {
          display: flex;
          align-items: center;
          padding: 15px 25px;

          p {
            font-size: 23.2px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.32px;
            text-align: right;
            color: #dae8fc;
            margin-right: 16px;
          }
        }
        &:hover {
          background-color: #15365a;
        }
        &:nth-of-type(1) {
          border-right: solid 1px transparent;
        }
        .accelerator-title {
          padding-bottom: 5px;
          p {
            font-size: 23.2px;
            text-align: center;
            color: #dae8fc;
          }
        }
        .accelerator-sub-title {
          padding-bottom: 10px;
          p {
            opacity: 0.56;
            font-size: 17.3px;
            text-align: center;
            color: #c6d9f5;
          }
        }
        .accelerator-timer {
          padding-bottom: 10px;
          p {
            font-family: Heebo;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            color: #ffffff;
          }
        }
        .accelerator-delay {
          padding-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            font-family: Heebo;
            font-size: 16px;
            text-align: center;
            letter-spacing: -0.21px;
            color: #ec3e60;
            margin: 0 2px;
            margin-bottom: 0rem;
          }
        }
        .accelerator-fake {
          border: solid 3px #042840;
          width: 47px;
          border-radius: 15px;
          display: block;
          margin: 0 auto;
        }
        .chart-line {
          width: 80%;
          height: 10px;
          margin: 0 auto;
          padding: 5px 0;
          .chart-line-wrapper {
            width: 70%;
            margin: 0 auto;
          }
        }
        .accelerator-values {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding:15px 0;
          .waiting {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 15px;
            
            .value {
              font-size: 25px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: 0.34px;
              text-align: center;
              color: #dae8fc;
            }
            .waiting-wrapper {
              display: flex;
              flex-direction: row;
              align-items: center;
              .title {
                opacity: 0.6;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: 0.22px;
                text-align: right;
                color: #dae8fc;
              }
              .point-box{
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: #34a9ff;;
                margin: 0 3px;
              }
              .point-box-l{
                width: 5px;
                height: 5px;
                border-radius: 50%;
                background-color: #8577d1;
                margin: 0 3px;
              }
            }
          }
        }
        .acceleratir-bottomvalues {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
          padding-top: 10px;
          padding-bottom: 10px;
          .doctor-visit {
            .title {
              opacity: 0.56;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: -0.21px;
              text-align: center;
              color: #c6d9f5;
            }
            .value {
              font-family: Heebo;
              font-size: 25px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: -0.32px;
              text-align: center;
              color: #dae8fc;
            }
          }
          .chimo {
            .title {
              opacity: 0.56;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: -0.21px;
              text-align: center;
              color: #c6d9f5;
            }
            .value {
              font-family: Heebo;
              font-size: 25px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: -0.32px;
              text-align: center;
              color: #dae8fc;
            }
          }
        }
      }
    }
  }
}
</style>
