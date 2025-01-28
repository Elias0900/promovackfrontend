import { AuthControllerApi } from '../api'; // Importez l'API générée
import type { User } from '../api/api';
import {AuthResponse} from "../types/auth"; // Importez les types générés

// Créez une instance de l'API
const authApi = new AuthControllerApi();

export const authService = {
  async login(request: { email: string; password: string }): Promise<User> {
    try {
      // Utilisez la méthode `login` de l'API générée
      const response = await authApi.login(request);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async register(request: { password: string; email: string; username: string }): Promise<any> {
    try {
      // Utilisez la méthode `register` de l'API générée
      const response = await authApi.register(request);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('user');
  },

  getCurrentUser(): AuthResponse | null {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};