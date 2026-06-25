# C&R Wine Intelligence (CWI)

> **읽는 분석으로 마시는 감성을 높이자**

와인 리서치·미디어 하우스. 2004년부터 이어 온 와인 아카이브 *Wineality*를 잇는 독립 사이트입니다.
[Chory & Rochet 주식 리서치](https://choryian.github.io/Stock_Report_Repo/)와는 별개의 독립 레포·브랜드입니다.

## 두 엔진

| 엔진 | 의미 | 폴더 |
|---|---|---|
| **읽는 분석** (Intelligence) | 데이터 기반 와인 시장·테루아 리서치 | `intelligence/` |
| **마시는 감성** (Wineality) | 시음·여행·에세이. Wine + Person**ality** | `wineality/` |

## 구조

```
CWI_Site/
├─ index.html              랜딩 (두 엔진 + 창간 글)
├─ assets/
│  └─ report-header.js     글 상단 공통 헤더 바 (cwi- 네임스페이스)
├─ data/
│  └─ reports.json         발행 목록 (향후 자동화용)
├─ intelligence/           읽는 분석 — 시장/테루아 리서치 보고서
│  └─ 2026-06-24-korea-wine-import-2026h1-review.html
└─ wineality/              마시는 감성 — 시음·에세이·여행
   ├─ 2017-11-14-lafon-rochet-first-love.html
   └─ images/
```

## 창간 콘텐츠 (2편)

1. **읽는 분석** — 「팬데믹 버블과 그 이후」 한국 와인수입 시장 10년 구조 분석·2026 상반기 리뷰
2. **마시는 감성** — 「와인은 이야기를 만들고 추억으로 마시는 술」 나의 첫 사랑, Château Lafon-Rochet

## 배포

GitHub Pages 정적 사이트 예정. 새 글 추가 시 해당 엔진 폴더에 HTML을 넣고 `data/reports.json`에 항목을 추가합니다.

---
© 2026 C&R Wine Intelligence · 미디어 마스트헤드 *Wineality*
