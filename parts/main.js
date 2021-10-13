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
}


function match() {
  var list1 = [
    ['for', 'while', 'do'],
    ['if', 'else', 'which'],
    ['print', 'alert']
  ];
  var lista;

  var x = document.getElementById("auto").innerText;
  x = x.split(/(\s|\(|\)|\;|\n)/);
  console.log(x);

//str.split(',').forEach( function( value ) {

  for(let i = 0; i < list1.length; i++){
    for(let j = 0; j < list1[i].length; j++){
      for(let k = 0; k < x.length; k++){
        if(x[k] == list1[i][j]){
          console.log(x[k]);
          lista = list1[i];
          console.log(lista);
        }

      }
    }
  }

  x = (String(x)).replace(/,/g, '');
  console.log(x);
  document.getElementById("auto").innerText = x;



  const jsSelectBox = document.querySelector(".js-selectbox");
  const selectWrap = document.createElement("div");
  selectWrap.classList.add("selectwrap");
  const select = document.createElement("select");
  select.classList.add("select");
  lista.forEach((v) => {
    const option = document.createElement("option");
    option.textContent = v;
    select.appendChild(option);
  });
  selectWrap.appendChild(select);
  jsSelectBox.appendChild(selectWrap);
  
}