import { AuthControllerApi } from '../api'; // Importez l'API générée
import { AuthResponse } from "../types/auth"; // Importez les types générés

// Créez une instance de l'API
const authApi = new AuthControllerApi();

export const authService = {
  async login(request: { email: string; password: string }): Promise<AuthResponse> {
    try {
      // Utilisez la méthode `login` de l'API générée
      const response = await authApi.login(request);

      // Vérifier et gérer le type de `response.data` en fonction du type AuthResponse
      const authResponse = response.data as AuthResponse;

      if (authResponse.token) {
        localStorage.setItem('user', JSON.stringify(authResponse));
      }

      return authResponse;
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
