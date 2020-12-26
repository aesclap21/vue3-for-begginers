<template lang="html">
  <sales-total>
    <h3 class="page-title">Orders</h3>
    <span>&#128176;</span>
    <span class="light_text">€ {{ totalSalesValue }}</span>
  </sales-total>
  <section>
    <div class="order_wrapper">
      <div class="order" v-for="order in orders" :key="order.id">
        <p>Order: {{ order.id }}</p>
        <ul>
          <li v-for="(item, index) in order.items" :key="item + index">
            <p>{{ item.name }} : € {{ item.price }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import SalesTotal from "../components/SalesTotal";
export default {
  inject: ["orders"],
  components: {
    SalesTotal
  }
};
</script>

<style lang="css" scoped>
.stats {
  margin-top: 1em;
}
</style>
