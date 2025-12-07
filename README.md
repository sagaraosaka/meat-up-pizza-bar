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

## 制作範囲

- コンセプト設計（500円ピザと1ドリンクの2軒目利用を想定）
- セクション構成設計（HERO / ABOUT / PIZZA / DRINK / SCENE / SHOP INFO / ACCESS / SNS）
- デザイン方針決め（色・余白・フォントのトーン）
- HTML / CSS / JavaScript コーディング
- Git / GitHub を用いたバージョン管理
- GitHub Pages への公開設定

## 使用ツール

- エディタ：Visual Studio Code
- バージョン管理：Git / GitHub
- 補助ツール：GitHub Copilot（CSS調整・レイアウト案の補完に使用）
- ホスティング：GitHub Pages

## 今後の拡張アイデア

- 実店舗オープン時を想定した、実データへの差し替え（住所・営業時間・席数・決済手段など）
- 予約・問い合わせ動線の追加（外部フォームサービスや予約サイトへのリンク）
- 画像の最適化（WebP対応、`loading="lazy"` を用いたパフォーマンス改善）
- WordPress テーマ化して、オーナーが自分でメニューや営業時間を更新できる構成への拡張
