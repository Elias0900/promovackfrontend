<template>
  <div class="profile-container">
    <h2>Profil</h2>
    <div v-if="authStore.user" class="profile-info">
      <p><strong>Nom d'utilisateur:</strong> {{ authStore.user.nom }}</p>
      <p><strong>Prenom d'utilisateur:</strong> {{ authStore.user.prenom }}</p>
      <p><strong>Email:</strong> {{ authStore.user.email }}</p>
      <button @click="handleLogout" class="logout-button">
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import {onMounted} from "vue";

const router = useRouter();
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-info {
  margin-top: 20px;
}

.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>