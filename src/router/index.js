import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tableau from '../views/Tableau.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
    path: '/tableau',
    name: 'tableau',
    component: Tableau
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
