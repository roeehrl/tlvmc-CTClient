<template>
    <div class="app-status-box">
        <div class="title">
            {{ title }}
        </div>

        <div class="subtitle">
            {{ subtitle }}
        </div>

        <div class="progress">
            <div class="progress-bar" :style="{width: progress+'%', backgroundColor: color}"></div>
        </div>

        <div class="icon-row">
            <div class="icon" v-html="$icon(icon)"></div>
            <div class="value">{{ iconText }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app-status-box',

        props: {
            title: String,
            subtitle: String,
            progress: Number,
            icon: String,
            iconText: String,
            color: String
        }

    }
</script>

<style lang="scss" scoped>

    .app-status-box {
        padding: 12px 0;
        border-radius: 2.6px;
        border: solid 0.9px #023e58;
        background-color: #042941;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #dae8fc;

        .title {
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 0.41px;
            color: #dae8fc;
            margin-bottom: 6px;
        }

        .subtitle {
            line-height: 1.1 !important;
            font-size: 16px;
            line-height: 0.56;
            color: #dae8fc;
            margin-bottom: 13px;
        }

        .progress {
            width: 61px;
            height: 4px;
            object-fit: contain;
            background-color: #001625;
            position: relative;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 13px;

            .progress-bar {
                position: absolute;
                left: 0;
                border-radius: 5px;
                top: 0;
                bottom: 0;
            }
        }

        .icon-row {
            display: flex;
            align-items: center;
            font-size: 16px;
            line-height: 0.56;
            color: #ffffff;

            .icon {
                width: 16px;
                height: 16px;
                margin-left: 16px;

                ::v-deep svg {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
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