<template>
  <div class="app_wrapper">
    <header>
      <h1>Lulu's Dashboard</h1>
    </header>
    <div class="content">
      <aside class="">
        <sidebar></sidebar>
      </aside>
      <main>
        <small>
          <span class="blue">dashboard</span>
          / Overview
        </small>
        <!-- replace(/\s/, '') => white noise canceler -->
        <component :is="selectedPage.replace(/\s/, '')"></component>
      </main>
    </div>
  </div>
</template>

<script>
import Overview from "./views/Overview";
import Sidebar from "./components/Sidebar";
import Orders from "./views/Orders";
import BestSellers from "./views/BestSellers";
import SalesTotal from "@/components/SalesTotal";
import { orders } from "../orders";
export default {
  name: "App",
  components: {
    Overview,
    Sidebar,
    Orders,
    SalesTotal,
    BestSellers
  },
  data() {
    return {
      orders,
      selectedPage: "Overview"
    };
  },
  provide() {
    return {
      quantityOfItemsSold: this.quantityOfItemsSold,
      totalSalesValue: this.totalSalesValue,
      bestSeller: this.sortedItems[0],
      orders: this.orders,
      sortedItems: this.sortedItems,
      changePage: this.changePage
    };
  },
  methods: {
    changePage(page) {
      this.selectedPage = page;
    }
  },
  computed: {
    // ITEM SORTING HANDLER
    sortedItems() {
      // 1. Creating a const ( -> 'sortedItems' ) given the value of an empty
      // array
      const sortedItems = [];
      // 2. looping through all order in orders of orders.js using the
      // map-function ( -> orders.map(order) ) returning the result and
      // storing it in sortedItems
      this.orders.map(order => {
        // 3. Inside order in orders looping through all item in items using
        // the map-function ( -> order.items.map(item) ) checking if item
        // already exists by going through sortedItems using the find-function
        // ( -> sortedItems.find() ) and declaring the condition to be met if
        // the id of sortedItem ('sortedItem.id') equates to the item id
        // ( 'item.id' ) within sortedItems. Finally storing the result within
        // a const ( -> 'itemExists' )
        order.items.map(item => {
          // 4. Counting the quantity of each item in orders first checking if
          // itemExists has a value and if so rasing the quantity value of
          // itemExists ('itemExists.quantity') by 1 and then returning the
          // result to itemExists. After checking if itemExists is true
          // creating a new item ( -> 'newItem' ) with a quantity value of 1 (
          // -> newItem = { 'quantity: 1' } ) and all the item value ( ->
          // newItem = { ...item } ), finally pushing newItem to sortedItems
          const itemExists = sortedItems.find(
            sortedItem => sortedItem.id === item.id
          );
          if (itemExists) {
            itemExists.quantity++;
            return;
          }
          const newItem = {
            quantity: 1,
            ...item
          };
          sortedItems.push(newItem);
        });
      });
      // 5. Before returning sortedItems sorting all item in sortedItems by
      // using the sort-function ( -> sortedItems.sort() ) asigning the item 'a'
      // with the higher quantity a lower value than the item 'b' the with lower
      // quantity. The item with the lower value will be sorted before the item
      // with the higher value
      sortedItems.sort((a, b) => (a.quantity > b.quantity ? -1 : 1));
      return sortedItems;
    },
    quantityOfItemsSold() {
      let qty = 0;
      this.sortedItems.map(item => {
        qty += item.quantity;
      });
      return qty;
    },
    totalSalesValue() {
      let total = 0;
      this.orders.map(order => {
        order.items.map(item => {
          total += item.price;
        });
      });
      return total;
    }
  }
};
</script>

<style>
.app_wrapper {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: #202124;
  color: whitesmoke;
  margin: 0;
}

header {
  background: #35363a;
  border-bottom: 1px dotted #ddd;
  border-top: 1px solid #35363a;
}

.content {
  display: flex;
}

aside {
  flex: 1;
  border-right: 1px dotted #ddd;
  min-height: 100vh;
}

main {
  flex: 3;
  padding: 1rem;
}

.blue {
  color: rgb(25, 149, 243);
}

h1 {
  margin-left: 10px;
  font-size: 1.4rem;
}

h4 {
  margin: 0;
  padding-bottom: 1.6rem;
}

li {
  display: block;
  padding-left: 10px;
  margin-top: 1rem;
}

.stats {
  background: #35363a;
  border: 1px dotted #ddd;
  border-radius: 5px;
  padding: 1rem;
}

.order {
  padding: 10px;
  margin: 10px 0;
  border: 1px dotted #ddd;
  border-radius: 5px;
}

table {
  border: 1px dotted #ddd;
  text-align: center;
  border-collapse: collapse;
}

thead {
  background: #35363a;
  color: lightpink;
}

td,
th {
  padding: 20px;
  border-left: 1px dotted #ddd;
}

a:hover {
  cursor: pointer;
}
</style>
