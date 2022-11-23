<template>
  <div class="scroll-stats-wrapper">
    <div class="top-row row">
      <p class="title">{{ scroll_data.title }}</p>
      <div class="columns-titles">
        <p
          class="subtitle"
          v-for="(subtitle, index) in scroll_data.subtitles"
          :key="index"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>
    <div
      class="row row-data"
      v-for="(value, index) in scroll_data.rows"
      :key="index"
    >
      <p class="side-title">{{ value.title }}</p>
      <div class="columns-titles">
        <p
          class="subtitle"
          v-for="(subtitle, index) in value.values"
          :key="index"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    scroll_data: {},
    iconName: String,
  },
  computed: {
    titleStyle() {
      return this.iconName ? { 'margin-right': '1vw' } : {};
    },
    getTitle() {},
  },
};
</script>
<style lang="scss" scoped>
.scroll-stats-wrapper {
  border-radius: 7px;
  padding: 0.5rem 0 0.5rem 0;
  height: 65%;
  max-height: 70vh;
  overflow-y: auto;
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #032a43;
  margin: 2rem auto;
}
.top-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 95%;
  margin: 0 0 0 auto;
  padding: 0 1vw 0 1vw;
}
.row {
  padding: 1.2vw 1vw 1.2vw 0;
  border-bottom: 1px solid #07111e;
  width: 95%;
}
.row-data {
  @extend .top-row;
}
.subtitle {
  color: #dae8fc;
  font-size: 1vw;
  width: 13%;
}
.title {
  color: white;
  font-size: 1.5vw;
  width: 9%;
}
.side-title {
  color: #dae8fc;
  font-size: 1.2vw;
  width: 9%;
}
.columns-titles {
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  //   p {
  //     color: white;
  //   }
}
// .row-wrapper {
//   border-top: 1px solid #07111e;
// }
// .row {
//   padding: 0.8vw 1vw 0.5vw 2vw;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
// }
// .top-row {
//   padding-bottom: 0;
//   border: none !important;
// }
// .first-column-item {
//   //   width: 55%;
// }
// .icon-title {
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   p {
//     color: #dae8fc;
//     font-size: 1.1vw;
//     // margin-right: 1vw;
//   }
// }
// .dates {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 50%;
// }
// .date {
//   color: #dae8fc;
//   font-size: 1vw;
//   font-weight: normal;
//   letter-spacing: 0.27px;
// }
// .word {
//   color: #dae8fc;
//   font-size: 0.9vw;
// }
// .values {
//   @extend .dates;
// }
// .value {
//   @extend .date;
// }
</style>
