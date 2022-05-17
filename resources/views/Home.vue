<template>

  <div class="home">
    <h1>Home</h1>
    <button v-on:click="onclick">aboutへ</button>
  </div>
</template>

<script>
export default {
  methods: {
    onclick() {
      this.$router.push('/about')
    }
  },
}
</script>