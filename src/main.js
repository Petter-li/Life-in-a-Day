// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// 全局导航钩子
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: '/',
        query: { redirect: to.fullPath }// 把要跳转的地址作为参数传到下一步
      });
    } else {
      next(); // 确保一定要调用 next()
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
