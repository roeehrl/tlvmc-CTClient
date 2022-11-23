<template>

    <div class="popup" v-click-outside="close">

        <div class="popup-header">

            <div class="close" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16"><g fill="none" fill-rule="evenodd" stroke="#DAE8FC" stroke-linecap="round" stroke-width="1.5"><path d="M0 14L15 0M0 0L15 14" transform="translate(1 1)"/></g></svg>
            </div>

            <div class="title">
                {{ this.title || 'טוען...' }}
            </div>

        </div>

        <div class="popup-body">

            <p class="count">{{ count }} בדיקות חיוביות</p>

            <div class="tests">

                <div class="test" v-for="test in tests"
                     :style="{borderColor: test.color}"
                     :key="test.title">

                    <div class="title">{{ test.title }}</div>
                    <div class="subtitle">{{ test.subtitle }}</div>

                </div>

            </div>

        </div>

    </div>

</template>

<script>
    import ClickOutside from 'vue-click-outside';
    import Ambulance from "./ErAmbulance";

    export default {
        components: {Ambulance},

        props: {
            unitId: [String, Number]
        },

        data() {
            return {
                loading: false,
                title: null,
                count: 0,
                tests: []
            }
        },

        created() {
            this.fetch();

            setTimeout(() => {
                this.created = true;
            }, 100);
        },

        methods: {
            close() {
                if(! this.created) {
                    return;
                }

                if(this.screenTimer) {
                    clearTimeout(this.screenTimer);
                    this.screenTimer = null;
                }

                this.$store.commit('hidePopup');
            },

            async fetch() {
                if(this.screenTimer) {
                    clearTimeout(this.screenTimer);
                    this.screenTimer = null;
                }

                const {title, data} = await this.api.getBloodTestsData(this.unitId);

                console.log(data);

                this.title = title;
                this.tests = data.map(item => ({
                    ...item,
                    title: item.text || item.Text,
                    subtitle: item.subtext || item.subText
                }));

                if(this.time.live) {
                    this.screenTimer = setTimeout(() => {
                        this.fetch();
                    }, parseInt(this.$config('REFRESH_INTERVAL')));
                }
            }

        },

        directives: {
            ClickOutside
        }

    }

</script>

<style lang="scss" scoped>

    .popup {
        position: fixed;
        z-index: 999;
        width: 400px;
        left: 0;
        top: 92px;
        bottom: 0;
        box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
        background-image: radial-gradient(circle at 10% 11%, #042840, #032b45 48%);
        padding: 25px;
    }


    .popup-header {
        display: flex;
        align-items: center;

        .close {
            cursor: pointer;

            svg {
                display: block;
            }
        }


        .title {
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 0.41px;
            color: #dae8fc;
            margin-right: 34px;
        }
    }

    .count {
        font-size: 15px;
        letter-spacing: 0.2px;
        color: #dae8fc;
        margin: 26px 0 14px;
    }

    .test {
        border-radius: 3px;
        box-shadow: 0 2px 37px 0 rgba(0, 0, 0, 0.5);
        background-image: radial-gradient(circle at 10% 11%, #032b45, #042840 36%);
        border-right: 4px solid #8577d1;
        padding: 20px 25px;

        .title {
            font-size: 18.5px;
            font-weight: bold;
            letter-spacing: -0.24px;
            color: #c6d9f5;
        }

        .subtitle {
            font-size: 15px;
            letter-spacing: 0.2px;
            color: #dae8fc;
        }

        + .test {
            margin-top: 18px;
        }

    }

</style>

