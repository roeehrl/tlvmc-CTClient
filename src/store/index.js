import config from '../config';

import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import worlds from '../worlds';
import { screenTypes } from '../main';
import Api from '../api';

Vue.use(Vuex);

function makeDefaultSettings() {
  return {
    logo: true,
    date: true,
    time: true,
    weather: true,
    events: true,
    eventsPosition: 'left',
  };
}

let screenTimer = null;

export default new Vuex.Store({
  state: {
    api: null,

    currentWorld: {
      route: '',
      title: 'טוען...',
    },

    time: {
      live: true,
      time: moment().startOf('hour'),
    },

    settings: {
      logo: false,
      date: false,
      time: false,
      weather: false,
      events: false,
      eventsPosition: 'left',
    },

    mainMenuOpen: false,

    shrink: false,
    showTrend: false,
    showDimotTrend: false,
    trend: null,
    trendInline: false,

    screenId: null,
    screenData: null,
    screenLoading: false,
    screenError: null,

    popup: null,
  },

  getters: {
    world: (state) => state.currentWorld,
    time: (state) => state.time,
    mainMenuOpen: (state) => state.mainMenuOpen,
    settings: (state) => state.settings,
    screen: (state) => ({
      id: state.screenId,
      data: state.screenData,
      loading: state.screenLoading,
      error: state.screenError,
    }),
    showTrend: (state) => state.showTrend,
    showDimotTrend: (state) => state.showDimotTrend,
    trend: (state) => state.trend,
    trendInline: (state) => state.trendInline,
    api: (state) => state.api,
    popup: (state) => state.popup,
    shrink: (state) => state.shrink,
  },

  mutations: {
    setApi(state, api) {
      state.api = api;
    },

    toggleMainMenu(state) {
      state.mainMenuOpen = !state.mainMenuOpen;
    },

    setMainMenuState(state, menuState = false) {
      state.mainMenuOpen = menuState;
    },

    changeSetting(state, { key, value }) {
      state.settings[key] = value;
    },

    setSettings(state, settings) {
      state.settings = settings;
    },

    setTimeDate(state, { date, live }) {
      date = date ? moment(date) : moment();

      if (!date.isValid()) {
        date = moment();
      }

      state.time.time = date;
      state.time.live = live;
    },

    setWorld(state, world) {
      state.currentWorld = world;
    },

    setTrend(state, trend) {
      state.trend = trend;
    },

    setScreenId(state, id) {
      state.screenId = id;
    },

    setScreen(state, screen) {
      state.screenData = screen;
    },

    setScreenLoading(state, status = false) {
      state.screenLoading = status;
    },

    setScreenError(state, error = null) {
      state.screenError = error;
    },

    changeTrendPopupStatus(
      state,
      {
        show = false,
        shrink = false,
        trend = null,
        unitId = null,
        inline = false,
        dimotTrend = false,
      }
    ) {
      console.log(
        show,
        shrink,
        trend,
        unitId,
        inline,
        dimotTrend,
      )

      if (show && !trend) {
        show = false;
      } else if (!show && !dimotTrend) {
        trend = null;
      } else if (!trend) {
        show = false;
      } else if (typeof trend === 'object') {
        trend.preLoaded = true;
      } else if (trend) {
        trend = {
          id: trend,
        };
      }

      if (trend && unitId) {
        trend.unitId = unitId;
      }

      state.trend = trend;
      state.showTrend = show;
      state.showDimotTrend = dimotTrend;
      state.trendInline = inline;
      state.shrink = shrink;
    },

    showPopup(state, { component, props = {} }) {
      state.popup = {
        component,
        props,
      };
    },

    hidePopup(state) {
      state.popup = null;
    },
  },

  actions: {
    async setSetting({ commit, dispatch }, { key, value }) {
      commit('changeSetting', { key, value });
      await dispatch('saveSettings');
    },

    async saveSettings({ state, getters }) {
      window.localStorage.setItem('settings', JSON.stringify(getters.settings));
    },

    async loadSettings({ commit, getters }) {
      let settings = JSON.parse(
        window.localStorage.getItem('settings') || '{}'
      );

      commit('setSettings', {
        ...makeDefaultSettings(),
        ...((settings || {}) || {}),
      });
    },

    async changeWorld({ commit, dispatch }, worldName) {
      const world = worlds.find((w) => w.route === worldName);

      if (!world) {
        throw new Error(`No world with the name "${worldName}" found!`);
      }

      commit('setApi', new Api(world.apiRoute || world.route));

      commit('setWorld', world);
      commit('setTrend', null);
      commit('setScreen', null);
      commit('setScreenId', null);
      commit('setScreenLoading', false);

      setTimeout(() => {
        dispatch('loadSettings');
      });
    },

    noWorld({ commit, dispatch }, name) {
      commit('setWorld', {
        route: 'no-world',
        title: name,
        meta: {
          overrideSettings: {
            SERVICE_EVENTS: false,
          },
        },
        props: {},
      });

      commit('setTrend', null);
      commit('setScreen', null);
      commit('setScreenId', null);
      commit('setScreenLoading', false);

      setTimeout(() => {
        dispatch('loadSettings');
      });
    },

    async changeViewDate(
      { commit, state, dispatch },
      { date = null, live = true }
    ) {
      commit('setTimeDate', { date, live });

      await dispatch('loadScreen', {
        id: state.screenId,
        type: (state.screenData || {}).screenType || screenTypes.TYPE_UNITS,
        group
      });
    },

    async loadScreen(
      { commit, state, dispatch },
      { id, type, refresh = false, group = null }
    ) {
      if (screenTimer) {
        clearTimeout(screenTimer);
        screenTimer = null;
      }

      if (!refresh) {
        commit('setScreenLoading', true);
        commit('setScreenId', id);
        commit('setScreen', null);
        commit('changeTrendPopupStatus', {
          inline: [screenTypes.TYPE_MARLAD_UNIT].indexOf(type) >= 0,
          show: false,
          trend: null,
        });
      }

      let data = null;
      const date = state.time.live ? null : state.time.time;

      try {
        switch (type) {
          case screenTypes.TYPE_UNITS:
          case screenTypes.TYPE_MARLAD_UNIT:
          case screenTypes.TYPE_MARLAD_SCORE:
          case screenTypes.TYPE_CLINICS:
            data = await state.api.fetchUnit(id, date, null, group);

            if (state.currentWorld.route === 'liss') {
              const malradData = await state.api.fetchUnit(
                id,
                date,
                'malrad',
                group
              );

              if (malradData && malradData.Reception[3]) {
                data = { ...data, ...{ ambulances: malradData.Reception[3] } };
              }
            }
            break;
          case screenTypes.TYPE_PATIENTS:
            data = await state.api.fetchUnitPatients(id, date);
            break;
          case screenTypes.TYPE_PATIENT_CARD:
            data = await state.api.fetchPatient(id, date);
            break;
        }
      } catch (response) {
        commit('setScreenError', {
          statusCode: response.status,
          statusText: response.statusText,
          data: response.data,
        });

        if (state.time.live) {
          screenTimer = setTimeout(() => {
            dispatch('loadScreen', { id, type, refresh: true,group });
          }, 1000);
        }

        return;
      }

      commit('setScreenError', null);

      commit('setScreen', {
        screenType: type,
        ...data,
      });

      if (type === screenTypes.TYPE_MARLAD_UNIT) {
        commit('changeTrendPopupStatus', {
          inline: true,
          show: true,
          trend: data.trend,
        });
      }

      commit('setScreenLoading', false);

      if (state.time.live) {
        screenTimer = setTimeout(() => {
          dispatch('loadScreen', { id, type, refresh: true,group });
        }, parseInt(config('REFRESH_INTERVAL')));
      }
    },
  },

  modules: {},
});
