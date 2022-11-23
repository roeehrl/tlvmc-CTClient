<template>
    <div class="app-card app-calendar-card">
        <div class="app-card-inner" :class="{'active': active, 'is-small': isSmall}">

            <div class="app-card-item">
                <span class="app-card-icon" v-html="this.$icon(item.iconName)"></span>

                <div class="app-card-info">
                    <div v-if="value" class="app-card-value">
                        {{ value }}
                    </div>
                    <div v-if="item.text" class="app-card-title">
                        {{ item.text }}<br>
                        <span>{{ text }}</span>
                    </div>
                </div>

                <div class="app-card-calendar">
                    <div class="dates">
                        <div class="date" v-for="date in dates" @click="select(date)">
                            <div class="day-name">{{ date.day }}</div>
                            <div class="day-number"
                                 :class="{'is-active': selected.getDate() === date.dayNumber}">
                                {{ date.dayNumber }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a v-if="item.showTrend" @click.prevent="viewTrend()" class="view-trend">צפה במגמה</a>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const HEB_DAYS = ['ראשון', 'שני', 'שלישי', 'רבעי', 'חמשי', 'שישי', 'שבת'];

    export default {

        name: 'app-calendar-card',

        props: {
            item: {
                type: Object,
            },
            active: {
                type: Boolean,
                default: false
            },
            isSmall: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                selected: new Date()
            }
        },

        methods:{
            viewTrend() {
                this.$emit('viewTrend');
            },

            select(date) {
                this.selected = date.date;
            }
        },

        computed: {

            dates() {
                return (this.item.days || []).map((day) => {
                    const date = new Date(day.day);

                    return {
                        date,
                        day: DAYS[date.getDay()],
                        dayNumber: date.getDate(),
                        value: day.value
                    }
                });
            },

            value() {
                return ((this.dates || []).find((date) => {
                    return this.selected.getDate() === date.date.getDate();
                }) || {}).value;
            },

            text() {
                const today = moment();
                const selected = this.selected;

                if(today.clone().subtract(1, 'day').isSame(selected, 'day')) {
                    return "אתמול";
                }

                else if(today.isSame(selected, 'day')) {
                    return "היום";
                }

                else if(today.clone().add(1, 'day').isSame(selected, 'day')) {
                    return "מחר";
                }

                return `ביום ${HEB_DAYS[selected.getDay()]}`;
            }

        }

    }
</script>

<style lang="scss" scoped>
    .app-calendar-card {
        flex: 1.5;
        padding: 0 9px;
    }

    .app-card-inner {
        border-radius: 3px;
        background-color: #051724;
        display: flex;
        align-items: center;
        min-height: 122px;
        position: relative;

        &.active {
            background-color: #035c7c;
        }

        &.is-small {
            .app-card-item {
                padding-right: 18px;
            }

            .app-card-info {
                font-size: 22px;
                padding-right: 15px;
            }
        }
    }

    .app-card-item {
        padding-right: 28px;
        display: flex;
        flex-grow: 1;
        width: 100%;

        .app-card-icon {
            display: flex;
            align-items: center;
            justify-content: center;

            ::v-deep svg {
                display: block;
            }
        }

    }

    .app-card-info {
        font-size: 30px;
        line-height: 0.94;
        letter-spacing: 0.41px;
        color: #dae8fc;
        padding-right: 25px;
        min-width: 145px;

        .app-card-value {
            font-weight: bold;
        }

        .app-card-title {

        }
    }

    a.view-trend {
        position: absolute;
        bottom: 5px;
        left: 12px;
        font-size: 15px;
        font-weight: normal;
        letter-spacing: 0.2px;
        color: #dae8fc;
        cursor: pointer;
    }

    .app-card-calendar {
        display: flex;
        flex-grow: 1;
        align-items: center;
        padding: 0 40px;
        font-size: 18px;
        line-height: 1.61;
        letter-spacing: 0.25px;
        text-align: center;
        color: rgba(#dae8fc, 0.48);
    }

    .dates {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: space-between;

        .day-number {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 100%;
            cursor: pointer;
            background-color: rgba(#ec215a, 0);
            transition: background-color 0.2s ease-in-out;

            &:hover {
                background-color: rgba(#ec215a, 0.5);
            }

            &.is-active {
                background-color: #ec215a;
            }

        }

    }

</style>