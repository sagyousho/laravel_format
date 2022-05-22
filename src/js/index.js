// import '../node_modules/bootstrap/scss/bootstrap'
import { H_BarCodeReader } from "./H_barcodeReader";
// import { H_BarCodeReader_test } from "./H_barcodeReader_test";

// // BootstrapのJavaScript側の機能を読み込む
// import "bootstrap";

// // スタイルシートを読み込む
// import "./index.scss";

// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import router from './router';

// window.Vue = Vue;

// Vue.use(VueRouter);

// const app = new Vue({
//   el: '#app',
//   router
// })


// window.addEventListener("DOMContentLoaded", () => {
document.getElementById('camera-start').addEventListener('click', () => {
  try {
    var settingData = require('../../public/barcode.setting.json');
    console.log(settingData);
    const HBarCodeReader = new H_BarCodeReader(settingData);
    // const HBarCodeReader = new H_BarCodeReader_test(settingData);
    HBarCodeReader.startScanner();
  } catch (e) {
    console.log(e); //例外処理
    // 設定ファイルの読み込みに失敗した場合、以下の設定にする
    alert("エラー：" + e.message)
  }
});
