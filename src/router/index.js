import Vue from 'vue';
import VueRouter from 'vue-router';
import worlds from '../worlds';

import World from '../views/World';
import Unit from '../views/Unit';
import Patients from '../views/Patients';
import Patient from '../views/Patient';
import Icons from '../views/Icons';

Vue.use(VueRouter);

let worldRoutes = [];

for (let world of worlds) {
  const globalProps = {
    worldName: world.route,
    ...world.props,
  };

  worldRoutes.push({
    path: `/${world.route}`,
    component: World,
    props: (route) => ({
      ...globalProps,
    }),
    children: [
      {
        path: '',
        name: `${world.route}`,
        component: world.component,
        props: (route) => ({
          ...globalProps,
        }),
      },
      {
        path: ':unitId',
        name: `${world.route}.unit`,
        component: world.unitComponent || Unit,
        props: (route) => ({
          unitId: route.params.unitId,
          ...globalProps,
        }),
      },

      {
        path: ':unitId/patients',
        name: `${world.route}.patients`,
        component: Patients,
        props: (route) => ({
          unitId: route.params.unitId,
          ...globalProps,
        }),
      },
      {
        path: ':unitId/patients/:patientId',
        name: `${world.route}.patient`,
        component: Patient,
        props: (route) => ({
          unitId: route.params.unitId,
          patientId: route.params.patientId,
          ...globalProps,
        }),
      },

      ...(world.routes || []),
    ],
  });
}

const routes = [
  {
    path: '',
    redirect: (to) => {
      return { name: worlds[0].route };
    },
  },
  ...worldRoutes,
  {
    path: '/icons-index',
    component: Icons,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
