<template>
    <div class="app-inline-trend">

        <app-trend-graph :small-change-loading="smallChangeLoading"
                         :trends="trends"
                         :active-rage="activeRage"
                         :title="title"
                         @range-clicked="changeRange"
                         ref="graph"
                         :range="range"
                         :values="values">
        </app-trend-graph>

    </div>
</template>

<script>
    import ClickOutSide from 'vue-click-outside';
    import AppTrendGraph from "./AppTrendGraph";

    export default {
        name: 'app-inline-trend',
        components: {AppTrendGraph},

        props: {
            apiMethod: {
                type: String,
                default: 'fetchTrend'
            },
            unitId: [String, Number],
            trendId: [String, Number],

            initData: {
                type: Object,
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
                    }
                })
            }
        },

        data() {
            return {
                isActive: false,
                loading: false,
                smallChangeLoading: false,
                title: '',
                activeTrends: [],
                values: [],
                trends: [],
                legend: null,

                activeRage: 'daily',


            }
        },

        directives: {
            ClickOutSide
        },

        mounted() {
            setTimeout(() => {
                this.isActive = true;
            }, 100);

            this.fetchData();
        },

		methods: {

            changeRange(rangeId) {
			    this.activeRage = rangeId;
			    this.fetchData(true);
            },

            async fetchData(smallChange = false) {
                const range = this.range[this.activeRage];

			    if(! smallChange) {
                    this.values = [];
                    this.activeTrends = [];
                    this.$refs.graph.startLoading();
                } else {
			        this.smallChangeLoading = true;
                }

                let title, data, trends, legend = null;

                if(! smallChange && this.initData) {
                    ({title, data, trends, legend = null} = this.initData);
                }

                else {
                    ({title, data, trends, legend = null} = await this.api[this.apiMethod](
                            this.unitId,
                            this.trendId,
                            range.unit,
                            this.time.live ? null : this.time.time
                    ));
                }

                this.values = data;
                this.trends = trends.map((item) => {
                    return {
                        hide: false,
                        ...item,
                    }
                });
                this.legend = legend;
                this.smallChangeLoading = false;

                this.title = title;
                this.$refs.graph.stopLoading();
            }
		},

        computed: {

        }

	};
</script>


<style lang="scss" scoped>
    .app-inline-trend {
        width: 100%;

        ::v-deep .trend-body {
            margin: 0;
            padding: 35px 0;

            .trend-header-right .trend-title {
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 0.27px;
                color: #dae8fc;
            }

            .trend-body-inner {
                padding-bottom: 0;
                flex-grow: 0;

                .chart {
                    height: 250px;
                }
            }
        }
    }
</style>
