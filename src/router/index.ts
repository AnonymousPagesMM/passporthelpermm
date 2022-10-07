import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    alias: '/index.html',
    component: MainView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/PassportHelper/HomePage.vue')
  },
  {
    path: '/more/:id',
    name: 'more',
    component: () => import('../views/PassportHelper/MoreView.vue'),
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/PassportHelper/AddPage.vue'),
  },
  {
    path: '/:pathMath(.*)*',
    name: 'routeName',
    redirect: '/'
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
