<template lang="html">
  <ul class="grid_wrapper">
    <li
      class="category_item"
      v-for="category in uniqueCategories"
      :key="category"
    >
      <router-link
        :to="{ name: 'Category', params: { category } }"
      >
        {{ category }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import useCategory from '@/composables/useCategory'

export default {
  setup() {
    const { uniqueCategories } = useCategory();
    return {
      uniqueCategories
    };
  }
};
</script>

<style lang="css" scoped>
.category_item {
  background: linear-gradient(30deg, lightslategray, darkslategray);
  padding: 6rem 0;
}

li a {
  font-size: 20px;
}

@media (max-width: 600px) {
  .category_item {
    margin-bottom: 1rem;
  }
}
</style>
