<template>
  <div class="columns-stats">
    <div class="columns-titles">
      <div class="first-column">
        <p class="column-title">{{ column_titles[0] }}</p>
      </div>
      <div class="columns-values">
        <p class="column-title">{{ column_titles[1] }}</p>
        <p class="column-title">{{ column_titles[2] }}</p>
      </div>
    </div>
    <div
      class="column-stats-line"
      :key="index"
      v-for="(data, index) in line_data"
    >
      <div class="right-blue-border" />
      <div class="middle-border" />
      <div class="column-stats-title">
        <p>{{ data.title }}</p>
      </div>
      <div class="column-stats-values">
        <p>{{ data.amount }}</p>
        <p>{{ data.median }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    column_titles: Array,
    line_data: Array,
  },
};
</script>
<style scoped lang="scss">
.columns-stats {
  padding: 0.5;
  height: 100%;
  flex: 1;
  min-width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.columns-titles {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #c6d9f5;
  font-size: 1.4rem;
  padding-left: 1vw;
  padding-right: 1vw;
}
.first-column {
  width: 70%;
}
.columns-values {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;
}
.column-title {
  font-size: 0.8vw;
}
.column-stats-line {
  position: relative;
  height: 28%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 36%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 1vw;
  padding-right: 1vw;
}
.right-blue-border {
  position: absolute;
  right: 0;
  height: 100%;
  width: 1%;
  background-color: #10cccb;
}
.middle-border {
  position: absolute;
  right: 50%;
  height: 80%;
  width: 1px;
  background-color: #023e58;
}
.column-stats-title {
  width: 70%;
  p {
    color: #c6d9f5;
    font-size: 1vw;
  }
}
.column-stats-values {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;

  p {
    color: #c6d9f5;
    font-size: 1vw;
  }
}
</style>
