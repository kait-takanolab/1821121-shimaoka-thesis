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
var strcode = "test";

//コードの実行 (Function)
function execution(code){
    kaitouran();
    Function(code)();
}

//
function kaitouran(){
    document.getElementById("kaitou").textContent = "";
}


/*

index.html
ブロックになれる
利用する名称：
- demoworkspace
- output

*/
function jsruncode(){
        // Generate JavaScript code and run it.
        window.LoopTrap = 10000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP =
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = document.getElementById("outcode").innerText;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        try {
            execution(code);
        } catch (e) {
            document.getElementById('kaitou').textContent = e;
        }
}


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
            string = xmltext.split('@@');
            var xml = Blockly.Xml.textToDom(string[0]);
            var testWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(xml, testWorkspace);
            Blockly.Xml.domToWorkspace(xml, demoWorkspace);
            var code = Blockly.JavaScript.workspaceToCode(testWorkspace);
//            code = code.replace('\\',"");
            document.getElementById('output').innerHTML = indent(code);
            document.getElementById('mondai').innerHTML = string[1];
            q_code = question_str(code);
            strcode = string;
        }
    }, false);
}

//誤答した解答の説明を加える
function gotou(kaisetu){
    var hyouka ="";
    //kaisetu[].lengthの回数ループする
    if(kaisetu.length != 0){
        hyouka += "間違いの解説：\n"
    }
    for(var i = 0; i < kaisetu.length; i++){
        if(kaisetu[i] != null){
            hyouka += kaisetu[i][0];
        switch(kaisetu[i][1]){
            case "<":
                hyouka += "問目：a < b の場合、bの値を含まないbより小さい値をaがとっている場合に使うよ！\n";
                break;
            case "<=":
                hyouka += "問目：a <= bの場合、bの値を含むbより小さい値をaがとっている場合に使うよ！\n";
                break;
            case ">":
                hyouka += "問目：a > b の場合、bの値を含まないbより大きい値をaがとっている場合に使うよ！\n";
                break;
            case ">=":
                hyouka +=  "問目：a >= bの場合、bの値を含むnより大きい値をaがとっている場合に使うよ！\n";
                break;
            case "==":
                hyouka += "問目：a == bの場合、aの値とbの値は等しい場合に使うよ！\n";
                break;
            case "!=":
                hyouka += "問目：a != bの場合、aの値とbの値は異なる場合に使うよ！\n";
                break;
            case "+=":
                hyouka += "問目：a += bの場合、aの値にbの値を挿入する場合に使うよ！\n";
                break;
            case "for":
                hyouka += "問目：for とは条件によるループを作成する予約語だよ!\nfor(i = 1; i_inc >= 0 ? i < 10 : i > 10; i += i_inc){\n}\nfor(i=0;i<10;i++){\n}\n";
                break;
            case "while":
                hyouka += "問目：while とは条件によるループを作成する予約語だよ!\nwhile(i != 1){}\n";
                break;
            case "do":
                hyouka += "問目：do とは条件によるループを作成する予約語だよ!\ndo{\n}while(i != 1);\n";
                break;
            case "if":
                hyouka += "問目：if とは条件によって実行するかをきめる予約語だよ！\nif(a == b){}\n";
                break;
            case "else":
                hyouka += "問目：else は単体で利用せずifで条件に当てはまらない場合の分岐を増やすために利用するよ！\nif(a == b){\n}else if(a == c){\n}else{}\n";
                break;
            case "switch":
                hyouka += "問目：switch とは条件分岐をきめるための予約語だよ！\nswitch(i){\n    case 1:\n        処理1;\n        break;\n    case 2:\n        処理2;\n        break;\n    default: \n        処理3;\n}\n";
                break;
            case "break":
                hyouka += "問目：break とはループを途中で抜けるための予約語だよ！\n";
                break;
            case "continue":
                hyouka += "問目：continue とはループの処理を一度スキップするための予約語だよ！\n";
                break;
            default:
                hyouka +=  "問目:は正解"
                break;
        }
    }
    }
        return hyouka;
}



//評価を行うcheck2(),answer2()を同時に実行し結果をどうたら　test.html
function saiten(){
    var hyouka1 = "";
    var hyouka2 = "";
    var {hyouka1,kaisetu} = answer2();
    hyouka2 = check2();
    hyouka3 = gotou(kaisetu);
    if(hyouka2 != "実行結果を表示します"){
        document.getElementById("answer").textContent = hyouka1 + "\n" + hyouka3 + "\n";
    }else{
        document.getElementById("answer").textContent = hyouka1 + "\n" + hyouka3 + "\n" + hyouka2;
    }
}

//check2 index.html
function check(){
    var hyouka = "";
    hyouka = check2();
    document.getElementById("answer").textContent = hyouka;
}


//コードによる整合性の
function check2(){
    var code1 = document.getElementById('kaitou').textContent;
    var code2 = strcode[2];
    var hyouka = document.getElementById("answer").textContent;
    if(code1 == code2){
        hyouka = "実行結果は正しい";
    }else{
        if(strcode[3]=="num"){
            hyouka = numq(code1,code2);
        }else{
            var hyouka = "実行結果は間違い\n";
        }
    }
    return hyouka;
}

//複数表示する問題の場合
function numq(code1,code2){
    hyouka = "";
    c1 = code1.split(/\s|\n/g);
    c2 = code2.split(/\s|\n/g);

    if(c1.length != c2.length){
        hyouka += "回答に誤りがあります\n"
        if(c1.length > c2.length){
            hyouka += "回答が過分に存在します\n"
        }else{
            hyouka += "回答が不足しています\n"
        }
    }

    for(var i=0; i < c2.length; i++){
        if(c1[i] != c2[i]){
            hyouka += i+1 + "個目の回答は間違い\n"
        }
    }

    if(c2.length < c1.length){
        hyouka += c2.length + "以降の回答がある場合間違い\n"
    }

    if(hyouka != ""){
        return hyouka;
    }else{
        return "実行結果は正しい";
    }
}

//実行結果が２種類存在する場合？
function twice(code1,code2){
    //変数の準備
    var hyouka = "";
    var h = 0;
    c2 = code2.split(',');

    //解答と答えの比較
    if(code1==c2[0]){
        h = 1;
    }
    if(code1==c2[1]){
        h = 2;
    }

    //正誤の判断
    switch(h){
        case 1://条件分岐が正しい場合の実行結果と比較
            hyouka += "実行結果１と一致";
            break;
        case 2://条件分岐は誤りの場合の実行結果と比較
            hyouka += "実行結果２と一致";
            break;
        default://結果は誤り
            hyouka += "誤り";
            break;
    }

    //結果をリターン
    if(hyouka != ""){
        return hyouka;
    }else{
        return "実行結果は正しい";
    }
}



/*

test.html
正誤問題の生成、ブロックでの判別、コード実行など
利用する名称：
- demoworkspace
- question_area
- output
- test
- sele$[n]
*/

//BlockからJavaScriptコードに変換
function generateJS() {
    // Generate JavaScript code and run it.
    try {
        window.LoopTrap = 10000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
//        code = code.replace('\\',"");
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    } catch (e) {
        document.getElementById('kaitou').textContent = e;
        return;
    }
    document.getElementById('output').innerHTML = indent(code);
//    document.getElementById('output').innerHTML = (sengen(document.getElementById('output').innerText))
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
            string = xmltext.split('@@');
            var xml = Blockly.Xml.textToDom(string[0]);
            var testWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(xml, demoWorkspace);
            Blockly.Xml.domToWorkspace(xml, testWorkspace);
            var code = Blockly.JavaScript.workspaceToCode(testWorkspace);
//            code = code.replace('\\',"");
//            document.getElementById('question_area').innerHTML = indent(code);
            document.getElementById('mondai').innerHTML = string[1];
            q_code = question_str(code);
            strcode = string;
            //testタブに文章のマッチング
            match(code,3,1);
        }
        
    }, false);
}


//test問題制作 難易度設定 
function easy(){
    var code = q_code;
    match(code,3,1);
}
function normal(){
    var code = q_code;
    match(code,6,1);
}
function hard(){
    var code = q_code;
    match(code,3,2);
}


//ランダム生成 max: int
function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1+1));
}

//ランダムで並び替える  list2[i].length? 基本は3 :0,1,2
function getRandomList(array){
    for(var i = (array.length - 1); 0 < i; i--){

        // 0〜(i+1)の範囲で値を取得
        var r = Math.floor(Math.random() * (i + 1));
    
        // 要素の並び替えを実行
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
      return array;
    }


//test問題のマッチングなど 呼び出しのコードから問題を生成し、モードの値だけ問題を生成する。
//code : string, mode : int
function match(code,mode,level) {
    //全選択肢となる部分　もしかしたらDBなどにいれこむかも
    var list1 = [
        ['<','>','<=','>=','==','!='],
        ["+","-","*","/","%"],
        ['for', 'while', 'do'],
        ['if', 'else', 'switch'],
        ['break','continue'],
        ['true','false'],
        ['?',':'],
        ['sqrt','abs','log','exp','pow'],
        ['sin','cos','tan'],
        ['asin','acos','atan','atan2'],
        ['PI','E'],
        ['round','ceil','floor','random'],
        ['length','indexOf','charAt','slice'],
        ['toUpperCase','toLowerCase','textToTitleCase'],
        ['trim','replace','split'],
        ['textCount','textReplace'],
        ['alert','prompt','print'],
        ['sort','reverse','length'],
//        ['var','const','let'],
        ['function','return'],
        ['=','==','+=','-=']
    ];

    //ワードがマッチした場所を保存する
    var lista = []; 
    //マッチしたワードを含む選択肢を保存する
    var sbox = [];
    //マッチしたワードを保存する
    var mbox = [];
    //何回ワードがマッチしたか保存する
    var count = 0;
    //選択肢になるリスト
    var qbox = [];
    //?
    var btext = code;

    btext = btext.replace(/,/g,"!exchange")


  
  //文字列を配列に変更
    ctext = btext.split(/(\s|\(|\)|\;|\.|\n)/);
  
  //問題とのマッチングループ
  
    for(let i = 0; i < list1.length; i++){
      for(let j = 0; j < list1[i].length; j++){
        for(let k = 0; k < ctext.length; k++){
          if(ctext[k] == list1[i][j]){
            sbox[count] = list1[i];
            mbox[count] = ctext[k];
            lista[count] = k;
            count += 1;
            }
        }
      }
    }

    if(mode > count) {
        mode = count;
    }

    //選択肢に変更する個数と変更する箇所を設定する mode,lista
    for(var q = 0; q < mode; q++){
        while(true){
            var tmp = getRandomInt(count);
            if(!qbox.includes(tmp)){
                qbox.push(tmp);
                break;
            }
        }
    }

    //問題数の順番を上から順番になるようにソートする
    for(var i=0;i<qbox.length;i++){
        for(var j=0;j < qbox.length;j++){
            if(lista[qbox[i]] < lista[qbox[j]]){
                var tmp = qbox[i]
                qbox[i] = qbox[j]
                qbox[j] = tmp
            }
        }
    }

    //マッチしたワード部分を選択肢に変更
    for(let l = 0; l < qbox.length; l++){
      ctext[lista[qbox[l]]] = `<select class="sele${l}"></select>`;
    }
  
    // 配列から文字列に変更して表示

    ctext = (String(ctext)).replace(/\n/g, '<br>');
    ctext = (String(ctext)).replace(/,/g, '');
    ctext = (String(ctext)).replace(/!exchange/g, ',');
    
//    console.log("2:  "+ctext)
    //文字列を表示する
    code = indent(ctext);


    document.getElementById("test").innerHTML = code;

    
    if(level == 2){
        //level2用にlist2を作成
        var list2 = new Array(3);
        var z=-1;
        for(let y = 0; y < 3; y++) {
            list2[y] = new Array(3).fill(0);
        }
        //正答をリストに入力
        for(i=0;i<qbox.length;i++){
            list2[i][0] = mbox[qbox[i]];
        }
        //誤答をリストに入力
        for(i=0;i<qbox.length;i++){
            for(j=1;j<3;j++){
                
                do{
                    //ランダムに選択肢から抽出
                    x = getRandomInt(list1.length);
                    y = getRandomInt(list1[x].length);
                    tmp = list1[x][y];
                    //同じ問題に選ばれるリスト内でかぶりがあるかをチェック
                    for(k=0;k<list2[i].length;k++){
                        //選ばれたワードとリストにあるワードが一致した場合場所を記憶
                        if(tmp == list2[i][k]){
                            z=k;
                            break;
                        }
                        //選ばれたワードと過去に一致した箇所のワードが不一致になれば解消したと判断
                        if(tmp != list2[i][z]){
                            z=-1;
                        }
                    }
                }while(z>=0);
                z=-1;
                list2[i][j] = tmp;
            }
        }

        //選択肢の順番を変更するようにする
        for(i=0;i<list2.length;i++){
            list2[i] = getRandomList(list2[i]);
        }

        //level2　中級者向けに異なるカテゴリーが問題として提示される 
        for(let m = 0; m < qbox.length; m++){
            var select = document.querySelector(`select.sele${m}`);
            for(let n = 0; n < list2[m].length; n++){
                var option = document.createElement('option');
                option.innerText = list2[m][n];
                if(list2[m][n] != mbox[qbox[m]])
                    option.value = n;
                else 
                    option.value = "ans";
    
                select.append(option);
          }
        }
    }else{
        //level1 ワードがマッチした場所に選択肢を生成する(同じカテゴリー)
            for(let m = 0; m < qbox.length; m++){
              var select = document.querySelector(`select.sele${m}`);
              for(let n = 0; n < sbox[qbox[m]].length; n++){
                  var option = document.createElement('option');
                  option.innerText = sbox[qbox[m]][n];
                  if(sbox[qbox[m]][n] != mbox[qbox[m]])
                      option.value = n;
                  else 
                      option.value = "ans";
      
                  select.append(option);
            }
          }
    }
}







/*
    answer2
    <textarea id="structure" readonly></textarea> <!--コードの構造上の正しさ -->
    <textarea id="consistency" readonly></textarea> <!--問題の整合性の評価 -->
    <textarea id="answer" readonly></textarea> <!--問題の正答数 -->
*/

function answer2(){
    //正解数をカウントする
    var count = 0;
    //ループ回数（問題数）をカウント
    var loop = 0;
    //正解した問題番号を保存する
    var kotae =[];
    //選ばれた解答を保存したい
    var ans = [];
    //セレクトボックスがいくつあるのかをカウント
    //セレクトボックスがなかったらBreak
    while(1){
    var select = document.querySelector(`select.sele${loop}`);
    if(select != null){
      //セレクトボックスのValueを入手（正解ならans, それ以外だと数字が返る）
      idx = select.selectedIndex;
      if(select.options[idx].value == "ans"){
        //何問正解しているかを合計
        kotae[count] =  loop+1 +"問目";
        count++;
      }else{
        ans[loop] = [loop+1,select.options[idx].text];
      }
    }else{
      break;
    }
    loop++;
  }

  //判定結果を表示
  return {
      hyouka1: count + "問正解!\n正解した問題は:" + kotae,
      kaisetu: ans
    };
}


function jsrunque() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 10000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = document.getElementById("question_area").innerText;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        execution(code);
    } catch (e) {
        document.getElementById('kaitou').textContent = e;
    }
}

function jsrunout() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 10000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = document.getElementById("output").innerText;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        execution(code);
    } catch (e) {
        document.getElementById('kaitou').textContent = e;
    }
}

function jsruntst() {
    var count = 0;

    window.LoopTrap = 10000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = document.getElementById("test").innerHTML;
    code2 = code.split(/<select|<\/select>/);

    
    
    for (let i = 0; i < code2.length; i++) {
      if(code2[i].indexOf("sele") == -1){
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
        code2[i] = txt;
        count = 0; 
        }
    }
    code2 = code2.join('');
    //code2 = (String(code2)).replace(/,/g, '');
    code2 = (String(code2)).replace(/\<br\>/g, '');
    code2 = (String(code2)).replace(/&nbsp;/g, '');
    code2 = (String(code2)).replace(/&gt;/g, '>');
    code2 = (String(code2)).replace(/&lt;/g, '<');
    code2 = (String(code2)).replace(/;/g, ';\n');
    code2 = (String(code2)).replace(/{/g, '{\n');
    code2 = (String(code2)).replace(/}/g, '}\n');

    //console.log(code2);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        execution(code2);
        hyouka = check2();
    }catch (e) {
        document.getElementById('kaitou').textContent = e;
        hyouka = "\n実行結果はエラー!"
    }
    document.getElementById("answer").textContent += hyouka; 
}



//問題文の内容を保存する関数　code:string
function question_str(code){
    q_code = code;
    return q_code;
}


//indent code:string

function indent(code) {
    //インデントに利用する変数
    var count = "0";
    var ind = "&nbsp;&nbsp;&nbsp;&nbsp;";
    var inc = '{';
    var dec = '}';
    var end = '<br>';
  
    //文字列を読み込み、改行コードで配列に保存
    var text = code;
    var text2 = text.split(/\n|<br>/);
    
    
    //行数ループ
    for (let i = 0; i < text2.length; i++) {

        //コンマを一度置換しておき、あとで直します。
        var result = text2[i].indexOf(',');
        do{
            text2[i] = text2[i].replace(",", "!exchange")
            result = text2[i].indexOf(',', result)
        }while(result != -1)


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
        
        if(i != text2.length -1){
            text2[i] = text2[i] + end;
        }
    }
    
    code = text2.join();
    code = code.replace(/,/g, "");
    code = code.replace(/!exchange/g, ",");
    return code;
}



function sengen(code){
    var code2 = code.split(" ");
    if(code2[0] == "var"){
        var code3 = code.split(";");
        code3[0] = code3[0].replace(/\s/g,",");
        code3[0] = code3[0].replace(","," ");
        code3 = code3.join(";");
        code = code3;
    }
    return code;
}



/*

index3.html
利用する名称：
- area

*/

//xmlを表示する
function look(){
    var code = Blockly.Xml.workspaceToDom(demoWorkspace);
    var codexml = Blockly.Xml.domToText(code);
    document.getElementById('area').textContent = codexml;
}

//xmlをファイルに保存する
function save() {
    // テキストエリアより文字列を取得
    const txt = document.getElementById("area").value;
    if (!txt) {
        return;
}

    // 文字列をBlob化
    const blob = new Blob([txt], { type: "text/plain" });

    // ダウンロード用のaタグ生成
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "question/sample.txt";
    a.click();
}

//改行を加える code: string
function look_plus(code){
    code2 = code.split(/(?<=\>|\?=\<)/g);
    code2 = code2.join('\n');
    return code2;
}







/*
memoと使わなくなった関数
//関数宣言が存在する場合に，をつける code:string


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

//回答の言語を変換したい(作成中)
function change() {
    const changeLang = document.querySelector('language');
    changeLang.addEventListener('change', (event) => {
        const result = a;
    })
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
//配列から穴埋めを作成する,sitai
現在の問題点：
    現在半角スペースを区切り文字として文字列を配列に変換している関係上、改行では区切られない
    →例えばelse:などの次に改行し、次の行で書き始めた最後の単語までを一つとして分かれている
    →改行を区切り文字として含めるとインデントが消える
    print()のように関数が含まれる場合に、print("hello world")の”print("hello”までを単語として認識している
    →穴埋めを生成するにあたって、()などを認識して区切りたい
    →（）は配列（文章）に残しておきたい
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
    

*/


