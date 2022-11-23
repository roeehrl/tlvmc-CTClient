<template>
    <div class="operations-index" v-if="! screen.loading && screen.data">
        <app-statistics :stats="screen.data.cards"
                        :title="screen.data.title || title"
                        :color="screen.data.color">
        </app-statistics>

        <div class="operations-actions">
            <app-tabs @click="goToTab"
                      :active-tab="unitId"
                      :tabs="screen.data.tabs">
            </app-tabs>
            <div class="actions-btns">
                <a href="https://appdashboardbi.tasmc.org.il/Home/OperatingRoomsAdmissions">קבלה</a>
                <a href="https://recoveryroomstatus/">התעוררות</a>
            </div>
        </div>

        <app-operations :operations="screen.data.rooms"></app-operations>
    </div>
</template>

<script>
    import AppOperations from "../components/AppOperations";

    export default {
        components: {
            AppOperations
        },
        data() {
            return {
                title: 'חדרי ניתוח',
                totalSeconds: 0
            }
        },
        props: {
            unitId: [String, Number],
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData(refresh = false) {
                await this.$store.dispatch('loadScreen', {
                    id: this.unitId,
                    refresh: refresh,
                    type: this.$screenTypes.TYPE_UNITS
                });
            },
            goToTab(tabId) {
                this.$router.push({
                    name: `${this.world.route}.unit`,
                    params: {
                        unitId: tabId
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .operations-index {
        height: 100%;
        overflow: auto;
        .operations-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .actions-btns {
                display: flex;
                a {
                    cursor: pointer;
                    font-size: 22px;
                    padding: 0 25px;
                    letter-spacing: 0.3px;
                    color: rgba(218, 232, 252, 0.6);
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 18px;
                    border: solid 1px #dae8fc;
                    background-color: rgba(5, 23, 36, 0.7);
                    margin-right: 11px;
                    transition: all .2s ease-in-out;

                    &:hover {
                        background-color: rgba(218, 232, 252, 0.6);
                        color: rgba(5, 23, 36, 0.7);
                    }
                }
            }
        }
    }
</style>