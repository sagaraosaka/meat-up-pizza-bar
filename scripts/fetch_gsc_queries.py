#!/usr/bin/env python3
"""
Google Search Console: 直近28日分のクエリ別データをCSV出力する。

使い方:
    python3 scripts/fetch_gsc_queries.py

認証情報の読み込み:
    - 環境変数 GSC_CREDENTIALS にサービスアカウントJSONの中身が
      入っていればそれを使う（GitHub Actions等CI向け）。
    - なければローカルの CREDENTIALS_PATH のファイルを読む。

出力:
    data/gsc_queries_YYYYMMDD_YYYYMMDD.csv
    (クエリ, クリック数, 表示回数, CTR, 平均掲載順位)
"""

import csv
import datetime
import json
import os

from google.oauth2 import service_account
from googleapiclient.discovery import build

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(REPO_ROOT, "data")
CREDENTIALS_PATH = os.path.expanduser(
    "~/Desktop/meatup-site-e6925dbd70a2.json"
)
SITE_URL = "sc-domain:meatupwakayama.com"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
ROW_LIMIT = 25000  # Search Analytics APIの1リクエスト上限


def get_credentials():
    raw = os.environ.get("GSC_CREDENTIALS")
    if raw:
        return service_account.Credentials.from_service_account_info(
            json.loads(raw), scopes=SCOPES
        )
    return service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH, scopes=SCOPES
    )


def fetch_query_data(service, site_url, start_date, end_date):
    rows = []
    start_row = 0
    while True:
        request = {
            "startDate": start_date,
            "endDate": end_date,
            "dimensions": ["query"],
            "rowLimit": ROW_LIMIT,
            "startRow": start_row,
        }
        response = (
            service.searchanalytics()
            .query(siteUrl=site_url, body=request)
            .execute()
        )
        batch = response.get("rows", [])
        rows.extend(batch)
        if len(batch) < ROW_LIMIT:
            break
        start_row += ROW_LIMIT
    return rows


def main():
    credentials = get_credentials()
    service = build("searchconsole", "v1", credentials=credentials)

    end_date = datetime.date.today() - datetime.timedelta(days=3)  # GSCデータは直近数日分反映が遅れるため
    start_date = end_date - datetime.timedelta(days=27)

    rows = fetch_query_data(
        service, SITE_URL, start_date.isoformat(), end_date.isoformat()
    )

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    output_path = os.path.join(
        OUTPUT_DIR,
        f"gsc_queries_{start_date.strftime('%Y%m%d')}_{end_date.strftime('%Y%m%d')}.csv",
    )

    with open(output_path, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerow(["クエリ", "クリック数", "表示回数", "CTR", "平均掲載順位"])
        for row in rows:
            query = row["keys"][0]
            clicks = row["clicks"]
            impressions = row["impressions"]
            ctr = row["ctr"]
            position = row["position"]
            writer.writerow(
                [
                    query,
                    clicks,
                    impressions,
                    f"{ctr:.4f}",
                    f"{position:.2f}",
                ]
            )

    print(f"{len(rows)}件のクエリデータを出力しました: {output_path}")


if __name__ == "__main__":
    main()
