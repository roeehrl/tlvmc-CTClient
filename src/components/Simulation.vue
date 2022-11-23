<template>
  <div class="simulation">
    <div class="simulation-container">
      <div class="simulation-title">
        <span class="app-card-icon" v-html="this.$icon('simulation')"></span>
        <h1>סימולציה</h1>
        <div class="simulation-options">
          <div class="simulation-arrived">
            <div class="point"></div>
            <p>נשארו</p>
          </div>
          <div class="simulation-stayed">
            <div class="point"></div>
            <p>הגיעו</p>
          </div>
        </div>
      </div>
      <div class="simulation-box">
        <div class="simulation-ct">
          <bar-chart />
        </div>
        <div class="simulation-mri">
          <bar-chart />
        </div>
        <div class="simulation-date">
          <p>31.5.2021</p>
          <p>1.6.2021</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../components/BarChart";
export default {
  data() {
    return {};
  },
  components: { BarChart },
  name: "simulation",
};
</script>

<style lang="scss" scoped>
.simulation {
  .simulation-container {
    height: 288px;
    padding: 18px 24px 23px 12px;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.5);
    background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 39%);
    .simulation-title {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      h1 {
        font-size: 23.2px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.32px;
        text-align: right;
        color: #dae8fc;
        margin-right: 25px;
      }
    }
    .simulation-options {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      p {
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.22px;
        text-align: right;
        opacity: 0.6;
        color: #dae8fc;
      }
      .simulation-arrived {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 5px;
        .point {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #8577d1;
          margin: 0 5px;
        }
      }
      .simulation-stayed {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 15px;
        .point {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #34a9ff;
          margin: 0 5px;
        }
      }
    }
    .simulation-box {
      display: flex;
      flex-direction: row;
      alin-items: center;
      justify-content: space-around;
      .simulation-mri {
        max-width: 40%;
        border: 1px solid #023e58;
      }
      .simulation-ct {
        max-width: 40%;
        border: 1px solid #023e58;
      }
      .simulation-date {
        max-width: 20%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        p {
          opacity: 0.56;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.24px;
          text-align: center;
          color: #c6d9f5;
          padding: 15px 0;
        }
      }
    }
  }
}
</style>
