<template>
  <div class="dr-table">
    <div class="dr-table-container">
      <div class="dr-table-head">
        <tr>
          <span class="app-card-icon" v-html="this.$icon('dr')"></span>
          <th>מטופלים לרופא</th>
        </tr>
        <tr>
          <th>היום</th>
        </tr>
        <tr>
          <th>מחר</th>
        </tr>
      </div>

      <div class="dr-table-body">
        <table v-for="(row, index) in tableData" :key="index">
          <tr>
            <th>{{ row.drname }}</th>
          </tr>
          <tr>
            <th>{{ row.todaycount }}</th>
          </tr>
          <tr>
            <th>{{ row.tomorrowcount }}</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "drtable",
  data() {
    return {
      tableData: [
        {
          drname: "דרור לימון",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "יסמין קורזיץ",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "אלכס פוקס",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
        {
          drname: "מיכאל כהן",
          todaycount: "2",
          tomorrowcount: "0",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.dr-table {
  padding-top: 20px;
  .dr-table-container {
    width: 100%;
    height: 358px;
    object-fit: contain;
    border-radius: 4px;
    border: solid 1px #023e58;
    background-color: #042941;
    .dr-table-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #023e58;
      padding: 15px 0px;
      tr:nth-of-type(1) {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 50%;
        padding: 0 24px;
        span {
        }
        th {
          font-size: 20px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.27px;
          text-align: right;
          color: #dae8fc;
          margin-right: 10px;
        }
      }
      tr:nth-of-type(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 25%;
        span {
        }
        th {
          font-size: 20px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.27px;
          text-align: center;
          color: #dae8fc;
          margin-right: 10px;
          width: 100%;
        }
      }
      tr:nth-of-type(3) {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 25%;
        span {
        }
        th {
          font-size: 20px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.27px;
          text-align: center;
          color: #dae8fc;
          margin-right: 10px;
          width: 100%;
        }
      }
    }
    .dr-table-body {
      height: 25.7vh;
      padding: 0 40px;
      overflow: auto;
    }
    table {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #023e58;
      padding: 15px 0px;
      tr:nth-of-type(1) {
        width: 50%;
        padding-right: 10px;
        th {
          font-size: 20px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.27px;
          text-align: center;
          color: #dae8fc;
        }
      }
      tr:nth-of-type(2) {
        flex: 7%;
        display: flex;
        justify-content: flex-end;
        th {
          font-size: 20px;
          letter-spacing: 0.27px;
          color: #dae8fc;
        }
      }
      tr:nth-of-type(3) {
        flex: 22%;
        display: flex;
        justify-content: flex-end;
        th {
          font-size: 20px;
          letter-spacing: 0.27px;
          text-align: center;
          color: #dae8fc;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
