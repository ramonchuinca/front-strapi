import { createRouter, createWebHistory } from 'vue-router';
import Home from '../App.vue'; // usa App.vue como home temporariamente
import PostView from '../views/PostView.vue'; // crie essa view depois
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFound.vue';


const routes = [

  

    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/posts',
      name: 'Post',
      component: PostView,
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: NotFound,
    //   },
    // {
    //   path: '/:catchAll(.*)',
    //   name: 'NotFound',
    //   component: () => import('../views/NotFound.vue'), // opcional
    // }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;