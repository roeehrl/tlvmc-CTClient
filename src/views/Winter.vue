<template>
  <div class="winter-index" v-if="!screen.loading && screen.data">
    <div class="right">
      <p class="title">{{ lineBoxes.title }}</p>

      <div class="line-boxes">
        <app-line-graph-box
          v-for="box in lineBoxes.boxes"
          :title="box.title"
          :icon="box.icon"
          :key="box.title + box.icon"
          :data="box.data"
        />
      </div>

      <div class="trend">
        <app-inline-trend
          api-method="fetchWinterTrend"
          :init-data="screen.data.patientsTrend"
          unit-id="GetPatientsTrend"
        >
        </app-inline-trend>
      </div>

      <div class="test-info-box">
        <div class="text">
          <div class="icon" v-html="$icon(bloodTests.icon)"></div>
          <div>
            <div class="title">{{ bloodTests.title }}</div>
            <div class="subtitle">{{ bloodTests.subtitle }}</div>
          </div>
        </div>

        <div class="items">
          <div
            class="item"
            v-for="test in bloodTests.data"
            @click="showTestPopup(test)"
            :class="{
              'is-active':
                $store.state.popup &&
                test.unitId === $store.state.popup.props.unitId,
            }"
            :key="test.label + test.value"
          >
            <div class="label">{{ test.label }}</div>
            <div class="value">{{ test.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="left">
      <p class="title">{{ units.title }}</p>

      <div class="left-content">
        <div class="units-grid">
          <template v-for="group in units.groups">
            <div class="grid-title" :key="group.id">
              {{ group.title }}
            </div>

            <div class="grid" :key="group.title">
              <app-status-box
                v-for="unit in group.units"
                :key="unit.unitId"
                :title="unit.title"
                :subtitle="unit.subtitle"
                :icon-text="unit.iconText"
                icon="bed-small"
                @click.native="goToUnit(unit.unitId)"
                :progress="unit.progress"
                :color="unit.color"
              />
            </div>
          </template>
        </div>

        <div class="trend">
          <app-inline-trend
            api-method="fetchWinterTrend"
            :init-data="screen.data.occupancyTrend"
            unit-id="GetOccupancyTrend"
          ></app-inline-trend>
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

export default {
  components: {
    AppStatusBox,
    AppInlineTrend,
    AppLineGraphBox,
  },

  data() {
    return {
      title: "חורף",
      totalSeconds: 0,
      currentRoute: this.$route.name,
    };
  },

  props: {
    unitId: [String, Number],
  },

  created() {
    this.fetchData();
  },

  methods: {
    showTestPopup(test) {
      this.$store.commit("showPopup", {
        component: WinterTestsPopup,
        props: {
          unitId: test.unitId,
        },
      });
    },

    async fetchData(refresh = false) {
      await this.$store.dispatch("loadScreen", {
        id: this.unitId,
        refresh: refresh,
        type: this.$screenTypes.TYPE_UNITS,
      });
    },

    goToUnit(unitId) {
      if (currentRoute != "winter") {
        this.$router.push({
          name: `${this.world.route}.unit`,
          params: {
            unitId: unitId,
          },
        });
      }
    },
  },

  computed: {
    lineBoxes() {
      if (!this.screen.data || this.screen.loading) {
        return { title: "טוען...", boxes: [] };
      }

      const max = Math.max(
        ...(this.screen.data.sections || []).sections.map((s) => s.value)
      );

      let boxes = this.screen.data.sections.sectionTypes.map((sectionType) => {
        let data = [...(this.screen.data.sections.sections || [])]
          .filter((section) => {
            return section.sectionTypeId === sectionType.sectionTypeId;
          })
          .map((section) => {
            return {
              label: section.text,
              value: section.value,
              percentage: (section.percentage || 0) * 100,
              backgroundColor: section.color,
            };
          });

        return {
          ...sectionType,
          data,
        };
      });

      return {
        title: this.screen.data.sections.title,
        boxes,
      };
    },

    bloodTests() {
      if (!this.screen.data || this.screen.loading) {
        return {
          title: "טוען...",
          subtitle: "",
          icon: "blood",
          data: [],
        };
      }

      const data = this.screen.data.bloodTests;

      return {
        title: data.title,
        subtitle: data.subtitle,
        icon: data.icon,
        data: data.testsData.map((item) => ({
          label: item.text,
          value: item.value,
          unitId: item.testDataId,
        })),
      };
    },

    /**
             title: '20%',
             subtitle: 'פנימית ט',
             progress: 80,
             iconText: '56%',
             kpi: 1,
             */

    units() {
      if (!this.screen.data || this.screen.loading) {
        return {
          title: "טוען...",
          groups: [],
        };
      }

      return {
        title: this.screen.data.departments.title,
        groups: this.screen.data.departments.winterDepartmentTypes.map(
          (group) => {
            const units = this.screen.data.departments.departmentsData
              .filter((u) => u.typeId === group.typeId)
              .map((u) => ({
                unitId: u.unitId,
                title: u.tfusaText,
                subtitle: u.unitName,
                progress: u.tfusa * 100,
                color: u.kpiColor,
                iconText: u.beds,
              }));

            return {
              id: group.typeId,
              title: group.typeTitle,
              units,
            };
          }
        ),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.winter-index {
  display: flex;
  height: 100%;

  > div {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
  }

  .right {
    margin-left: 67px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    color: #10cccb;
    margin-bottom: 17px;
  }

  .line-boxes {
    display: flex;

    > div {
      flex-basis: 0;
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
}

.test-info-box {
  border-radius: 3.6px;
  background-color: #051724;
  color: #dae8fc;
  display: flex;
  padding-right: 29px;

  .text {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;

    .icon {
      margin-left: 10px;
      width: 35px;
      height: 35px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.27px;
      color: #dae8fc;
      margin-bottom: 0;
    }

    .subtitle {
      font-size: 15px;
      letter-spacing: 0.2px;
      color: #dae8fc;
    }
  }

  .items {
    display: flex;
  }

  .item {
    height: 122px;
    width: 186px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    .label {
      font-size: 17px;
      line-height: 1.06;
      letter-spacing: 0.23px;
      color: #dae8fc;
      margin-bottom: 10px;
    }

    .value {
      font-size: 35px;
      font-weight: bold;
      letter-spacing: -0.45px;
      color: #dae8fc;
    }

    + .item:after {
      content: "";
      width: 1px;
      position: absolute;
      top: 10px;
      bottom: 10px;
      right: 0;
      background-color: rgba(16, 204, 203, 0.28);
    }

    &.is-active,
    &:hover {
      background-color: #035c7c;

      &:after,
      + .item:after {
        background-color: rgba(16, 204, 203, 0);
      }
    }
  }
}

.left {
  height: 100%;
}

.left-content {
  border-radius: 4px;
  box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 42%);
  padding: 34px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.units-grid {
  .grid-title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.27px;
    color: #dae8fc;
    margin-bottom: 11px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 42px 42px;

    + .grid-title {
      margin-top: 14px;
    }
  }
}
</style>