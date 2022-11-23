<template>
  <div class="bars-box">
    <div class="bars-box-top">
      <div class="icon-name smaller-text">
        <img class="icon" :src="getBlackWhiteIcon(iconName)" />
        <p>{{ title }}</p>
      </div>
      <div class="total">{{ total }} סה"כ</div>
    </div>
    <div class="bars">
      <div class="bar" :key="index" v-for="(value, index) in bars_data">
        <div class="bar-progress">
          <div
            class="bar-fill"
            :style="{
              height: `${value.value}%`,
              backgroundColor: value.value > 5 ? '#34a9ff' : '#ec3e60',
            }"
          >
            <div class="number">{{ value.value }}</div>
          </div>
        </div>
        <div class="bar-text">{{ value.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bars_data: Array,
    title: String,
    total: String,
    iconName:String
  },
  computed: {
    // getIcon() {
    //   let src = '';
    //   switch (this.title) {
    //     case 'ממתינים':
    //       src = 'hourglass-small.svg';
    //       break;
    //     case 'ממתינים לפענוח':
    //       src = 'magnifying-glass.svg';
    //       break;
    //   }
    //   return require(`../../assets/icons/${src}`);
    // },
  },
};
</script>
<style lang="scss" scoped>
.bars-box {
  height: 100%;
  flex: 1;
  border-radius: 7px;
  border: solid 2px #023e58;
  padding: 0.5rem 0.5rem 0 0.5rem;
  margin-left: 0.5vw;
  height: 100%;
}
.bars-box-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 20%;
}
.icon-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    color: #dae8fc;
    margin-right: 1rem;
    font-size: 1.3vw;
  }
}
.icon{
  height: 2.2vw;
}
.bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 75%;
  flex-grow: 1;

  .bar {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    margin-left: 1.5rem;
    .bar-text {
      opacity: 0.6;
      font-size: 1vw;
      letter-spacing: 0.26px;
      text-align: center;
      color: #ecdafc;
      margin-top: 13px;
      white-space: nowrap;
    }
  }

  .bar-progress {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }

  .bar-fill {
    width: 2vw;
    min-height: 40px;
    transition: all 0.8s ease-in-out;

    .number {
      font-size: 1vw;
      font-weight: bold;
      letter-spacing: 0.41px;
      text-align: center;
      color: #ffffff;
      padding: 5px 0 0;
    }
  }
}
.total {
  width: 33%;
  color: #dae8fc;
  border-radius: 32px;
  border: solid 1px #023e58;
  background-color: #042941;
  font-size: 1vw;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
