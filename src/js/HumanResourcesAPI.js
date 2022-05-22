import Axios from "axios";
import { Libs } from "./Libs";

export class HumanResourcesAPI
{
  constructor(set)
  {
    this.resourceAPIUrl = set.API.humanResource.url;
    this.recordAPIUrl = set.API.record.url;
    this.entryMusic = set.entryAudioSource; //入場データ登録時の音声
    this.exitMusic = set.exitAudioSource; //出場データ登録時の音声
    this.errorMusic = set.errorAudioSource; //エラー時の音声
    this.codeElemId = set.HTMLElem.codeElemId; //レスポンスHTML要素ID指定
    this.nameElemId = set.HTMLElem.nameElemId; //レスポンスHTML要素ID指定
    this.resultMsgId = set.HTMLElem.resultMsgId; //レスポンスHTML要素ID指定
    this.errorMsgId = set.HTMLElem.errorMsgId; //エラーメッセージHTML要素ID指定
    this.resultMsg = set.HTMLElem.resultMsg; //レスポンスメッセージ
    this.resultElem = document.getElementById(set.HTMLElem.resultMsgId);
    this.clearTimeout;
    // this.succesMusic = new Audio(this.successAudioSource);
    // console.log(this.succesMusic);
  }
  
  /**
   * 
   * @param {string} request 
   * @param {object} data 
   * @param {string} decision 
   */
  api(requestMethod, request, decision)
  {
    const libs = new Libs();
    // const resultElem = document.getElementById(this.resultMsgId);
    const nameElem = document.getElementById(this.nameElemId);
    const codeElem = document.getElementById(this.codeElemId);
    const errorElem = document.getElementById(this.errorMsgId);
    const errorMusic = new Audio(this.errorMusic);

    Axios.interceptors.response.use(function (response) {
        // 成功時の処理
        return response;
      }, function (error) {
        // 失敗時の処理
        errorMusic.play();
        switch (error.response.status) {
          case 401:
            console.error("401:" + error);
            errorElem.textContent = "401エラー:" + error
            libs.countTextRemove(errorElem, 60);
            return false;
            case 403:
            errorElem.textContent = "403エラー:" + error
            console.error("403:" + error);
            libs.countTextRemove(errorElem, 60);
            return false;
            case 404:
            errorElem.textContent = "404エラー:" + error
            console.error("404:" + error);
            libs.countTextRemove(errorElem, 60);
            return false;
            // 例外処理  
            default:
            errorElem.textContent = "例外エラー:" + error
            console.error("例外エラー：" + error);
            libs.countTextRemove(errorElem, 60);
            return {error: error.response}
      }
    });
    

    if (requestMethod === 'GET') {
      Axios.get(this.resourceAPIUrl + request.barcode)
        .then((response) => {
        // console.log(response.data);
          nameElem.value = response.data.lastname + response.data.firstname;
          codeElem.value = response.data.barcode;
      })
    }

    else if (requestMethod === 'POST') {
      Axios.post(this.recordAPIUrl,
      {
          barcode: request.barcode,
          date: request.date,
          decision: decision
      })
        .then((response) => {
          let data = response.data
          console.log(data);
          this.playSound(this.entryMusic);
          if (data.result === 'in_ok') {
            this.resultElem.textContent = data.name + "さんの入場データが登録されました。";
          } else {
            this.resultElem.textContent = "エラー：" + data.error;
          }
          this.removeMessage();
        })
    }
    else if (requestMethod === 'PUT') {
      Axios.put(this.recordAPIUrl,
      {
          barcode: request.barcode,
          date: request.date,
          decision: decision,
      })
        .then((response) => {
          let data = response.data
          console.log(data);
          this.playSound(this.exitMusic);
          if (data.result === 'out_ok') {
            this.resultElem.textContent = data.name + "さんの出場データが登録されました。";
          } else {
            this.resultElem.textContent = "エラー：" + data.error;
          }
          this.removeMessage();
        })
    }
  }

  removeMessage()
  {
    const libs = new Libs;
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
      this.clearTimeout = null;
    }
    this.clearTimeout = libs.countTextRemove(this.resultElem, 5);
  }
  
    playSound(sound) {
    if (sound) {
      let audio = new Audio(sound);
      audio.play();
    }
  }
}
