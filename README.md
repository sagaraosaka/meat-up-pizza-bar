# ミート アップ | 500円ピザと一杯のピザバー LP

架空のピザバー「ミート アップ」のシングルページサイトです。  
2軒目・3軒目利用を想定した、500円ピザと1ドリンクがコンセプトの小さなバーをイメージしています。

## デモ

- GitHub Pages: https://sagaraosaka.github.io/meet-up-pizza-bar/

## サイト概要

- 目的：  
  - 店舗の雰囲気・コンセプトを伝える  
  - メニュー・アクセスをシンプルに確認できる
- 想定ユーザー：  
  - 2軒目・3軒目で軽く一杯飲みたい人  
  - 1人飲み・少人数での利用

## 使用技術

- HTML5
  - セクション構造（`header`, `main`, `section`, `footer` など）
- CSS3
  - モバイルファーストのレイアウト
  - CSS変数で色・余白・フォントを管理
  - レスポンシブ対応（768px〜でレイアウト調整）
- JavaScript
  - IntersectionObserver を使ったスクロール時フェードイン演出
  - コピーライト年号の自動更新
- フォント
  - ベース：システムフォント＋日本語（Noto Sans JP 想定）
  - 見出し：Playfair Display（Google Fonts）

## ディレクトリ構成

```txt
.
├─ index.html         # トップページ
├─ css/
│   └─ styles.css     # 全体のスタイル
├─ js/
│   └─ main.js        # フェードイン等の挙動
└─ img/
    ├─ hero.jpg       # ヒーロー画像
    ├─ pizza-*.jpg    # メニュー画像
    └─ ...            # その他画像
