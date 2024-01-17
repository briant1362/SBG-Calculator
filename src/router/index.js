// Composables

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/Calculator'),
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('@/components/Calculator'),
  },  
  {
    path: '/substrates',
    name: 'substrates',
    component: () => import('@/components/Substrates'),
  },  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
