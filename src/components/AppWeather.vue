<template>

	<div class="app-weather">

		<div class="view" v-if="! loading">
			<div class="degrees">
				<span>{{ degrees }}</span>
				<small class="symbol">°</small>
			</div>
			<img :src="'https://openweathermap.org/img/wn/'+ icon +'.png'"
			     class="icon">
		</div>

		<app-loader v-else></app-loader>

	</div>

</template>

<script>
	import axios from 'axios';

	export default {

		name: 'app-weather',
		data() {
			return {
				loading: true,
				degrees: null,
				icon: null
			}
		},

		created() {
			this.fetch();
		},

		methods: {
			fetch() {
				axios.get('http://api.openweathermap.org/data/2.5/weather', {
					params: {
						'q': 'TEL-AVIV',
						'units': 'metric',
						'APPID': '2d9fe1d006d695fa9a594683b06b299c'
					}
				})
				.then(({data}) => {
					this.icon = (data.weather[0] || {}).icon;
					this.degrees = Math.round(data.main.temp_max);
					this.loading = false;
				});

			}
		}

	}

</script>

<style lang="scss" scoped>

	.view {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.degrees {
		font-size: 60px;
		letter-spacing: 0.82px;
		color: #ffffff;
	}

	.icon {
		margin-right: 10px;
		width: 50px;
		height: 50px;
	}

	.loader {
		width: 50px;
		height: 50px;
	}

</style>
