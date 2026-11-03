# Meat Up Wakayama Official Site

和歌山市本町のピザバー「Meat Up（ミートアップ）」の公式サイトです。  
500円（税込550円）ピザ、ディナー営業、予約導線、店舗情報、アクセスを確認できる、トップ・パーティー（`/party/`）・結婚式二次会（`/wedding-after-party/`）の3ページ構成にしています。

## 公開URL

- https://meatupwakayama.com/

## サイト概要

- 目的
  - 店舗の雰囲気・価格・営業時間を分かりやすく伝える
  - 食べログ予約、電話、Instagram、Googleマップへの導線を用意する
  - 仕事帰り、2軒目利用などの来店シーンを案内する
- 主な掲載内容
  - 500円（税込550円）ピザ
  - ドリンク
  - 店内ギャラリー
  - FAQ
  - 店舗情報
  - アクセス

## 使用技術

- HTML5
- CSS3
- JavaScript
- Google Fonts
- Google Analytics
- GitHub Pages

## ディレクトリ構成

```txt
.
├─ index.html
├─ party/
│   └─ index.html
├─ wedding-after-party/
│   └─ index.html
├─ CNAME
├─ sitemap.xml
├─ robots.txt
├─ favicon.ico
├─ css/
│   ├─ styles.css
│   └─ styles.min.css
├─ js/
│   ├─ analytics.js
│   └─ main.js
├─ scripts/
│   ├─ fetch_gsc_queries.py
│   ├─ requirements.txt
│   └─ screenshot.mjs
└─ img/
    ├─ hero-*.jpg / hero-*.webp
    ├─ pizza-*.jpg / pizza-*.webp
    ├─ gallery-*.jpg / gallery-*.webp
    └─ access-*.jpg / access-*.webp
```

## 運用メモ

- 予約リンクは食べログの店舗ページへ遷移します。
- 営業時間・価格・チャージ・喫煙可否など、店舗運用が変わった場合は `index.html` の該当セクションを更新します。
- 画像を追加する場合は、表示速度を考慮して圧縮やWebP化を検討します。

## 更新手順

1. `index.html` で店舗情報、メニュー、FAQ、予約リンクなどを更新します。
2. 見た目を調整する場合は `css/styles.css` を更新します。
3. 動きの変更が必要な場合は `js/main.js` を更新します。
4. `feature/説明` 形式のブランチを切り、変更後はローカルで差分を確認して問題なければコミットします。
5. ブランチをpushしてPRを作成し、PR経由で `main` にマージします（`main` への直接コミット・pushはしません）。

## 画像追加ルール

- サイトで使う画像は `img/` に置きます。
- 表示用画像はJPGだけでなく、WebP版も用意します。
- HTMLでは `<picture>` を使い、WebPを優先しつつJPGをフォールバックにします。
- OGP画像は `1200x630` を目安にし、ファイルサイズを軽く保ちます。
- 使わなくなった画像や `.DS_Store` はコミットしないようにします。

## デプロイ後の確認

- 本番URL: https://meatupwakayama.com/
- `canonical`、OGP、Twitter Cardが本番HTMLに出ているか確認します。
- ヒーロー背景、メニュー画像、ギャラリー画像、アクセス画像が表示されるか確認します。
- 食べログ予約、電話、Instagram、Googleマップのリンクを確認します。
- スマホ幅で固定CTAとナビゲーションの表示を確認します。
