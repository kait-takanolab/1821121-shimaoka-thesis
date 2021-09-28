# 使いそうなプログラム群をおいておく場所
あるいはこれからやりたいことのメモも書きます

## ituka
toolboxを別ファイルで用意して読み込ませたい
→もっとindex.htmlの見た目をきれいにしたい

## 1
選択された結果からできたコードを実行できると理解がしやすい
エラーが発生するようなコードが選択肢に入ってほしい, またはほしくない場合もある

## リスクについて
evalにてコードを実行する以上悪意をもっていじると結構怖い

### 
作成されたコードから実行したい
一度Divなどにコードとして表示されているものを実行できると面白い
- textareaに保存したコードの実行はできそう?
    - eval(code)の形式でcode の内容にtextareaのvalueを読み込み実行すれば、ブラウザ上で実行できる？
    - （）一度BlocklyにおけるworkspaceToCOdeという関数を通したコードじゃないと実行できない？
        - コードがあってればそれは問題ない、あくまでブロックからコードに変換する関数
- evalという関数がJavascriptを実行する関数のため、他の言語の状態では実行できない
    - 他の言語を生成後、Javacriptに変換する方法を考える必要がある
    -
- evalよりJS-Interpreterによる実行が公式に推奨されている 

# url memo
Blockly for c
https://qiita.com/heyhachi/items/1b5c7e9b453c1246aa50

css
https://willcloud.jp/knowhow/whats_css/

selectboxの動的な値の生成
https://techacademy.jp/magazine/27133

動的なselectboxの生成？
https://pisuke-code.com/jquery-initialize-select-options/

selectboxの動的な生成
https://tsuchippo.com/programming-js-selectbox

appendchild
https://techacademy.jp/magazine/20820

blockly-toolbox, workspace
https://www.catch.jp/wiki/index.php?Blockly%2FToolbox_WorkSpace


#
Blocklyを用いた多言語プログラミング学習支援環境の構築
https://www.jsise.org/society/committee/2018/4th/TR-033-04-1B-002.pdf

demo
http://guppy.eng.kagawa-u.ac.jp/~kagawa/Members/Sano/