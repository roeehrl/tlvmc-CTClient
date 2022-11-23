<template>
    <div class="clinics-menu">

        <div class="header">
            <div class="top">
                <div class="title">
                    <span class="icon" v-html="$icon('clinic')"></span>
                    <span class="text">{{ name }}</span>
                </div>

                <div class="count">
                    {{ items.length }} מרפאות
                </div>
            </div>

            <div class="search">
                <span class="icon" v-html="$icon('search')"></span>
                <input type="search" placeholder="חפש מרפאה" v-model="search">
            </div>
        </div>

        <div class="body">

            <div class="items">
                <slide-x-right-transition :duration="200" group>
                    <div class="item"
                         v-for="item in filterItems"
                         @click="goToUnit(item)"
                         :key="item.unitId">

                        <div class="title">
                            {{ item.UnitName }}
                        </div>

                        <div class="statistics">
                            <div class="statistics-item" v-for="subItem in item.unitData">
                                <span class="icon" v-html="$icon(subItem.icon)"></span>
                                <div class="text">{{ subItem.text }}</div>
                            </div>
                        </div>
                    </div>
                </slide-x-right-transition>
            </div>

        </div>

    </div>
</template>

<script>
    import { SlideXRightTransition   } from 'vue2-transitions';

    export default {

        name: 'clinics-menu',

        props: {
            name: String,
            items: Array
        },

        data() {
            return {
                search: "",
                height: '100vh',
            }
        },

        methods: {
            goToUnit(item) {
                this.$router.push({
                    name: `${this.world.route}.unit`,
                    params: {
                        unitId: item.unitId
                    }
                });
            }
        },

        computed: {
            filterItems() {
                return this.items.filter(item => {
                    return (
                        item.UnitName
                            .toLowerCase()
                            .indexOf(this.search.toLowerCase()) != -1
                    );
                });
            }
        },

        components: {SlideXRightTransition }

    }
</script>

<style lang="scss" scoped>

    .icon {
        line-height: 1;
        ::v-deep svg {
            display: block;
        }
    }


    .clinics-menu {
        width: 481px;
        border: solid 1px #023e58;
        background-color: #042941;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 300px);
        overflow: hidden;

        .header {
            object-fit: contain;
            border-radius: 4px;
            background-image: linear-gradient(110deg, rgba(#8577d1, 0.51) -1%, rgba(#34a9ff, 0.51) 101%);
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 0.27px;
            color: #ffffff;
            padding: 26px;
            flex-grow: 0;
            flex-shrink: 0;

            .icon {
                width: 36px;
                height: 35px;
            }

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 14px;

                .title {
                    display: flex;
                    line-height: 1;
                    align-items: center;

                    .text {
                        margin-right: 10px;
                    }
                }

            }

            .search {
                position: relative;

                ::v-deep ::placeholder {
                    color: white;
                }

                .icon {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                }

                input {
                    box-sizing: border-box;
                    color: white;
                    background: transparent;
                    border-radius: 24px;
                    border: solid 1px #ffffff;
                    font-size: 16px;
                    letter-spacing: 0.22px;
                    height: 48px;
                    width: 100%;
                    padding: 0 60px 0 10px;
                }
            }

        }

        .body {
            flex-grow: 0;
            flex-shrink: 1;
            padding: 24px;
            overflow: auto;

            .items {
                width: 100%;
                position: relative;
                overflow: hidden;

                .item {
                    border-radius: 4px;
                    border: solid 1px #023e58;
                    padding: 22px;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;

                    &:hover {
                        background-color: rgba(white, 0.01);
                    }

                    + .item {
                        margin-top: 10px;
                    }

                    .title {
                        font-size: 22px;
                        letter-spacing: 0.3px;
                        color: #dae8fc;
                        margin-bottom: 10px;
                    }

                }

                .statistics {
                    display: flex;

                    .statistics-item {
                        flex: 1;
                        display: flex;
                        font-size: 24.2px;
                        letter-spacing: 0.33px;
                        color: #dae8fc;

                        + .statistics-item {
                            margin-right: 10px;
                        }

                        .icon {
                            margin-left: 15px;
                            width: 22px;
                            height: 22px;
                        }

                    }

                }

            }
        }

    }

</style>