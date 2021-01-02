<template lang="html">
  <nav>
    <ul>
      <li>
        <router-link to="front" class="page_select">
          <span>Front</span>
          <img src="@/assets/icons/front-back.svg" alt="front card icon">
        </router-link>
      </li>
      <li>
        <router-link to="inside-left" class="page_select">
          <span>Inside Left</span>
          <img src="@/assets/icons/inside-left.svg" alt="inside-left card icon">
        </router-link>
      </li>
      <li>
        <router-link to="inside-right" class="page_select">
          <span>Inside Right</span>
          <img
            src="@/assets/icons/inside-right.svg"
            alt="inside-right card icon"
          >
        </router-link>
      </li>
      <li>
        <router-link to="back" class="page_select">
          <span>Back</span>
          <img src="@/assets/icons/front-back.svg" alt="back card icon">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
ul {
  display: flex;
  margin: 1.6rem 0;
}

.page_select {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

img {
  max-width: 30px;
  margin-left: 10px;
}
</style>
