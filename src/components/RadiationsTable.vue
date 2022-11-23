<template>
  <div class="radiations-table">
    <div class="radiations-table-container">
      <div
        class="dr-table-head"
        v-for="(headitem, index) in tableDataHead"
        :key="index"
      >
        <table>
          <tr>
            <span v-html="$icon('invite')"></span>
            <th>{{ headitem.title }}</th>
          </tr>
          <tr>
            <th>{{ headitem.date_val_o }}</th>
            <th>{{ headitem.date_val_t }}</th>
            <th>{{ headitem.date_val_tr }}</th>
            <th>{{ headitem.date_val_fo }}</th>
            <th>{{ headitem.date_val_fi }}</th>
          </tr>
        </table>
      </div>
      <div class="dr-table-body" v-for="(item, i) in tableData" :key="i">
        <table>
          <tr>
            <th>{{ item.title }}</th>
          </tr>
          <tr>
            <th>{{ item.val_o }}</th>
            <th>{{ item.val_t }}</th>
            <th>{{ item.val_tr }}</th>
            <th>{{ item.val_fo }}</th>
            <th>{{ item.val_fi }}</th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "radiationstable",
  data() {
    return {
      tableDataHead: [
        {
          title: "זימונים עתידיים",
          icon: "invite.svg",
          date_val_o: "1.6.2021",
          date_val_t: "2.6.2021",
          date_val_tr: "3.6.2021",
          date_val_fo: "4.6.2021",
          date_val_fi: "4.6.2021",
        },
      ],
      tableData: [
        {
          title: "מטופל מבודד שלא מוזמן לתחילת/סוף יום",
          val_o: "20",
          val_t: "6",
          val_tr: "6",
          val_fo: "6",
          val_fi: "6",
        },
        {
          title: "מטופל מבודד שלא מוזמן לתחילת/סוף יום",
          val_o: "20",
          val_t: "6",
          val_tr: "6",
          val_fo: "6",
          val_fi: "6",
        },
        {
          title: "מטופל מבודד שלא מוזמן לתחילת/סוף יום",
          val_o: "20",
          val_t: "6",
          val_tr: "6",
          val_fo: "6",
          val_fi: "6",
        },
        {
          title: "מטופל מבודד שלא מוזמן לתחילת/סוף יום",
          val_o: "20",
          val_t: "6",
          val_tr: "6",
          val_fo: "6",
          val_fi: "6",
        },
        {
          title: "מטופל מבודד שלא מוזמן לתחילת/סוף יום",
          val_o: "20",
          val_t: "6",
          val_tr: "6",
          val_fo: "6",
          val_fi: "6",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.radiations-table {
  padding-top: 20px;
  .radiations-table-container {
    -webkit-box-shadow: 0 2px 18px 0 rgb(0 0 0 / 50%);
    box-shadow: 0 2px 18px 0 rgb(0 0 0 / 50%);
    width: 100%;
    height: 220px;
    overflow: auto;
    border-right: solid 3px #34a9ff;
    background-color: #042941;
    padding-left: 30px;
    table {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid #07111e;
      tr:nth-of-type(1) {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px 24px;
        flex: 30%;
        th {
          font-size: 20px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.27px;
          text-align: center;
          color: #dae8fc;
          margin-right: 25px;
        }
      }
      tr:nth-of-type(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex: 70%;
        th {
          font-size: 19px;
          letter-spacing: 0.3px;
          color: #dae8fc;
          width: 100%;
        }
      }
    }
    .dr-table-body {
      table {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #07111e;
        tr:nth-of-type(1) {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 50px;
          flex: 30%;
          th {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.25px;
            text-align: right;
            color: #dae8fc;
          }
        }
        tr:nth-of-type(2) {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0px 0px;
          flex: 70%;

          th {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.25px;
            text-align: center;
            color: #d8e7ff;
          }
        }
      }
    }
  }
}
</style>
