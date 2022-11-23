<template>
  <app-emergency-card
    class="er-attending"
    :header="header"
    iconPrefix="indicator_"
    :bold="true"
  >
    <div class="row">
      <div class="col pie">
        <app-pie
          :data="values"
          :number="pieLegend.number"
          :text="pieLegend.text"
        >
        </app-pie>
      </div>
      <div class="col legend">
        <ul>
          <li v-for="value of values">
            <div class="value">{{ value.value }}</div>
            <div class="color-label">
              <div
                class="color"
                :style="{ backgroundColor: value.color }"
              ></div>
              <div class="label">{{ value.label }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </app-emergency-card>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';
import AppPie from '../../components/AppPie';

export default {
  name: 'er-attending',

  props: {
    header: Object,
    data: Object,
  },

  data() {
    return {};
  },

  computed: {
    pieLegend() {
      return {
        number: this.data.value || '',
        text: this.data.text || '',
      };
    },

    values() {
      return this.data.subData.map((value) => {
        return {
          color: value.color,
          label: value.text,
          value: value.value,
        };
      });
    },
  },

  components: { AppPie, AppEmergencyCard },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}

.col {
  &.pie {
    width: 127px;
    height: 127px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  &.legend {
    flex-grow: 1;
    flex-shrink: 1;
  }
}

.legend {
  color: #dae8fc;
  margin-right: 35px;

  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media only screen and (max-width: 1780px) {
      flex-direction: column;
    }

    li {
      width: 50%;
      display: flex;
      flex-direction: column;
      margin: 3px 0;
    }
  }

  .value {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 0.34px;
    color: #dae8fc;
    margin-right: 10px;
  }

  .color-label {
    display: flex;
    align-items: center;

    .color {
      width: 5px;
      height: 5px;
      border-radius: 100%;
      margin-left: 5px;
    }

    .label {
      opacity: 0.6;
      font-size: 16px;
      letter-spacing: 0.22px;
      color: #dae8fc;
    }
  }
}
@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .legend {
    .value {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 0.34px;
      color: #dae8fc;
      margin-right: 10px;
    }
    .color-label {
      display: flex;
      align-items: center;

      .color {
        width: 5px;
        height: 5px;
        border-radius: 100%;
        margin-left: 5px;
      }

      .label {
        opacity: 0.6;
        font-size: 30px;
        letter-spacing: 0.22px;
        color: #dae8fc;
      }
    }
  }
}
</style>
