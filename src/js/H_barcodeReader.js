import * as Quagga from "./quagga";
import { HumanResourcesAPI } from "./HumanResourcesAPI";
import { Libs } from "./Libs";

export class H_BarCodeReader
{


  /**
   * 初期設定
   * @param {object} set
   */
  constructor(set) {
    this.set = set;
    this.logicalProcessors = navigator.hardwareConcurrency; //処理を行う論理CPU数設定(default:PCスペックの最大数)

    //inputStream
    this.type = set.inputStream.type; //スキャン方式(default:"LiveStream")
    this.decodeBarCodeRate = set.inputStream.decodeBarCodeRate; //(default:3)
    this.successTimeout = set.inputStream.successTimeout; //検出が成功したときの遅延時間(default:500)
    this.codeRepetition = set.inputStream.codeRepetition; //コードの繰り返しを受け入れ可否(default:true)
    this.tryVertical = set.inputStream.tryVertical; //垂直のバーコードの読み取り(defaulut:true)
    this.frameRate = set.inputStream.frameRate; //フレームレート(default:15)
    this.width = set.inputStream.width; //横幅(default:)
    this.height = set.inputStream.height; //縦幅(default:)
    this.facingMode = set.inputStream.facingMode; //バックカメラの利用を設定(フロントカメラは"user")(default:environment(バックカメラ))
    this.frequency = set.inputStream.frequency; //スキャン精度 1秒あたりの最大スキャン回数(default:10)

    // スキャンしない範囲設定
    this.top = set.inputStream.area.top;
    this.right = set.inputStream.area.right;
    this.left = set.inputStream.area.left;
    this.bottom = set.inputStream.area.bottom;

    //decoder
    this.readers = set.decoder.readers; //バーコード方式(default:"code_128_reader")
    this.multiple = set.decoder.multiple; //複数検知(default:false)

    //locate
    this.locate = set.locate; //バーコードの位置を特定する機能(default:true)
    this.halfSample = set.locate.halfSample; //バーコードの位置を特定する機能(default:true)
    this.patchSize = set.locate.patchSize; //バーコード読み取りサイズ(default:"medium")

    //extra
    this.codeCheckCount = set.codeCheckCount; //スキャンしたコードのチェック回数(default:3)
    this.scanBoxLineColor = set.scanBoxLineColor; //バーコード検知の枠の色(default:"green")
    this.scanBoxLineWidth = set.scanBoxLineWidth; //バーコード検知の枠の幅(default:2)
    this.successBoxLineColor = set.successBoxLineColor; //バーコード読取り時の枠の色(default:"yellow")
    this.successBoxLineWidth = set.successBoxLineWidth; //バーコード読取り時の枠の幅(default:2)
    this.successLineColor = set.successLineColor; //バーコード検出完了時の色(default:"red")
    this.successLineWidth = set.successLineWidth; //バーコード検出完了時の幅(default:3)
    this.successAudioSource = set.successAudioSource; //検出完了時の音声path(default:3)
    this.scanTimeOut = set.scanTimeOut; //"自動停止時間(秒設定)"

    //バーコードスキャンの要素生成
    // const barcodeArea = document.getElementById(set.HTMLElem.barcodeAreaId);
    const barcodeArea = document.getElementById("barcode-reader");
    console.log(barcodeArea);
    this.scanArea = document.createElement('div');
    this.scanArea.id = "barcord-scan-area";
    Object.assign(this.scanArea.style, {
      float: "left",
      width: this.width / 2,
      height: this.height / 2
    });
    barcodeArea.appendChild(this.scanArea);
    // this.entryMusic = set.successEntryAudioSource; //検出完了時の音声path
    // this.exitMusic = set.successExitAudioSource; //検出完了時の音声path
  }


  /**
   * バーコードスキャンスタート
   */
  startScanner() {
    const scanTimeOut = this.scanTimeOut;
    const scanBoxLineColor = this.scanBoxLineColor;
    const scanBoxLineWidth = this.scanBoxLineWidth;
    const successBoxLineColor = this.successBoxLineColor;
    const successBoxLineWidth = this.successBoxLineWidth;
    const successLineColor = this.successLineColor;
    const successLineWidth = this.successLineWidth;
    const resourcesAPI = new HumanResourcesAPI(this.set);
    const libs = new Libs();
    const date = new Date();
    const now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    const messageElem = document.getElementById("message");
    const scanArea = document.getElementById(this.scanArea.id);
    // const entryMusic = new Audio(this.entryMusic);
    // const exitMusic = new Audio(this.exitMusic);
    let decodedValue; //バーコード

    // 設定初期化;
    Quagga.init(
      {
        numOfWorkers: this.logicalProcessors,
        inputStream: {
          type: this.type,
          target: scanArea,
          frequency: this.frequency,
          area: {
            top: this.top,
            right: this.right,
            left: this.left,
            bottom: this.bottom 
          },
          constraints: {
            decodeBarCodeRate: this.decodeBarCodeRate,
            successTimeout: this.successTimeout,
            codeRepetition: this.codeRepetition,
            tryVertical: this.tryVertical,
            frameRate: this.frameRate,
            width: this.width,
            height: this.height,
            facingMode: this.facingMode,
          },
        },
        decoder: {
          multiple: this.multiple,
          readers: [ this.readers ],
        },
        locate: this.locate,
        locater: {
          halfSample: this.halfSample,
          patchSize: this.patchSize,
        },
      },
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
        //バーコード読み取りスタート
        console.log("Initialization finished. Ready to start");
        Quagga.start();

        //一定時間バーコードを読み取りしないと停止
        let count = 0
        let interval = setInterval(() => {
          if (count >= scanTimeOut) {
            count = 0;
            Quagga.stop();
            scanArea.remove();
            clearInterval(interval);
          }
          if (decodedValue) {
            count = 0;
            decodedValue = null;
          }
          count++;
        }, 1000)
      }
    );


    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
    // 検知時の処理
      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(
                box,
                {
                  x: 0,
                  y: 1,
                },
                drawingCtx,
                {
                  color: scanBoxLineColor,
                  lineWidth: scanBoxLineWidth,
                }
              );
            });
        }

        // 検知完了時の処理
        if (result.box) {
          Quagga.ImageDebug.drawPath(
            result.box,
            {
              x: 0,
              y: 1,
            },
            drawingCtx,
            {
              // color: "#00F",
              color: successBoxLineColor,
              lineWidth: successBoxLineWidth,
            }
          );
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            {
              x: "x",
              y: "y",
            },
            drawingCtx,
            {
              color: successLineColor,
              lineWidth: successLineWidth,
            }
          );
        }
      }
    });

    //barcode read call back
    let scanResults = [];
    let resultBuffer = [];

    Quagga.onDetected(function (result) {

      let isErr = false;
      result.codeResult.decodedCodes.find((data) => {
        if (data.error) {
          if (parseFloat(data.error) > 0.19) {
            isErr = true;
          }
        }
      });
      if (isErr) return;

      // エラー率の中央値が0.1以上なら除外
      const errors = result.codeResult.decodedCodes.filter((_) => _.error !== undefined).map((_) => _.error);
      // 中央値を取得
      const median = function() {
        errors.sort((a, b) => a - b);
        const half = Math.floor(errors.length / 2);
        if (errors.length % 2 === 1)
            return errors[half]
        return (errors[half - 1] + errors[half]) / 2.0
      }

      if (median > 0.1) {
        return;
      }

    // 3回連続で同じ値だった場合のみ採用
      scanResults.push(result.codeResult.code)
      if (scanResults.length < 3) {
        return;
      }

      if (scanResults[0] !== scanResults[1]) {
        scanResults.shift();
        return;
      }

      
      // 複数回目は前回と値が違う時だけ発火
      if (resultBuffer.length > 0) {
        if (resultBuffer.slice(-1)[0] === result.codeResult.code) {
          return;
        }
      }
      
      resultBuffer.push(result.codeResult.code);

      //読み取り成功時の処理
      decodedValue = result.codeResult.code; //バーコード

      resourcesAPI.api('GET', { barcode: decodedValue });


      // // セッションストレージの存在確認
      // let comeInData = now + '_in_' + decodedValue;
      // let comeOutData = now + '_out_' + decodedValue;
      // // 入場データがある場合、入場処理
      // if (!sessionStorage.getItem(comeInData)) { //入場データの存在確認
      //   let comeOutTime = sessionStorage.getItem(comeOutData);
      //   // 出場セッションストレージデータの存在確認
      //   if (!comeOutTime) {
      //     //セッションストレージに保存(key:日付_in_バーコード value:現在時間)
      //     sessionStorage.setItem(comeInData, libs.getNowTime());
      //     console.log("in_comeinTime:" + sessionStorage.getItem(comeInData));
      //     resourcesAPI.api('POST', { barcode: decodedValue, date: now }, 'in');
      //     // entryMusic.play();
      //   }
      //   //本日の出場時間のセッションストレージデータがある場合
      //   else {
      //     let diffSecond = libs.getDiffTime(comeOutTime);
      //     console.log("出場からの時間差:" + diffSecond);
      //     //前回出場してから60秒経過しているか判定
      //     if (diffSecond > 60) {
      //       //セッションストレージに保存(key:日付_in_バーコード value:現在時間)
      //       sessionStorage.setItem(comeInData, libs.getNowTime());
      //       console.log("in_comeinTime:" + sessionStorage.getItem(comeInData));
      //       resourcesAPI.api('POST', { barcode: decodedValue, date: now }, 'in');
      //       // entryMusic.play();
      //     } else {
      //       messageElem.textcontent = "短時間での連続読み取りを検出しました"
      //       libs.countTextRemove(messageElem, 5);
      //     }
      //   }
      // }
      // //入場データがある場合、出場処理
      // else {
      //   // 前回の出場セッションストレージデータがある場合、削除
      //   if (sessionStorage.getItem(comeOutData)) {
      //     sessionStorage.removeItem(comeOutData);
      //   }
      //   else {
      //     //前回の入場セッションストレージの時間から60秒経過しているか判定
      //     let comeInTime = sessionStorage.getItem(comeInData);
      //     console.log("comeInTime:" + comeInTime);
      //     let diffSecond = libs.getDiffTime(comeInTime);
      //     console.log("入場からの時間差:" + diffSecond);
      //     if (diffSecond > 60) {
      //       sessionStorage.removeItem(comeInData);
      //       resourcesAPI.api('PUT', { barcode: decodedValue, date: now }, 'out');
      //       // exitMusic.play();
      //       sessionStorage.setItem(comeOutData, libs.getNowTime());
      //     } else {
      //       messageElem.textcontent = "短時間での連続読み取りを検出しました"
      //       libs.countTextRemove(messageElem, 5);
      //     }
      //   }
      // }
    });
  }

  scanStop()
  {
    const scanArea = document.getElementById(this.target);
    Quagga.stop();
    scanArea.remove();
  }

  playSound(sound) {
    if (sound) {
      let audio = new Audio(sound);
      audio.play();
    }
  }
}

// class Extra
// {
//   scanStop()
//   {
//     const scanArea = document.getElementById(this.target);
//     Quagga.stop();
//     scanArea.remove();
//   }
// }
// document.getElementById("camera-stop").addEventListener('click', () => {
//   const extra = new Extra;
//   extra.scanStop()
// })


