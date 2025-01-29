import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../api/api'; // Assure-toi que ce type est correct
import { authService } from '../services/auth.service';
import { AuthResponse } from '../types/auth'; // Importe le type AuthResponse

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function login(email: string, password: string) {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.login({ email, password });

      // Assurer que 'response' est du type AuthResponse et que 'user' est dedans
      const authResponse = response as AuthResponse;
      user.value = authResponse.user || null;  // Assigner l'utilisateur correct

      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Une erreur est survenue';
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      loading.value = true;
      error.value = null;
      await authService.register({ username, email, password });
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Une erreur est survenue';
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    authService.logout();
    user.value = null;
  }

  // Initialiser l'utilisateur depuis le localStorage
  const storedUser = authService.getCurrentUser();
  if (storedUser) {
    user.value = storedUser.user;  // Assure-toi que 'storedUser' a un champ 'user'
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout
  };
});
