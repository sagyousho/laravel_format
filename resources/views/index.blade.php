<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>laravel6_webpack5_sample</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="{{ asset('/dist/css/style.css') }}" />
  <!-- <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->

</head>

<body>
  <div id="value">
    </div>
    <div id="app">
      <input v-model="code" id="code" type="hidden">
      <input v-model="name" id="name" type="hidden">
    <div id="nav" class="">
      <router-link to="/">Home</router-link>
      <!-- <router-link to="/about">About</router-link>
      <router-link to="/resource">resource</router-link> -->
    </div>
    <router-view />
  </div>
  <script defer src="{{ asset('dist/js/init.js') }}"></script>
</body>

</html>