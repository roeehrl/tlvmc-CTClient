<template>
  <div class="patients" v-if="! screen.loading && screen.data">
		<app-statistics :stats="screen.data.cards"
                        :title="screen.data.title"
                        :color="screen.data.color">
		</app-statistics>

	    <app-table :table="screen.data.table"
                   :type="$screenTypes.TYPE_PATIENTS">
	    </app-table>
	</div>
</template>

<script>

	export default {
      name: 'unit-view',

      props: {
        unitId: [String, Number],
      },

      data() {
        return {

        }
      },

      created() {
        this.fetch();
      },

      methods: {
        async fetch(refresh = false) {
          await this.$store.dispatch('loadScreen', {
            id: this.unitId,
            refresh,
            type: this.$screenTypes.TYPE_PATIENTS
          });
        }
      }

    }

</script>

<style lang="scss" scoped>

	.patients {
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
	}

</style>
