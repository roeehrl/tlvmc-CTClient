<template>
	<div v-if="tabs && tabs.length" class="app-tabs">
		<a v-for="tab in tabs"
		   :class="{'active': activeTab === tab.TabId || tab.IsActive}"
		   @click.prevent="goToTab(tab.TabId)"
		   v-html="(tab.TabName || '').trim()">
		</a>
	</div>
</template>

<script>
	export default {

		name: 'app-tabs',

		props: {
			tabs: {
				type: Array,
				default: () => ([])
			},
			activeTab: {
				type: Number | Boolean,
				default: false
			}
		},

		methods: {
			goToTab(tabId) {
				this.$emit('click', tabId);
			}
		},

	};

</script>

<style lang="scss" scoped>

	.app-tabs {
		padding: 32px 0;

		a {
			font-size: 22px;
			color: #547087;
			letter-spacing: 0.3px;
			transition: all .2s ease-in-out;
			cursor: pointer;
			margin-left: 41px;
			position: relative;

			&:after {
				position: absolute;
				content: '';
				height: 2px;
				background-color: #10cccb;
				width: 0;
				bottom: 0;
				transition: width .2s ease-in-out;
				left: 50%;
				transform: translateX(-50%) translateY(4px);
			}

			&:hover, &.active {
				color: #10cccb;

				&:after {
					width: 100%;
				}
			}
		}
	}

</style>
