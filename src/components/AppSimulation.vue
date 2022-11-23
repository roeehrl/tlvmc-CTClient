<template>
  <div class="simulation">
    <div class="simulation-container">
      <div class="simulation-title">
        <span class="app-card-icon" v-html="this.$icon('simulation')"></span>
        <h1 style="cursor: pointer" @click="goToUnit(30)">סימולציה</h1>
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
        <div class="simulation-charts">
          <bar-chart 
            :mri="screen.data.simulation.ct" 
            :datatype="datatypect"
            :unitId="20"
            :maxXValue="maxXValue"
          />
          <bar-chart 
            :mri="screen.data.simulation.mri" 
            :datatype="datatypemri"
            :unitId="21"
            :maxXValue="maxXValue"
          ></bar-chart>
        </div>
        <div class="simulation-date">
          <p>{{screen.data.simulation.dates[0].start}}</p>
          <p>{{screen.data.simulation.dates[1].end}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../components/BarChart";
export default {
  data() {
    return {
      datatypemri:"mri",
      datatypect:"ct",
      maxXValue: 0,
      calculateMaxValue() {
        let xValueMRI = 0;
        this.screen.data.simulation.mri.arrived.map(item => {
          xValueMRI += Number(item.Value)
        })

        this.screen.data.simulation.mri.stayed.map(item => {
          xValueMRI += Number(item.Value)
        })

        let xValueCT = 0;
        this.screen.data.simulation.ct.arrived.map(item => {
          xValueCT += Number(item.Value)
        })

        this.screen.data.simulation.ct.stayed.map(item => {
          xValueCT += Number(item.Value)
        })

        this.maxXValue = Math.max(xValueCT, xValueMRI)
      },
    };
  },

  methods: {
    goToUnit(unitId) {
        this.$router.push({
            name: `${this.world.route}.unit`,
            params: {
            unitId: unitId,
            },
        });
    }
  },

  mounted() {
    this.calculateMaxValue();
    console.log(this.maxXValue)
  },

  components: { BarChart },
  name: "simulation",
};
</script>

<style lang="scss" scoped>
.simulation {
  margin-top: 19px;
  margin-right: 19px;
  .simulation-container {
    padding: 18px 24px 23px 0px;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.5);
    background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 39%);
    .simulation-title {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      h1 {
        font-size: 23.2px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.32px;
        text-align: right;
        color: #dae8fc;
        margin-right: 15px;
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
      // justify-content: flex-end;
      .simulation-charts {
        display: flex;
        flex-direction: row;
      }
      .simulation-date {
        display: flex;
        flex-direction: column;
        margin-top: 45px;
        // justify-content: center;
        // border: 1px solid red;
        p {
          font-size: 19px;
          opacity: 0.56;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.24px;
          text-align: center;
          color: #c6d9f5;
          padding: 10px 10px;
        }
      }
    }
  }
}
</style>