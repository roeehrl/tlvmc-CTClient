<template>
  <div class="popup" v-click-outside="close">
    <div class="popup-header">
      <div class="close" @click="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          viewBox="0 0 17 16"
        >
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#DAE8FC"
            stroke-linecap="round"
            stroke-width="1.5"
          >
            <path d="M0 14L15 0M0 0L15 14" transform="translate(1 1)" />
          </g>
        </svg>
      </div>

      <div class="title">
        {{ this.title || 'טוען...' }}
      </div>
    </div>

    <div class="popup-body">
      <div class="legend">
        <div class="item" v-for="item in legend" :key="item.color">
          <div class="dot" :style="{ 'background-color': item.color }"></div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>

      <div class="ambulances">
        <ambulance
          v-for="ambulance in data"
          :key="ambulance.ambulanceNumber"
          :color="colors[ambulance.type]"
          :item="ambulance"
        ></ambulance>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import Ambulance from './ErAmbulance';

export default {
  components: { Ambulance },
  props: {
    overrideWorld: String,
  },

  data() {
    return {
      title: '',
      legend: [],
      data: [],
      screenTimer: null,
      created: false,
      colors: {},
      currentRoute:this.$route.name,
      id:this.$route.name === 'liss' ? "86":"23"
    };
  },

  created() {
    this.fetch();

    setTimeout(() => {
      this.created = true;
    }, 100);
  },

  methods: {
    close() {
      if (!this.created) {
        return;
      }

      if (this.screenTimer) {
        clearTimeout(this.screenTimer);
        this.screenTimer = null;
      }

      this.$store.commit('hidePopup');
    },

    async fetch() {
      if (this.screenTimer) {
        clearTimeout(this.screenTimer);
        this.screenTimer = null;
      }

      const { title, legend, data } = await this.api.getAmbulances(
        this.overrideWorld ? this.overrideWorld : false,this.$data.id
      );

      this.title = title;
      this.legend = legend;
      this.data = data;

      for (let item of this.legend) {
        this.colors[item.type + ''] = item.color;
      }

      if (this.time.live) {
        this.screenTimer = setTimeout(() => {
          this.fetch();
        }, parseInt(this.$config('REFRESH_INTERVAL')));
      }
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  z-index: 999;
  width: 400px;
  left: 0;
  top: 92px;
  bottom: 0;
  box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 48%);
  padding: 25px;
}

.popup-header {
  display: flex;
  align-items: center;

  .close {
    cursor: pointer;

    svg {
      display: block;
    }
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 0.41px;
    color: #dae8fc;
    margin-right: 34px;
  }
}
.ambulances{
  overflow: scroll;
  height: 100vh;
}
.legend {
  display: flex;
  margin: 25px 0;

  .item {
    display: flex;
    align-items: center;

    + .item {
      margin-right: 25px;
    }
  }

  .dot {
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 100%;
    margin-left: 5px;
  }

  .text {
    font-size: 20px;
    letter-spacing: 0.27px;
    color: #ffffff;
  }
}
</style>
