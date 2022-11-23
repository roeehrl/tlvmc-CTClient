<template>
  <div id="app">
    <div class="page">
      <app-header></app-header>

      <app-breadcrumbs></app-breadcrumbs>

      <div class="content" :class="[currentRoute]">
        <transition name="slide-form-left">
          <aside
            class="sidebar"
            v-if="settings.events && $config('SERVICE_EVENTS')"
            :class="['is-on-the-' + settings.eventsPosition]"
          >
            <app-events></app-events>
          </aside>
        </transition>

        <main class="main">
          <vue-page-transition name="fade-in-right">
            <router-view :key="'world-' + $route.fullPath" />
          </vue-page-transition>
        </main>
      </div>

      <main-menu></main-menu>

      <transition name="slide">
        <app-trend
          v-if="showTrend"
          :disabled="!$config('SERVICE_TREND')"
        ></app-trend>
      </transition>

      <transition name="slide">
        <app-dimot-trend
          v-if="showDimotTrend"
          :disabled="!$config('SERVICE_TREND')"
        ></app-dimot-trend>
      </transition>
    </div>

    <transition name="slide-form-left">
      <template v-if="popup && popup.component">
        <component :is="popup.component" v-bind="popup.props"></component>
      </template>
    </transition>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MainMenu from './components/MainMenu';
import AppEvents from './components/AppEvents';
import AppTrend from './components/AppTrend';
import AppDimotTrend from './components/AppDimotTrend';
import AppBreadcrumbs from './components/AppBreadCrumbs';

export default {
  data() {
    return {
      currentRoute:
        this.$route.name === 'radiations.unit'
          ? this.$route.name.replace('.', '-')
          : this.$route.name,
    };
  },
  computed: {},

  created() {},

  components: {
    AppBreadcrumbs,
    AppTrend,
    AppDimotTrend,
    AppEvents,
    MainMenu,
    AppHeader,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-image: radial-gradient(circle at 52% 12%, #03375a, #061b2a 84%);
}

.content {
  width: 100%;
  height: auto;
  flex-grow: 1;
  flex-shrink: 1;
  // height: auto;
  // overflow-x: scroll;
  // ::-webkit-scrollbar{width:6px;border-left:1px solid transparent;}
}
a {
  text-decoration: none;
}
.content {
  display: flex;
  overflow-x: hidden;
  &.transporations.unit {
    // padding: 10px ​48px 0 18px;
  }
  &.radiations {
    // padding: 0px 0px 0 0px;
  }
  &.malrad {
    padding: 10px ​48px 0 18px;
  }
  &.tipulnimraz {
    padding: 0px 0px 0 0px;
  }
  .sidebar {
    width: 350px;
    flex-grow: 0;
    flex-shrink: 0;
    // padding-left: 30px;
    &.is-on-the-left {
      order: 1;
      padding-left: 0;
      // padding-right: 30px;
    }
    &.is-on-the-none {
      order: 1;
      padding-left: 0;
      padding-right: 30px;
      display: none;
    }
  }

  .main {
    overflow-x: scroll;
    flex-grow: 1;
    flex-shrink: 1;
    > div {
      height: 100%;
    }
  }
}

.slide-enter-active {
  transition: all 0.2s ease-in-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-enter-to,
.slide-leave {
  transform: translateY(0);
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}

//SLIDE FORM LEFT ANIMATION
.slide-form-left-enter-active {
  transition: all 0.2s ease-in-out;
}

.slide-form-left-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-form-left-enter-to,
.slide-form-left-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-form-left-enter,
.slide-form-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
