import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/about',
      name: 'about',
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
          component: () => import('../views/restaurant/Restaurant.vue')
        },
        {
          path: '/restaurants/:address',
          name: 'restaurants',
          component: () => import('../views/restaurant/SearchRestaurants.vue')
        },
        {
          path: '/recipe',
          name: 'recipe',
          component: () => import('../views/recipe/Recipe.vue')
        },
        {
          path: '/drink',
          name: 'drink',
          component: () => import('../views/drink/Drink.vue')
        },
        {
          path: '/nutrition',
          name: 'nutrition',
          component: () => import('../views/nutrition/Nutrition.vue')
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
        },
        {
          path:'recipes/:name',
          name: 'recipes',
          component: () => import('../views/recipe/SearchRecipes.vue')
        },
        {
          path:'drinks/:name',
          name: 'drinks',
          component: () => import('../views/drink/SearchDrinks.vue')
        }
        
      ]
    }
  ]
})


export default router
