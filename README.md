# Meat Up Wakayama Official Site

和歌山市本町のピザバー「Meat Up（ミートアップ）」の公式シングルページサイトです。  
500円（税込550円）ピザ、平日ランチ、ディナー営業、予約導線、店舗情報、アクセスを1ページで確認できる構成にしています。

## 公開URL

- https://meatupwakayama.com/

## サイト概要

- 目的
  - 店舗の雰囲気・価格・営業時間を分かりやすく伝える
  - 食べログ予約、電話、Instagram、Googleマップへの導線を用意する
  - ランチ利用、仕事帰り、2軒目利用などの来店シーンを案内する
- 主な掲載内容
  - 500円（税込550円）ピザ
  - 平日ランチ
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
├─ CNAME
├─ css/
│   └─ styles.css
├─ js/
│   └─ main.js
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
4. 変更後はローカルで差分を確認し、問題なければコミットして `main` にpushします。

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
