<template>
  <div class="liss-scroll">
    <div class="liss-index" v-if="!screen.loading && screen.data">
      <div class="col">
        <p class="title">{{ screen.data.Title }}</p>
        <div class="col-content dark">
          <a href="" class="card-link" v-html="$icon('external-link')"></a>
          <div class="er-clocks">
            <liss-clock
              v-for="(clock, index) in erClocks"
              :index="index"
              :key="index"
              :data="clock"
            ></liss-clock>
          </div>
        </div>
        <div class="ambulans">
          <er-small-card
            override-world="liss"
            :header="{
              title: screen.data.ambulances.cardTitle,
              icon: screen.data.ambulances.cardIcon,
              nextScreenType: screen.data.ambulances.nextScreenType,
              id: screen.data.ambulances.cardId,
            }"
            :data="screen.data.ambulances"
          ></er-small-card>
        </div>
      </div>

      <div class="col">
        <div class="col-content">
          <a href="" class="card-link" v-html="$icon('external-link')"></a>
          <liss-birth :data="maternityRooms"></liss-birth>
        </div>
      </div>

      <div class="col">
        <div class="col-content">
          <a href="" class="card-link" v-html="$icon('external-link')">0</a>

          <p class="col-header">
            <span class="icon" v-html="$icon('indicator_knife')"></span>
            <span class="text">חדרי ניתוח</span>
          </p>

          <div class="ors">
            <app-operation
              v-for="or in ors"
              :show-unit-name="false"
              :show-usage="false"
              :size="174"
              :operation="or"
              :key="or"
            >
              <template #num>
                {{ or.ORoomName }}
              </template>
            </app-operation>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="col-content col-margin-bottom">
          <a href="" class="card-link" v-html="$icon('external-link')"></a>

          <p class="col-header">
            <span class="icon" v-html="$icon('ishpuz')"></span>
            <router-link :to="'/hospitalization'">
              <span class="text">
                {{ unitsData.title }}<br />
                <small>{{ unitsData.subtTitle }}</small>
              </span>
            </router-link>
          </p>

          <div class="units">
            <div class="unit" v-for="unit in units" :key="unit.unitId">
              <router-link :to="`/hospitalization/${unit.unitId}/patients`">
                <div class="text">
                  <p class="unit-name">{{ unit.unitName }}</p>
                  <p class="unit-count" :style="{ color: unit.color }">
                    {{ unit.value }}
                  </p>
                </div>
              </router-link>

              <div class="progressbar">
                <div
                  class="bar"
                  :style="{
                    backgroundColor: unit.color,
                    width: unit.percentage,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLineGraphBox from "../components/AppLineGraphBox";
import AppInlineTrend from "../components/AppInlineTrend";
import AppStatusBox from "../components/AppStatusBox";
import WinterTestsPopup from "../components/WinterTestsPopup";
import LissClock from "../components/LissClock";
import LissBirth from "../components/LissBirth";
import AppOperation from "../components/AppOperation";
import ErSmallCard from "./emergency/ErSmallCard";

export default {
  props: {
    unitId: [String, Number],
  },

  components: {
    AppOperation,
    LissBirth,
    LissClock,
    ErSmallCard,
  },

  data() {
    return {
      animationsReady: false,
      ambulances: 0,
    };
  },

  created() {
    this.fetchData();
  },

  mounted() {
    setTimeout(() => {
      this.animationsReady = true;
    }, 250);
  },

  methods: {
    async fetchData(refresh = false) {
      await this.$store.dispatch("loadScreen", {
        id: this.unitId,
        refresh: refresh,
        type: this.$screenTypes.TYPE_UNITS,
      });

      console.log(this.screen.data);
    },
    goToUnit() {
      if (!val) {
        if (!this.unitId) {
          return;
        }
        this.$router.push({
          name: `${this.$route.name}.unit`,
          params: {
            unitId: this.unitId,
          },
        });
      }
      this.toggleCardTable = !this.toggleCardTable;
    },
  },

  computed: {
    erClocks() {
      return ((this.screen.data || {})["ER"] || {})["ErList"] || [];
    },

    maternityRooms() {
      return (this.screen.data || {})["Birth"] || {};
    },

    ors() {
      return (this.screen.data || {})["OperationRooms"] || [];
    },

    unitsData() {
      return (this.screen.data || {})["Ishpuz"] || {};
    },

    units() {
      return ((this.unitsData || {}).units || []).map((unit) => {
        return {
          ...unit,
          percentage: (this.animationsReady ? unit.percentage : 0) + "%",
          color: this.animationsReady ? unit.color : "rgba(255, 255, 255, 0)",
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.liss-index {
  display: grid;
  height: 90%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  overflow: auto;
}

.col {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .title {
    color: #10cccb;
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 0.48px;
    margin-bottom: 15px;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .ambulans {
    padding-top: 15px;
  }
  .col-content {
    flex-grow: 1;
    flex-shrink: 1;
    border-radius: 4px;
    position: relative;
    height: 100%;
    overflow: hidden;

    &.col-margin-bottom {
    }

    .card-link {
      display: block;
      position: absolute;
      height: 20px;
      width: 20px;
      top: 36px;
      left: 24px;
      display: none;
    }

    &.dark {
      background-color: #051724;
    }

    &:not(.dark) {
      border: 1px solid #023e58;
      background-color: #042941;
    }
  }

  .col-header {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.27px;
    color: #dae8fc;
    display: flex;
    align-items: center;
    padding: 24px 30px;

    .text small {
      opacity: 0.57;
      font-size: 18px;
      letter-spacing: 0.25px;
      font-weight: normal;
      color: #ecdafc;
    }

    .icon {
      width: 35px;
      height: 35px;
      margin-left: 9px;
      display: block;
    }
    a {
      color: #dae8fc;
    }
  }
}

.er-clocks {
  padding: 34px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: auto;
}

.ors {
  overflow: auto;
  height: calc(100% - 83px);

  .app-operation.wide {
    flex: none;
    padding: 0;
    margin: 0;
    border-radius: 0;

    ::v-deep .app-operation-inner {
      border-radius: 0;
      border: 0;
      border-bottom: solid 1px #023e58;
      background-color: transparent;
      padding: 15px;

      .operation-time {
        padding-right: 60px;
      }

      .operation-body {
        margin-top: -50px;
        flex-direction: row-reverse;
        align-items: flex-end;
      }
    }

    &:last-child ::v-deep .app-operation-inner {
      border-bottom: 0;
    }
  }
}

.units {
  overflow: auto;
  height: calc(100% - 122px);
  margin-top: 39px;
  border-top: 1px solid rgba(#023e58, 0.4);
  padding: 0 24px;

  .unit {
    padding: 20px 17px;

    + .unit {
      border-top: 1px solid rgba(#023e58, 0.4);
    }

    .text {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      letter-spacing: 0.27px;
      color: #dae8fc;

      .unit-count {
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 0.3px;
        color: #8577d1;
        transition: all 0.4s ease-in-out;
      }
    }

    .progressbar {
      margin-top: 18px;
      height: 7px;
      border-radius: 30px;
      background-color: #061d31;
      position: relative;
      overflow: hidden;

      .bar {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        transition: all 0.8s ease-in-out;
      }
    }
  }
}
</style>
