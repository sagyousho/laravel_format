import { H_BarCodeReader } from "../../src/js/H_barcodeReader";

export default {
  data:function() {
    return {
      date: '',
      time: '',
      week: ['（日）', '（月）', '（火）', '（水）', '（木）',  '（金）', '（土）'] ,
    };
  },
  created() {
    setInterval(this.updateTime, 1000);
  },
  methods: {
    /**
     * 現在日時表示
     */
    updateTime: function() {
      //現在の日付・時刻を取得 
      let currentdate = new Date()

      // 現在の時刻
      this.time = this.zeroPadding(currentdate.getHours(), 2) + ':' + this.zeroPadding(currentdate.getMinutes(), 2) + ':' + this.zeroPadding(currentdate.getSeconds(), 2)

      // 現在の年月日
      this.date = this.zeroPadding(currentdate.getFullYear(), 4) + '年' + this.zeroPadding(currentdate.getMonth() + 1, 2) + '月' + this.zeroPadding(currentdate.getDate(), 2) + '日' + this.week[currentdate.getDay()]
    },
      zeroPadding: function(num, len) {
      let zero = '';

     // 0の文字列を作成
      for(var i = 0; i < len; i++) {
        zero += '0';
      }

     // zeroの文字列と、数字を結合し、後ろ２文字を返す
      return (zero + num).slice(-len);
    },

    /**
     * バーコードリーダースタート
     */
    scanStart() {
      try {
        var settingData = require('../../public/barcode.setting.json');
        console.log(settingData);
        const HBarCodeReader = new H_BarCodeReader(settingData);
        HBarCodeReader.startScanner();
      } catch (e) {
        console.log(e); //例外処理
        // 設定ファイルの読み込みに失敗した場合、以下の設定にする
        alert("エラー：" + e.message)
      }
    },

    selectStart() {
      console.log(this.code)

    }
  },
}
