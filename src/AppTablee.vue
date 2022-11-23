<template>
  <div
    class="app-table"
    :class="cssClasses"
    ref="tableContainer"
    :style="{ 'border-right': borderColor ? `2px solid ${borderColor}` : '' }"
  >
    <div class="app-table-container">
      <table>
        <thead>
          <tr>
            <th class="title">
              <!-- <span class="table-title" v-if="tableTitle">
                {{ tableTitle }}
              </span> -->
              <div
                v-if="
                  table.mainheader &&
                    type === $screenTypes.TYPE_URGENT_TRANSPORTS
                "
                class="right-tab-wrapper"
              >
                <span class="main-header-title"
                  >{{ table.mainheader.title }}
                </span>
              </div>

              <div
                v-if="
                  table.icon &&
                    table.title &&
                    type === $screenTypes.TYPE_CHANGES_TRANSPORTS
                "
                class="right-tab-wrapper"
              >
                <span class="app-card-icon" v-html="this.$icon(table.icon)">
                </span>
                <span class="main-header-title">{{ table.title }} </span>
              </div>
            </th>
            <th
              :class="{
                transports: type === $screenTypes.TYPE_URGENT_TRANSPORTS,
                transportUnits: type === $screenTypes.TYPE_CHANGES_TRANSPORTS,
              }"
              v-for="head in table.header"
              :key="head"
            >
              <span>{{ head }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Units -->
          <tr
            v-if="!type === $screenTypes.TYPE_UNITS"
            class="units"
            v-for="unit in table.units"
            :key="unit"
          >
            <td @click="goToUnit(unit)" class="title-col">
              <div class="title-inner">
                <div class="title">{{ unit.unitName }}</div>
                <div class="subtitle">{{ unit.unitSubText }}</div>
                <div
                  class="title-border"
                  :style="{
                    backgroundColor: unit.color ? unit.color : '#ec3e60',
                  }"
                ></div>
              </div>
            </td>
            <app-table-cell
              class="trend-column"
              v-for="(column, index) in unit.unitParams"
              :kpi="column.kpi || 0"
              :key="column.kpi + column.cellText + index"
              :direction="column.direction || 0"
              :link="column.link || ''"
              @click="showTrend(unit, column)"
              :is-big="isBig"
              :is-small="!isBig"
              :text="column.cellText || ''"
            >
            </app-table-cell>
          </tr>

          <!-- Patients -->
          <tr
            v-if="
              type === $screenTypes.TYPE_PATIENTS ||
                type === $screenTypes.TYPE_URGENT_TRANSPORTS ||
                type === $screenTypes.TYPE_CHANGES_TRANSPORTS
            "
            class="patients"
            :class="{
              transports: type === $screenTypes.TYPE_URGENT_TRANSPORTS,
              transportUnits: type === $screenTypes.TYPE_CHANGES_TRANSPORTS,
              expanded: expanded === true,
            }"
            v-for="patient in patientData"
            :key="patient"
          >
            <td @click="goToPatient(patient)" class="title-col">
              <div
                v-if="type !== $screenTypes.TYPE_CHANGES_TRANSPORTS"
                class="title-inner"
              >
                <span
                  v-if="type === $screenTypes.TYPE_PATIENTS"
                  v-html="$icon(patient.sex === 1 ? 'male' : 'female')"
                  class="avatar"
                ></span>
                <div class="title">
                  {{ patient.patName }}
                </div>
              </div>

              <div
                v-if="type === $screenTypes.TYPE_CHANGES_TRANSPORTS"
                class="title-inner"
              >
                <div class="title">
                  {{ patient.fromUnit }}
                </div>
              </div>
            </td>

            <app-table-cell
              v-for="(column, index) in patient.patientParams"
              :type="type"
              :kpi="column.kpi || 0"
              :direction="column.direction || 0"
              :index="index"
              :is-transports="type === $screenTypes.TYPE_URGENT_TRANSPORTS"
              :is-transports-unit="
                type === $screenTypes.TYPE_CHANGES_TRANSPORTS
              "
              :key="column.kpi + column.cellText + index"
              :link="column.link || ''"
              :is-big="isBig"
              :is-small="!isBig"
              :is-smaller="
                type === $screenTypes.TYPE_URGENT_TRANSPORTS ||
                  type === $screenTypes.TYPE_URGENT_TRANSPORTS
              "
              :text="column.cellText || ''"
            >
            </app-table-cell>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AppTableCell from "./AppTableCell";

export default {
  name: "app-table",

  components: { AppTableCell },

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
    expanded: {
      type: Boolean,
    },
  },

  data() {
    return {
      tableHeight: "100vh",
    };
  },

  methods: {
    goToUnit(unit) {
      let name = this.world.route;

      if (unit.nextScreenType === this.$screenTypes.TYPE_UNITS) {
        name += ".unit";
      } else if (
        unit.nextScreenType === this.$screenTypes.TYPE_PATIENTS ||
        unit.nextScreenType === this.$screenTypes.TYPE_URGENT_TRANSPORTS
      ) {
        name += ".patients";
      }

      this.$router.push({
        name,
        params: {
          unitId: unit.unitId,
        },
      });
    },

    goToPatient(patient) {
      if (
        !this.$config("SERVICE_PATIENT") ||
        this.type === this.$screenTypes.TYPE_URGENT_TRANSPORTS
      ) {
        return;
      }

      if (this.type === this.$screenTypes.TYPE_CHANGES_TRANSPORTS) {
        this.$router.push({
          name: `transporations.unit`,
          params: {
            unitId: patient.unitId || patient.unitid,
          },
        });
        return;
      }

      this.$router.push({
        name: `${this.world.route}.patient`,
        params: {
          patientId: patient.patId,
          unitId: this.screen.id,
        },
      });
    },

    showTrend(unit, column) {
      this.$store.commit("changeTrendPopupStatus", {
        show: true,
        trend: column.paramId,
        unitId: unit.unitId,
      });
    },
  },

  created() {
    this.$nextTick(() => {
      const timelineTop = this.$refs.tableContainer.offsetTop;
      let offsetBottom = 25;

      if (this.trendInline) {
        offsetBottom += 331;
      }

      // this.tableHeight = `calc(100vh - ${timelineTop + offsetBottom}px)`;
    });
  },

  computed: {
    patientData() {
      if (this.type === this.$screenTypes.TYPE_CHANGES_TRANSPORTS) {
        return this.table.units;
      }

      return this.table.patients;
    },
    isBig() {
      return (
        [
          this.$screenTypes.TYPE_PATIENTS,
          this.$screenTypes.TYPE_URGENT_TRANSPORTS,
          this.$screenTypes.TYPE_CHANGES_TRANSPORTS,
          this.$screenTypes.TYPE_MARLAD_UNIT,
        ].indexOf(this.type) < 0
      );
    },

    cssClasses() {
      return {
        big: this.isBig,
        small: !this.isBig,
        transports: this.type === this.$screenTypes.TYPE_URGENT_TRANSPORTS,
        transportUnits: this.type === this.$screenTypes.TYPE_CHANGES_TRANSPORTS,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.app-table {
  color: #fff;
  margin-top: 25px;
  border-radius: 4px;
  box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 39%);
  border-right: 2px solid transparent;

  &.transports {
    margin-top: 0;
    height: 100%;

    thead {
      th:nth-child(4),
      th:nth-child(5) {
        span {
          width: 60px;
        }
      }

      th:nth-child(8) {
        span {
          width: 112px;
        }
      }

      th:nth-child(9) {
        span {
          width: 110px;
        }
      }

      th:nth-child(10) {
        span {
          width: 40px;
        }
      }
    }

    span {
      font-size: 17px;
      display: initial;
      width: 82px;
      margin: 0 auto;
    }
    .main-header-title {
      width: 300px;
      padding: 0 20px;
      font-size: 20px;
    }
  }

  &.transportUnits {
    margin-top: 0;

    &.expanded {
      height: 100%;
    }
    span {
      font-size: 17px;
      display: block;

      margin: 0 auto;
    }
    th {
      padding: 14px 0;
      span:nth-child(2) {
        width: 155px;
      }
      &:not(.title) {
        span {
          display: inline;
          width: 80px;
          margin: 0 auto;
        }
      }
    }
    .main-header-title {
      font-size: 20px;
    }
    tbody {
      tr {
        border-top: 1px solid #07111e;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #05395b;
        }

        &.patients {
          &.expanded {
            height: 100%;
          }
          &.transports {
            td.title-col {
              padding-right: 9px;
              display: flex;
              align-items: center;
              cursor: pointer;
              width: 250px;

              .title-inner {
                display: flex;
                align-items: center;
                padding: 10px 0;

                .title {
                  font-size: 19px;
                }
              }
            }
          }

          td.title-col {
            padding-right: 9px;
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 250px;

            .title-inner {
              display: flex;
              align-items: center;
              padding: 15px 0;
              .avatar {
                width: 25px;
                height: 25px;
                display: block;
                flex-shrink: 0;
                flex-grow: 0;

                ::v-deep svg {
                  display: block;
                  width: 25px;
                  height: 25px;
                  overflow: visible;
                }
              }
              .title {
                font-size: 19px;
                font-weight: bold;
                letter-spacing: 0.32px;
                color: #dae8fc;
                padding-right: 10px;
              }
            }
          }
        }

        &.units {
          td.title-col {
            padding-right: 41px;
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 250px;

            .title-inner {
              display: flex;
              flex-direction: column;
              position: relative;
              padding: 25px 0;

              .title-dot {
                width: 6px;
                height: 6px;
                object-fit: contain;
                background-color: #ec3e60;
                border-radius: 50%;
                position: absolute;
                right: -15px;
                top: 31px;
              }

              .title {
                font-weight: bold;
                letter-spacing: 0.4px;
                color: #dae8fc;
                font-size: 29px;
              }

              .subtitle {
                font-size: 16px;
                letter-spacing: 0.22px;
                text-align: right;
                color: rgba(218, 232, 252, 0.6);
                margin-top: 4px;
              }

              .title-border {
                width: 31px;
                height: 2px;
                margin-top: 4px;
              }
            }
          }
        }

        td {
          position: relative;

          &.column {
            text-align: center;

            .column-body {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              transform: translate(-50%, -50%);
              top: 50%;
              left: 50%;
              width: 100%;
              .value {
                color: #dae8fc;
                font-size: 16px;
                span {
                  font-size: 15px;
                }
                &.has-color {
                  span {
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 20px !important;
                  }

                  &.kpi-1 span {
                    background-color: #ecae56;
                  }

                  &.kpi-2 span {
                    background-color: #ec5656;
                  }
                }
              }

              .percent {
                color: #dae8fc;
              }
            }
          }
        }
      }
    }
  }

  .app-table-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .title {
    hyphens: manual;
  }

  table {
    height: auto;

    th {
      position: sticky;
      top: 0;
      background-color: #042840;
      z-index: 1;
      box-shadow: 0 1px 0 0 #07111e;
    }
  }

  &.big {
    table {
      thead {
        tr {
          th {
            font-size: 20px;
          }
        }
      }
    }
  }

  &.small {
    table {
      thead {
        tr {
          th {
            font-size: 20px;

            &.transports {
              font-size: 20px;
            }

            &.title {
              width: 200px;
            }
          }
        }
      }
    }
  }

  table {
    width: 100%;

    thead {
      tr {
        th {
          letter-spacing: 0.27px;
          text-align: center;
          color: #dae8fc;
          padding: 25px 0;
          vertical-align: middle;
          &.transports {
            padding: 15px 0;

            span {
              display: inline-flex;
              justify-content: center;
              align-items: center;
            }
          }

          &:not(.title) {
            span {
            }
          }

          &.title {
            width: 185px;
          }
        }
      }
    }

    tbody {
      tr {
        border-top: 1px solid #07111e;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #05395b;
        }

        &.patients {
          &.transports {
            td.title-col {
              padding-right: 9px;
              display: flex;
              align-items: center;
              cursor: pointer;
              width: 250px;

              .title-inner {
                display: flex;
                align-items: center;
                padding: 10px 0;

                .title {
                  font-size: 19px;
                }
              }
            }
          }

          td.title-col {
            padding-right: 9px;
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 250px;

            .title-inner {
              display: flex;
              align-items: center;
              padding: 25px 0;

              .avatar {
                width: 25px;
                height: 25px;
                display: block;
                flex-shrink: 0;
                flex-grow: 0;

                ::v-deep svg {
                  display: block;
                  width: 25px;
                  height: 25px;
                  overflow: visible;
                }
              }

              .title {
                font-size: 23.2px;
                font-weight: bold;
                letter-spacing: 0.32px;
                color: #dae8fc;
                padding-right: 10px;
              }
            }
          }
        }

        &.units {
          td.title-col {
            padding-right: 41px;
            display: flex;
            align-items: center;
            cursor: pointer;
            width: 250px;

            .title-inner {
              display: flex;
              flex-direction: column;
              position: relative;
              padding: 25px 0;

              .title-dot {
                width: 6px;
                height: 6px;
                object-fit: contain;
                background-color: #ec3e60;
                border-radius: 50%;
                position: absolute;
                right: -15px;
                top: 31px;
              }

              .title {
                font-weight: bold;
                letter-spacing: 0.4px;
                color: #dae8fc;
                font-size: 29px;
              }

              .subtitle {
                font-size: 16px;
                letter-spacing: 0.22px;
                text-align: right;
                color: rgba(218, 232, 252, 0.6);
                margin-top: 4px;
              }

              .title-border {
                width: 31px;
                height: 2px;
                margin-top: 4px;
              }
            }
          }
        }

        td {
          position: relative;

          &.column {
            text-align: center;

            .column-body {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              transform: translate(-50%, -50%);
              top: 50%;
              left: 50%;
              width: 100%;
              .value {
                color: #dae8fc;

                &.has-color {
                  span {
                    padding: 6px 12px;
                    border-radius: 8px;
                  }

                  &.kpi-1 span {
                    background-color: #ecae56;
                  }

                  &.kpi-2 span {
                    background-color: #ec5656;
                  }
                }
              }

              .percent {
                color: #dae8fc;
              }
            }
          }
        }
      }
    }
  }
}

.trend-column {
  &:hover {
  }
}

.table-title {
  display: block;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0.41px;
  text-align: right;
  color: #34a9ff;
  padding: 0 9px;
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
    width: 80%;
  }
}
</style>
