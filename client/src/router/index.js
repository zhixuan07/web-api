import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('../components/DefaultLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/restaurant',
          name: 'restaurant',
          component: () => import('../views/Restaurant.vue')
        },
        {
          path: '/restaurants/:address',
          name: 'restaurants',
          component: () => import('../views/SearchRestaurants.vue')
        },
        {
          path: '/recipe',
          name: 'recipe',
          component: () => import('../views/Recipe.vue')
        },
        {
          path: '/drink',
          name: 'drink',
          component: () => import('../views/Drink.vue')
        },
        {
          path: '/nutrition',
          name: 'nutrition',
          component: () => import('../views/Nutrition.vue')
        },
        {
          path: '/bookmarks',
          name: 'bookmarks',
          component: () => import('../views/BookMarks.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/Profile.vue'),
        }
        
      ]
    }
  ]
})


export default router
