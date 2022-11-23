<template>

	<header class="header">
		<div class="section menu-trigger">
			<button class="hamburger hamburger--slider"
			        id="main-menu-toggle"
			        :class="{'is-active': menuActive}"
			        @click="toggleMenu"
			        type="button">
			  <span class="hamburger-box">
			    <span class="hamburger-inner"></span>
			  </span>
			</button>
		</div>

		<div class="section logo" v-if="settings.logo">
			<router-link :to="{name: world.route}">
				<img src="@/assets/logo.png" alt="">
			</router-link>
		</div>

		<div class="section title">
			{{ world.title }}
		</div>

		<div class="section date">
			<app-datepicker :disabled="! $config('SERVICE_DATEPICKER')"></app-datepicker>
		</div>

		<div class="spacer"></div>

		<div class="section clock" v-if="settings.date || settings.time">
			<app-clock :show-date="settings.date" :show-time="settings.time"></app-clock>
		</div>

		<div class="section weather" v-if="settings.weather">
			<app-weather></app-weather>
		</div>

	</header>

</template>

<script>
	import AppDatepicker from "./AppDatePicker";
	import AppClock from "./AppClock";
	import AppWeather from "./AppWeather";

	export default {

		name: 'app-header',

		components: {AppWeather, AppClock, AppDatepicker},

		data() {
			return {
			};
		},

		methods: {
			toggleMenu() {
				this.$store.commit('toggleMainMenu');
			}
		},

		computed: {

		}

	};

</script>

<style lang="scss" scoped>

	.header {
		height: 92px;
		box-shadow: 0 2px 21px 0 rgba(0, 0, 0, 0.5);
		background-image: linear-gradient(97deg, #03375a 9%, #02131f 50%), radial-gradient(circle at 96% 9%, #03375a, #061b2a 21%);
		padding: 10px;
		display: flex;
		position: relative;
		z-index: 50;
	}

	.section {
		padding: 20px;

		+ .section {
			border-right: solid 1px rgba(255, 255, 255, 0.3);
		}
	}

	.logo {
		padding: 10px 20px;

		img {
			max-height: 100%;
			width: auto;
		}
	}

	.title {
		font-size: 25px;
		letter-spacing: 0.34px;
		color: #34a9ff;
		max-width: 123px;
		line-height: 0.75;
	}

	.weather,
	.clock {
		padding: 10px 20px;
	}

	.spacer {
		min-height: 1px;
		flex-grow: 1;
		flex-shrink: 0;
	}

</style>
