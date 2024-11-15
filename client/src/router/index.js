import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin/login',
      name: 'auth',
      component: () => import('../components/Pet/AuthLayout.vue'),
      meta: { isGuest: true },
      children: [
        {
          path: '/admin/login',
          name: 'AdminLogin',
          component: () => import('../views/Pet/admin/Login.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/Pet/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/products',
          name: 'Products',
          component: () => import('../views/Pet/admin/Products.vue'),

        },
        {
          path:'/admin/appointments',
          name:'Appointments',
          component:()=>import('../views/Pet/admin/Appointments.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('token');
  if (to.meta.requiresAuth && !userToken) {
  
    alert('You must be logged in to access this page');
    next({ path: '/admin/login' });
  } else if (to.meta.isGuest && userToken) {
    next({ path: '/admin/products' }); 
  }else {
    next();
  }
});
export default router
