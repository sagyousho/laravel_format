<template>
  <div class="about">
    <h1>About</h1>
    <button v-on:click="onclick">トップへ</button>
  </div>
</template>

<script>
export default {
  methods: {
    onclick() {
      this.$router.push('/')
    }
  },
}
</script>