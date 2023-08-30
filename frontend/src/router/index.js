import { createRouter, createWebHistory } from 'vue-router'
import LeaderBoard from '../views/LeaderBoard/LeaderBoard.vue'


const routes = [

  {
    path: '/',
    name: 'LeaderBoard',
    component: LeaderBoard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

