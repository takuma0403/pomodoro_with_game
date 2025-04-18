# pomodoro_with_game

## ゲーム付きポモドーロタイマーを作る
  - 25分作業 -> 5分ゲーム をサイクルする
  - ゲームは、短時間でスコアを稼ぐ系、ほのぼの系、にする
    - クイズ系など、次の25分に引きずらないものにする
  - 25分の作業開始時になんの作業をするかを書く
  - 25分間どのくらい集中していたかを評価するUIを5分休憩の前に表示する
    - できれば過去の集中記録みたいなのつけたい気持ちがある（バックエンド実装の話なのであくまでお気持ち）

## 環境構築手順
  
### 前提
  1. nodeJSのバージョンが21以上であること
  2. 開発OSがubuntuであること（windos, macでの開発動作未確認）
  
### 構築手順
  frontend

  1. リポジトリのクローン  
    <pre> ``` git clone git@github.com:takuma0403/pomodoro_with_game.git ``` </pre>
  2. ディレクトリ移動  
    <pre> ``` cd front ``` </pre>
  3. node_modules 構築  
    <pre> ``` npm install ``` </pre>
  4. サーバー起動  
    <pre> ``` npm run dev ``` </pre>

### デプロイ
  firebaseでデプロイ済み  
    -> mainブランチに変更があればgithub actionsで自動デプロイされる

  手動デプロイ
  ```bash
    npm run build
    firebase deploy
  ```

  デプロイ先リンク ->　https://game-with-pomodoro.web.app/

## 参考リンク
  - [DotGen.css - CSS Collection](https://bcrikko.github.io/css-collection/tool/dotgen/index.html)
  - [イワシロ音楽素材: ファミコン風BGM/SEリスト](https://iwashiro-sounds.work/)
