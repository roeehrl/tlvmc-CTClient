<template>
    <app-emergency-card class="card" icon-prefix="" :header="{title: card.title, icon: card.icon}">

        <div class="circle-wrap">
            <vue-circle :progress="card.percentage * 100"
                        ref="circle"
                        :size="180"
                        :reverse="false"
                        line-cap="butt"
                        :fill="{color: card.color || '#34a9ff'}"
                        empty-fill="#8577d1"
                        :animation-start-value="0.0"
                        :start-angle="-(Math.PI / 2)"
                        insert-mode="append"
                        :thickness="6"
                        :animation="{duration: 2000}"
                        :show-percent="false">
            </vue-circle>


            <div class="text">
                <p class="value">{{ card.value }}</p>
                <p class="label">{{ card.valueText }}</p>
            </div>
        </div>

        <div class="bottom-text" v-if="card.bottomText">
            <span :style="{'background-color': card.color}"></span>
            {{ card.bottomText }}
        </div>

    </app-emergency-card>
</template>

<script>
    import AppEmergencyCard from "./AppEmergencyCard";
    export default {

        name: 'clinics-card',
        components: {AppEmergencyCard},
        props: {
            card: Object
        },

        data() {
            console.log(this.card.color);
            
            return {

            }
        },

        methods: {



        }

    }
</script>

<style lang="scss" scoped>

    .card {
        ::v-deep {
            .card-content-inner {
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .circle-wrap {
            position: relative;

            .text {
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
                font-weight: bold;
                letter-spacing: 0.41px;
                text-align: center;
                color: #ffffff;
                flex-direction: column;

                .label {
                    font-weight: 400;
                    font-size: 16px;
                }
            }
        }

        .bottom-text {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            color: white;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            span {
                display: inline-block;
                width: 1em;
                height: 1em;
                border-radius: 100%;
                margin-left: 5px;
            }
        }

    }

</style>