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
  var i = 0;
  while(i <= 1){
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
  var list1 = [
    ['for', 'while', 'do'],
    ['if', 'else', 'which'],
    ['print', 'alert']
  ];
  var lista;
  var sbox = {};
  var count = 0;

  var btext = document.getElementById("auto").innerText;
  ctext = btext.split(/(\s|\(|\)|\;|\n)/);
//  console.log(ctext);

//str.split(',').forEach( function( value ) {

  for(let i = 0; i < list1.length; i++){
    for(let j = 0; j < list1[i].length; j++){
      for(let k = 0; k < ctext.length; k++){
        if(ctext[k] == list1[i][j]){
          sbox[count] = list1[i];
          lista = list1[i];
          console.log(lista);
          console.log(sbox);
          count += 1;
        }
      }
    }
  }

//  ctext = (String(ctext)).replace(/,/g, '');
//  console.log(ctext);
//  document.getElementById("auto").innerText = x;


  



  const jsSelectBox = document.querySelector(".js-selectbox");
  const selectWrap = document.createElement("div");
  selectWrap.classList.add("selectwrap");
  const select = document.createElement("select");
  select.classList.add("select");
//  lista.forEach((v) => {
  sbox[0].forEach((v) => {
    const option = document.createElement("option");
    option.textContent = v;
    select.appendChild(option);
  });
  selectWrap.appendChild(select);
  jsSelectBox.appendChild(selectWrap);
  
}




//dynamicname.html
function dn1() {
  if (!console) {
      console = {};
  }
  var old = console.log;
  var logger = document.getElementById('log');
  console.log = function (message) {
      if (typeof message == 'object') {
          logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
      } else {
          logger.innerHTML += message + '<br />';
      }
  }
};

function dn2(){
// 動的な変数名

var sbox={};
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