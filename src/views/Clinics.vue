<template>
    <div class="clinics-index" v-if="! screen.loading && screen.data">
        <app-statistics :stats="screen.data.cards"
                        :title="screen.data.title || title"
                        :color="screen.data.color">
        </app-statistics>

        <div class="clinics-grid">

            <clinics-menu :items="screen.data.subClinics" :name="screen.data.title || title"></clinics-menu>

            <clinics-main :data="screen.data.main"></clinics-main>

            <div class="cards">

                <clinics-card v-for="card in screen.data.SideCards"
                              :card="card"
                              :key="card.title">



                </clinics-card>

            </div>

        </div>

    </div>
</template>

<script>
    import ClinicsMenu from "../components/ClinicsMenu";
    import ClinicsMain from "../components/ClinicsMain";
    import ClinicsCard from "../components/ClinicsCard";

    export default {
        props: {
            unitId: [String, Number],
        },

        data() {
            return {
                title: "מרפאות",

            }
        },

        created() {
            this.fetchData();
        },

        methods: {
            async fetchData(refresh = false) {
                await this.$store.dispatch('loadScreen', {
                    id: this.unitId,
                    refresh: refresh,
                    type: this.$screenTypes.TYPE_CLINICS
                });
            },
        },

        components: {ClinicsCard, ClinicsMain, ClinicsMenu}
    }
</script>

<style lang="scss" scoped>

    .clinics-index {
        height: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow: auto;

        .app-statistics {
            flex-grow: 0;
        }

        .clinics-grid {
            flex-grow: 1;
            margin-top: 22px;
            display: flex;

            .clinics-main {
                margin: 0 36px;
            }

        }

        .cards {
            width: 246px;
            display: flex;
            flex-direction: column;

            .card {
                flex-grow: 1;

                + .card {
                    margin-top: 28px;
                }

            }
        }

    }

</style>
