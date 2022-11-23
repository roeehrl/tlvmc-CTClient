<template>
  <div class="ico">
    <div class="ico-container">
      <div class="ico-for" v-for="(item, index) in ico" :key="index">
        <div class="ico-item">
          <span class="ico-title">
            {{ item.title }}
          </span>
          <div class="values">
            <div class="tab patients" v-for="val in item.values" :key="val">
              <p
                class="value"
                v-bind:style="{
                  color: getColor(val.value, val.min, val.max),
                }"
              >
                {{ val.value }}
              </p>
              <p class="title">{{ val.title }}</p>
            </div>
          </div>
          <div class="wrapper">
            <div class="hospitalization">
              <p>{{ item.hospitalization.title }}</p>
              <div class="hospitalization-wrapper">
                <div class="circle">
                  <circle-chart :percentage="item.hospitalization.percentage">
                  </circle-chart>
                </div>
                <div class="column">
                  <div
                    class="column-item"
                    v-for="(host, index) in item.hospitalization.values"
                    :key="host"
                  >
                    <p
                      class="value"
                      v-bind:style="{
                        color: getColor(host.value, host.min, host.max, index),
                      }"
                    >
                      {{ host.value }}
                    </p>
                    <p class="title">
                      {{ host.title }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="dimot">
              <p>{{ item.dimot.title }}</p>
              <div class="dimot-wrapper">
                <stack-chart :percentage="item.dimot.values"> </stack-chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircleChart from './CircleChart.vue';
export default {
  props: ['ico'],
  name: 'ico',

  components: { CircleChart },

  data() {
    return {
      color: '#2DC9B9',
    };
  },

  methods: {
    getColor(value, min, max, index) {
      if (index != 1) {
        if (min && value < min) {
          return '#c93d5e';
        }
        if (max && value > max) {
          return '#c93d5e';
        }
      } else {
        console.log('TIME', value);
        // let year = '2013';
        // let month = '04';
        // let day = '18';
        // let hour = value.split(':')[0];
        // let minute = value.split(':')[1];
        // let minHour = min ? min.split(':')[0] : '';
        // let minMinute = min ? min.split(':')[1] : '';
        // let maxHour = max ? max.split(':')[0] : '';
        // let maxMinute = max ? max.split(':')[1] : '';
        // let reserv = new Date(year, month, day, hour, minute).getTime();
        // let reservMin = min
        //   ? new Date(year, month, day, minHour, minMinute).getTime()
        //   : '';
        // let reservMax = max
        //   ? new Date(year, month, day, maxHour, maxMinute).getTime()
        //   : '';
        // console.log('reserv', reserv);
        if (min && value < min) {
          return '#c93d5e';
        }
        if (max && value > max) {
          return '#c93d5e';
        }
      }
      return 'white';
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.ico {
  padding: 10px 0;
  .ico-container {
    display: flex;
    flex-direction: row;
    //justify-content:;
    flex-wrap: wrap;
    height: 72vh;
    overflow: auto;
    // padding-left: 5px;
    .ico-for {
      flex: 30%;
      max-width: 32% !important;
      margin: 10px;
      .ico-item {
        border: 1px solid #023e58;
        border-radius: 5px;
        background: #042941;
        padding: 15px;
        .ico-title {
          //max-width: 100px;
          color: #e1e5e7;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          padding: 6px 0;
          border-radius: 5px;
        }
        .values {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          .tab {
            border-right: 1px solid #e1e5e7;
            .value {
              color: #e1e5e7;
              padding: 0px 10px;
              font-size: 17px;
            }
            .title {
              color: #e1e5e7;
              padding: 0px 10px;
              opacity: 0.56;
              font-size: 15px;
            }
          }
        }
        .wrapper {
          display: flex;
          flex-direction: row;
          .hospitalization {
            width: 50%;
            p {
              font-size: 15.7px;
              font-weight: bold;
              letter-spacing: 0.21px;
              color: #dae8fc;
            }
            .hospitalization-wrapper {
              display: flex;
              flex-direction: row;
              .circle {
                width: 70%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .column {
                width: 30%;
                .column-item {
                  padding: 10px 0;
                  .value {
                    font-size: 24.6px;
                    font-weight: bold;
                    letter-spacing: 0.33px;
                    color: #dae8fc;
                    direction: ltr;
                    text-align: right;
                  }
                  .title {
                    opacity: 0.6;
                    font-weight: normal;
                    font-size: 15.7px;
                    letter-spacing: 0.21px;
                    color: #dae8fc;
                  }
                }
              }
            }
          }
          .dimot {
            width: 50%;
            p {
              font-size: 15.7px;
              font-weight: bold;
              letter-spacing: 0.21px;
              color: #dae8fc;
            }
            .dimot-wrapper {
              border-right: 2px solid #07111e;
              margin-top: 35px;
            }
          }
        }
      }
    }
  }
}
</style>
