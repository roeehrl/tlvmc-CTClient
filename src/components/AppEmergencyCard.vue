<template>
  <div
    class="emergency-card"
    @click="goToSinglePage"
    :class="{ 'on-hover': isHoverable, 'is-bold': bold, isBdikotDam: isBdikotDam() }"
  >
    <div class="card-header" v-if="header && (header.title || header.icon)">
      <div class="icon" v-html="$icon(iconPrefix + header.icon)"></div>
      <div class="title">{{ header.title }}</div>
    </div>

    <div class="card-content">
      <div class="card-content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ErAmbulancesPopup from './ErAmbulancesPopup';

export default {
  name: 'app-emergency-card',

  props: {
    bold: false,
    iconPrefix: {
      type: String,
      default: '',
    },
    header: {
      type: Object,
      default: null,
    },
    overrideWorld: {
      type: String,
    },
  },

  data() {
    return {};
  },

  created() {},

  methods: {
    isBdikotDam() {
      if(this.header.title && this.header.title.includes("בדיקות דם")) {
        return true;
      }
    },

    goToSinglePage() {

      if(this.isBdikotDam) {
        return;
      }

      if (!this.header.nextScreenType) {
        return;
      }

      if (this.header.nextScreenType === this.$screenTypes.TYPE_MARLAD_UNIT) {
        this.$router.push({
          name: `${this.world.route}.unit`,
          params: {
            unitId: this.header.id,
          },
        });
      }

      if (this.header.nextScreenType === this.$screenTypes.TYPE_MARLAD_SCORE) {
        this.$router.push({
          name: `${this.world.route}.score`,
          params: {
            unitId: this.header.id,
          },
        });
      }

      if (this.header.nextScreenType === this.$screenTypes.TYPE_MARLAD_POPUP) {
        this.$store.commit('showPopup', {
          component: ErAmbulancesPopup,
          props: {
            unitId: this.header.id,
            overrideWorld: this.overrideWorld,
          },
        });
      }
    },
  },

  computed: {
    isHoverable() {
      return this.header && this.header.id && this.header.nextScreenType;
    },
  },
};
</script>

<style scoped lang="scss">
.emergency-card {
  padding: 12px 18px;
  border: 1px solid #023e58;
  border-radius: 4px;
  background-color: #042941;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s ease;

  &.is-bold {
    background-color: #051724;
  }

  &.on-hover {
    &.isBdikotDam {
      cursor: default;
    }

    cursor: pointer;

    &:hover {
      background-color: #035c7c;
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;

  .title {
    color: #dae8fc;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.27px;
    line-height: 21px;
  }

  .icon {
    margin-left: 7px;
    width: 36px;
    height: 35px;

    ::v-deep svg {
      display: block;
    }
  }
}

.card-content {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  &.-inner {
    width: 100%;
    font-size: 9px;
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .emergency-card {
    height: 320px;
    margin-top: 25px;
  }
  .card-header {
    .title {
      font-size: 40px;
    }
  }
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .emergency-card {
    height: 225px;
    margin-top: unset;
  }
  .card-header {
    .title {
      font-size: 35px;
    }
  }
}
</style>
