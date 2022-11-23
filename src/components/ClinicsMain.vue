<template>
    <div class="clinics-main">

        <div class="header">
            <p class="title">{{ data.title }}</p>

            <div class="tabs">
                <div class="tab" v-for="tab in data.tabs"
                     :key="tab.name"
                     :class="{'is-active': selected.name === tab.name}"
                     @click="selectTab(tab)">
                    {{ tab.name }}
                </div>
            </div>

        </div>

        <div class="body" ref="body">
            
            <div class="animation" v-if="animationReady">
                <lottie :options="defaultOptions" :height="animationStyle.height" @animCreated="setAnimation" ref="anim"/>
            </div>

        </div>

    </div>
</template>

<script>
    import Lottie from 'vue-lottie';
    import Animation from '../assets/animation';
    import AnimationRed from '../assets/animation_red';

    export default {

        name: 'clinics-main',

        props: {
            data: Object
        },

        data() {
            return {
                selected: {},
                animationReady: false,
                animationStyle: {},
                player: null,
                defaultOptions: {
                    autoplay: true,
                    loop: false,
                    animationData: Animation
                },
                startPoint: 0
            }
        },

        watch: {
            data: {
                handler() {
                    this.updateData();
                },
                deep: true
            }
        },

        mounted() {
            this.selectTab(this.data.tabs[1] || this.data.tabs[0]);
        },

        beforeDestroy() {
            if(this.player) {
                this.player.removeEventListener("complete", this.loop);
            }
        },

        methods: {
            updateData() {
                const selectedTab = this.data.tabs.find(t => t.name === this.selected.name);

                console.log(selectedTab.kpi, this.selected.kpi);

                if(selectedTab.kpi !== this.selected.kpi) {
                    this.selectTab(JSON.parse(JSON.stringify(selectedTab)));
                    return;
                }

                if(this.player) {
                    this.player.removeEventListener("complete", this.loop);

                    this.player.pause();
                    this.startPoint = this.player.currentFrame;
                    this.animationReady = false;
                    this.selected = this.mapSelected(JSON.parse(JSON.stringify(selectedTab)));
                    this.defaultOptions.animationData = this.getAnimationData();

                    this.$nextTick(() => {
                        this.animationReady = true;
                    });
                }

            },

            selectTab(tab) {
                if(this.player) {
                    this.player.removeEventListener("complete", this.loop, true);
                }

                this.animationReady = false;

                this.selected = this.mapSelected(JSON.parse(JSON.stringify(tab)));

                this.$nextTick(() => {
                    this.animationStyle = this.$refs.body.getBoundingClientRect();
                    this.updateAnimationData();
                })
            },

            mapSelected(tab) {
                return {
                    name: tab.name,
                    kpi: tab.kpi,
                    data: tab.data.map((item) => {
                        return {
                            ...item,
                            text: item.text.split('').reverse().join('')
                        }
                    })
                };
            },

            updateAnimationData() {
                if(this.player) {
                    this.player.removeEventListener("complete", this.loop);
                }

                this.defaultOptions.animationData = this.getAnimationData();
                this.animationReady = true;
            },

            setAnimation(player) {
                this.player = player;
                this.player.addEventListener("complete", this.loop.bind(this), true);

                this.player.goToAndPlay(this.startPoint, true);
                this.startPoint = 0;
            },

            loop() {
                if(! this.player) {
                    return;
                }

                this.player.goToAndPlay(2000);
            },

            getAnimationData() {
                const {data, kpi} = this.selected;
                let animation = kpi > 1 ? AnimationRed : Animation;

                //ITEM 1
                let item = data[0];
                //VALUE
                animation.assets[0].layers[35].nm = item.value;
                animation.assets[0].layers[35].t.d.k[0].s.t = item.value;
                animation.assets[2].layers[45].nm = item.value;
                animation.assets[2].layers[45].t.d.k[0].s.t = item.value;
                //TEXT
                animation.assets[0].layers[34].nm = item.text;
                animation.assets[0].layers[34].t.d.k[0].s.t = item.text;
                animation.assets[2].layers[44].nm = item.text;
                animation.assets[2].layers[44].t.d.k[0].s.t = item.text;

                //ITEM 2
                item = data[1];
                //VALUE
                animation.assets[0].layers[33].nm = item.value;
                animation.assets[0].layers[33].t.d.k[0].s.t = item.value;
                animation.assets[2].layers[43].nm = item.value;
                animation.assets[2].layers[43].t.d.k[0].s.t = item.value;
                //TEXT
                animation.assets[0].layers[32].nm = item.text;
                animation.assets[0].layers[32].t.d.k[0].s.t = item.text;
                animation.assets[2].layers[42].nm = item.text;
                animation.assets[2].layers[42].t.d.k[0].s.t = item.text;

                //ITEM 3
                item = data[2];
                //VALUE
                animation.assets[0].layers[31].nm = item.value;
                animation.assets[0].layers[31].t.d.k[0].s.t = item.value;
                animation.assets[2].layers[41].nm = item.value;
                animation.assets[2].layers[41].t.d.k[0].s.t = item.value;
                //TEXT
                animation.assets[0].layers[30].nm = item.text;
                animation.assets[0].layers[30].t.d.k[0].s.t = item.text;
                animation.assets[2].layers[40].nm = item.text;
                animation.assets[2].layers[40].t.d.k[0].s.t = item.text;

                //ITEM 4
                item = data[3];
                //VALUE
                animation.assets[0].layers[29].nm = item.value;
                animation.assets[0].layers[29].t.d.k[0].s.t = item.value;
                animation.assets[2].layers[39].nm = item.value;
                animation.assets[2].layers[39].t.d.k[0].s.t = item.value;
                //TEXT
                animation.assets[0].layers[28].nm = item.text;
                animation.assets[0].layers[28].t.d.k[0].s.t = item.text;
                animation.assets[2].layers[38].nm = item.text;
                animation.assets[2].layers[38].t.d.k[0].s.t = item.text;

                //ITEM 5
                item = data[4];
                //VALUE
                animation.assets[0].layers[27].nm = item.value;
                animation.assets[0].layers[27].t.d.k[0].s.t = item.value;
                animation.assets[2].layers[37].nm = item.value;
                animation.assets[2].layers[37].t.d.k[0].s.t = item.value;
                //TEXT
                animation.assets[0].layers[26].nm = item.text;
                animation.assets[0].layers[26].t.d.k[0].s.t = item.text;
                animation.assets[2].layers[36].nm = item.text;
                animation.assets[2].layers[36].t.d.k[0].s.t = item.text;

                //ITEM 6
                item = data[5];
                //VALUE
                animation.assets[0].layers[25].nm = item.value;
                animation.assets[0].layers[25].t.d.k[0].s.t = item.value;
                animation.assets[2].layers[35].nm = item.value;
                animation.assets[2].layers[35].t.d.k[0].s.t = item.value;
                //TEXT
                animation.assets[0].layers[24].nm = item.text;
                animation.assets[0].layers[24].t.d.k[0].s.t = item.text;
                animation.assets[2].layers[34].nm = item.text;
                animation.assets[2].layers[34].t.d.k[0].s.t = item.text;

                return animation;
            }

        },

        components: {
            Lottie
        }

    }
</script>

<style lang="scss" scoped>

    .clinics-main {
        position: relative;
        padding: 42px;
        flex-grow: 1;
        flex-shrink: 1;
        border-radius: 4px;
        background-color: #051724;
        font-size: 20px;
        letter-spacing: 0.27px;
        color: #dce8fd;
        display: flex;
        flex-direction: column;

        .header {
            height: 32px;
            display: flex;
            align-items: center;

            .title {

            }

            .tabs {
                height: 100%;
                margin-right: 22px;
                display: flex;
                align-items: center;

                &:before {
                    content: "";
                    height: 100%;
                    margin-left: 22px;
                    display: inline-block;
                    width: 1px;
                    background-color: #dae8fc;
                }

                .tab {
                    font-size: 16px;
                    letter-spacing: 0.22px;
                    cursor: pointer;
                    transition: color 0.2s ease-in-out;

                    &:not(.is-active) {
                        color: rgba(#ffffff, 0.45);

                        &:hover {
                            color: rgba(#ffffff, 0.6);
                        }
                    }

                    + .tab {
                        margin-right: 26px;
                    }
                }
            }
        }

        .body {
            flex-grow: 1;
            flex-shrink: 1;
        }

    }

</style>