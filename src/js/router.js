// import { createRouter, createWebHistory } from 'vue-router';
import Router from 'vue-router'

// import Router from 'vue-router';
import Home from '../../resources/views/Home.vue';
import About from '../../resources/views/about.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'about',
    component: About
  }
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// });

const router = new Router({
  mode: 'history',
  routes: routes,
});

export default router;