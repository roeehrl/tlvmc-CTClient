<template>

	<div>
		<div class="world" :class="[`world-${worldName}`]">
        <router-view :key="'world-' + $route.fullPath"></router-view>

		<div class="loading-container" v-if="loading || screen.loading && ! screen.error">
			<app-loader></app-loader>
			<p>טוען...</p>
		</div>

		<div class="error-container" :class="[screen.error,'active-error']" v-if="screen.error" @click.prevent.stop="reload">
			<svg enable-background="new 0 0 50 50" id="Layer_1" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="50" width="50"/><polyline fill="none" points="40,7 40,16   31,15.999 " stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M41.999,25  c0,9.39-7.61,17-17,17s-17-7.61-17-17s7.61-17,17-17c5.011,0,9.516,2.167,12.627,5.616c0.618,0.686,1.182,1.423,1.683,2.203" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg>
		</div>
    	</div>
	</div>

</template>

<script>
	import AppBreadcrumbs from "../components/AppBreadCrumbs";

	export default {
		components: {AppBreadcrumbs},
		props: {
			worldName: String
		},

		data() {
			return {
				loading: true
			};
		},

		created() {
			this.initWorld();
		},

		methods: {
			async initWorld() {
				this.loading = true;

				await this.$store.dispatch('changeWorld', this.worldName);

				this.loading = false;
			},

			reload() {
				window.location = `/${this.worldName}`;
			}
		}

	};

</script>

<style lang="scss" scoped>

	.world {
		height: 100%;
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		flex-direction: column;
		// overflow: auto;
		padding-bottom: 15px;
		// border: 1px solid red;
		// padding: 39px 48px 0 18px;
		&.world-malrad{
			// border: 1px solid red ;
			padding: 39px 48px 60px 18px;
		}
		&.world-hospitalization{
			padding: 0 48px 50px 18px;
		}
		&.world-operations{
			padding: 0 25px 50px 25px;
			
		}
		&.world-clinics{
			padding: 0 48px 0 18px;
		}
		&.world-winter{
			padding: 0 48px 0 18px;
		}
		&.world-transporations{
			padding: 0px 28px 0 0px;
		}
		
		&.world-liss{
			padding: 39px 48px 0 18px;
		}
		&.world-tipulnimraz{
			padding: 0px 0px 0 0px;
		}
		&.world-radiations{
			padding: 0px 0px 0 18px;
		}
	}


	.loading-container {
		flex-grow: 1;
		z-index: 999999;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.loader {
			width: 100px;
			height: 100px;
		}

		p {
			margin: 50px 0 0 0;
			color: white;
			font-size: 22px;
		}
	}

	.error-container {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		z-index: 9999;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 24px;
		cursor: pointer;

		svg {
			width: 80px;
			height: 80px;
		}
		&.active-error{
			z-index: -9999;
		}
	}

</style>