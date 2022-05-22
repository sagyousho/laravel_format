<template>

<div>
  <div class="container">
    <div class="text-center">
      <!-- <h1>出 勤 管 理</h1> -->
      <div id="barcode-reader"></div>
        <div>
          <h1>{{time}}</h1>
        </div>
        <div>
          <p>{{date}}</p>
        </div>
        <div>
        <button id="" v-on:click="scanStart" class="btn btn-primary mt-3">出勤カード</button>
        </div>
        <div>
        <router-link to="/scan"><button class="btn btn-info mt-3">出勤記録</button></router-link>
        </div>
    </div>
    <!-- <div id="send-data">
      <input v-on:change="seletStart" id="code" v-model="code" type="hidden">
    <input v-model="name" id="name" type="hidden">
    </div> -->
  </div>
      <!-- <button v-on:click="onclick">aboutへ</button> -->
</div>
</template>

<script src="../../src/js/home.js"></script>


<style>
  #barcord-scan-area canvas,
  video {
    margin-left: auto;
    margin-right: auto;
    width: 320px;
    height: 240px;
  }


  .drawingBuffer {
    position: absolute;
    top: 160;
    left: 0;
  }
</style>