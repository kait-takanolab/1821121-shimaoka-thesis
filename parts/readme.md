# 10/04
nodeのスライドはインストール方法など

評価基準を制定する
卒論にかける構成にする

問題をDBから読みとる
穴埋め問題を管理または自動生成

課題を明確にしたい


# 10/07
- タブスイッチのidを変更した（Taba,b,c　→　Question_area, output, test)
- 以前まで利用していたtextareaを破棄し、タブ切替できるDivを利用（コメントアウトしているだけ）
- iframeのテストをした、他のhtmlファイルの内容をそのまま流用できる（programm/index2.htmlのタブの中のtest参照）
- 一部Javascriptの中で、必要な関数がtextareaからDivに変更されたことでかわった。
    - value, innerHTML などを利用していた箇所が innerText に変更される箇所がある
    - まだすべてを置換していない
- Javascriptのコードを生成した際にエスケープ文字が代入されている問題を解決した
    - エスケープ文字自体は生成されてしまうので、コード生成後に置換することにした
    - もしかしたらもっと置換しなければいけないかもしれないため、要検証
- ブロックを触ると自動でoutputのコードが切り替わるようにした、現在はJavascript
- 現時点でのGUIについて
    - 画面左側にBlocklyを直接触るための箇所
    - 画面右側に問題文、Blockからの結果、テスト
    - 基本的には問題文と結果を切り替える？
- 実はスタートブロックとして用意してたif文などをワークスペースの選択肢として用意をしわすれてたことに気づいた
- 早めに用意する


# 
- Logic項目を用意し、Ifの利用が可能になった。
- If-elseはIfブロックを設置後、IFブロック内の歯車マークから選択ができる

- タブのQuestion, outputなどの範囲指定が雑に四角を作成しているだけのため、コードが伸びると枠からずれる

- Questionとtestが同時に選択、変更されるように変更した
    - 現在はローカル環境のファイルを選択してもらう形式→選択肢から選んでもらう形式に
    - 現時点で問題文となるxmlの書かれているtextファイルと生後判断のテストが用意されているhtmlファイルを同時に選べるようにしたい
    - ファイルの位置を同じフォルダに用意？
    - htmlファイルはiframeにて読み込めるが、textファイルの読み込みがなんでかうまくいかない
        試行：window.open, close
    - 複数記事を読んだ感じ、基本的にローカルに存在するHTMLファイルの動作によりファイルを読み込むことはセキュリティ面もあり制約が多い
    - file自体はローカルから読み取り、その内容からHTMLファイルは別でiframeの方式にすればいい？
        - questionjsに追記する形でiframe?
    - input からローカルファイルを選択し、Questionの欄にtest.txt, testの欄にtest.htmlを読み取ることができるようになった
    これによって、問題文となるtxtファイルとhtmlファイルの名前を統一して保存すれば、同時に切り替えられるようになった

# 使いそうなプログラム群をおいておく場所
あるいはこれからやりたいことのメモも書きます

- workspaceの内容が更新された際の行動について
workspace.addChangeLisner(function(){
    関数内容
});

- Javascriptの時に発見Don'tなどのシングルクォーテーションなどの直前にエスケープ文字が代入されている
いつか外すようにする
- DBに正解を保存しておき、正誤判別をする？
- 問題の選択肢についてどうするかを決めなきゃいけない
    - 完全に決まった選択肢が現れるようにする
    - 関連した選択肢が自動で選ばれるようにする
    - エラーが出る/出ない範囲で自動で選ばれるようにする
    - 上記のいずれにせよ、正誤判断以前に実行できると嬉しい
- スマホ対応したい
- 仮に生成している問題文（test.txt）の内容はxmlで書かれているので、これを直書きパターンも考えたい
    - 問題点
        - xmlに対応させている理由はBlocklyによるコードの変換はxml→高級言語のみ（自分が把握している方法）
        - つまり、複数の言語に対応するためには、複数言語の数用意しなければならない
        - コードからxmlに変換することが現在できない




kirikae.html
- タブ切り替えをする
index.html
- リアルタイム切り替え、あるいはボタンクリックによる切り替え
selectbox.html
- セレクトボックスを生成
test.html
- セレクトの結果から合否判定
tikan.html  
- 文字列の置換をする（現在は; に反応し、その後ろに改行コードを入力）
image.html
- ファイルから画像を選択して表示







## ituka
toolboxを別ファイルで用意して読み込ませたい
→もっとindex.htmlの見た目をきれいにしたい

## 1
選択された結果からできたコードを実行できると理解がしやすい
エラーが発生するようなコードが選択肢に入ってほしい, 
またはほしくない場合もある

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

###
- partsにて生成したセレクトボックスの生成を実装できるように、TextBoxを一つDivなどに変換したい
- ボタンを押すと問題文の表示する場所、ブロックから生成したコードを表示する場所などが切り替えられると、Div一つでいいかもしれない
- 変更するなら保存する場所をつくらないといけない
ーーーー
タブ切り替えが可能になった


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

div
https://www.ipentec.com/document/css-child-selector

iframe
https://gray-code.com/html_css/view-another-html-on-current-html/

#
Blocklyを用いた多言語プログラミング学習支援環境の構築
https://www.jsise.org/society/committee/2018/4th/TR-033-04-1B-002.pdf

demo
http://guppy.eng.kagawa-u.ac.jp/~kagawa/Members/Sano/