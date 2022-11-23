import './scss/app.scss';
import 'moment/locale/he';
import './registerServiceWorker';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import moment from 'moment';
import { Laue } from 'laue';
import config from './config';
import icon from './icons';
import VueApexCharts from 'vue-apexcharts';

moment.locale('he');

Vue.config.productionTip = false;

import GlobalMixin from './mixins/GlobalMixin';

import VueCircle from 'vue2-circle-progress';

import AppLoader from './components/AppLoader';
import AppCard from './components/AppCard';
import AppCardDinamic from './components/AppCardDinamic';
import AppTabs from './components/AppTabs';
import AppOperationClock from './components/AppOperationClock';
import AppStatistics from './components/AppStatistics';
import AppTable from './components/AppTable';
import VuePageTransition from 'vue-page-transition';
import AppUrgentTransfers from './components/AppUrgentTransfers';
import AppUrgentTransfersUnit from './components/AppUrgentTransfersUnit';
import ChangesChart from './components/ChangesChart';
import TransformChart from './components/TransformChart';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import CircleChart from './components/CircleChart';
import StackChart from './components/StackChart';
import DimotStatsGroup from './components/DimotStatsGroup';
import DimotStatsCard from './components/DimotStatsCard';
import GlowCircleProgressBar from './components/GlowCircleProgressBar';
Vue.use(VuePageTransition);
Vue.use(Laue);

Vue.component('apexchart', VueApexCharts);
Vue.component('vue-circle', VueCircle);
Vue.component('app-card', AppCard);
Vue.component('app-tabs', AppTabs);
Vue.component('app-operation-clock', AppOperationClock);
Vue.component('app-statistics', AppStatistics);
Vue.component('app-table', AppTable);
Vue.component('app-loader', AppLoader);
Vue.component('app-urgenttransfers', AppUrgentTransfers);
Vue.component('app-urgenttransfersunit', AppUrgentTransfersUnit);
Vue.component('app-card-dinamic', AppCardDinamic);
Vue.component('changes-chart', ChangesChart);
Vue.component('transform-chart', TransformChart);
Vue.component('bar-chart', BarChart);
Vue.component('circle-chart', CircleChart);
Vue.component('stack-chart', StackChart);
Vue.component('dimot-stats-group', DimotStatsGroup);
Vue.component('dimot-stats-card', DimotStatsCard);
Vue.component('glow-circle-progress-bar', GlowCircleProgressBar);
Vue.prototype.$icon = icon;

export const screenTypes = {
  TYPE_UNITS: 1,
  TYPE_PATIENTS: 2,
  TYPE_PATIENT_CARD: 3,
  TYPE_MARLAD_UNIT: 4,
  TYPE_MARLAD_POPUP: 5,
  TYPE_MARLAD_SCORE: 6,
  TYPE_CLINICS: 7,
  TYPE_URGENT_TRANSPORTS: 8,
  TYPE_CHANGES_TRANSPORTS: 9,
  TYPE_RADIATIONS: 10,
  TYPE_RADIATIONS_DOCTOR_PATIENTS: 11,
  TYPE_RADIATIONS_FUTURE_INVITE: 12,
  TYPE_TIPULNIMRAZE: 13,
  //TYPE_RADIATIONS_TYPE_TIPULNIMRAZE: 13,
  TYPE_DIMOT: 14,
};

export const operationStatuses = {
  ACTIVE: 4,
  CLEANING: 5,
  INACTIVE: 6,
  NOT_IN_USE: 0,
};

Vue.prototype.$config = config;
Vue.prototype.$screenTypes = screenTypes;

Vue.mixin(GlobalMixin);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
