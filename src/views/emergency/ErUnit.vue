<template>
  <div class="unit er-unit" v-if="!screen.loading && screen.data">
    <app-table
      :table="screen.data.table"
      :table-title="screen.data.title"
      :type="$screenTypes.TYPE_PATIENTS"
    >
    </app-table>

    <div class="extra-data">
      <p class="title">מידע נוסף</p>

      <div class="cards">
        <div
          class="card"
          v-for="item in extraData"
          :class="{
            'card-number': item.cardType === 1,
            'card-progress': item.cardType === 2,
          }"
          :key="item.cardTitle + item.cardId"
        >
          <div class="icon">
            <vue-circle
              :progress="item.percentage * 100"
              ref="circle"
              v-if="item.cardType === 2"
              :size="80"
              :reverse="false"
              line-cap="butt"
              :fill="item.color ? { color: color } : { color: '#ec5656' }"
              empty-fill="#04304d"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="4"
              :animation="{ duration: 2000 }"
              :show-percent="true"
            >
            </vue-circle>

            <div
              class="display-value"
              :style="{ color: item.color }"
              v-if="item.cardType === 1"
            >
              {{ item.value }}
            </div>
          </div>

          <div class="text">
            {{ item.cardTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unit-view',

  props: {
    unitId: [String, Number],
  },

  data() {
    return {};
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch(refresh = false) {
      await this.$store.dispatch('loadScreen', {
        id: this.unitId,
        refresh,
        type: this.$screenTypes.TYPE_MARLAD_UNIT,
      });
    },
  },

  computed: {
    extraData() {
      return ((this.screen || {}).data || {}).extraData || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.er-unit {
  overflow: hidden;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr min-content;

  .app-table {
    margin-top: 0;
  }
}

.extra-data {
  display: flex;
  flex-direction: column;
  width: 297px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 46px;

  .title {
    font-size: 26px;
    font-weight: bold;
    letter-spacing: -0.33px;
    color: #dae8fc;
    margin-bottom: 17px;
    flex-grow: 0;
    flex-shrink: 0;
  }
}

.cards {
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  overflow: auto;
}

.card {
  object-fit: contain;
  border-radius: 3.6px;
  background-color: #051724;
  display: flex;
  align-items: center;

  .icon {
    width: 92px;
    height: 92px;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    .display-value {
      font-size: 80px;
      line-height: 0.3;
      letter-spacing: 1.09px;
      text-align: center;
      color: #dae8fc;
    }

    ::v-deep .percent-text {
      color: #dae8fc;
    }
  }

  .text {
    font-size: 20px;
    line-height: 1.21;
    letter-spacing: 0.27px;
    color: #dae8fc;
    margin-right: 20px;
    padding-left: 20px;
  }

  + .card {
    margin-top: 15px;
  }
}
@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .card {
    .icon {
      .display-value {
        font-size: 50px;
      }
    }
  }
}
@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .card {
    .icon {
      .display-value {
        font-size: 50px;
      }
    }
  }
}
</style>
