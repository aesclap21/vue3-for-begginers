<template lang="html">
  <h3 class="page-title">Best Sellers</h3>
  <table>
    <thead>
      <tr>
        <th>Qauntity Sold</th>
        <th>Product Name</th>
        <th>Product ID</th>
        <th>Product Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, quantity, name, price } in sortedItems" :key="id">
        <td>{{ quantity }}</td>
        <td>{{ name }}</td>
        <td>{{ id }}</td>
        <td>{{ price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  inject: ["sortedItems"]
};
</script>

<style lang="css" scoped></style>
