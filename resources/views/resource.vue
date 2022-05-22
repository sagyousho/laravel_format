<template>

  <div class="resource">
    <h1>resource</h1>
    <button v-on:click="onclick">Homeへ</button>
  <ul>
    <li
      v-for="resource in resources"
      v-bind:key="resource.id"
      v-text="resource.lastname + resource.firstname"></li>
  </ul>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      resources:[],
    }
  },
  created() {
    axios.get('/api/resource')
    .then(response => {
      this.resources = response.data;
    })
    .catch(error => {
      console.error(error)
    });
  },
  methods: {
    onclick() {
      this.$router.push('/home')
    }
  },
}
</script>