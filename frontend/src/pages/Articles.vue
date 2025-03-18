<template>
  <div>
    <Header />
    <h1>Articles</h1>
    <div v-if="articles.length > 0" class="articles-container">
      <Article v-for="article in articles" :key="article.id" :article="article" />
    </div>
    <div ref="sentinel" class="sentinel"></div>
    <p v-if="isLoading">Chargement...</p>
    <p v-if="!hasMore">Plus d'articles disponibles.</p>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from "vue";
import Article from "../components/Article.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const articles = ref<any[]>([]);
const page = ref(0);
const limit = 6;
const isLoading = ref(false);
const hasMore = ref(true);
const observer = ref<IntersectionObserver | null>(null);
const sentinel = ref<HTMLElement | null>(null);

const fetchArticles = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  try {
    const response = await fetch(`http://localhost:3000/articles?page=${page.value}&limit=${limit}`);
    const newArticles = await response.json();

    if (newArticles.length < limit) {
      hasMore.value = false;
    }

    articles.value.push(...newArticles);
    page.value++;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchArticles();

  observer.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchArticles();
        }
      },
      { rootMargin: "100px" }
  );

  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
});

onUnmounted(() => {
  if (observer.value && sentinel.value) {
    observer.value.unobserve(sentinel.value);
  }
});
</script>

<style scoped>
.articles-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.sentinel {
  height: 20px;
}

@media (max-width: 768px) {
  .articles-container {
    grid-template-columns: 1fr;
  }
}
</style>