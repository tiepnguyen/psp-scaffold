import { createRouter, createWebHistory } from 'vue-router'
import { getUserRole } from '@/services/authentication'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
  routes: [
    {
      name: 'home',
      path: '/',
      redirect: { name: 'dashboard' },
      meta: { requiresAuth: true },
      component: Home,
      // component: () => import('@/views/Home.vue'),
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          name: 'settings',
          path: 'settings',
          component: () => import('@/views/Settings.vue'),
        },
        {
          name: 'articles',
          path: 'articles',
          component: () => import('@/views/Articles.vue'),
        },
      ],
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
      // component: () => import('@/views/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

router.beforeEach(async ({ name, meta, path }) => {
  const role = await getUserRole()

  if (meta.requiresAuth && !role) {
    return {
      name: 'login',
      query: { redirect: path },
    }
  }

  if (name === 'login' && role) {
    return { name: 'home' }
  }
})
