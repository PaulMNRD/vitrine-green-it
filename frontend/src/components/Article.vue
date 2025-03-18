<template>
  <div class="article">
    <h2>{{ article.name }}</h2>
    <img width="180" height="101" :src="`/public/${article.image_id}`" :alt="`${article.image_id}`" loading="lazy">
    <p>{{ article.content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
type PropType<T> = import('vue').PropType<T>;

export default defineComponent({
  name: 'Article',
  props: {
    article: {
      type: Object as PropType<{ name: string; image_id: string; content: string }>,
      required: true
    }
  }
});
</script>

<style scoped>
.article {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.article img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.article h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
</style>