//test

/*index.html内scriptで現在実行、画面左のworkspaceを表示、また初期値を表示

var demoWorkspace = Blockly.inject('blocklyDiv',
{media: 'https://unpkg.com/blockly/media/',
 toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
                       demoWorkspace);
*/

//問題文章用変数　
var q_code ="test";


//BlockをJavaScriptコードに変換して表示
function showCodeJS() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    code = code.replace('\\',"");
    alert(code);
}

//BlockをPythonコードに変換して表示
function showCodePy() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.Python.workspaceToCode(demoWorkspace);
    alert(code);
}

//JavaScriptコードに変換後実行
function runCodeJS() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
    testCode1();
}


function testCode1() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    //var code = document.getElementById('output').innerHTML;
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    document.getElementById("question_area").innerHTML = code;
}

function testCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    //var code = document.getElementById('output').innerHTML;
    var code = document.getElementById("output").value;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}



//Pythonコードに変換後実行
function runCodePy() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.Python.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.Python.workspaceToCode(demoWorkspace);
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

//BlockからPythonコードに変換
function generatepy() {
    // Generate JavaScript code and run it.
    try {
        window.LoopTrap = 1000;
        Blockly.Python.INFINITE_LOOP_TRAP =
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.Python.workspaceToCode(demoWorkspace);
        Blockly.Python.INFINITE_LOOP_TRAP = null;
    } catch (e) {
        alert(e);
        return;
    }
    document.getElementById('output').innerText = code;
}

//BlockからJavaScriptコードに変換
function generateJS() {
    // Generate JavaScript code and run it.
    try {
        window.LoopTrap = 1000;
        Blockly.Python.INFINITE_LOOP_TRAP =
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
        code = code.replace('\\',"");
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    } catch (e) {
        alert(e);
        return;
    }
    document.getElementById('output').innerText = code;
}

//txtファイルから例となるXMLを受け取り、JSコードに変換し表示
function questionjs() {
    var ele = document.getElementById('file'); // input要素オブジェクトの取得

    // ファイルが選択されたら引数の関数を実行
    ele.addEventListener("change", function (ev) {
        var file = ev.target.files;    // 選択されたファイルはFileListオブジェクトに入り、配列のように扱える
        var reader = new FileReader(); // FileReaderオブジェクトの生成
        reader.readAsText(file[0]);    // 選択されたファイル(fileの先頭要素）を文字列として読み込む

        // 読み込みが完了した際に実行される処理
        reader.onload = function (e) {
            var xmltext = reader.result;
            var xml = Blockly.Xml.textToDom(xmltext);
            var testWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(xml, testWorkspace);
            var code = Blockly.JavaScript.workspaceToCode(testWorkspace);
            code2 = code.replace('\\',"");
            document.getElementById('question_area').innerText = code;
            q_code = question_str(code);
        }

        //testタブにHTMLファイル
        var list = "";
        list += file[0].name;
        list = list.replace(".txt", ".html");
        document.getElementById('test').innerHTML = 
            "<iframe src= \"./question/" + list + "\" height=\"300\" width=\"50%\"></iframe>";
  
    }, false);
}
function questionjs2() {
    var ele = document.getElementById('file'); // input要素オブジェクトの取得

    // ファイルが選択されたら引数の関数を実行
    ele.addEventListener("change", function (ev) {
        var file = ev.target.files;    // 選択されたファイルはFileListオブジェクトに入り、配列のように扱える
        var reader = new FileReader(); // FileReaderオブジェクトの生成
        reader.readAsText(file[0]);    // 選択されたファイル(fileの先頭要素）を文字列として読み込む

        // 読み込みが完了した際に実行される処理
        reader.onload = function (e) {
            var xmltext = reader.result;
            var xml = Blockly.Xml.textToDom(xmltext);
            var testWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(xml, testWorkspace);
            var code = Blockly.JavaScript.workspaceToCode(testWorkspace);
//            code = code.replace('\\',"");
            document.getElementById('question_area').innerText = code;
            q_code = question_str(code);
         
            //testタブに文章のマッチング
            match(code);
        }
        
    }, false);
}


function match(code) {
    //全選択肢となる部分　もしかしたらDBなどにいれこむかも
    var list1 = [
      ['for', 'while', 'do'],
      ['if', 'else', 'which'],
      ['print', 'alert']
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
    var btext = code;
  
  //文字列を配列に変更
    ctext = btext.split(/(\s|\(|\)|\;|\.|\n)/);
  //  console.log(ctext);
  
  //問題とのマッチングループ
  
    for(let i = 0; i < list1.length; i++){
      for(let j = 0; j < list1[i].length; j++){
        for(let k = 0; k < ctext.length; k++){
          if(ctext[k] == list1[i][j]){
            sbox[count] = list1[i];
            mbox[count] = ctext[k];
            lista[count] = k;
            count += 1;
/*
            console.log("mbox= " + mbox)
            console.log("k= " + k);
            console.log("lista=" + lista);
            console.log("sbox=")
            console.log(sbox);
          */
            }
        }
      }
    }
    //selectboxのインデックスを文章登場順にするためにソート処理
    //lista.sort();
    console.log(lista)
    //マッチしたワード部分を選択肢に変更
    for(let l = 0; l <lista.length; l++){
      ctext[lista[l]] = `<select class="sele${l}"></select>`;
    }
  
  // 配列から文字列に変更して表示
    ctext = (String(ctext)).replace(/\n/g, '<br>');
    ctext = (String(ctext)).replace(/,/g, '');
//    console.log(ctext)
    document.getElementById("test").innerHTML = ctext;
  
  
  // ワードがマッチした場所に選択肢を生成する
      for(let m = 0; m < count; m++){
        var select = document.querySelector(`select.sele${m}`);
      for(let n=0; n < sbox[m].length; n++){
        var option = document.createElement('option');
        option.innerText = sbox[m][n];
        console.log(sbox[m][n])
        if(sbox[m][n] != mbox[m])
          option.value = n;
        else 
          option.value = "ans";
  
        select.append(option);
      }
    }
  }

//        document.getElementById('test').innerHTML = 
//               "<iframe src= \"./question/" + list + " height=\"300\" width=\"50%\"></iframe>";
  

//iframe test
function test1(){
    var fileList = document.getElementById("files").files;
    var list = "";
    for(var i=0; i<fileList.length; i++){
    list += fileList[i].name + "<br>";
    }
    document.getElementById("test").innerText = list;
//    document.getElementById('test').innerHTML = 
//        "<iframe src= \"./question/test1.html\" height=\"300\" width=\"50%\"></iframe>";
}


//回答の言語を変換したい(作成中)
function change() {
    const changeLang = document.querySelector('language');
    changeLang.addEventListener('change', (event) => {
        const result = a;
    })
}

//選択されたテキストと、生成したコードが完全一致ならばyes
function answer() {
    var code1 = document.getElementById("question_area").textContent;
    //code1 = code1.replace(',','');
    var code2 = document.getElementById("output").textContent;
    if (code1 == code2) {
        document.getElementById("answer").innerText = "yes";
    } else {
        document.getElementById("answer").innerText = "no";
    }
}

function answer2(){
      //正解数をカウントする
  var count = "0";
  //ループ回数をカウント
  var loop ="0";
  //セレクトボックスがいくつあるのかをカウント
  //セレクトボックスがなかったらBreak
  while(1){
    var select = document.querySelector(`select.sele${loop}`);
    if(select != null){
      //セレクトボックスのValueを入手（正解ならans, それ以外だと数字が返る）
      if(select.value == "ans"){
        //何問正解しているかを合計
        count++;
      }
    }else{
      break;
    }
    loop++;
  }

  //判定結果を表示
  document.getElementById("answer").textContent = count + "問正解";
}




//xmlを保存する関数　未完成
function saveBlocks() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    // do whatever you want to this xml
}

//xmlを保存する関数　未完成
function loadBlock(xml) { // xml is the same block xml you stored
    if (typeof xml != "string" || xml.length < 5) {
        return false;
    }
    try {
        var dom = Blockly.Xml.textToDom(xml);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
        return true;
    } catch (e) {
        return false;
    }
}

//文字列を配列に変換
function stringsinarray() {
//    var k = /[ \n]/g; //正規表現, 半角スペースと改行を含む場合
    var question = q_code;
    var que_ary = [];
    que_ary = question.split(" ");
//    document.getElementById('output').innerHTML = que_ary;
    return que_ary;
}

//配列から文字列に変換
function join_str(code) {
    code = code.join(' ');
    return code;
}

//整数の疑似乱数の生成
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//穴あき個所を作成する関数
function anaaki(code){
    code[getRandomInt(code.length)] = "[ question ]";
    return code
}

/*配列から穴埋めを作成する,sitai
現在の問題点：
    現在半角スペースを区切り文字として文字列を配列に変換している関係上、改行では区切られない
    →例えばelse:などの次に改行し、次の行で書き始めた最後の単語までを一つとして分かれている
    →改行を区切り文字として含めるとインデントが消える
    print()のように関数が含まれる場合に、print("hello world")の”print("hello”までを単語として認識している
    →穴埋めを生成するにあたって、()などを認識して区切りたい
    →（）は配列（文章）に残しておきたい
*/
function make_question() {
    que_ary = stringsinarray(); //文字列を配列に変換する関数を呼び出し

    //配列のランダムな位置の単語をを入れ替え, 複数回実行すれば複数個所を変換
//    que_ary[getRandomInt(que_ary.length)] = "[ question ]";
    que_ary = anaaki(que_ary);

    que_ary = join_str(que_ary); //配列を文字列に変換する関数を呼び出し
    document.getElementById('question_area').innerHTML = que_ary; //結果を表示
//    document.getElementById('output').innerHTML = q_code;
}

//question1 問題文を隠していない元の形に戻す
function que_area_back(){
    document.getElementById('question_area').innerHTML = q_code;
}

//問題文の内容を保存する関数
function question_str(code){
    q_code = code;
    return q_code;
}




function jsrunque() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = document.getElementById("question_area").innerText;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }

}
function jsrunout() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = document.getElementById("output").innerText;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }

}
function jsruntst() {
    var count = 0;
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = document.getElementById("test").innerHTML;
    code2 = code.split(/<select|<\/select>/);
    console.log(code2)
    
    
    for (let i = 0; i < code2.length; i++) {
//      text = "sele" + count;
//      console.log(text)
      if(code2[i].indexOf("sele") == -1){
//        console.log(i)
      }else{
          while(1){
                if(code2[i].indexOf(`sele${count}`) != -1){
                    break;
                }else{
                    count++;
                }
          }
        var obj = document.querySelector(`select.sele${count}`);
        var idx = obj.selectedIndex;
        var txt = obj.options[idx].text;
//        console.log(txt);
        code2[i] = txt;
        count = 0;
      }
    }
    code2 = (String(code2)).replace(/,/g, '');
    code2 = (String(code2)).replace(/\<br\>/g, '');


    console.log(code2)
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code2);
    } catch (e) {
        alert(e);
    }

}