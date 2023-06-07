import {createRouter, createWebHashHistory} from "vue-router";
import store from '../store'
const routes = [
    { path: '/', component: () => import('../pages/home.vue') },
    { path: '/login', component: () => import('../pages/login.vue') },
    { path: '/user', component: () => import('../pages/user.vue') },
    { path: '/products', component: () => import('../pages/products.vue')},
    { path: '/product/:id', component: () => import('../pages/product.vue')},
    { path: '/contact', component: () => import('../pages/contact.vue')},
    { path: '/orders', component: () => import('../pages/orders.vue')},
    { path: '/cart', component: () => import('../pages/cart.vue')},
    { path: '/register', component: () => import('../pages/register.vue')},
    { path: '/adder', component: () => import('../pages/adder.vue')},
    { path: '/orderprocess', component: () => import('../pages/orderprocess.vue')},
    { path: '/ordercompleted', component: () => import('../pages/ordercompleted.vue')},
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
