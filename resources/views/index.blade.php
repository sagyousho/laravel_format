<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>laravel6_webpack5_sample</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="{{ asset('/dist/css/style.css') }}" />
</head>

<body>

  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
  </div>
  <button class="btn btn-primary">test</button>
  <script src=""></script>
  <script defer src="{{ asset('dist/js/init.js') }}"></script>
</body>

</html>