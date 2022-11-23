<template>

	<div v-if="operations && operations.length" class="app-operations"
		 ref="operationsContainer"
		 :style="{'height': operationsHeight}">

		<app-operation :operation="operation" v-for="(operation, index) in operations" :key="index">
			<template v-slot:num>{{ operation.ORoomName || (index + 1).toString().padStart(2, "0") }}</template>
		</app-operation>

	</div>

</template>

<script>
	import AppOperation from "./AppOperation";

	export default {
		name: 'app-operations',
		components: {
			AppOperation
		},
		props: {
			operations: {
				type: Array,
				default: () => ([])
			}
		},

		data() {
			return {
				operationsHeight: '100vh',
			};
		},

		mounted() {
			setTimeout(() => {
			    console.log(this.$refs.operationsContainer);
                const timelineTop = 374;//this.$refs.operationsContainer.offsetTop;
                let offsetBottom = 0;//25;

                this.operationsHeight = `calc(100vh - ${timelineTop + offsetBottom}px)`;
			}, 0);
		}
	};

</script>

<style lang="scss" scoped>

	.app-operations {
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		margin: 0 -14px;
		align-items: flex-start;
		overflow-y: auto;
		justify-content: flex-start;
		align-content: flex-start;
	}

</style>
