<template>
  <app-emergency-card
    :header="{ ...header, title: '', icon: '' }"
    :overrideWorld="overrideWorld"
    class="er-small-card"
  >
    <div class="row">
      <div class="col small-header">
        <div class="icon" v-html="$icon('indicator_' + header.icon)"></div>
        <div class="title">{{ header.title }}</div>
      </div>

      <div class="col description">
        <div class="number">{{ number }}</div>
        <div class="color" :style="{ backgroundColor: color }"></div>
      </div>
    </div>
  </app-emergency-card>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';

export default {
  name: 'er-small-card',

  props: {
    data: Object,
    header: Object,
    overrideWorld: String,
  },

  data() {
    return {};
  },

  mounted() {
    console.log(this.overrideWorld);
  },

  computed: {
    number() {
      return this.data.value || '';
    },

    color() {
      return this.data.color || '#ec3e60';
    },
  },

  components: { AppEmergencyCard },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
}

.small-header {
  display: flex;
  align-items: center;
  width: 150px;
  flex-grow: 0;

  .title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.27px;
    color: #dae8fc;
    margin-right: 14px;
  }
}

.description {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex-grow: 1;

  .number {
    font-size: 41.1px;
    font-weight: bold;
    letter-spacing: -0.53px;
    color: #dae8fc;
  }

  .color {
    width: 47px;
    height: 6px;
    border-radius: 47px;
  }
}

@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .small-header {
    display: flex;
    align-items: center;
    width: 285px;
    flex-grow: 0;

    .title {
      font-size: 39px;
      font-weight: bold;
      letter-spacing: 0.27px;
      color: #dae8fc;
      margin-right: 14px;
    }
  }
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .small-header {
    display: flex;
    align-items: center;
    width: 200px;
    flex-grow: 0;

    .title {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 0.27px;
      color: #dae8fc;
      margin-right: 14px;
    }
  }
}
</style>
