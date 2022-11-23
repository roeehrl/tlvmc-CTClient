<template>
  <div class="app-table" ref="tableContainer">
    <div
      :class="{
        'app-table-container-active': table.tabletype === 7,
        'app-table-container': table.tabletype != 7,
      }"
    >
      <table
        :class="{
          'table-r': table.tabletype === 7,
          'table-left': table.tabletype != 7,
        }"
      >
        <thead>
          <tr>
            <th class="title">
              <span class="table-title" v-if="tableTitle">
                {{ tableTitle }}
              </span>
              <div class="right-tab-wrapper" v-if="table.mainheader">
                <span
                  class="app-card-icon"
                  v-html="
                    this.$icon(
                      table.mainheader.iconName || table.mainheader.icon
                    )
                  "
                >
                </span>
                <span class="main-header-title"
                  >{{ table.mainheader.title }}
                </span>
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
            <div class="tab" v-for="(urgent, i) in table.patients" :key="i">
              <div class="sub-title-wrapper">
                <div class="head-box">
                  <p class="head">
                    {{ urgent.transformHeader }}
                  </p>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.eventNum }}</span>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.transforNum }}</span>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.prefer }}</span>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.complicated }}</span>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.status }}</span>
                </div>
                <div class="t-box">
                  <span v-if="urgent.delay === true" v-html="$icon('check')">
                  </span>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.arrival }}</span>
                </div>
                <div class="t-box">
                  <span class="tab-title">{{ urgent.timeArrival }}</span>
                </div>
                <div class="t-box">
                  <span v-if="urgent.corona === true" v-html="$icon('check')">
                  </span>
                </div>
                <div class="t-box">
                  <span v-if="urgent.complex === true" v-html="$icon('check')">
                  </span>
                </div>
              </div>
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
    return {
      currentRoute: this.$route.name,
    };
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
    type: {
      type: Number,
    },
    tableTitle: {
      type: String,
      default: "",
    },
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
  .app-table-container {
    border: 1px solid red;
    height: 310px;
    display: flex;
    flex-direction: row;
    // border-right: 2px solid #34a9ff;
    .table-left {
      position: fixed;
      width: 1120px;
      thead {
        display: flex;
        flex-direction: row;
        padding: 14px 8px;
        border-bottom: 1px solid #07111e;
        position: relative;
        width: 99.3%;
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
              width: 225px;
              .app-card-icon {
                margin-right: 15px;
              }
              .main-header-title {
                font-size: 23.2px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: none;
                letter-spacing: 0.32px;
                text-align: right;
                color: #dae8fc;
                margin-right: 20px;
                width: 50%;
              }
            }
          }
        }
        .header-title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-align: center;
          .header-title {
            width: 72px;

            span {
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: none;
              letter-spacing: 0.27px;
              color: #dae8fc;
            }
          }
        }
      }
      .sub-table-wrapper {
        display: flex;
        flex-direction: row;
        .sub-table-box {
          height: 230px;
          overflow: auto;
          .tab {
            display: flex;
            flex-direction: row;
            padding: 12px 0;
            transition: all 0.5s;
            border-bottom: 1px solid #07111e;
            width: 100%;
            // border: 1px solid red;
            &:hover {
              background: #05395b;
              transition: all 0.5s;
            }
            .sub-title-wrapper {
              display: flex;
              flex-direction: row;
              cursor: pointer;
              .head-box {
                width: 231px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                p {
                  font-size: 18px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: normal;
                  letter-spacing: 0.32px;
                  text-align: right;
                  color: #dae8fc;
                  margin-right: 25px;
                }
                span {
                  width: 130px;
                  text-align: left;
                }
                .sub-head {
                  width: 130px;
                  text-align: right;
                }
              }
              .t-box {
                width: 87.8px;
                display: flex;
                justify-content: center;
                align-items: center;
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
    // .table-r {
    //   position: fixed;
    //   width: 1175px;
    //   thead {
    //     display: flex;
    //     flex-direction: row;
    //     padding: 14px 8px;
    //     border-bottom: 1px solid #07111e;
    //     position: relative;
    //     width: 99.3%;
    //     tr {
    //       display: flex;
    //       flex-direction: row;
    //       align-items: center;
    //       .title {
    //         .table-title {
    //         }
    //         .right-tab-wrapper {
    //           display: flex;
    //           flex-direction: row;
    //           align-items: center;
    //           width: 225px;
    //           .app-card-icon {
    //             margin-right: 15px;
    //           }
    //           .main-header-title {
    //             font-size: 23.2px;
    //             font-weight: bold;
    //             font-stretch: normal;
    //             font-style: normal;
    //             line-height: none;
    //             letter-spacing: 0.32px;
    //             text-align: right;
    //             color: #dae8fc;
    //             margin-right: 20px;
    //             width: 50%;
    //             border: 1px solid red;
    //           }
    //         }
    //       }
    //     }
    //     .header-title-wrapper {
    //       display: flex;
    //       flex-direction: row;
    //       align-items: center;
    //       justify-content: center;
    //       width: 100%;
    //       text-align: center;
    //       .header-title {
    //         width: 72px;

    //         span {
    //           font-size: 18px;
    //           font-weight: normal;
    //           font-stretch: normal;
    //           font-style: normal;
    //           line-height: none;
    //           letter-spacing: 0.27px;
    //           color: #dae8fc;
    //         }
    //       }
    //     }
    //   }
    //   .sub-table-wrapper {
    //     display: flex;
    //     flex-direction: row;
    //     .sub-table-box {
    //       height: 243px;
    //       overflow: auto;
    //       .tab {
    //         display: flex;
    //         flex-direction: row;
    //         padding: 12px 0;
    //         transition: all 0.5s;
    //         border-bottom: 1px solid #07111e;
    //         width: 100%;
    //         &:hover {
    //           background: #05395b;
    //           transition: all 0.5s;
    //         }
    //         .sub-title-wrapper {
    //           display: flex;
    //           flex-direction: row;
    //           cursor: pointer;
    //           .head-box {
    //             width: 231px;
    //             display: flex;
    //             flex-direction: row;
    //             align-items: flex-start;
    //             justify-content: flex-start;
    //             p {
    //               font-size: 18px;
    //               font-weight: bold;
    //               font-stretch: normal;
    //               font-style: normal;
    //               line-height: normal;
    //               letter-spacing: 0.32px;
    //               text-align: right;
    //               color: #dae8fc;
    //               margin-right: 25px;
    //             }
    //             span {
    //               width: 130px;
    //               text-align: left;
    //             }
    //             .sub-head {
    //               width: 130px;
    //               text-align: right;
    //             }
    //           }
    //           .t-box {
    //             width: 93.8px;
    //             display: flex;
    //             justify-content: center;
    //             align-items: center;
    //             span {
    //               text-align: center;
    //               font-size: 20px;
    //               font-weight: normal;
    //               font-stretch: normal;
    //               font-style: normal;
    //               line-height: normal;
    //               letter-spacing: 0.34px;
    //               text-align: center;
    //               color: #d8e7ff;
    //               font-weight: 100;
    //             }
    //           }
    //           .t-box-counter {
    //             margin-left: 10px;
    //             .tab-title-counter {
    //               display: flex;
    //               justify-content: center;
    //               width: 33px;
    //               height: 33px;
    //               border-radius: 8px;
    //               border: solid 1px #ec5656;
    //               span {
    //                 color: #ec5656;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
  .app-table-container-active {
    height: 290px;
    border-right: 2px solid #8577d1;
    overflow: auto;
    .table-r {
      position: fixed;
      width: 1175px;
      thead {
        display: flex;
        flex-direction: row;
        padding: 14px 8px;
        border-bottom: 1px solid #07111e;
        position: relative;
        width: 94.6%;
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
              width: 225px;
              .app-card-icon {
                margin-right: 15px;
              }
              .main-header-title {
                font-size: 23.2px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: none;
                letter-spacing: 0.32px;
                text-align: right;
                color: #dae8fc;
                margin-right: 20px;
                width: 50%;
              }
            }
          }
        }
        .header-title-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-align: center;
          .header-title {
            width: 72px;

            span {
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: none;
              letter-spacing: 0.27px;
              color: #dae8fc;
            }
          }
        }
      }
      .sub-table-wrapper {
        display: flex;
        flex-direction: row;
        .sub-table-box {
          height: 210px;
          overflow: auto;
          // border: 1px solid red;
          .tab {
            display: flex;
            flex-direction: row;
            padding: 12px 0;
            transition: all 0.5s;
            border-bottom: 1px solid #07111e;
            width: 100%;
            &:hover {
              background: #05395b;
              transition: all 0.5s;
            }
            .sub-title-wrapper {
              display: flex;
              flex-direction: row;
              cursor: pointer;
              padding: 0 5px;
              .head-box {
                width: 231px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                p {
                  font-size: 18px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: normal;
                  letter-spacing: 0.32px;
                  text-align: right;
                  color: #dae8fc;
                  margin-right: 25px;
                }
                span {
                  width: 130px;
                  text-align: left;
                }
                .sub-head {
                  width: 130px;
                  text-align: right;
                }
              }
              .t-box {
                width: 86.8px;
                display: flex;
                justify-content: center;
                align-items: center;
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
  }
}
.app-table-active {
}
</style>
