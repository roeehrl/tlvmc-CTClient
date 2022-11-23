<template>
  <div class="accelerators">
    <div class="accelerator-container">
      <div class="accelerator-title">
        <div class="accelerator-title-box">
          <span
            class="app-card-icon"
            v-html="this.$icon('accelerators')"
          ></span>
          <h1>מאיצים</h1>
        </div>
      </div>
      <div
        class="accelerator-item"
        v-for="(item, index) in accelerator"
        :key="index"
      >
        <div class="accelerator-wrapper">
          <div class="accelerator-head">
            <span v-html="$icon(item.icon)"></span>
            <p>{{ item.title }}</p>
          </div>
          <div class="accelerator-standby">
            <p>{{ item.standby }}</p>
            <p>{{ item.standby_val }}</p>
          </div>
          <div class="accelerator-delay">
            <p>{{ item.delay }}:</p>
            <p>{{ item.delay_val }}</p>
          </div>
          <div class="line"></div>
          <div class="accelerator-grapg-line"></div>
          <div class="accelerator-graph-wrap">
            <div class="wait">
              <p>{{ item.waiting_val }}</p>
              <div class="point-box">
                <div class="point"></div>
                <p>
                  {{ item.waiting }}
                </p>
              </div>
            </div>
            <div class="treated">
              <p>{{ item.treated_val }}</p>
              <div class="point-box">
                <div class="point"></div>
                <p>
                  {{ item.waiting }}
                </p>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="accelerator-chimoterapia">
            <div class="treated">
              <p>{{ item.dr_visit }}</p>
              <p>{{ item.dr_visit_val }}</p>
            </div>
            <div class="wait">
              <p>{{ item.chimoterapia }}</p>
              <p>{{ item.chimoterapia_val }}</p>
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
      accelerator: [
        {
          title: "מאיץ 1",
          icon: "m4",
          standby: "זמן המתנה",
          standby_val: "05:00",
          delay: "עיכוב",
          delay_val: "00:23",
          waiting: "ממתינים",
          treated: "טופלו",
          waiting_val: 1,
          treated_val: 2,
          dr_visit: "כולל ביקור רופא",
          dr_visit_val: "02",
          chimoterapia: "כולל כימו",
          chimoterapia_val: "10",
        },
        {
          title: "מאיץ 2",
          icon: "m4",
          standby: "זמן המתנה",
          standby_val: "05:00",
          delay: "עיכוב",
          delay_val: "00:23",
          waiting: "ממתינים",
          treated: "טופלו",
          waiting_val: 2,
          treated_val: 4,
          dr_visit: "כולל ביקור רופא",
          dr_visit_val: "02",
          chimoterapia: "כולל כימו",
          chimoterapia_val: "10",
        },
        {
          title: "מאיץ 3",
          icon: "m4",
          standby: "זמן המתנה",
          standby_val: "05:00",
          delay: "עיכוב",
          delay_val: "00:23",
          waiting: "ממתינים",
          treated: "טופלו",
          waiting_val: 6,
          treated_val: 3,
          dr_visit: "כולל ביקור רופא",
          dr_visit_val: "02",
          chimoterapia: "כולל כימו",
          chimoterapia_val: "10",
        },
        {
          title: "מאיץ 4",
          icon: "m4",
          standby: "זמן המתנה",
          standby_val: "05:00",
          delay: "עיכוב",
          delay_val: "00:23",
          waiting: "ממתינים",
          treated: "טופלו",
          waiting_val: 4,
          treated_val: 9,
          dr_visit: "כולל ביקור רופא",
          dr_visit_val: "02",
          chimoterapia: "כולל כימו",
          chimoterapia_val: "10",
        },
      ],
    };
  },
  name: "accelerators",
};
</script>

<style lang="scss" scoped>
.accelerators {
  border-radius: 3px;
  background-color: #051724;
  .accelerator-container {
    display: flex;
    flex-direction: row;
    padding: 10px 25px;
    .accelerator-title {
      flex: 20%;
      .accelerator-title-box {
        display: flex;
        align-items: center;
        h1 {
          font-size: 23.2px;
          font-weight: bold;
          text-align: right;
          color: #dae8fc;
          margin-right: 25px;
        }
      }
    }
    .accelerator-item {
      flex: 25%;
      border-right: 1px solid #023e58;
      .accelerator-wrapper {
        .accelerator-head {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding-bottom: 20px;
          p {
            font-size: 23.2px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.32px;
            text-align: center;
            color: #dae8fc;
            margin-right: 10px;
          }
        }
      }
      .accelerator-standby {
        p:nth-of-type(1) {
          font-size: 17.3px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.22px;
          text-align: center;
          color: #c6d9f5;
          opacity: 0.56;
        }
        p:nth-of-type(2) {
          font-size: 30px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.39px;
          text-align: center;
          color: #ffffff;
        }
      }
      .accelerator-delay {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        p {
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.21px;
          color: #ec3e60;
          padding: 0 2.5px;
        }
      }
      .line {
        width: 47px;
        height: 2px;
        border: 3px solid #042840;
        border-radius: 25px;
        display: block;
        margin: 0 auto;
        margin-top: 25px;
      }
      .accelerator-grapg-line {
        width: 130px;
        height: 6px;
        background-color: #10cccb;
        border-radius: 25px;
        margin: 0 auto;
        margin-top: 40px;
      }
      .accelerator-graph-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        justify-content: center;
        .wait {
          padding: 0 10px;
          .point-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            .point {
              width: 5px;
              height: 5px;
              background-color: #10cccb;
              border-radius: 50%;
              margin: 10px 0;
            }
            p {
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: 0.22px;
              text-align: right;
              color: #dae8fc;
            }
          }
          p {
            font-size: 25px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.34px;
            text-align: center;
            color: #dae8fc;
            margin-right: 5px;
          }
        }
        .treated {
          padding: 0 10px;
          .point-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            .point {
              width: 5px;
              height: 5px;
              background-color: #ec3e60;
              border-radius: 50%;
            }
            p {
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: normal;
              letter-spacing: 0.22px;
              text-align: center;
              color: #dae8fc;
              margin-right: 5px;
            }
          }
          p {
            font-size: 25px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.34px;
            text-align: center;
            color: #dae8fc;
          }
        }
      }
      .accelerator-chimoterapia {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;
        justify-content: center;
        .wait {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 10px;
          p:nth-of-type(1) {
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
          p:nth-of-type(2) {
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
        .treated {
          display: flex;
          flex-direction: column;
          padding: 0 10px;
          p:nth-of-type(1) {
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
          p:nth-of-type(2) {
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
    .accelerator-item:nth-of-type(2) {
      border-right: 1px solid transparent;
      height: 366.7px;
    }
  }
}
</style>
