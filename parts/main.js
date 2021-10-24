//var select = document.getElementById('selectNum');
//select.onchange = getselect2();
var x = document.getElementById("loop.value");

//index.html

function getselect() {
  document.getElementById("box2").textContent =
    document.getElementById("selectNum").value;
}

function getselect2() {
  document.getElementById("box3").textContent =
    document.getElementById("selectNum").value;
}

// test.html

function hantei() {
  var count = 0;
  var z = document.getElementById("var").value;
  var x = document.getElementById("loop").value;
  var y = document.getElementById("end").value;

  //    var x = document.getElementById("loop");
  if (x == "no" || y == "no") {
    alert("選択してください");
  }
  if (x == "1") {
    count += 1;
  }
  if (y == "2") {
    count += 1;
  }
  if (z == "1" || z == "2") {
    count += 1;
  }

  console.log(z, x, y, count);
  document.getElementById("kekka").textContent = count + "問正解";
}

//test2.html

function hantei2() {
  var count = 0;
  var x = document.getElementById("q1").value;
  var y = document.getElementById("q2").value;
  var z = document.getElementById("q3").value;
  //    var x = document.getElementById("loop");
  if (x == "no" || y == "no" || z == "no") {
    alert("選択してください");
  }
  if (x == "1") {
    count += 1;
  }
  if (y == "1") {
    count += 1;
  }
  if (z == "2") {
    count += 1;
  }

  console.log(z, x, y, count);
  document.getElementById("kekka").textContent = count + "問正解";
}

// selectbox.html

function selectbox() {
  const animals = [
    { value: 1, name: "ゾウ" },
    { value: 2, name: "キリン" },
    { value: 3, name: "イルカ" },
    { value: 4, name: "ライオン" },
  ];
  console.log(animals);
  var i = 0;
  while (i <= 1) {
    const jsSelectBox = document.querySelector(".js-selectbox");
    const selectWrap = document.createElement("div");
    selectWrap.classList.add("selectwrap");
    const select = document.createElement("select");
    select.classList.add("select");
    animals.forEach((v) => {
      const option = document.createElement("option");
      option.value = v.value;
      option.textContent = v.name;
      select.appendChild(option);
    });
    selectWrap.appendChild(select);
    jsSelectBox.appendChild(selectWrap);
    i++;
  }
}

// auto match.html
function match() {
  //全選択肢となる部分　もしかしたらDBなどにいれこむかも
  var list1 = [
    ["for", "while", "do"],
    ["if", "else", "which"],
    ["print", "alert"],
  ];
  //ワードがマッチした場所を保存する
  var lista = [];
  //マッチしたワードを含む選択肢を保存する
  var sbox = [];
  //マッチしたワードを保存する
  var mbox = [];
  //何回ワードがマッチしたか保存する
  var count = 0;

  //
  var btext = document.getElementById("question_area").innerText;

  //文字列を配列に変更
  ctext = btext.split(/(\s|\(|\)|\;|\n)/);
  //  console.log(ctext);

  //問題とのマッチングループ

  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list1[i].length; j++) {
      for (let k = 0; k < ctext.length; k++) {
        if (ctext[k] == list1[i][j]) {
          sbox[count] = list1[i];
          mbox[count] = ctext[k];
          lista[count] = k;
          count += 1;

          console.log("mbox= " + mbox);
          console.log("k= " + k);
          console.log("lista=" + lista);
          console.log("sbox=");
          console.log(sbox);
        }
      }
    }
  }
  //lista.sort();
  //マッチしたワード部分を選択肢に変更
  for (let l = 0; l < lista.length; l++) {
    ctext[lista[l]] = `<select class="sele${l}"></select>`;
  }

  // 配列から文字列に変更して表示
  ctext = String(ctext).replace(/\n/g, "<br>");
  ctext = String(ctext).replace(/,/g, "");
  //console.log(ctext)
  document.getElementById("question_area").innerHTML = ctext;

  // ワードがマッチした場所に選択肢を生成する
  for (let m = 0; m < count; m++) {
    var select = document.querySelector(`select.sele${m}`);
    for (let n = 0; n < sbox[m].length; n++) {
      var option = document.createElement("option");
      option.innerText = sbox[m][n];

      //マッチしたワードと等しい箇所のValueをans その他を数字に変更
      if (sbox[m][n] != mbox[m]) option.value = n;
      else option.value = "ans";

      select.append(option);
    }
  }
}

function hantei_auto() {
  //正解数をカウントする
  var count = "0";
  //ループ回数をカウント
  var loop = "0";
  //セレクトボックスがいくつあるのかをカウント
  //セレクトボックスがなかったらBreak
  while (1) {
    var select = document.querySelector(`select.sele${loop}`);
    if (select != null) {
      //セレクトボックスのValueを入手（正解ならans, それ以外だと数字が返る）
      if (select.value == "ans") {
        //何問正解しているかを合計
        count++;
      }
    } else {
      break;
    }
    loop++;
  }

  //判定結果を表示
  document.getElementById("kekka").textContent = count + "問正解";
}

function kaeru() {
  var count = "0";
  var code = document.getElementById("question_area").innerHTML;
  code2 = code.split(/<select|<\/select>/);
  console.log(code2);

  for (let i = 0; i < code2.length; i++) {
    text = "sele" + count;
    console.log(text);
    if (code2[i].indexOf(text) == -1) {
      console.log(i);
    } else {
      var obj = document.querySelector(`select.sele${count}`);
      var idx = obj.selectedIndex;
      var txt = obj.options[idx].text;
      console.log(txt);
      code2[i] = txt;
      count++;
    }
  }
  code2 = String(code2).replace(/,/g, "");
  //  code2 = (String(code2)).replace(/\<br\>/g, '');
  console.log(code2);
  document.getElementById("kaeru").innerHTML = code2;
}

//dynamicname.html
function dn1() {
  if (!console) {
    console = {};
  }
  var old = console.log;
  var logger = document.getElementById("log");
  console.log = function (message) {
    if (typeof message == "object") {
      logger.innerHTML +=
        (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) +
        "<br />";
    } else {
      logger.innerHTML += message + "<br />";
    }
  };
}

function dn2() {
  // 動的な変数名

  var sbox = {};
  for (var i = 0; i < 5; i++) {
    sbox[i] = i;
  }

  // ログに出力
  console.log(sbox[0]);
  console.log(sbox[1]);
  console.log(sbox[2]);
  console.log(sbox[3]);
  console.log(sbox[4]);
}

//  indent.html

function indenttest() {
  //インデントに利用する変数
  var count = "0";
  var ind = "&nbsp;&nbsp;&nbsp;&nbsp;";
  var inc = '{';
  var dec = '}';
  var end = '<br>';

  //文字列を読み込み、改行コードで配列に保存
  var text = document.getElementById("idt").innerText;
  var text2 = text.split(/\n/);
  console.log(text2)


  //行数ループ
  for (let i = 0; i < text2.length; i++) {
    //インデントの数を減少
    if(text2[i].includes(dec)){
      count--;
      //      console.log(count);
    }
    
    //個数分インデント
    if (count > "0") {
      for(let j = 0; j < count; j++){
        text2[i] = ind + text2[i];
      }
    }
    
    
    //インデントの数を増加
    if (text2[i].includes(inc)) {
      count++;
      //      console.log(count);
    }
    
    text2[i] = text2[i] + end;
    console.log(text2[i])
  }
  text2 = String(text2).replace(/,/g, "");
  document.getElementById("idt").innerHTML = text2;
}