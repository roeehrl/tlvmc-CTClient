<template>
  <div class="breadcrumbs">
    <router-link
      v-for="link in links"
      :to="link.to"
      :key="link.to.name + link.title"
    >
      {{ link.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "app-breadcrumbs",

  data() {
    return {};
  },

  computed: {
    links() {
      let items = (this.screen.data || {}).breadCrumbs || [];

      if (items.length <= 0) {
        return [];
      }

      return [
        {
          title: this.world.title,
          to: { name: this.world.route },
        },
        ...items.map((item) => {
          let name = this.world.route;
          let params = {
            unitId: item.id,
          };

          if (item.screenType === this.$screenTypes.TYPE_UNITS) {
            name += ".unit";
          } else if (item.screenType === this.$screenTypes.TYPE_PATIENTS) {
            name += ".patients";
          }

          return {
            to: {
              name,
              params,
            },
            title: item.Text,
          };
        }),
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-top: 10px;
  padding: 0 48px 0 18px;
  display: flex;
}

a {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 300;

  + a::before {
    content: ">";
    display: inline-block;
    padding: 0 5px;
    font-size: 1.3em;
  }
}
</style>
