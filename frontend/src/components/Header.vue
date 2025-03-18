<template>
  <header>
    <nav>
      <router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link>
      <router-link to="/articles" :class="{ active: $route.path === '/articles' }">Articles</router-link>
      <router-link to="/contact" :class="{ active: $route.path === '/contact' }">Contact</router-link>
      <router-link to="/legals" :class="{ active: $route.path === '/legals' }">Mentions légales</router-link>
    </nav>
  </header>
</template>

<style>
nav { display: flex; gap: 1rem; }
.active { font-weight: bold; text-decoration: underline; }
</style>