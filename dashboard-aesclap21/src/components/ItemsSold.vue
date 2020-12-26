<template lang="html">
  <article class="stats">
    <h4>Items Sold: <span>&#128200;</span></h4>
    <!-- default value to display is placed within slot tag
         '<slot><default_value></slot>' | => if using slots -->
    <!-- data being provided by provider stored in root component and being
         accessible by child of any :nth order by using inject-method | => if
         using provider -->
    <span class="light_text">{{ quantityOfItemsSold }}</span>
  </article>
</template>

<script>
export default {
  // QUESTION: must value of inject = [ <array> ] ?
  inject: ["quantityOfItemsSold"]
};
</script>

<style lang="css" scoped></style>
