<template>
  <div class="radiations-index">
    <div class="ultrasound-page">
      <p class="path">דימות > {{ getCurrentGroup }}</p>
      <div class="ultrasound-content">
        <h1 class="page-title">{{ getCurrentGroup }}</h1>
        <div class="content-box">
          <div class="icon-name">
            <img class="icon" :src="getBlackWhiteIcon('nurse')" />
            <p>מיון</p>
          </div>
          <template v-for="(miunItem, index) in miunItems.items">
            <component
              :key="index"
              :class="
                miunItem.clickToDimot || miunItem.clickToTransportTable
                  ? 'hover-item'
                  : null
              "
              v-bind="miunItem.props"
              :is="typeToComponent[miunItem.type]"
              @click.native="
                miunItem.clickToDimot
                  ? goToDimot('emergency_room')
                  : miunItem.clickToTransportTable
                  ? goToTransport('miun')
                  : null
              "
            />
          </template>
        </div>
        <div class="content-box">
          <div class="icon-name">
            <img class="icon" :src="getBlackWhiteIcon('ishpuz-bed')" />
            <p>אשפוז</p>
          </div>
          <template v-for="(ishpuzItem, index) in ishpuzItems.items">
            <component
              :key="index"
              :class="
                ishpuzItem.clickToDimot || ishpuzItem.clickToTransportTable
                  ? 'hover-item'
                  : null
              "
              v-bind="ishpuzItem.props"
              :is="typeToComponent[ishpuzItem.type]"
              @click.native="
                ishpuzItem.clickToDimot
                  ? goToDimot('hospitalization')
                  : ishpuzItem.clickToTransportTable
                  ? goToTransport('ishpuz')
                  : null
              "
            />
          </template>
        </div>
        <div class="content-box">
          <div class="icon-name">
            <img class="icon" :src="getBlackWhiteIcon('bandages')" />
            <p>פנימי</p>
          </div>
          <template v-for="(internalItem, index) in internalItems.items">
            <component
              :key="index"
              :class="
                internalItem.clickToDimot ||
                internalItem.clickToTransportTable ||
                internalItem.props.clickToReservation
                  ? 'hover-item'
                  : null
              "
              v-bind="internalItem.props"
              :is="typeToComponent[internalItem.type]"
              @click.native="
                internalItem.clickToDimot ? goToDimot('internal') : null
              "
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAccelerators from '../components/AppAccelerators';
import AppSimulation from '../components/AppSimulation';
import TitleAndTwoValues from '../components/ultrasound-cards/TitleAndTwoValues';
import BarsCard from '../components/ultrasound-cards/BarsCard';
import CircleProgressBar from '../components/ultrasound-cards/CircleProgressBar';
import CircleProgressNoIcon from '../components/ultrasound-cards/CircleProgressNoIcon';
import MultipleProgressCircles from '../components/ultrasound-cards/MultipleProgressCircles';
import ColumnStats from '../components/ultrasound-cards/ColumnStats';
import ScrollStats from '../components/ultrasound-cards/ScrollStats';
export default {
  props: {
    unitId: String,
  },
  components: {
    AppAccelerators,
    AppSimulation,
    TitleAndTwoValues,
    BarsCard,
    CircleProgressBar,
    MultipleProgressCircles,
    ColumnStats,
    ScrollStats,
    CircleProgressNoIcon,
  },
  data() {
    return {
      title: 'דימות',
      dataKeyToday: null,
      dataKeyTommorow: null,
      typeToComponent: {
        titleAndTwoValues: 'TitleAndTwoValues',
        barsCard: 'BarsCard',
        circleProgressBar: 'CircleProgressBar',
        multipleProgressCircles: 'MultipleProgressCircles',
        columnStats: 'ColumnStats',
        circleProgressNoIcon: 'CircleProgressNoIcon',
        scrollStats: 'ScrollStats',
      },
    };
  },
  methods: {
    async fetch(refresh = false) {
      await this.$store.dispatch('loadScreen', {
        id: this.$route.params.unitId,
        refresh,
        type: this.$screenTypes.TYPE_UNITS,
        group: [
          {
            key: 'group',
            value: this.$route.query.group == 'US' ? 'US' : 'CT',
          },
        ],
      });
    },
    goToDimot(group) {
      this.$router.push({
        name: `dimot.unit`,
        params: {
          unitId: 'table',
        },
        query: {
          group: group,
          section: this.$route.query.group == 'US' ? 'us' : 'ct',
        },
      });
    },
    goToTransport(section) {
      this.$router.push({
        name: `dimot.unit`,
        params: {
          unitId: 'table',
        },
        query: {
          group: 'transport_details',
          section: section,
          group_type: this.$route.query.group == 'US' ? 'US' : 'CT',
        },
      });
    },
  },
  computed: {
    miunItems() {
      if (!this.screen.data) {
        return [];
      }

      return this.screen.data.miun;
    },
    ishpuzItems() {
      if (!this.screen.data) {
        return [];
      }

      return this.screen.data.ishpuz;
    },
    internalItems() {
      if (!this.screen.data) {
        return [];
      }

      return this.screen.data.internal;
    },
    getCurrentGroup() {
      return this.$route.query.group == 'US' ? 'אולטרסאונד' : 'CT';
    },
  },
  created() {
    this.fetch();
    console.log('QUERY', this.$route.params.unitId);
    // console.log(screen.data.ultrasound);
  },
};
</script>

<style lang="scss" scoped>
.ultrasound-page {
  padding: 10px;
  height: 90vh;
  width: 100%;
}

.path {
  color: white;
  font-size: 1.2rem;
  padding-right: 1rem;
}
.ultrasound-content {
  display: flex;
  height: 99%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
}
.page-title {
  color: #10cccb;
  font-size: 1.5vw;
}
.content-box {
  position: relative;
  height: 30%;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 36%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.icon-name {
  position: absolute;
  top: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    color: #dae8fc;
    margin-right: 1rem;
    font-size: 1.3vw;
  }
}
.smaller-text {
  p {
    font-size: 1.2vw;
  }
}
.icon {
  height: 2.2vw;
}
.info-box {
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-left: 0.5vw;
  height: 100%;
}

.info-box-title {
  color: #dae8fc;
  font-size: 1.1vw;
}
.hover-item {
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: lighten($color: #051724, $amount: 10%);
  }
}
</style>
