import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { GameView, HomeView } from '@/views'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/game', name: 'Game', component: GameView },
]

const router = createRouter({
  history: createWebHistory('/ibex-memory/'),
  routes,
})

export default router
