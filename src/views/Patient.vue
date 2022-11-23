<template>
  <div class="patient-card" ref="patientCard" v-if="! screen.loading">
    <div class="card-title">כרטיס מטופל</div>
    <div class="patient-card-items">
      <div class="card-item info">
        <div class="card-item-inner">
          <div class="avatar-tags">
            <span class="avatar" v-html="$icon(patient.sex === 1 ? 'male' : 'female')"></span>
            <div class="patient-tags">
              <span v-if="patient.isHighRisk">סיכון גבוה</span>
              <span v-if="patient.isReturnPatient">מטופל חוזר</span>
            </div>
          </div>
          <div class="patient-name">{{ patient.patName }}</div>
          <div class="card-row">
            <div class="card-col">
              <div class="col-item">
                <span>תעודת זהות:</span>
                {{ patient.idNumber }}
              </div>
              <div class="col-item">
                <span>מספר מקרה:</span>
                {{ patient.caseNumber }}
              </div>
              <div class="col-item">
                <span>גיל:</span>
                {{ patient.age }}
              </div>
            </div>
            <div class="card-col">
              <div class="col-item">
                <span>ארץ מוצא:</span>
                {{ patient.birthPlace }}
              </div>
              <div class="col-item">
                <span>כתובת:</span>
                {{ patient.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-item dates">
        <div class="card-item-inner">
          <div class="card-icon-label">
            <div class="icon calendar"></div>
            <div class="label" v-if="patient.releaseDate">שחרור צפוי: {{patient.releaseDate}}</div>
          </div>
          <div class="dates-total">
            <div class="date-item">
              <div class="date-item-value">{{ patient.daysInUnit }}</div>
              <div class="date-item-title">ימי אשפוז ביחידה</div>
            </div>
            <div class="date-item-separator"></div>
            <div class="date-item">
              <div class="date-item-value">{{ patient.daysInHospital }}</div>
              <div class="date-item-title">ימי אשפוז כוללים</div>
            </div>
          </div>
          <div class="card-row">
            <div class="card-col full">
              <div class="col-item">
                <span>אשפוז ביחידה:</span>
                {{ patient.unitDate }}
              </div>
              <div class="col-item">
                <span>הגעה לביה״ח:</span>
                {{ patient.hospitalDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-item unit">
        <div class="card-item-inner">
          <div class="card-icon-label">
            <div class="icon medical"></div>
          </div>
          <div class="unit-name">{{ patient.unitName }}</div>
          <div class="unit-name-sub">שם יחידה</div>
          <div class="card-row" v-if="patient.satellite">
            <div class="card-col full">
              <div class="col-item">
                <span>לווין ביחידה:</span>
                {{ patient.satellite }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="patient-tabs" :class="{'is-small': patient.indicators.length > 6}">
      <div class="tab-item"
           :class="{'is-danger': animate && indicator.kpi > 1}"
           v-for="indicator in patient.indicators">
        <div class="tab-item-inner">
          <div class="icon tab-icon" v-html="getIcon(indicator.iconName)"></div>
          <div class="tab-text">{{ indicator.Text }}</div>
        </div>
      </div>
    </div>
    <div class="patient-history"
         ref="patientHistory"
         :style="{'height': historyHeight}">

      <div class="history-title">היסטוריה</div>

      <div class="graph" :class="{'is-small': steps.length > 7}">

        <div class="graph-inner">

          <div class="col"
               :class="{'is-active': step.isActive}"
               v-for="step in steps">
            <div class="bar" :style="{height: animate ? step.height : '0%'}">
              <div class="top-label">
                <div class="day">{{ step.stepDay }}</div>
                <div class="month">{{ step.stepMonth }}</div>
              </div>
            </div>

            <div class="bottom-label">
              {{ step.stepName }}
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'patient',

    data() {
      return {
        historyHeight: '100px',
        animate: false
      }
    },

    async created() {
      await this.fetch();

      this.$nextTick(() => {
        const historyTop = this.$refs.patientHistory.offsetTop;
        const cardTop = this.$refs.patientCard.offsetTop;

        this.historyHeight = `calc(100vh - 570px)`
      });
    },

    methods: {
      async fetch(refresh = false) {
        await this.$store.dispatch('loadScreen', {
          id: this.patientId,
          refresh,
          type: this.$screenTypes.TYPE_PATIENT_CARD
        });

        setTimeout(() => {
          this.animate = true;
        }, 100);
      },

      getIcon(name) {
        let icon = this.$icon('indicator_general');

        try {
          icon = this.$icon('indicator_'+name, true);
        } catch (e) {}

        return icon;
      }
    },

    computed: {
      patientId() {
        return this.$route.params.patientId;
      },

      patient() {
        return this.screen.data || {};
      },

      steps() {
        
        let steps = this.patient.steps;
        let highestNumber = 0;

        for (let step of steps) {
          if(step.totalDays > highestNumber) {
            highestNumber = step.totalDays;
          }
        }

        return steps.map((item, index) => {
          return {
            isActive: index === steps.length - 1,
            height: (item.totalDays / highestNumber * 100) + '%',
            ...item
          }
        });
      }

    },

    components: {

    }
  }
</script>

<style lang="scss" scoped>
  .patient-card {
    position: relative;
    color: #fff;
    height: 100%;
    flex-grow: 1;
    padding-bottom: 15px;
    padding: 0 15px;
    .card-title {
      font-size: 35px;
      font-weight: bold;
      letter-spacing: 0.48px;
      color: #dae8fc;
    }

    .patient-card-items {
      position: relative;
      display: flex;
      margin: 14px -9px;

      .card-item {
        padding: 0 9px;

        .card-item-inner {
          min-height: 238px;
          border-radius: 4px;
          background-color: #051724;
          padding: 17px 35px 17px 20px;
        }

        .card-icon-label {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .icon {
            width: 35px;
            height: 35px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;

            &.calendar {
              background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 35 35'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect width='34.56' height='34.56' fill='%23DAE8FC' opacity='.375' rx='7.2'/%3E%3Cpath fill='%23011725' fill-rule='nonzero' d='M19.584 14.256c-.48 0-.864-.39-.864-.872v-1.712c0-.489.387-.872.864-.872.48 0 .864.39.864.872v1.712c0 .489-.387.872-.864.872zm-7.781-1.728h.869v.866c0 .953.767 1.726 1.728 1.726.954 0 1.728-.776 1.728-1.726v-.866h1.728v.866c0 .953.767 1.726 1.728 1.726.954 0 1.728-.776 1.728-1.726v-.866h.87c.95 0 1.722.777 1.722 1.735v6.898c0 .956-.771 1.735-1.723 1.735H11.803c-.95 0-1.723-.777-1.723-1.735v-6.898c0-.956.771-1.735 1.723-1.735zm2.597 1.728c-.48 0-.864-.39-.864-.872v-1.712c0-.489.387-.872.864-.872.48 0 .864.39.864.872v1.712c0 .489-.387.872-.864.872z'/%3E%3C/g%3E%3C/svg%3E%0A");
            }

            &.medical {
              background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 35 35'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect width='34.56' height='34.56' fill='%23DAE8FC' opacity='.375' rx='7.2'/%3E%3Cpath fill='%23011725' d='M20.35 10c.497 0 .9.403.9.9v2.849l2.85.001c.497 0 .9.403.9.9v5.7c0 .497-.403.9-.9.9l-2.85-.001V24.1c0 .497-.403.9-.9.9h-5.7c-.497 0-.9-.403-.9-.9v-2.851l-2.85.001c-.497 0-.9-.403-.9-.9v-5.7c0-.497.403-.9.9-.9l2.85-.001V10.9c0-.497.403-.9.9-.9h5.7z'/%3E%3C/g%3E%3C/svg%3E%0A");
            }
          }

          .label {
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            border-radius: 12.5px;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
            background-color: #032b45;
            font-size: 16px;
            line-height: 1.06;
            color: #ffffff;
          }
        }

        .card-row {
          position: relative;
          display: flex;

          .card-col {
            display: flex;
            flex-direction: column;
            flex: 0 50%;

            &.full {
              flex: 0 100%;
            }

            &:not(:first-child) {
              /*padding-right: 50px;*/
            }

            .col-item {
              margin-bottom: 10px;

              font-size: 22px;
              letter-spacing: 0.3px;
              padding-left: 5px;
              color: #fff;

              span {
                color: #34a9ff;
              }
            }
          }
        }

        &.info {
          flex: 1;

          .avatar-tags {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .avatar {
              width: 35px;
              height: 35px;
              display: block;

              ::v-deep svg {
                display: block;
              }
            }

            .patient-tags {
              span {
                padding: 3px 10px;
                height: 25px;
                border-radius: 12.5px;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
                background-color: #032b45;
                font-size: 16px;
                line-height: 1.06;
                text-align: center;
                color: #ffffff;
                margin-right: 7px;
              }
            }
          }

          .patient-name {
            font-size: 35px;
            font-weight: bold;
            letter-spacing: 0.48px;
            color: #ffffff;
            margin-top: 15px;
            position: relative;
            margin-bottom: 20px;

            &:after {
              width: 50px;
              height: 3px;
              background-color: #ffffff;
              content: '';
              position: absolute;
              right: 0;
              bottom: -7px;
            }
          }
        }

        &.dates {
          width: 32%;

          .dates-total {
            display: flex;
            align-items: center;
            margin: 16px 0;

            .date-item-separator {
              width: 1px;
              margin: 0 13px;
              height: 30px;
              background-color: rgba(255, 255, 255, 0.14);
            }

            .date-item {
              display: flex;
              align-items: center;

              .date-item-value {
                font-size: 57.5px;
                font-weight: bold;
                letter-spacing: 0.78px;
                color: #ffffff;
              }

              .date-item-title {
                font-size: 19.2px;
                letter-spacing: 0.26px;
                color: rgba(255, 255, 255, 0.4);
                max-width: 75px;
                margin-right: 15px;
              }
            }
          }
        }

        &.unit {
          width: 25%;

          .unit-name {
            font-size: 35px;
            font-weight: bold;
            letter-spacing: 0.48px;
            color: #ffffff;
            margin-top: 15px;
          }

          .unit-name-sub {
            font-size: 18px;
            letter-spacing: 0.25px;
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: 15px;
          }
        }
      }
    }

    .patient-history {
      border-radius: 4px;
      box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
      background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 37%);
      padding: 20px 30px;
      margin-top: 27px;
      display: flex;
      flex-direction: column;

      .history-title {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.27px;
        color: #dae8fc;
        flex-shrink: 0;
        flex-grow: 0;
        margin-bottom: 10px;
      }

      .graph {
        width: 100%;
        height: 100%;
        flex-grow: 1;
        flex-shrink: 1;
        padding: 83px 0 53px 0;

        .graph-inner {
          height: 100%;
          background-image:linear-gradient(to bottom, rgba(245, 245, 245, 0.05) 1px, transparent 1px),  linear-gradient(rgba(245, 245, 245, 0.05) 1px, transparent 1px);
          background-size: 1px 38px;
          background-position: top;
          display: flex;
        }

        &.is-small {
          .col + .col {
            margin-right: 32px;
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

          + .col {
            margin-right: 84px;
          }

          .top-label {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 100%;
            text-align: center;
            color: #dae8fc;
            font-size: 15px;
            letter-spacing: 0.2px;
            height: 83px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .day {
              font-size: 30px;
              font-weight: bold;
              letter-spacing: 0.41px;
            }
          }

          .bar {
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
              background-color: transparent;
              background-image: linear-gradient(159deg, #1fd487 -10%, #38bee2 110%);

              .top-label {
                background-color: #dae8fc;
                color: #032b45;
              }
            }

          }

        }


      }

    }

    .patient-tabs {
      display: flex;
      margin: 0 -15px;

      &.is-small {
        margin: 0 -8px;

        .tab-item {
          padding: 0 8px;

          .tab-item-inner {
            font-size: 18px;
          }
        }
      }

      .tab-item {
        padding: 0 15px;
        flex: 1;

        .tab-item-inner {
          height: 54px;
          border-radius: 3px;
          border: solid 1px #023e58;
          background-color: #042941;
          display: flex;
          align-items: center;
          font-size: 25px;
          font-weight: bold;
          letter-spacing: 0.34px;
          color: #dae8fc;
          transition: color .10s ease-in-out;
          padding: 0 15px;

          .tab-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;

            ::v-deep svg {
              display: block;

              circle {
                fill: rgb(218, 232, 252);
                opacity: 0.375;
                transition: fill .10s ease-in-out, opacity .10s ease-in-out;
              }
            }

          }

          .tab-text {
            padding-right: 10px;
          }
        }

        &.is-danger .tab-item-inner {
          color: #ec3e60;

          .tab-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;

            ::v-deep svg {
              circle {
                fill: rgb(236, 62, 96);
                opacity: 1;
              }
            }

          }
        }

      }
    }
  }
</style>
