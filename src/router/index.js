import { createRouter, createWebHistory } from 'vue-router';
import Home from '../App.vue'; // usa App.vue como home temporariamente
import PostView from '../views/PostView.vue'; // crie essa view depois
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFound.vue';
import Midia from '../views/Midia.vue';
import Toast, { POSITION } from "vue-toastification";



const routes = [

  

    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/posts',
      name: 'PostView',
      component: () => import('../views/PostView.vue')
    },
    
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'), // opcional
    },

    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/midia', // URL que você quer acessar no navegador
      name: 'Midia',
      component: Midia
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;