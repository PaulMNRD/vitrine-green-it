<template>
  <div>
    <Header />
    <h1>Accueil</h1>
    <div class="carousel">
      <div v-for="(article, index) in articles" :key="index" class="carousel-item">
        <img :src="article.image" alt=""/>
        <p>{{ article.text }}</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
const articles = [
  { image: 'https://via.placeholder.com/300', text: 'Article 1' },
  { image: 'https://via.placeholder.com/300', text: 'Article 2' },
]
</script>

<style>
.carousel { display: flex; overflow: auto; gap: 1rem; }
.carousel-item { min-width: 300px; }
</style>