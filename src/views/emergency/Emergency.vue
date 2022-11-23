<template>
  <div class="emergency-index">
    <div class="top-bar">
      <div class="col col-1">
        <span class="label">קבלה</span>
        <span class="dot"></span>
      </div>

      <div class="col col-2">
        <span class="label">תפוסה</span>
        <span class="dot"></span>
      </div>

      <div class="col col-3">
        <span class="label">תפעול</span>
        <span class="dot"></span>
      </div>

      <div class="col col-4">
        <span class="label">שחרור</span>
        <span class="dot"></span>
      </div>
    </div>

    <div class="row">
      <div class="col col-1">
        <comment
          v-for="component of col1"
          :key="'col-1' + component.props.header.id"
          :is="component.name"
          v-bind="component.props"
        >
        </comment>
      </div>

      <div class="col col-2">
        <comment
          v-for="component of col2"
          :key="'col-2' + component.type"
          :is="component.name"
          v-bind="component.props"
        >
        </comment>
      </div>

      <div class="col col-3">
        <comment
          v-for="component of col3"
          :key="'col-3' + component.type"
          :is="component.name"
          v-bind="component.props"
        >
        </comment>
      </div>

      <div class="col col-4">
        <comment
          v-for="component of col4"
          :key="'col-4' + component.type"
          :is="component.name"
          v-bind="component.props"
        >
        </comment>
      </div>
    </div>
  </div>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';
import AppPie from '../../components/AppPie';
import ErAttending from './ErAttending';
import ErHalfCircleCard from './ErHalfCircleCard';
import ErSmallCard from './ErSmallCard';
import ErLaydown from './ErLaydown';
import ErOperationTimers from './ErOperationTimers';
import ErOperationInstitutes from './ErOperationInstitutes';
import ErReleaseCard from './ErReleaseCard';

export default {
  data() {
    return {};
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      await this.$store.dispatch('loadScreen', {
        id: null,
        refresh: false,
        type: this.$screenTypes.TYPE_UNITS,
      });
    },
  },

  computed: {
    col1() {
      if (!this.screen.data) {
        return [];
      }

      const { Reception } = this.screen.data;

      if (!Array.isArray(Reception)) {
        return [];
      }

      return Reception.map((component) => {
        let name = '';

        switch (component.cardType) {
          case 1:
            name = 'er-attending';
            break;
          case 2:
          case 3:
            name = 'er-half-circle-card';
            break;
          case 4:
            name = 'er-small-card';
        }

        return {
          name,
          type: component.cardType,
          props: {
            header: {
              title: component.cardTitle,
              icon: component.cardIcon,
              nextScreenType: component.nextScreenType,
              id: component.cardId,
            },
            data: component,
          },
        };
      });
    },

    col2() {
      if (!this.screen.data) {
        return [];
      }

      const { Capacity } = this.screen.data;

      if (!Array.isArray(Capacity)) {
        return [];
      }

      return Capacity.map((component) => {
        let name = '';

        switch (component.cardType) {
          case 1:
            name = 'er-laydown';
            break;
          case 2:
          case 3:
            name = 'er-half-circle-card';
        }

        return {
          name,
          type: component.cardType,
          props: {
            isBig: true,
            header: {
              title: component.cardTitle,
              icon: component.cardIcon,
              nextScreenType: component.nextScreenType,
              id: component.cardId,
            },
            data: component,
          },
        };
      });
    },

    col3() {
      if (!this.screen.data) {
        return [];
      }

      const { Operations } = this.screen.data;

      if (!Array.isArray(Operations)) {
        return [];
      }

      return Operations.map((component) => {
        let name = '';

        switch (component.cardType) {
          case 1:
            name = 'er-operation-timers';
            break;
          case 2:
            name = 'er-operation-institutes';
            break;
          case 3:
            name = 'er-half-circle-card';
        }

        return {
          name,
          type: component.cardType,
          props: {
            isBig: true,
            header: {
              title: component.cardTitle,
              icon: component.cardIcon,
              nextScreenType: component.nextScreenType,
              id: component.cardId,
            },
            data: component,
          },
        };
      });
    },

    col4() {
      if (!this.screen.data) {
        return [];
      }

      const { Discharge } = this.screen.data;

      if (!Array.isArray(Discharge)) {
        return [];
      }

      return Discharge.map((component) => {
        let name = '';

        switch (component.cardType) {
          case 1:
          case 2:
            name = 'er-release-card';
        }

        return {
          name,
          type: component.cardType,
          props: {
            isBig: true,
            header: {
              title: component.cardTitle,
              icon: component.cardIcon,
              nextScreenType: component.nextScreenType,
              id: component.cardId,
            },
            data: component,
          },
        };
      });
    },
  },

  components: {
    ErReleaseCard,
    ErOperationInstitutes,
    ErOperationTimers,
    ErLaydown,
    ErSmallCard,
    ErHalfCircleCard,
    ErAttending,
    AppPie,
    AppEmergencyCard,
  },
};
</script>

<style lang="scss" scoped>
$col1-width: 20%;
$col2-width: 30%;
$col3-width: 32%;
$col4-width: 18%;

$col-padding-right: 30px;

.emergency-index {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  // overflow: auto;
}

.top-bar {
  height: 15px;
  border-radius: 7.5px;
  background-color: #05141d;
  display: flex;
  overflow: visible;
  margin: 30px 0 40px 0;
  flex-grow: 0;
  flex-shrink: 0;

  .col {
    flex-grow: 0;
    flex-shrink: 0;
    width: 25%;
    position: relative;
    overflow: visible;

    .label {
      position: absolute;
      bottom: 100%;
      right: 0;
      font-size: 30px;
      font-weight: bold;
      line-height: 31px;
      display: block;
      z-index: 10;
      color: #10cccb;
    }

    .dot {
      display: block;
      width: 14px;
      height: 14px;
      border: 1px solid #01141e;
      background-color: #00d0cd;
      border-radius: 100%;
    }

    &-1 {
      width: $col1-width;
    }

    &-2 {
      width: $col2-width;
    }

    &-3 {
      width: $col3-width;
    }

    &-4 {
      width: $col4-width;
    }
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .top-bar {
    margin: unset;
  }
}

.row {
  display: flex;
  margin: 0 -15px;
  flex-grow: 1;
  align-items: stretch;

  .col {
    width: 25%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;

    &-1 {
      width: $col1-width;
    }

    &-2 {
      width: $col2-width;
    }

    &-3 {
      width: $col3-width;
    }

    &-4 {
      width: $col4-width;
    }
  }

  .col-row {
    display: flex;
  }
}

.emergency-card {
  flex-grow: 1;
  flex-shrink: 1;
}

.col-row + .emergency-card,
.col-row + .col-row,
.emergency-card + .col-row,
.emergency-card + .emergency-card {
  margin-top: 18px;
}

.col-row .emergency-card + .emergency-card {
  margin-top: 0;
  margin-right: 30px;
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
  .col-row + .emergency-card,
  .col-row + .col-row,
  .emergency-card + .col-row,
  .emergency-card + .emergency-card {
    margin-top: 18px;
    height: 200px;
  }
}
</style>
