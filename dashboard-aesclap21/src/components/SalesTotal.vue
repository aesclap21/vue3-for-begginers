<template lang="html">
  <article class="stats">
    <h4>Total Sales: <span>&#128176;</span></h4>
    <!-- default value to display is placed within slot tag
         '<slot><default_value></slot>' | => if using slots -->
    <!-- data being provided by provider stored in root component and being
         accessible by child of any :nth order by using inject-method | => if
         using provider -->
    <span class="light_text">€ {{ totalSalesValue }}</span>
  </article>
</template>

<script>
export default {
  // QUESTION: must value of inject = [ <array> ] ?
  inject: ["totalSalesValue"]
};
</script>

<style lang="css" scoped>
.light_text {
  font-weight: bolder;
  color: #68b5b9;
}
</style>
