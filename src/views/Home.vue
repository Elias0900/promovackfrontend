<template>
  <div class="home">
    <h1>Bienvenue sur l'application</h1>
    <p v-if="authStore.user">
      Connecté en tant que {{ authStore.user.username }}
    </p>
    <p v-else>
      Veuillez vous <router-link to="/login">connecter</router-link> ou vous <router-link to="/register">inscrire</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}
</style>