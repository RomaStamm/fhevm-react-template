import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/encrypt',
      name: 'encrypt',
      component: () => import('../views/EncryptView.vue'),
    },
    {
      path: '/decrypt',
      name: 'decrypt',
      component: () => import('../views/DecryptView.vue'),
    },
  ],
});

export default router;
