<template>

    <div class="ambulance" :style="{'border-color': color}">

        <div class="time-location">
            <div class="timer">{{ timer }}</div>
            <div class="location">{{ item.location }}</div>
        </div>

        <div class="text-lines">
            <div class="title">{{ item.text }}</div>
            <div class="line">{{ item.subText }}</div>
        </div>

        <div class="status">
            <div class="number">{{ item.ambulanceNumber }}</div>
            <div class="status-text" :style="{color: item.statusColor}">
                {{ item.statusName }}
            </div>
        </div>

    </div>

</template>

<script>
    import moment from 'moment';

    export default {

        name: 'ambulance',

        props: {
            item: Object,
            color: String
        },

        data() {
            return {
                clock: null,
                timer: '',
                endTime: moment().startOf('minute').add(this.item.seconds, 'seconds')
            }
        },

        watch: {
            item: {
                deep: true,
                handler() {
                    this.endTime = moment().startOf('minute').add(this.item.seconds, 'seconds');

                    if(! this.clock) {
                        this.tick();
                    }
                }
            }
        },

        created() {
            this.tick();
        },

        methods: {

            tick() {
                if(this.clock) {
                    clearTimeout(this.clock);
                    this.clock = null;
                }

                const time = moment.duration(this.endTime.diff(moment().startOf('minute')));

                if(time.asSeconds() <= 0) {
                    this.timer = "הגיע";

                    if(this.clock) {
                        clearTimeout(this.clock);
                        this.clock = null;
                    }

                    return;
                }

                this.timer = time.get('minutes') + ':' + (time.get('seconds') <= 9 ? `0${time.get('seconds')}` : time.get('seconds'));

                this.clock = setTimeout(() => {
                    this.endTime.subtract(1, 'seconds');
                    this.tick();
                }, 1000);
            }

        }
    }

</script>

<style lang="scss" scoped>

    .ambulance {
        border-radius: 3px;
        box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
        background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 36%);
        display: flex;
        border-right: 4px solid;
        align-items: center;

        + .ambulance {
            margin-top: 18px;
        }
    }

    .time-location {
        padding: 16px 10px 16px 0;
        flex-grow: 0;
        flex-shrink: 0;
        width: 90px;
        margin-left: 23px;

        .timer {
            font-size: 39px;
            font-weight: bold;
            color: #c6d9f5;
        }

        .location {
            font-size: 14px;
            letter-spacing: 0.19px;
            color: #dae8fc;
        }
    }

    .text-lines {
        flex-grow: 1;

        .title {
            font-size: 21.5px;
            font-weight: bold;
            letter-spacing: -0.28px;
            color: #c6d9f5;
        }

        .line {
            font-size: 16px;
            letter-spacing: 0.22px;
            color: #dae8fc;
        }
    }

    .status {
        align-self: normal;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 9px;
        text-align: left;

        .number {
            font-size: 14px;
            letter-spacing: -0.18px;
            color: #0f9ed2;
        }

        .status-text {
            font-size: 21.5px;
            font-weight: bold;
            letter-spacing: -0.28px;
            text-align: right;
        }
    }

</style>