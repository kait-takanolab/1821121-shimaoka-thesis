# Readme

## プログラム利用時

本プログラムでは Google Blockly を利用しています。 
また、本プログラムの利用にはnpmによるパッケージ管理をしています。

Windowsではnpmの利用にNode.jsを利用することが簡単です。
https://nodejs.org/ja/  

インストール後コマンドプロンプトにて  
*npm install*  
と入力することで、パッケージのインストールが自動で実行されます。

## プログラムに必要なファイル説明

- index.html
ブロックプログラミングになれる
プログラミング言語の雰囲気になれる
- index2.html
プログラミング言語になれる
- index3.html
xmlを保存するなど問題生成用

- main.css
画面構成のサイズや色などを設定するファイルです。
- test.js
Javascript のコードを書かれたファイルです。
- node_modules
Google Blocly を利用するためのモジュールフォルダです。

## 機能説明(2021/09/13 時点)

画面左上のボタンより説明しています。この機能説明に乗っていないボタンは現在利用できません。

### Blockly を操作するボタン

- ファイルを選択するボタン
各 PC 内の xml にて保存された Blockly のブロック情報を選択し、画面右上のエリアにコードを表示します。Python。
- checking answer
画面右上のエリアと画面右下のエリアに表示されたコードが一致しているかを判断します。
- Show Python
Blockly にて構成されたブロックから、Python のコードに変換し、画面上部よりポップアウトにて表示します。
- Run Python
Blockly にて構成されたブロックから、Python のコードに変換し、画面上部よりポップアウトにて、実行結果を表示します。
- Generate code Python
Blockly にて構成されたブロックから、Python のコードに変換し、画面右下に表示します。
- clear code
画面右下の空間のコードを削除します。
- question1
画面右上のコードが穴埋め状態の時、通常の表示にします。
- question2
画面右上のコードの情報の一部の表示を変換して、穴埋め状態にします。

### Blockly にて Block を利用するボタン
- Loops
繰り返しの命令ブロックを利用できます
- Math
数字情報を利用できます
- Text
文字情報を利用できます
- Lists
配列情報を利用できます
- Colour
色情報を利用できます
- Variables
変数情報を利用できます
- Functions
関数を作成できます
