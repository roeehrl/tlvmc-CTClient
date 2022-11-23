<template>
  <div
    class="app-table"
    :class="{ expanded: expanded }"
    ref="tableContainer"
    :style="{ 'border-right': borderColor ? `2px solid ${borderColor}` : '' }"
  >
    <div class="app-table-container">
      <table :class="{ 'table-left': type === 8, 'table-right': type === 9 }">
        <thead>
          <tr>
            <th class="title">
              <div class="right-tab-wrapper" v-if="table">
                <span class="app-card-icon" v-html="this.$icon(table.icon)">
                </span>
                <span class="main-header-title">{{ table.title }} </span>
              </div>
            </th>
          </tr>
          <div class="header-title-wrapper" v-for="head in table.header">
            <div class="header-title">
              <span>{{ head }}</span>
            </div>
          </div>
        </thead>
        <div class="sub-table-wrapper">
          <tr class="sub-table-box">
            <div class="tab" v-for="(unit, i) in table.units" :key="i">
              <router-link
                :to="{
                  name: 'transporations.unit',
                  params: { unitId: unit.unitId || unit.unitid },
                }"
              >
                <div class="sub-title-wrapper">
                  <div class="head-box">
                    <p class="head">
                      {{ unit.fromUnit }}
                    </p>
                    <span v-if="type == 8" v-html="$icon('arrowleft')"> </span>
                    <p v-if="type == 8" class="sub-head">
                      {{ unit.destinationUnit }}
                    </p>
                  </div>
                  <div class="title-container" v-if="unit.patientParams">
                    <div
                      class="title-box active"
                      v-for="(u, p) in unit.patientParams"
                      :key="p"
                    >
                      <div v-if="u.urgentkpi > 0" class="kpi">
                        <span v-if="u.urgentkpi > 0">{{ u.urgentkpi }}</span>
                      </div>
                      <span v-if="!u.cellText">-</span>
                      <span v-if="u.cellText">{{ u.cellText }}</span>
                      <!-- <div v-if="u.urgentkpi > 0" class="kpi">
                        <span v-if="u.urgentkpi > 0">{{ u.urgentkpi }}</span>
                      </div> -->
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </tr>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  title: "העברות דחופות",
  data() {
    return {};
    // "apexcharts": "^3.26.3",
  },
  created() {},
  methods: {},
  props: {
    borderColor: {
      type: String,
      default: "",
    },
    table: {
      type: Object,
      default: () => ({}),
    },
    expanded: {
      type: Boolean,
    },
    type: {
      type: Number,
    },
  },
  mounted() {
    console.log(this.table.units, "units");
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.app-table {
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 39%);
  overflow: hidden;

  &.expanded {
    // max-height: 481px;
    height: 100%;

    .app-table-container {
      height: 100% !important;
    }

    .sub-table-box {
      height: 46vh !important;
    }
  }

  .app-table-container {
    height: 305px;

    .table-left {
      border-right: 3px solid #34a9ff;
      width: 100%;
      thead {
        display: flex;
        flex-direction: row;

        padding: 15px 0px;
        border-bottom: 1px solid #07111e;
        position: relative;
        width: 100%;
        tr {
          display: flex;
          flex-direction: row;
          align-items: center;
          .title {
            .table-title {
            }
            .right-tab-wrapper {
              display: flex;
              flex-direction: row;
              align-items: center;
              .app-card-icon {
                margin-right: 20px;
              }
              .main-header-title {
                font-size: 20px;
                font-weight: bold;

                color: #dae8fc;
                margin-right: 15px;
                padding-left: 111px;
              }
            }
          }
        }
        .header-title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .header-title {
            display: flex;
            justify-content: center;
            align-items: center;
            justify-content: center;
            min-width: 93px;

            span {
              font-size: 17px;
              color: #dae8fc;
              text-align: center;
            }
          }
        }
      }
      .sub-table-wrapper {
        display: flex;
        flex-direction: row;
        .sub-table-box {
          height: 235px;
          overflow: auto;
          .tab {
            display: flex;
            flex-direction: row;
            padding: 9px 0;
            transition: all 0.5s;
            border-bottom: 1px solid #07111e;
            &:hover {
              background: #05395b;
              transition: all 0.5s;
            }
            .sub-title-wrapper {
              display: flex;
              flex-direction: row;
              cursor: pointer;
              .head-box {
                width: 303px;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-right: 25px;

                p {
                  font-size: 19px;
                  font-weight: bold;
                  color: #dae8fc;
                  width: 120px;
                  margin-right: 10px;
                }
                span {
                  width: 60px;
                  text-align: center;
                }
                .sub-head {
                  width: 125px;
                }
              }
              .title-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                .title-box {
                  display: flex;
                  justify-content: center;
                  width: 92.5px;
                  span {
                    text-align: center;
                    font-size: 17px;
                    text-align: center;
                    color: #d8e7ff;
                    font-weight: 100;
                  }
                  span {
                    text-align: center;
                    font-size: 20px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.34px;
                    text-align: center;
                    color: #d8e7ff;
                    font-weight: 100;
                  }
                }
              }
              .t-box {
                width: 90px;
                display: flex;
                justify-content: center;

                span {
                  text-align: center;
                  font-size: 20px;
                  font-weight: normal;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: normal;
                  letter-spacing: 0.34px;
                  text-align: center;
                  color: #d8e7ff;
                  font-weight: 100;
                }
              }
              .t-box-counter {
                margin-left: 10px;
                .tab-title-counter {
                  display: flex;
                  justify-content: center;
                  width: 33px;
                  height: 33px;
                  border-radius: 8px;
                  border: solid 1px #ec5656;
                  span {
                    color: #ec5656;
                  }
                }
              }
            }
          }
        }
      }
    }
    .table-right {
      border-right: 3px solid #8577d1;
      width: 100%;
      thead {
        display: flex;
        flex-direction: row;
        padding: 15px 0;
        border-bottom: 1px solid #07111e;
        position: relative;
        width: 99%;
        tr {
          display: flex;
          flex-direction: row;
          align-items: center;
          .title {
            .table-title {
            }
            .right-tab-wrapper {
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 270px;

              .app-card-icon {
                margin-right: 25px;
              }
              .main-header-title {
                font-size: 20px;

                font-weight: bold;
                text-align: right;
                color: #dae8fc;
                margin-right: 20px;
              }
            }
          }
        }
        .header-title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 10px;
          .header-title {
            text-align: center;
            span {
              font-size: 17px;
              color: #dae8fc;
            }
          }
        }
      }
      .sub-table-wrapper {
        display: flex;
        flex-direction: row;
        .sub-table-box {
          height: 235px;
          overflow: auto;
          width: 100%;
          .tab {
            display: flex;
            flex-direction: row;
            padding: 12px 0;
            transition: all 0.5s;
            border-bottom: 1px solid #07111e;
            width: 100%;
            a {
              width: 100%;
            }
            &:hover {
              background: #05395b;
              transition: all 0.5s;
            }
            .sub-title-wrapper {
              display: flex;
              flex-direction: row;
              cursor: pointer;
              .head-box {
                width: 250px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                p {
                  font-size: 19px;
                  font-weight: bold;

                  text-align: right;
                  color: #dae8fc;
                  margin-right: 20px;
                }
                span {
                  width: 130px;
                  text-align: left;
                }
                .sub-head {
                  width: 130px;
                  text-align: left;
                }
              }
              .title-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-evenly;
                width: 100%;

                .title-box {
                  display: flex;
                  position: relative;
                  padding: 0 25px;
                  .kpi {
                    border: 1px solid #ec5656;
                    width: 33px;
                    height: 33px;
                    border-radius: 8px;
                    text-align: center;
                    color: #ec5656;
                    position: absolute;
                    top: -5%;
                    right: -15%;
                    margin-left: 15px;
                    font-weight: bold;
                    span {
                      text-align: center;
                      font-size: 22px;
                      font-weight: 600;
                      text-align: center;
                      font-weight: 100;
                      color: #ec5656;
                    }
                  }
                  span {
                    text-align: center;
                    font-size: 20px;
                    text-align: center;
                    color: #d8e7ff;
                    font-weight: 100;
                    padding: 0 0px;
                  }
                }
              }
              .t-box {
                width: 84px;
                display: flex;
                justify-content: center;
                span {
                  text-align: center;
                  font-size: 20px;
                  text-align: center;
                  color: #d8e7ff;
                  font-weight: 100;
                }
              }
              .t-box-counter {
                margin-left: 10px;
                .tab-title-counter {
                  display: flex;
                  justify-content: center;
                  width: 33px;
                  height: 33px;
                  border-radius: 8px;
                  border: solid 1px #ec5656;
                  span {
                    color: #ec5656;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.total-data-left {
  padding: 10px 0;
  .total-data-left-wrapper {
    height: 98px;
    object-fit: contain;
    border-radius: 4px;
    border: solid 1px #023e58;
    background-color: #042941;
  }
}
</style>
