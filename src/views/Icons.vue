<template>
    <div class="icons">

        <div class="icon-item" v-for="(icon, name) in icons">
            <div class="icon" v-html="icon"></div>
            <div class="name">{{ name }}</div>
        </div>

    </div>
</template>

<script>
    import {icons} from '../icons';

    export default {

        data() {
            return {
                icons: icons
            }
        },

        async created() {
            await this.$store.dispatch('noWorld', 'ICONS');
        },

    }
</script>

<style lang="scss" scoped>

    .icons {
        display: grid;
        height: 100%;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 15px;
        overflow: auto;
    }

    .icon-item {
        background-color: rgba(white, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .icon {
            width: 125px;
            height: 125px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;

            ::v-deep svg {
                min-height: 125px;
                min-width: 125px;
                max-width: 100%;
                max-height: 100%;
            }
        }

        .name {
            padding: 1rem;
            width: 100%;
            text-align: center;
            font-size: 1.2rem;
            background-color: white;
            user-select: all;
        }

    }

</style>