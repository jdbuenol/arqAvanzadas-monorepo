import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/Checkout.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const store = useStore();
  const token = sessionStorage.getItem('token');

  if (token) {
    store.setIsLogged(true);
  } else {
    store.setIsLogged(false);
  }

  if ((to.path === '/login' || to.path === '/register') && token) {
    next('/');
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  }
  next();
});

export default router;
