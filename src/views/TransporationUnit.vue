<template>
  <div class="transportations-unit" v-if="!screen.loading && screen.data">
    <app-statistics
      :stats="screen.data.cards"
      :title="screen.data.title || title"
      :color="screen.data.color"
    >
    </app-statistics>
    <div class="overflow-scroll">
      <div class="tabs-container">
        <div class="wrapper-top">
          <div class="right-tab">
            <app-table
              :table="screen.data.outTransports"
              :type="$screenTypes.TYPE_URGENT_TRANSPORTS"
            >
            </app-table>
          </div>
          <div class="left-tab">
            <div class="traffic-box">
              <div class="traffic-box-head">
                <div class="wrapper">
                  <div class="traffic-box-header">
                    <h5>תנועות ביממה האחרונה</h5>
                  </div>
                  <div class="traffic-box-options">
                    <div class="check-option">
                      <div class="check-option-box">
                        <div class="point-in"></div>
                        <span>בתהליך</span>
                      </div>
                      <div class="check-option-box">
                        <div class="point"></div>
                        <span>בוצעו</span>
                      </div>
                      <div class="check-option-box">
                        <span>--- זמן ממוצע</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <transform-chart
              :transfers="screen.data.last24HoursTransfers"
            ></transform-chart>
          </div>
        </div>
        <div class="wrapper-bottom">
          <!-- <changes-chart
          :steps="screen.data.movementsByComplexity.Normal"
          :currentPosition="this.currentPosition"
        ></changes-chart> -->
          <div class="right-tab-bottom">
            <app-table
              :table="screen.data.inTransports"
              :type="$screenTypes.TYPE_URGENT_TRANSPORTS"
            >
            </app-table>
          </div>
          <div class="changes-box">
            <div class="changes-box-head">
              <div class="wrapper">
                <div class="changes-box-header">
                  <h5>שינועים לפי מורכבות</h5>
                </div>
                <div class="changes-box-options">
                  <div class="check-option">
                    <div class="check-option-box">
                      <div
                        :class="{ 'active-point': currentPosition == 1 }"
                        class="point"
                      ></div>
                      <span>דחופים</span>
                    </div>
                    <div class="check-option-box">
                      <div class="point-in"></div>
                      <span>רגילים</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="changes-box-cont">
              <changes-chart
                :steps="steps"
                :currentPosition="this.currentPosition"
              ></changes-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "שינועים מלר''ד",
      currentPosition: 2,
    };
  },
  props: {
    unitId: {},
    borderColor: {
      type: String,
      default: "",
    },
    table: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: Number,
    },
    tableTitle: {
      type: String,
      default: "",
    },
  },

  created() {
    console.log(this.data, "data");
    this.fetch();
  },
  computed: {
    // steps() {
    //   return this.currentPosition == 1
    //     ? this.screen.data.last24HoursTransfers
    //     : this.screen.data.last24HoursTransfers;
    // },
    steps() {
      return this.currentPosition == 1
        ? this.screen.data.movementsByComplexity.Urgent
        : this.screen.data.movementsByComplexity.Normal;
    },
  },
  methods: {
    async fetch(refresh = false) {
      await this.$store.dispatch("loadScreen", {
        id: this.unitId,
        refresh,
        type: this.$screenTypes.TYPE_UNITS,
      });
    },
  },
  toggleChangesOptions(index) {
    return (this.currentPosition = index);
  },
};
</script>

<style lang="scss" scoped>
.transportations-unit {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
}
.overflow-scroll {
  max-height: calc(100vh - 250px);
  // overflow-y: auto;
  margin-top: 25px;
  padding-left: 13px;
  .tabs-container {
    .wrapper-top {
      display: flex;
      flex-direction: row;
      justify-content: start;
      max-height: 294px;
      .right-tab {
        width: 1120px;
      }
      .left-tab {
        width: 695px;
        margin-right: auto;
        border: 1px solid #023e58;
        background-color: #042941;
        border-radius: 4px;

        .traffic-box-head {
          width: 100%;
          height: 100%;

          padding: 20px 20px 0 0;

          .transform-chart {
            position: relative;
            width: 100%;
            direction: ltr;
          }

          .wrapper {
            display: flex;
            flex-direction: row;
            .traffic-box-header {
              width: 59%;

              h5 {
                color: #dae8fc;
                font-size: 20px;
                font-weight: bold;
                // margin: 20px 20px;
                letter-spacing: 0.27px;
                text-align: right;
              }
            }
            .traffic-box-options {
              width: 34%;
              margin-right: auto;
              margin-left: 25px;

              .check-option {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                // height: 62px;
                .check-option-box {
                  width: 33%;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  span {
                    font-size: 15px;
                    color: #dce8fd;
                    cursor: pointer;
                    text-align: left;
                  }
                  .point {
                    width: 10px;
                    height: 10px;
                    border: 1px solid white;
                    border-radius: 50%;
                    margin-left: 13px;
                    background: #10cccb;
                    &.active-point {
                      background-color: transparent;
                      background-image: linear-gradient(
                        159deg,
                        #1fd487 -10%,
                        #38bee2 110%
                      );
                    }
                  }
                  .point-in {
                    width: 10px;
                    height: 10px;
                    border: 1px solid white;
                    border-radius: 50%;
                    margin-left: 13px;
                    background: #8577d1;
                  }
                }
              }
            }
          }
        }
      }
    }
    .wrapper-bottom {
      padding-top: 35px;
      display: flex;
      flex-direction: row;
      max-height: calc(100vh - 635px);
      .changes-box {
        border: 1px solid #023e58;
        background-color: #042941;
        border-radius: 4px;
        width: 630px;
        // height: 283px;
        margin-right: auto;
        .changes-box-head {
          padding: 20px 20px 0 0;

          .wrapper {
            display: flex;
            flex-direction: row;
            .changes-box-header {
              width: 75%;
              h5 {
                color: #dae8fc;
                font-size: 20px;
                font-weight: bold;
                // margin: 20px 20px;
                letter-spacing: 0.27px;
                text-align: right;
              }
            }
            .changes-box-options {
              width: 25%;
              .check-option {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                // height: 62px;
                .check-option-box {
                  display: -webkit-inline-box;
                  align-items: center;
                  justify-content: space-around;
                  width: 100%;
                  height: 100%;
                  .point {
                    width: 10px;
                    height: 10px;
                    border: 1px solid white;
                    border-radius: 50%;
                    margin-left: 13px;
                    background: #8577d1;
                  }

                  span {
                    font-size: 16px;
                    color: red;
                    cursor: pointer;
                    text-align: left;
                  }
                }
              }
            }
          }
        }
        .changes-box-cont {
          // height: 25vh;
        }
      }
      .changes-chart-unit {
        // border: 1px solid red;
      }
      .changes-box {
        border: 1px solid #023e58;
        background-color: #042941;
        border-radius: 4px;
        width: 695px;
        // height: 230px;
        .changes-box-head {
          // border: 1px solid red;

          padding: 20px 20px 0 0;
          .wrapper {
            display: flex;
            flex-direction: row;
            .changes-box-header {
              width: 75%;
              h5 {
                color: #dae8fc;
                font-size: 20px;
                font-weight: bold;
                margin: 0 0;
                letter-spacing: 0.27px;
                text-align: right;
              }
            }
            .changes-box-options {
              width: 25%;
              .check-option {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                // height: 62px;
                .check-option-box {
                  display: -webkit-inline-box;
                  align-items: center;
                  justify-content: space-around;
                  width: 100%;
                  height: 100%;
                  .point {
                    width: 10px;
                    height: 10px;
                    border: 1px solid white;
                    border-radius: 50%;
                    margin-left: 13px;
                    background: #10cccb;
                  }
                  .point-in {
                    width: 10px;
                    height: 10px;
                    border: 1px solid white;
                    border-radius: 50%;
                    margin-left: 13px;
                    background: #8577d1;
                  }
                  span {
                    font-size: 16px;
                    color: #dce8fd;
                    cursor: pointer;
                    text-align: left;
                  }
                }
              }
            }
          }
        }
        .changes-box-cont {
          // border: 1px solid red;
          // height: 25vh;
        }
      }
      .right-tab-bottom {
        width: 1120px;
        margin-left: 30px;
      }
      .x {
        width: 1168px;
        margin-right: 35px;
        // height: 250px;
      }
    }
  }
}
</style>
