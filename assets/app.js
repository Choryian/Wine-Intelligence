/* C&R Wine Intelligence — 공통 렌더 엔진
 * 단일 진실원천: data/reports.json
 * - 랜딩:  <div class="report-grid" data-feed="intelligence" data-limit="3"></div>
 *          <div class="promo-grid" data-events></div>
 * - 아카이브: <div data-archive="intelligence"> (필터·검색 자동 생성)
 * 페이지는 <body data-root="./"> 또는 "../" 로 루트 경로를 알려준다. */
(function () {
  'use strict';
  var ROOT = (document.body && document.body.dataset.root) || './';
  var DATA_URL = ROOT + 'data/reports.json';

  // 시리즈 코드 → 한글 라벨
  var SERIES_LABEL = {
    market: '시장 보고서', terroir: '정보지', essay: '에세이',
    tasting: '시음노트', journey: '여행기', pairing: '페어링'
  };
  // 함께하는 와인 빈 상태(Coming Soon) 컨셉 박스
  var CELLAR_SOON = [
    { t: '시음회 · 와인 행사', d: '국내 와인 사이트·수입사를 살펴, 관심 갖고 참여할 만한 시음회·와인 행사 소식을 격주로 전합니다.' },
    { t: '할인 와인 추천', d: '지금 할인하는 와인 중 함께 나누기 좋은 가성비 한 병을 격주로 골라 추천합니다.' },
    { t: '추천 와인 공유', d: '누구와, 어떤 자리에서 열면 좋을지 — 개인적으로 추천하는 와인 한 병을 소개합니다.' }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function todayStr() {
    var d = new Date(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }
  function byDateDesc(a, b) { return String(b.date || '').localeCompare(String(a.date || '')); }
  function byDateAsc(a, b) { return String(a.date || '').localeCompare(String(b.date || '')); }

  function cardHTML(r) {
    var href = ROOT + r.path;
    var photo = r.image ? '<div class="photo" style="background-image:url(\'' + ROOT + esc(r.image) + '\')"></div>' : '';
    var catCls = r.engine === 'wineality' ? 'cat wine' : 'cat';
    var isNew = r.date === todayStr() ? '<span class="newbadge">NEW</span>' : '';
    var tags = (r.tags || []).slice(0, 4).map(function (t) { return '<span class="ctag">#' + esc(t) + '</span>'; }).join('');
    return '<a class="card" href="' + esc(href) + '">' + photo +
      '<div class="body">' +
        '<div class="cmeta"><span class="' + catCls + '">' + esc(r.category || '') + '</span>' +
        '<span>' + esc(r.date || '') + '</span>' + isNew + '</div>' +
        '<h3 class="ctitle">' + esc(r.title || '제목 없음') + '</h3>' +
        '<p class="csub">' + esc(r.summary || '') + '</p>' +
        (tags ? '<div class="ctags">' + tags + '</div>' : '') +
        '<div class="more">자세히 →</div>' +
      '</div></a>';
  }

  function comingHTML() {
    return CELLAR_SOON.map(function (c) {
      return '<div class="promo coming"><span class="ptype">' + esc(c.t) + '</span>' +
        '<p class="cdesc">' + esc(c.d) + '</p><span class="soon">Coming Soon!</span></div>';
    }).join('');
  }
  function eventHTML(e) {
    var pick = e.kind === 'pick' || e.kind === 'deal';
    var meta = '';
    if (e.date) meta += '<p class="pmeta"><span class="k">일시</span>' + esc(e.date) + (e.time ? ' ' + esc(e.time) : '') + '</p>';
    if (e.place) meta += '<p class="pmeta"><span class="k">장소</span>' + esc(e.place) + '</p>';
    if (e.price) meta += '<p class="pmeta"><span class="k">가격</span>' + esc(e.price) + '</p>';
    if (e.pairing) meta += '<p class="pmeta"><span class="k">페어링</span>' + esc(e.pairing) + '</p>';
    var tag = e.link ? '<a class="promo" href="' + esc(e.link) + '">' : '<div class="promo">';
    var end = e.link ? '</a>' : '</div>';
    return tag + '<span class="ptype' + (pick ? ' pick' : '') + '">' + esc(e.type || e.kind || '') + '</span>' +
      '<h3 class="ptitle">' + esc(e.title || '') + '</h3>' + meta +
      (e.desc ? '<p class="pdesc">' + esc(e.desc) + '</p>' : '') +
      (e.cta ? '<span class="cta">' + esc(e.cta) + ' →</span>' : '') + end;
  }

  function renderFeeds(reports) {
    document.querySelectorAll('[data-feed]').forEach(function (el) {
      var engine = el.dataset.feed;
      var limit = parseInt(el.dataset.limit, 10) || 3;
      var items = reports.filter(function (r) { return r.engine === engine; }).sort(byDateDesc).slice(0, limit);
      el.innerHTML = items.length ? items.map(cardHTML).join('')
        : '<div class="empty">아직 발행된 글이 없습니다. <strong>Coming Soon!</strong></div>';
    });
  }

  function renderEvents(events) {
    var wrap = document.querySelector('[data-events]');
    if (!wrap) return;
    var today = todayStr();
    var live = (events || []).filter(function (e) { return !e.date || e.date >= today; }).sort(byDateAsc);
    wrap.innerHTML = live.length ? live.map(eventHTML).join('') : comingHTML();
  }

  function renderArchive(reports) {
    var host = document.querySelector('[data-archive]');
    if (!host) return;
    var engine = host.dataset.archive;
    var pool = reports.filter(function (r) { return r.engine === engine; }).sort(byDateDesc);

    // 시리즈 칩(해당 엔진에 존재하는 시리즈만)
    var seriesList = [];
    pool.forEach(function (r) { if (r.series && seriesList.indexOf(r.series) < 0) seriesList.push(r.series); });

    var state = { series: 'all', q: '' };
    var chipsHTML = '<button class="chip active" data-series="all">전체</button>' +
      seriesList.map(function (s) { return '<button class="chip" data-series="' + esc(s) + '">' + esc(SERIES_LABEL[s] || s) + '</button>'; }).join('');

    host.innerHTML =
      '<div class="toolbar">' +
        '<div class="filters">' + chipsHTML + '</div>' +
        '<div class="search"><input type="search" placeholder="제목·요약·태그 검색…" autocomplete="off"></div>' +
      '</div>' +
      '<p class="count-line"></p>' +
      '<div class="report-grid"></div>' +
      '<div class="empty" hidden>조건에 맞는 글이 없습니다.</div>';

    var grid = host.querySelector('.report-grid');
    var empty = host.querySelector('.empty');
    var count = host.querySelector('.count-line');
    var input = host.querySelector('input');

    function apply() {
      var q = state.q.trim().toLowerCase();
      var items = pool.filter(function (r) {
        if (state.series !== 'all' && r.series !== state.series) return false;
        if (!q) return true;
        var hay = (r.title + ' ' + r.summary + ' ' + (r.tags || []).join(' ')).toLowerCase();
        return hay.indexOf(q) > -1;
      });
      count.textContent = '총 ' + items.length + '편';
      grid.innerHTML = items.map(cardHTML).join('');
      empty.hidden = items.length > 0;
      grid.hidden = items.length === 0;
    }
    host.querySelectorAll('.chip').forEach(function (c) {
      c.addEventListener('click', function () {
        host.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active'); state.series = c.dataset.series; apply();
      });
    });
    input.addEventListener('input', function () { state.q = input.value; apply(); });
    apply();
  }

  fetch(DATA_URL, { cache: 'no-store' })
    .then(function (res) { return res.json(); })
    .then(function (json) {
      var reports = json.reports || [];
      renderFeeds(reports);
      renderEvents(json.events || []);
      renderArchive(reports);
    })
    .catch(function (e) {
      console.error('CWI: reports.json 로드 실패', e);
      document.querySelectorAll('[data-feed],[data-archive]').forEach(function (el) {
        el.innerHTML = '<div class="empty">목록을 불러올 수 없습니다.</div>';
      });
      renderEvents([]);
    });
})();
