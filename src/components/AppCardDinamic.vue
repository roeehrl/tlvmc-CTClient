<template>
  <div class="app-card-dinamic">
    <div class="card-item" v-for="(item, index) in cards" :key="index">
      <div class="card-wrapper">
        <div class="icon-card">
          <span v-html="$icon(item.icon)"></span>
        </div>
        <div class="card-val">
          <p>{{ item.value }}</p>
          <p>{{ item.text }}</p>
        </div>
        <div v-if="item.averagetime" class="card-time">
          <p>{{ item.averagetime }}</p>
          <p>{{ item.averagetext }}</p>
        </div>
        <div v-if="item.val_in" class="card-box">
          <p>{{ item.val_in }}</p>
          <p>{{ item.val_in_txt }}</p>
        </div>
        <div v-if="item.val_out" class="card-box">
          <p>{{ item.val_out }}</p>
          <p>{{ item.val_out_txt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cards"],
  data() {
    return {};
  },
  name: "app-card-dinamic",
};
</script>

<style lang="scss" scoped>
.app-card-dinamic {
  display: flex;
  padding-bottom: 25px;
  justify-content: space-between;
  .card-item {
    .card-wrapper {
      border-radius: 3px;
      background-color: #051724;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      min-height: 122px;
      position: relative;
    }
  }
  .card-item:nth-of-type(1) {
    width: 387px;
    .card-wrapper {
      .icon-card {
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-val {
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        p {
          font-size: 30px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 0.8;
          letter-spacing: 0.41px;
          text-align: center;
          color: #dae8fc;
        }
      }
      .card-time {
        width: 33.33%;
        border-right: 1px solid rgba(16, 204, 203, 0.28);
        p:nth-of-type(1) {
          font-size: 25px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.32px;
          text-align: center;
          color: #d8e7ff;
        }
        p:nth-of-type(2) {
          opacity: 0.56;
          font-size: 17.3px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.22px;
          text-align: center;
          color: #c6d9f5;
        }
      }
    }
  }
  .card-item:nth-of-type(2) {
    width: 269px;
    .card-wrapper {
      .icon-card {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-val {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        p {
          font-size: 30px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 0.8;
          letter-spacing: 0.41px;
          text-align: center;
          color: #dae8fc;
        }
      }
    }
  }
  .card-item:nth-of-type(3) {
    width: 212px;
    .card-wrapper {
      .icon-card {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-val {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        p {
          font-size: 30px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 0.8;
          letter-spacing: 0.41px;
          text-align: center;
          color: #dae8fc;
        }
      }
    }
  }
  .card-item:nth-of-type(4) {
    width: 432px;
    .card-wrapper {
      .icon-card {
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-val {
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        p {
          font-size: 30px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 0.8;
          letter-spacing: 0.41px;
          text-align: center;
          color: #dae8fc;
        }
      }
      .card-time {
        width: 33.33%;
        border-right: 1px solid rgba(16, 204, 203, 0.28);
        p:nth-of-type(1) {
          font-size: 25px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.32px;
          text-align: center;
          color: #d8e7ff;
        }
        p:nth-of-type(2) {
          opacity: 0.56;
          font-size: 17.3px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.22px;
          text-align: center;
          color: #c6d9f5;
        }
      }
    }
  }
  .card-item:nth-of-type(5) {
    width: 450px;
    .card-wrapper {
      .icon-card {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card-val {
        width: 33.33%;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: row;
        p {
          font-size: 30px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 0.8;
          letter-spacing: 0.41px;
          text-align: center;
          color: #dae8fc;
        }
      }
      .card-time {
        width: 25%;

        p:nth-of-type(1) {
          font-size: 25px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.32px;
          text-align: center;
          color: #d8e7ff;
        }
        p:nth-of-type(2) {
          opacity: 0.56;
          font-size: 17.3px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.22px;
          text-align: center;
          color: #c6d9f5;
        }
      }
      .card-box {
        width: 25%;
        border-right: 1px solid rgba(16, 204, 203, 0.28);
        p:nth-of-type(1) {
          font-size: 25px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.32px;
          text-align: center;
          color: #d8e7ff;
        }
        p:nth-of-type(2) {
          opacity: 0.56;
          font-size: 17.3px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.22px;
          text-align: center;
          color: #c6d9f5;
        }
      }
    }
  }
}
</style>
