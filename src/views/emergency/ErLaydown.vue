<template>
  <app-emergency-card :header="header" icon-prefix="indicator_">
    <div class="row">
      <div class="col description">
        <div class="subtitle">{{ description.subtitle }}</div>
        <div class="title">{{ description.title }}</div>
        <div class="alert">{{ description.alert }}</div>
      </div>

      <div class="col pie">
        <div class="pie-holder">
          <app-pie
            :data="values"
            :number="pieLegend.number"
            :radius="[60, 30]"
            :text="pieLegend.text"
          >
          </app-pie>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col description"></div>

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
  name: 'er-laydown',

  props: {
    data: Object,
    header: Object,
  },

  data() {
    return {};
  },

  computed: {
    description() {
      return {
        subtitle: this.data.timeText || '',
        title: this.data.time || '',
        alert: this.data.underTime || '',
      };
    },

    pieLegend() {
      return {
        number: this.data.value || '',
        text: this.data.text || '',
      };
    },

    values() {
      return (this.data.subData || []).map((value) => {
        return {
          label: value.text,
          ...value,
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
}

.col.description {
  width: 180px;
  flex-grow: 0;
  flex-shrink: 0;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .subtitle {
    opacity: 0.56;
    font-size: 21.6px;
    letter-spacing: -0.28px;
    color: #c6d9f5;
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    letter-spacing: -0.46px;
    color: #dae8fc;
  }

  .alert {
    font-size: 19.2px;
    letter-spacing: -0.25px;
    color: #ec3e60;
  }
}

.pie {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  .pie-holder {
    width: 134px;
  }
}

.legend {
  color: #dae8fc;
  flex-grow: 1;
  margin-top: 11px;

  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      margin: 3px 0;

      @media only screen and (max-width: 1780px) {
        margin: 3px 20px;
      }
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
  .value {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.34px;
    color: #dae8fc;
    margin-right: 10px;
  }
  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .subtitle {
      opacity: 0.56;
      font-size: 40.6px;
      letter-spacing: -0.28px;
      color: #c6d9f5;
    }

    .title {
      font-size: 40px;
      font-weight: bold;
      letter-spacing: -0.46px;
      color: #dae8fc;
    }

    .alert {
      font-size: 40.2px;
      letter-spacing: -0.25px;
      color: #ec3e60;
    }
  }
  .legend {
    .value {
      font-size: 40px;
    }
    .color-label {
      .label {
        font-size: 20px;
      }
    }
  }
}
/* מיון שוכבים component */
@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .value {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.34px;
    color: #dae8fc;
    margin-right: 10px;
  }
  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .subtitle {
      opacity: 0.56;
      font-size: 40.6px;
      letter-spacing: -0.28px;
      color: #c6d9f5;
    }

    .title {
      font-size: 35px;
      font-weight: bold;
      letter-spacing: -0.46px;
      color: #dae8fc;
    }

    .alert {
      font-size: 40.2px;
      letter-spacing: -0.25px;
      color: #ec3e60;
    }
  }
}
</style>
