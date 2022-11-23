<template>

	<div class="app-clock">

		<div class="time" v-if="showTime">{{ time }}</div>
		<div class="date" v-if="showDate">{{ date }}</div>

	</div>

</template>

<script>
	import moment from 'moment';

	export default {

		name: 'app-clock',

		props: {
			showTime: true,
			showDate: true
		},

		data() {
			return {
				ticker: null,
				current: moment(),
			};
		},

		created() {
			this.ticker = setInterval(() => {
				this.current = moment();
			}, 1000);
		},

		destroyed() {
			clearInterval(this.ticker);
		},

		computed: {
			date() {
				return this.current.format('DD MMMM YYYY');
			},

			time() {
				return this.current.format('HH:mm');
			}
		}

	};

</script>

<style lang="scss" scoped>

	.app-clock {
		text-align: center;
		line-height: 0.7;
	}

	.time {
		font-size: 54px;
		letter-spacing: 3.54px;
		color: #ffffff;
		margin-bottom: 3px;
	}

	.date {
		font-size: 19.6px;
		letter-spacing: -0.38px;
		color: #29628d;
	}

</style>
