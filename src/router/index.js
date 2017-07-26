import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import index from '@/components/index';
import chooseCity from '@/components/chooseCity';
import login from '@/components/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/chooseCity',
      name: 'chooseCity',
      component: chooseCity
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});
