// import { createRouter, createWebHistory } from 'vue-router';
import Router from 'vue-router'

// import Router from 'vue-router';
import Home from '../../resources/views/Home.vue';
import Select from '../../resources/views/select.vue';
import About from '../../resources/views/about.vue';
import NotFound from '../../resources/views/NotFound.vue';
import Users from '../../resources/views/resource.vue';

const routes = [
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/select',
    name: 'select',
    component: Select,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/resource',
    name: 'resource',
    component: Users
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