<template>
  <div
    class="app-statistics transporations"
    :class="{
      transporations:
        this.$route.name === 'transporations' ||
        this.$route.name === 'transporations.unit',
      radiations:
        this.$route.name === 'radiations' ||
        this.$route.name === 'radiations.unit',
      tipulnimraz: this.$route.name === 'tipulnimraz',
      dimot: this.$route.name === 'dimot',
    }"
  >
    <div class="statistics-title" :style="{ color: color }">
      {{ displayTitle }}
    </div>

    <div class="statistics-cards" :class="[$route.name]">
      <template v-for="item in stats">
        <component
          v-if="typeComponents[item.cardType.toString()]"
          :key="item.trendId"
          :active="trend && trend.id === item.trendId"
          :item="item"
          :is-small="stats.length > 5"
          :is="typeComponents[item.cardType.toString()]"
        />

        <app-card
          v-else
          @viewTrend="viewTrend(item.trendId)"
          :key="item.trendId"
          :active="trend && trend.id === item.trendId"
          :icon="item.iconName"
          :type="item.cardType"
          :is-small="isSmall"
          :hasTrend="item.showTrend"
          :text="item.text"
          :color="item.color"
          :percentage="item.percentage"
          :value="item.value"
          :urgentVal="item.urgentVal"
          :urgentText="item.urgentText"
          :urgentWaitVal="item.urgentWaitVal"
          :urgentWaitText="item.urgentWaitText"
          :avail="item.avail"
          :availVal="item.availVal"
          :trans="item.trans"
          :transVal="item.transVal"
          :values="item.values"
          :unitId="item.unitid"
          :stats="stats"
          :iconName="item.iconName"
          :itempath="item.itempath"
          :circles="item.circles"
          :toggleCard="toggleCard"
          :activeCard="activeCard === item.itempath"
          :clickToTable="item.clickToTable"
          :min="item.min"
          :max="item.max"
        >
        </app-card>
      </template>
    </div>
  </div>
</template>

<script>
import AppTrend from '../components/AppTrend';
import AppCalendarCard from './AppCalendarCard';

export default {
  name: 'app-statistics',

  components: {
    AppCalendarCard,
    AppTrend,
  },
  props: {
    title: String,
    color: String,
    stats: {
      type: Array,
    },
    type: {
      type: Number,
    },
  },

  data() {
    return {
      typeComponents: {
        3: 'app-calendar-card',
        currentRoute: this.$route.name,

        isSmall: this.$route.name !== 'tipulnimraz' ? false : true,
      },
      activeCard: false,
    };
  },

  methods: {
    async viewTrend(id) {
      this.$store.commit('changeTrendPopupStatus', { show: true, trend: id });
    },
    toggleCard(index) {
      this.$data.activeCard = index;
      if (index != index) {
        this.$data.activeCard = true;
      }
    },
  },

  mounted() {
    console.log(this.stats)
  },
  computed: {
    displayTitle() {
      return (this.title || '')
        .split(' ')
        .map((part) => {
          if (part.length > 8) {
            part = part.replace(/\-/g, '-\n');
          }
          return part;
        })
        .join(' ');
    },
  },
};
</script>

<style lang="scss" scoped>
.app-statistics {
  color: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: row;
  &.transporations {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .statistics-title {
      font-size: 35px;
      font-weight: bold;
      word-break: break-word;
      width: 400px;
    }
  }

  &.radiations.unit {
    display: none;
  }
  &.radiations {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;

    .statistics-title {
      font-size: 35px;
      font-weight: bold;
      word-break: break-word;
      width: 400px;
      margin: 0 25px;
    }
  }
  &.dimot {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    .statistics-title {
      font-size: 35px;
      font-weight: bold;
      word-break: break-word;
      width: 400px;
      margin: 0 25px;
    }
  }
  &.tipulnimraz {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    .statistics-title {
      font-size: 35px;
      font-weight: bold;
      word-break: break-word;
      width: 400px;
    }
  }
  .statistics-title {
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 0.48px;
    color: #10cccb;
    padding-left: 15px;
    padding-right: 5px;
    padding: 10px 0;
    flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
    hyphens: manual;
    width: 100px;
    word-break: break-word;
  }

  .statistics-cards {
    display: flex;
    justify-content: space-evenly;
    flex: 1;
    margin: 0 -9px;
    width: 100%;
    &.transporations {
      width: 100%;
    }
    &.tipulnimraz {
      width: 100%;
      margin: 0 0;
      justify-content: center;
    }
    &.radiations {
      width: 100%;
    }
    &[class~="radiations.unit"] {
      display: none;
    }
  }
  .statistics-cards-transport {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
}
</style>
