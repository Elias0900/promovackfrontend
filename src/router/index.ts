import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '../services/auth.service';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

// Interception des changements de route pour gérer l'authentification
router.beforeEach((to, _, next) => { // 'from' n'est plus nécessaire
                                     // Récupération de l'utilisateur actuellement connecté
  const currentUser = authService.getCurrentUser();

  // Vérification si la route nécessite une authentification
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Si la route nécessite une authentification et l'utilisateur n'est pas connecté
  if (requiresAuth && !currentUser) {
    // Redirection vers la page de login
    next('/login');
  } else {
    // Autorisation de la navigation
    next();
  }
});

export default router;
