<template lang="html">
  <nav>
    <ul>
      <li v-for="page in pages" :key="page">
        <!-- slot :page can be parsed on to parent. Must be given the value of
             data ( in this case 'page') requested by parent -->
        <!-- <slot :page="page"></slot> -->
        <a @click="changePage(page)">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  inject: ["changePage"],
  data() {
    return {
      pages: ["Overview", "Orders", "Best Sellers"]
    };
  }
};
</script>

<style lang="css" scoped></style>
