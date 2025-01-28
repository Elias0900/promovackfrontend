<template>
  <nav>
    <router-link to="/">Accueil</router-link> |
    <template v-if="!authStore.user">
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/register">Inscription</router-link>
    </template>
    <template v-else>
      <router-link to="/profile">Profil</router-link>
    </template>
  </nav>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth.store';

const authStore = useAuthStore();
</script>

<style>
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>