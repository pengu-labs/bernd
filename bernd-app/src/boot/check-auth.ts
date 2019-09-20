import Router, { Route } from 'vue-router';

import client from 'src/boot/feathers';

export default async ({ router }: { router: Router }) => {
  router.beforeEach((to: Route, from: Route, next: Function) => {
    if (!to.meta.protected || client.authentication.authenticated) {
      next();
    } else {
      next({ path: '/login' });
    }
  });
};
