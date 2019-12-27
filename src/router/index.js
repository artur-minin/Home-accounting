import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Record.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// calls before each route change
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const isAuthRequired = to.matched.some(nextRoute => nextRoute.meta.auth)
  const isNotAuthenticated = isAuthRequired && !currentUser

  if (isNotAuthenticated) {
    next('/login?message=login') // redirect to login page
  } else if (to.path === '/login' && !!currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router;
