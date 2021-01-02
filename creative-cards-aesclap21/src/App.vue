<template>
  <app-header></app-header>
  <router-view />
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
  components: {
    AppHeader
  },
};
</script>

<style>
#app {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background: #202124;
  color: whitesmoke;
}

ul {
  margin: 0;
  padding: 0;
}

li,
li a {
  text-decoration: none;
  list-style: none;
  color: inherit;
}

span {
  font-size: 15px;
}

img {
  max-width: 100%;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  color: whitesmoke;
}

button:hover,
li:hover {
  color: #68b5b9;
}

button:focus {
  outline: none;
}

.image_upload_wrapper,
.text_input_wrapper {
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 2px 2px #252727 inset;
  border-radius: 3px;
}

a.page_select {
  width: 80px;
  height: 40px;
}

@media (min-width: 600px) {
  .grid_wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}

@media (min-width: 1000px) {
  .grid_wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
