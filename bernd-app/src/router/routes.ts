import { RouteConfig, Route } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Registration.vue') }
    ]
  },
  {
    path: '/recipes',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Recipes.vue'),
        meta: { protected: true }
      },
      {
        path: 'new',
        component: () => import('pages/RecipesEdit.vue'),
        meta: { new: true, protected: true }
      },
      {
        path: ':id',
        component: () => import('pages/RecipesEdit.vue'),
        name: 'recipe',
        meta: { new: false, protected: true }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
