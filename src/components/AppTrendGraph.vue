<template>
    <div class="app-trend-graph">
        <div class="trend-body">
            <div class="trend-header">
                <div class="trend-header-right">
                    <div class="trend-title">{{ newTitle }}</div>

                    <div class="trend-separator"></div>

                    <div class="trend-date-select">
                        <a v-for="(item, rangeId) in range"
                        :class="{'active': activeRage === rangeId}"
                        @click="$emit('range-clicked', rangeId)">
                        {{ item.label }}
                        </a>
                    </div>

                    <app-loader v-if="smallChangeLoading" class="small-change-loader"></app-loader>
                </div>

                <div class="trend-header-left">
                    <div class="trend-items" v-if="! loading">
                        <div v-for="trend in trends"
                             :class="{'is-active': ! trend.hide}"
                             @click="toggleTrend(trend)"
                             class="trend-item">
                            <div class="trend-bullet" :style="{backgroundColor: trend.color}"></div>
                            <div class="trend-text">{{ trend.title }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="trend-body-inner" v-if="$store.getters.shrink === false">
                <app-loader class="main-loader" v-if="loading"></app-loader>
                <template v-else>
                    <div v-if="legend" class="legend">

                        <div class="icon" v-if="legend.icon" v-html="this.$icon(legend.icon)"></div>

                        <ul>
                            <li v-for="item in legend.items" :key="item.label">
                                <span class="label">{{ item.label }}</span>
                                <span class="value">{{ item.value }}</span>
                            </li>
                        </ul>

                    </div>
                    <div class="chart" ref="chartContainer">
                        <la-cartesian :data="values"
                                      :padding="8"
                                      :bound="[n => n - 5, n => n + 5]"
                                      textColor="#dae8fc"
                                      :width="chartSize.width"
                                      :height="chartSize.height">

                            <la-line v-for="trend in trends"
                                     :hide-line="trend.hide"
                                     :dot="! trend.hide"
                                     :animated="! trend.hide"
                                     :width="2"
                                     :label="trend.title"
                                     :key="trend.id"
                                     curve
                                     :color="trend.color"
                                     :prop="trend.id">
                            </la-line>

                            <la-x-axis prop="name" :fontSize="20"></la-x-axis>
                            <la-y-axis gridline :fontSize="20"></la-y-axis>

                            <la-tooltip>
                                <div class="tooltip" slot-scope="props">
                                    <div class="title">
                                        {{ props.label }}
                                    </div>
                                    <ul class="list">
                                        <li v-for="(item, index) in props.actived"
                                            v-if="(trends[index] || {}).hide !== true"
                                            :key="item.label + item.value">
                                            <div class="dot" :style="{'backgroundColor': item.color}"></div>
                                            <div class="label">{{ item.label }}:</div>
                                            <div class="value">{{ item.value }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </la-tooltip>
                        </la-cartesian>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
    const defaultTitle = "טוען...";

    export default {
        name: 'app-trend-graph',

        props: {
            smallChangeLoading: Boolean,
            title: {
                type: String,
                default: defaultTitle,
            },
            activeTrends: {
                type: Array,
                default: () => ([])
            },
            trends: {
                type: Array,
                default: () => ([])
            },
            values: {
                type: Array,
                default: () => ([])
            },
            legend: Object,
            activeRage: {
                type: String,
                default: 'daily'
            },
            range: {
                type: Object,
                default: () => ({
                    hourly: {
                        label: 'שעתי',
                        unit: 'H',
                        unitBack: 7
                    },
                    daily: {
                        label: 'יומי',
                        unit: 'D',
                        unitBack: 7
                    },
                    weekly: {
                        label: 'שבועי',
                        unit: 'W',
                        unitBack: 7
                    },
                    monthly: {
                        label: 'חודשי',
                        unit: 'M',
                        unitBack: 12
                    },
                    annual: {
                        label: 'שנתי',
                        unit: 'Y',
                        unitBack: 7
                    }
                })
            }
        },

        data() {
            return {
                loading: true,
                newTitle: this.title,
                chartSize: {
                    width: 600,
                    height: 200
                }
            }
        },

        created() {
            setTimeout(() => {
                this.isActive = true;
            }, 100);
        },

		methods: {

            toggleShrink() {
                if(this.$store.getters.shrink) { 
                    this.$store.commit("changeTrendPopupStatus", {show: true, shrink: false, trend: true});
                } else {
                    this.$store.commit("changeTrendPopupStatus", {show: true, shrink: true, trend: true});
                }
            },

            toggleTrend(trend) {
			    const activeTrends = this.trends.filter((item) => {
			        return ! item.hide;
                });

                if(! trend.hide && activeTrends.length <= 1) {
                    return;
                }

			    trend.hide = ! trend.hide;
            },

            startLoading() {
			    this.loading = true;
			    this.newTitle = defaultTitle;
            },

            stopLoading() {
                this.loading = false;

                this.$nextTick(() => {
                    this.newTitle = this.title;

                    if(! this.$refs.chartContainer) {
                        return;
                    }

                    this.chartSize = {
                        width: this.$refs.chartContainer.clientWidth,
                        height: this.$refs.chartContainer.clientHeight,
                    };
                });
            }
		},

        computed: {

        }

	};
</script>


<style lang="scss" scoped>
    .app-trend-graph {
        position: relative;

	    .main-loader {
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%, -50%);
		    width: 120px;
		    height: 120px;
	    }

	    .close-trend {
		    position: absolute;
		    background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23DAE8FC' stroke-linecap='round' stroke-width='1.5'%3E%3Cpath d='M0 14L15 0M0 0L15 14' transform='translate(1 1)'/%3E%3C/g%3E%3C/svg%3E%0A");
		    width: 15px;
		    height: 14px;
		    background-size: cover;
		    background-repeat: no-repeat;
		    background-position: center;
		    top: 32px;
		    right: 23px;
		    cursor: pointer;
	    }

	    .trend-body {
		    position: relative;
		    margin: 24px 70px 0 60px;
		    height: 100%;
            display: flex;
            flex-direction: column;

		    .trend-header {
			    display: flex;
			    justify-content: space-between;
                flex-grow: 0;
                flex-shrink: 0;

			    &-right {
				    display: flex;
				    align-items: center;

				    .trend-title {
					    font-size: 30px;
					    font-weight: bold;
					    letter-spacing: 0.41px;
					    color: #dae8fc;
				    }

				    .trend-separator {
					    width: 1px;
					    height: 32px;
					    background-color: rgba(218, 232, 252, 0.17);
					    margin: 0 22px;
				    }

				    .trend-date-select {
					    display: flex;

					    a {
						    font-size: 20px;
						    letter-spacing: 0.27px;
						    color: rgba(255, 255, 255, 0.4);
						    transition: all .2s ease-in-out;
						    text-decoration: none;
						    margin-left: 42px;
                            cursor: pointer;

						    &.active, &:hover {
							    color: #fff;
						    }
					    }
				    }
			    }

			    &-left {
				    .trend-items {
					    display: flex;

					    .trend-item {
                            opacity: 0.5;
                            cursor: pointer;

						    &.is-active {
							    opacity: 1;
						    }

						    display: flex;
						    align-items: center;
						    margin-right: 22px;

						    .trend-bullet {
							    width: 10px;
							    height: 10px;
							    border-radius: 50%;
							    margin-left: 7px;
						    }

						    .trend-text {
							    font-size: 20px;
							    letter-spacing: 0.27px;
							    color: rgba(255, 255, 255, 0.5);
						    }
					    }
				    }
			    }
		    }

            .trend-body-inner {
                flex-grow: 1;
                flex-shrink: 1;
                padding-bottom: 50px;
                display: flex;

                .chart {
                    flex-grow: 1;
                    flex-shrink: 1;
                    height: 250px;
                }

            }
	    }

        &.is-inline .trend-body {
            margin: 0 70px 0 60px;
            padding: 35px 0;

            .trend-body-inner {
                padding-bottom: 0;
                flex-grow: 0;

                .chart {
                    height: 250px;
                }
            }

        }

        ::v-deep .chart {
            position: relative;
            z-index: 10;
            direction: ltr;

            text {
                font: normal 20px 'Almoni Neue DL 4.0 AAA', sans-serif;
                font-size: 15px;
            }

            .la-tooltip {
                z-index: 999;

                .tooltip {
                    width: 250px;
                    background: rgba(0, 0, 0, 0.85);
                    direction: rtl;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .title {
                    padding: 10px;
                    color: #34a9ff;
                    background-color: black;
                }

                .list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                }

                .list li {
                    padding: 5px 10px;
                    flex: 1;
                    color: #fff;
                    margin: 0;
                    min-width: 90px;
                    display: flex;
                    align-items: center;

                    .dot {
                        width: 0.8em;
                        height: 0.8em;
                        border-radius: 2em;
                        margin-left: 5px;
                    }

                    .label {
                        color: #dfe2e5;
                        font-weight: 200;
                        margin-left: 5px;
                    }

                    .value {
                        font-weight: 500;
                        color: #959da5;
                    }
                }
            }
        }

        .small-change-loader {
            min-width: 20px;
            min-height: 20px;
            width: 30px;
            height: 30px;
        }

    }

    .disable {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 45px;
        color: white;
    }

    .legend {
        flex-grow: 0;
        flex-shrink: 0;
        width: 272px;
        border: solid 1.3px rgba(29, 92, 126, 0.65);
        padding: 18px 28px;
        margin-left: 10px;

        .icon {
            width: 60px;

            ::v-deep svg {
                width: 100%;
                height: auto;
                display: block;
            }

            + ul {
                margin-top: 21px;
            }
        }

        ul {
            font-size: 21.1px;
            font-weight: bold;
            letter-spacing: 0.29px;
            color: #dae8fc;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;

                + li {
                    margin-top: 25px;
                }

                .value {
                    font-weight: 100;
                }
            }
        }

    }

</style>
