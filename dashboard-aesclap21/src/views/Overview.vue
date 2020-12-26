<template lang="html">
  <h3 class="page-title">Overview</h3>
  <section>
    <!-- dynamic data '{{ data }}' being parsed from  parent, but is not
         accessible by child | => if using slots to parse data -->
    <items-sold></items-sold>
    <sales-total></sales-total>
    <best-seller></best-seller>
  </section>
</template>

<script>
import ItemsSold from "@/components/ItemsSold";
import SalesTotal from "@/components/SalesTotal";
import BestSeller from "@/components/BestSeller";
export default {
  name: "Overview",
  components: {
    ItemsSold,
    SalesTotal,
    BestSeller
  },
  props: {
    totalSalesValue: {
      type: Number
    },
    quantityOfItemsSold: {
      type: Number
    },
    bestSeller: {
      type: String
    }
  }
};
</script>

<style lang="css" scoped>
section {
  display: flex;
  justify-content: space-between;
}
</style>
