import {createRouter, createWebHashHistory} from "vue-router";
import store from '../store'
const routes = [
    { path: '/', component: () => import('../pages/home.vue') },
    { path: '/login', component: () => import('../pages/login.vue') },
    { path: '/user', component: () => import('../pages/user.vue') },
    { path: '/products', component: () => import('../pages/products.vue')},
    { path: '/product/:id', component: () => import('../pages/product.vue')},
    { path: '/contact', component: () => import('../pages/contact.vue')},
    { path: '/cart', component: () => import('../pages/cart.vue')}

  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })

  router.beforeEach((to, from, next) => {
    const currentAuth = store.state.logged;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentAuth) {
      next("/");
    } else next();
  });

  

  export default router
