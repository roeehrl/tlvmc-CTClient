<template>
  <app-emergency-card :header="header" class="er-operation-institutes">
    <div class="items">
      <div class="item" v-for="item of items" @click.stop="goToView(item)">
        <div class="icon" v-html="$icon(item.icon)"></div>
        <div class="name">{{ item.name }}</div>
        <div class="time">{{ item.time }}</div>

        <div class="spacer">
          <div class="progress" :style="item.progressStyle"></div>
        </div>

        <div class="sub-items">
          <div class="sub-item" v-for="subItem of item.subItems">
            <div class="sub-name">{{ subItem.name }}</div>
            <div class="sub-number">{{ subItem.number }}</div>
          </div>
        </div>
      </div>
    </div>
  </app-emergency-card>
</template>

<script>
import AppEmergencyCard from '../../components/AppEmergencyCard';

export default {
  name: 'er-operation-institutes',

  props: {
    header: Object,
    data: Object,
  },

  data() {
    return {};
  },

  methods: {
    goToView({ subCardId }) {
      this.$router.push({
        name: `${this.world.route}.unit`,
        params: {
          unitId: subCardId,
        },
      });
    },
  },

  computed: {
    items() {
      return (this.data.data || []).map((item) => {
        return {
          name: item.timeText,
          icon: (item.icon || '').toLowerCase(),
          time: item.time || '',
          subCardId: item.subCardId,
          progressStyle: {
            backgroundColor: item.color || '#34a9ff',
            width: (item.percentage || 0) * 100 + '%',
          },
          subItems: item.subData.map((subItem) => {
            return { name: subItem.text, number: subItem.value };
          }),
        };
      });
    },
  },

  components: { AppEmergencyCard },
};
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  justify-content: stretch;
}

.item {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: relative;

  + .item::before {
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    height: 200px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(16, 204, 203, 0.28);
  }

  .icon {
    margin-bottom: 40px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep svg {
      display: block;
    }
  }

  .name {
    opacity: 0.56;
    font-size: 23px;
    letter-spacing: -0.3px;
    color: #c6d9f5;
    margin-bottom: 7px;
  }

  .time {
    font-size: 30px;
    font-weight: bold;
    letter-spacing: -0.39px;
    color: #ffffff;
    margin-bottom: 20px;
  }

  .spacer {
    background-color: #011b2c;
    height: 6px;
    width: 50px;
    border-radius: 20px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;

    .progress {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      transition: width 1s ease-out;
    }
  }
}

.sub-items {
  display: flex;

  .sub-item {
    text-align: center;

    .sub-name {
      opacity: 0.56;
      font-size: 19px;
      letter-spacing: -0.24px;
      color: #c6d9f5;
    }

    .sub-number {
      font-size: 25px;
      font-weight: bold;
      letter-spacing: -0.32px;
      color: #dae8fc;
    }

    + .sub-item {
      margin-right: 20px;
    }
  }
}

@media only screen and (min-device-width: 2000px) and (max-device-width: 2000px) and (-webkit-min-device-pixel-ratio: 2) {
  .item {
    .name {
      font-size: 40px;
    }
    .time {
      font-size: 40px;
    }
    .sub-items {
      .sub-name {
        font-size: 40px;
      }
      .sub-number {
        font-size: 40px;
      }
    }
  }
}
@media only screen and (min-device-width: 2160px) and (max-device-width: 2160px) and (-webkit-min-device-pixel-ratio: 2) {
  .item {
    .name {
      font-size: 50px;
    }
    .time {
      font-size: 50px;
    }
    .sub-items {
      .sub-name {
        font-size: 50px;
      }
      .sub-number {
        font-size: 50px;
      }
    }
  }
}
</style>
