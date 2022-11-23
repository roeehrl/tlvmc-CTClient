<template>
    <div class="app-line-graph-box">
        <div class="header">
            <span class="icon" v-html="$icon(icon)"></span>
            <p class="title">{{ title }}</p>
        </div>

        <div class="body">

            <div class="lines">

                <div class="line" v-for="line in data">
                    <div class="bar">
                        <div :class="['bar-progress']" :style="{height: line.percentage+'%', backgroundColor: line.backgroundColor}"></div>
                    </div>

                    <div class="value">{{ line.value }}</div>
                    <div class="label">{{ line.label }}</div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'app-line-graph-box',

        props: {
            title: String,
            icon: String,
            data: Array
        }

    }
</script>

<style lang="scss" scoped>

    .app-line-graph-box {
        border-radius: 4px;
        border: solid 1px #023e58;
        background-color: #042941;
        padding: 19px 21px;

        + .app-line-graph-box {
            margin-right: 29px;
        }

        .header {
            display: flex;
            align-items: center;

            .icon {
                width: 35px;
                height: 35px;
                overflow: hidden;
                background-color: #30414f;
                border-radius: 100%;
                object-fit: contain;
                margin-left: 10px;


                ::v-deep svg {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

            }

            .title {
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 0.27px;
                color: #dae8fc;
            }
        }

    }

    .lines {
        display: flex;
        justify-content: space-around;
        color: white;
        text-align: center;
        margin-top: 40px;

        .line {
            .bar {
                height: 100px;
                width: 16px;
                border-radius: 2px;
                overflow: hidden;
                position: relative;
                margin: 0 auto;

                .bar-progress {
                    position: absolute;
                    border-radius: 2px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: white;
                    transition: 0.2s ease-in-out;
                }
            }

            .value {
                margin-top: 10px;
                font-size: 25px;
                font-weight: bold;
                letter-spacing: 0.34px;
                color: #dae8fc;
            }

            .label {
                opacity: 0.6;
                font-size: 16px;
                letter-spacing: 0.22px;
                color: #dae8fc;
            }

        }

    }

    .bg-kpi {

        &-0 {
           background-color: #ec5656 !important;
        }

        &-1 {
            background-color: #fad058 !important;
        }

        &-2 {
            background-color: #44f2a6 !important;
        }

    }

</style>