<template>
  <div
    class="transportations-index"
    :class="{ expanded: expanded }"
    v-if="!screen.loading && screen.data"
  >
    <app-statistics
      :stats="screen.data.cards"
      :title="screen.data.title || title"
      :color="screen.data.color"
      :type="$screenTypes.TYPE_CHANGES_TRANSPORTS"
    >
    </app-statistics>
    <div class="overflow-scroll">
      <div class="tabs-container" :class="{ expanded: expanded }">
        <div class="right-tab" :class="{ expanded: expanded }">
          <app-urgenttransfers
            :table="screen.data.ugrentTransfers"
            :expanded="expanded"
            :type="$screenTypes.TYPE_URGENT_TRANSPORTS"
          >
          </app-urgenttransfers>
        </div>
        <div class="left-tab" :class="{ expanded: expanded }">
          <!-- <app-urgenttransfers
            :table="screen.data.totalTransfers"
            :expanded="expanded"
            :type="$screenTypes.TYPE_CHANGES_TRANSPORTS"
          >
          </app-urgenttransfers> -->

          <app-table
            :table="screen.data.totalTransfers"
            :type="$screenTypes.TYPE_CHANGES_TRANSPORTS"
            :expanded="expanded"
          >
          </app-table>
        </div>
      </div>

      <div class="graphs-container" v-if="!expanded">
        <div class="changes-box" v-if="!expanded">
          <div class="changes-box-head">
            <div class="wrapper">
              <div class="changes-box-header" @click="expandTable">
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
                    <div
                      :class="{ 'active-point': currentPosition == 2 }"
                      class="point-in"
                    ></div>
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
        <div class="traffic-box" v-if="!expanded">
          <div class="traffic-box-head">
            <div class="wrapper">
              <div class="traffic-box-header" @click="expandTable">
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
            <div class="wrapper-title">
              <p>דקות</p>
              <p>כמות</p>
            </div>
            <transform-chart :transfers="lastTransfers"></transform-chart>
          </div>
        </div>
      </div>

      <div @click="expandTable" v-if="expanded" class="data-transfer">
        <div class="right-data">
          <div class="right-data-wrapper">
            <div class="head-wrap">
              <span v-html="$icon('loc')"> </span>
              <h1>שינועים לפי מורכבות</h1>
            </div>
            <div class="cont-wrap">
              <div class="urg-item" v-for="urg in urgentArr" :key="urg">
                <div>
                  <h1 class="val">{{ urg.value }}</h1>
                  <h1>{{ urg.unit }}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-data">
          <div class="left-data-wrapper">
            <div class="head-wrap">
              <span v-html="$icon('invalid')"> </span>
              <h1>תנועה יומית</h1>
            </div>
            <div class="cont-wrap">
              <div class="done-cart">
                <span class="done">{{ totalDone }}</span>
                <span>בוצעו</span>
              </div>
              <div class="inprog-cart">
                <span class="prog">{{ totalProgress }}</span>
                <span>בתהליך</span>
              </div>
              <div class="avg-cart">
                <span class="avg">{{ avgText }}</span>
                <span>זמן ממוצע</span>
              </div>
              {{ calcProcces }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TransformChart from "../components/TransformChart.vue";
import moment from "moment";

export default {
  components: { TransformChart },
  data() {
    return {
      title: "עולם השינוע",
      totalSeconds: 20,
      currentPosition: 2,
      expanded: false,
      totalProgress: 0,
      totalDone: 0,
      totalAvg: 0,
      average: "00:03:39",
      urgentArr: [],
    };
  },
  props: {
    unitId: [String, Number],
  },
  async created() {
    await this.fetchData();

    let progress = this.screen.data.last24HoursTransfers.MovementsInProgress.reduce(
      (total, b) => {
        return total + parseInt(b.Value);
      },
      0
    );
    this.totalProgress = progress;

    let avg = this.screen.data.last24HoursTransfers.MovementsAvg.reduce(
      (total, b) => {
        return total + parseInt(b.Value);
      },
      0
    );
    this.totalAvg = avg;

    let done = this.screen.data.last24HoursTransfers.MovementsDone.reduce(
      (total, b) => {
        return total + parseInt(b.Value);
      },
      0
    );
    this.totalDone = done;

    let urgent = this.screen.data.movementsByComplexity.Urgent;
    let normal = this.screen.data.movementsByComplexity.Normal.map(
      (n) => n.Value
    );
    let urgentCala = [...new Set(urgent)];
    let dup = urgentCala.map((val) => ({
      unit: val.Unit,
      value: normal.reduce((a, b) => a + val.Value),
    }));

    this.urgentArr = dup;
  },
  computed: {
    steps() {
      return this.currentPosition == 1
        ? this.screen.data.movementsByComplexity.Urgent
        : this.screen.data.movementsByComplexity.Normal;
    },
    lastTransfers() {
      return this.screen.data.last24HoursTransfers;
    },
    avgText() {
      const avgMinutes =
        this.totalAvg /
        this.screen.data.last24HoursTransfers.MovementsAvg.length;

      const avgSeconds = avgMinutes * 60;

      return moment.utc(avgSeconds * 1000).format("HH:mm:ss");
    },
  },
  methods: {
    expandTable() {
      this.expanded = !this.expanded;
    },
    async fetchData(refresh = false) {
      await this.$store.dispatch("loadScreen", {
        id: this.unitId,
        refresh: refresh,
        type: this.$screenTypes.TYPE_UNITS,
      });
    },
    goToTab(tabId) {
      this.$router.push({
        name: `${this.world.route}.unit`,
        params: {
          unitId: tabId,
        },
      });
    },
    toggleChangesOptions(index) {
      return (this.currentPosition = index);
    },
  },
};
</script>

<style lang="scss" scoped>
.transportations-index {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  overflow: auto;
  .overflow-scroll {
    // border: 1px solid red;
    max-height: calc(100vh - 250px);
    // overflow: auto;
    margin-top: 25px;
    padding-left: 13px;
    .operations-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .actions-btns {
        display: flex;
        a {
          cursor: pointer;
          font-size: 22px;
          padding: 0 25px;
          letter-spacing: 0.3px;
          color: rgba(218, 232, 252, 0.6);
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          border: solid 1px #dae8fc;
          background-color: rgba(5, 23, 36, 0.7);
          margin-right: 11px;
          transition: all 0.2s ease-in-out;

          &:hover {
            background-color: rgba(218, 232, 252, 0.6);
            color: rgba(5, 23, 36, 0.7);
          }
        }
      }
    }
    .tabs-container {
      display: flex;
      flex-direction: row;

      &.expanded {
        height: calc(100% - 130px);
      }

      .right-tab {
        width: 51.7%;
        // border-right: 3px solid #34a9ff;
        height: 100%;
        &.expanded {
          height: 100%;
        }
      }
      .left-tab {
        width: 46.7%;
        margin-right: auto;
        border-right: 3px solid #8577d1;
        overflow: auto;
        height: 308px;

        &.expanded {
          max-height: 100%;
          height: 100%;
          background-image: radial-gradient(
            circle at 10% 11%,
            #032b45,
            #042840 39%
          );
        }
      }
    }
    .data-wrapper {
      display: flex;
      flex-direction: row;

      .total-data-left {
        padding-right: 5px;
        width: 50%;
        .total-data-left-wrapper {
          border-radius: 4px;
          border: solid 1px #023e58;
          background-color: #042941;
        }
      }
      .total-data-right {
        padding-right: 5px;
        width: 50%;
        .total-data-left-wrapper {
          border-radius: 4px;
          border: solid 1px #023e58;
          background-color: #042941;
        }
      }
    }
    .graphs-container {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      flex: 100%;
      .changes-box {
        border: 1px solid #023e58;
        background-color: #042941;
        border-radius: 4px;
        flex: 40%;
        margin-left: 8px;
        .changes-box-head {
          .wrapper {
            display: flex;
            flex-direction: row;
            .changes-box-header {
              width: 75%;
              cursor: pointer;
              h5 {
                color: #dae8fc;
                font-size: 20px;
                font-weight: bold;
                margin: 20px 20px;
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
                height: 62px;
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
                    &.active {
                      background: green;
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
         
        }
      }
      .traffic-box {
        margin-right: auto;
        background-color: #042941;
        border: 1px solid #023e58;
        border-radius: 4px;
        flex: 60%;
        margin-right: 10px;
        .traffic-box-head {
          width: 100%;
          height: 100%;
          padding: 0 25px;
          .wrapper {
            display: flex;
            flex-direction: row;
            padding: 0 0px;
            .traffic-box-header {
             flex: 70%;
              cursor: pointer;
              h5 {
                color: #dae8fc;
                font-size: 20px;
                font-weight: bold;
                margin: 20px 0px;
                letter-spacing: 0.27px;
                text-align: right;
              }
            }
            .traffic-box-options {
              flex: 30%;
              .check-option {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 62px;
                .check-option-box {
                  width: 33%;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  span {
                    font-size: 16px;
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
          .wrapper-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            p {
              color: white;
              font-size: 13px;
            }
          }
        }
      }
    }
    .data-transfer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;

      .right-data {
        width: 959px;
        object-fit: contain;
        border-radius: 4px;
        border: solid 1px #023e58;
        background-color: #042941;
        .right-data-wrapper {
          height: 98px;
          display: flex;
          align-items: center;
          .head-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            margin-right: 25px;
            width: 20%;
            h1 {
              font-size: 20px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: 0.27px;
              text-align: right;
              color: #dae8fc;
              margin: 0 15px;
            }
          }
          .cont-wrap {
            display: flex;
            flex-direction: row;
            width: 80%;
            .urg-item {
              width: 20%;
              border-left: 1px solid rgba(16, 204, 203, 0.28);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .val {
                font-size: 30px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.39px;
                text-align: center;
                color: #dae8fc;
              }
              h1 {
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: 0.27px;
                text-align: right;
                color: #dae8fc;
              }
            }
            .urg-item:nth-child(5) {
              border-left: 1px solid transparent;
            }
          }
        }
      }
      .left-data {
        width: 843px;
        object-fit: contain;
        border-radius: 4px;
        border: solid 1px #023e58;
        background-color: #042941;
        .left-data-wrapper {
          height: 98px;
          display: flex;
          align-items: center;
          .head-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            // justify-content: space-evenly;
            margin-right: 15px;
            width: 35%;
            // border: 1px solid red;
            h1 {
              font-size: 20px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: 0.27px;
              text-align: right;
              color: #dae8fc;
              margin: 0;
              margin-right: 15px;
            }
          }
          .cont-wrap {
            display: flex;
            flex-direction: row;
            width: 65%;
            .done-cart {
              width: 35%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              border-right: 6px solid #10cccb;
              padding: 0 15px;
              span {
                opacity: 0.56;
                font-size: 17px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.22px;
                text-align: center;
                color: #c6d9f5;
              }
              .done {
                font-size: 35px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.45px;
                text-align: center;
                color: #dae8fc;
                opacity: 1;
              }
            }
            .inprog-cart {
              width: 25%;
              border-right: 6px solid #34a9ff;
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              padding: 0 15px;
              span {
                opacity: 0.56;
                font-size: 17px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.22px;
                text-align: center;
                color: #c6d9f5;
              }
              .prog {
                font-size: 35px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.45px;
                text-align: center;
                color: white;
                opacity: 1;
              }
            }
            .avg-cart {
              width: 45%;
              border-right: 6px solid #e24d91;
              display: flex;
              align-items: flex-start;
              flex-direction: column;
              padding: 0 15px;
              span {
                opacity: 0.56;
                font-size: 17px;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.22px;
                text-align: center;
                color: #c6d9f5;
              }
              .avg {
                font-size: 35px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: -0.45px;
                text-align: center;
                color: white;
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
  &.expanded {
    // height: 1040px;
  }
}
</style>
