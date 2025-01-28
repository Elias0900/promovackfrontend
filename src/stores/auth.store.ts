import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../api/api';
import { authService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function login(email: string, password: string) {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.login({ email, password });
      user.value = response;
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

  // Initialize user from localStorage
  const storedUser = authService.getCurrentUser();
  if (storedUser) {
    user.value = storedUser.user;
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