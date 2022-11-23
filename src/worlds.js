import config from './config';
import Emergency from './views/emergency/Emergency';
import ErUnit from './views/emergency/ErUnit';
import Hospitalization from './views/Hospitalization';
import Corona from './views/Corona';
import Operations from './views/Operations';
import Clinics from './views/Clinics';
import Winter from './views/Winter';
import Transporations from './views/Transporations';
import TransporationUnit from './views/TransporationUnit';
import Infection from './views/Infection';
import Liss from './views/Liss';
import Radiations from './views/Radiations';
import Dimot from './views/Dimot';
import Ultrasound from './views/Ultrasound';
import DimotEmergencyTable from './views/DimotEmergencyTable';
import DimotUnit from "./views/DimotUnit.vue"
import RadiationsUnit from './views/RadiationsUnit';
import TipulNimraz from './views/TipulNimraz';

const activeWorlds = config('ACTIVE_WORLDS', '').split(',');

export default [
  {
    route: 'malrad',
    title: 'מלר״ד',
    component: Emergency,
    unitComponent: ErUnit,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
        REFRESH_INTERVAL: 60000,
      },
    },
    props: {},
    menuIcon: 'emergency_menu',
    routes: [
      {
        path: ':unitId/score',
        name: `malrad.score`,
        component: () => import('./views/emergency/ErScore'),
        props: (route) => ({
          unitId: route.params.unitId,
        }),
      },
    ],
  },
  {
    route: 'hospitalization',
    apiRoute: 'Ishpuz',
    title: 'מערך האשפוז',
    component: Hospitalization,
    meta: {},
    props: {},
    menuIcon: 'ishpuz_menu',
  },
  // {
  //   route: "corona",
  //   title: 'חמ"ל קורונה',
  //   component: Corona,
  //   meta: {
  //     overrideSettings: {
  //       SERVICE_EVENTS: false,
  //     },
  //   },
  //   props: {},
  //   menuIcon: "ishpuz_menu",
  // },
  {
    route: 'operations',
    apiRoute: 'OperRoom',
    title: 'חדרי ניתוח',
    component: Operations,
    unitComponent: Operations,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'operations_menu',
  },
  {
    route: 'clinics',
    apiRoute: 'Clinics',
    title: 'מרפאות',
    component: Clinics,
    unitComponent: Clinics,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'clinics_menu',
  },
  {
    route: 'winter',
    apiRoute: 'Winter',
    title: 'חורף',
    component: Winter,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'winter_menu',
  },
  {
    route: 'transporations',
    apiRoute: 'Transport',
    title: 'עולם השינוע',
    component: Transporations,
    unitComponent: TransporationUnit,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'shinua',
  },
  {
    route: 'liss',
    apiRoute: 'Liss',
    title: 'ביה״ח ליס',
    component: Liss,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'liss_menu',
  },
  {
    route: 'infection',
    apiRoute: 'infection',
    title: 'מניעת זיהומים',
    component: Infection,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'infaction',
  },
  {
    route: 'radiations',
    apiRoute: 'Radiation',
    title: 'הקרנות',
    component: Radiations,
    unitComponent: RadiationsUnit,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'infaction',
  },
  {
    route: 'tipulnimraz',
    apiRoute: 'Tipulnimraz',
    title: 'טיפול נמרץ',
    component: TipulNimraz,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'infaction',
  },
  {
    route: 'dimot',
    apiRoute: 'Dimot',
    title: 'דימות',
    component: Dimot,
    //unitComponent: DimotEmergencyTable,
    unitComponent: DimotUnit,
    meta: {
      overrideSettings: {
        SERVICE_EVENTS: false,
      },
    },
    props: {},
    menuIcon: 'infaction',
  },
  
].filter((world) => {
  return activeWorlds.indexOf(world.route) >= 0;
});
