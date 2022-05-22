export class Libs
{
  /**
   * 暗号トークン作成
   * @returns {string}
   */
  createToken()
  {
    const N = 32;
    return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(N)))).substring(0,N)
  }

  getNowTime()
  {
    const date = new Date();
    return date.getTime();
  }

  /**
   * 時間の比較計算
   * @param {date} oldTime:現在日時と比較したい時間 
   * @returns {int}
   */
  getDiffTime(oldTime)
  {
    const date = new Date();
    const nowTime = date.getTime();
    const diffTime = nowTime - oldTime;
    return Math.floor(diffTime / (1000));
  }

  /**
   * 
   * @param {HTMLElement} elem 
   * @param {int} min 
   */
  countTextRemove(elem, min)
  {
    let count = min * 1000;
    let clearTimeOut = setTimeout(() => {
      elem.textContent = "";
    }, count);
    
    return clearTimeOut;
  }

  getTimer(mode)
  {
    const week = ['（日）', '（月）', '（火）', '（水）', '（木）',  '（金）', '（土）'] 
    
    //現在の日付・時刻を取得 
    let currentdate = new Date();

    if (mode === 'time') {
      // 現在の時刻
      return setInterval(zeroPadding(currentdate.getHours(), 2) + ':' + zeroPadding(currentdate.getMinutes(), 2) + ':' + zeroPadding(currentdate.getSeconds(), 2), 1000);
    }

    if (mode === 'date') {
      // 現在の年月日
      return setInterval(zeroPadding(currentdate.getFullYear(), 4) + '年' + zeroPadding(currentdate.getMonth() + 1, 2) + '月' + zeroPadding(currentdate.getDate(), 2) + '日' + week[currentdate.getDay()], 1000);
    }

    function zeroPadding(num, len) {
      let zero = '';

     // 0の文字列を作成
      for(var i = 0; i < len; i++) {
        zero += '0';
      }

     // zeroの文字列と、数字を結合し、後ろ２文字を返す
      return (zero + num).slice(-len);
    }
  }
}