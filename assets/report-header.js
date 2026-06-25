/* C&R Wine Intelligence — 개별 글 상단 공통 헤더 바
 * 각 글 HTML에 <script defer src="../assets/report-header.js"></script> 한 줄이면
 * 랜딩과 동일한 상단 바가 삽입된다. 모든 클래스를 cwi- 로 네임스페이스하여
 * 글별 고유 CSS와 충돌하지 않게 한다. */
(function () {
  if (document.getElementById('cwi-site-header')) return; // 중복 삽입 방지

  // 글은 intelligence/ 또는 wineality/ 안에 있으므로 사이트 루트는 한 단계 위
  var ROOT = '../';

  var css = '' +
    '#cwi-site-header{position:sticky;top:0;z-index:9999;background:#2a0c0c;' +
    'border-bottom:1px solid #4d1717;font-family:"Pretendard",-apple-system,BlinkMacSystemFont,system-ui,"Noto Sans KR",sans-serif;' +
    '-webkit-font-smoothing:antialiased;}' +
    '#cwi-site-header *{box-sizing:border-box;}' +
    '.cwi-header-inner{max-width:1180px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;}' +
    '.cwi-brand{display:flex;align-items:center;gap:12px;text-decoration:none;}' +
    '.cwi-brand-mark{width:40px;height:40px;flex:0 0 auto;display:block;}' +
    '.cwi-brand-title{font-weight:700;font-size:15px;letter-spacing:-.2px;color:#f7f0e4;line-height:1.2;}' +
    '.cwi-brand-sub{font-size:11px;color:#c9a55b;letter-spacing:.3px;}' +
    '.cwi-nav{display:flex;gap:4px;align-items:center;}' +
    '.cwi-nav a{padding:8px 13px;border-radius:4px;color:#d9cdb8;font-weight:500;font-size:14px;text-decoration:none;white-space:nowrap;}' +
    '.cwi-nav a:hover{background:#4d1717;color:#f7f0e4;}' +
    '.cwi-nav a.cwi-active{background:#4d1717;color:#e6cd91;}' +
    '@media (max-width:640px){.cwi-header-inner{padding:10px 16px;}.cwi-brand-sub{display:none;}.cwi-nav a{padding:6px 9px;font-size:12px;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var header = document.createElement('header');
  header.id = 'cwi-site-header';
  header.innerHTML = '' +
    '<div class="cwi-header-inner">' +
      '<a class="cwi-brand" href="' + ROOT + '">' +
        '<svg class="cwi-brand-mark" viewBox="0 0 100 100" aria-hidden="true">' +
          '<circle cx="50" cy="50" r="46" fill="#4d1717" stroke="#c9a55b" stroke-width="2.5"/>' +
          '<circle cx="50" cy="50" r="39" fill="none" stroke="#e6cd91" stroke-width="0.8"/>' +
          '<text x="50" y="60" text-anchor="middle" fill="#f7f0e4" font-size="25" font-weight="600" font-family="Georgia, serif">C&amp;R</text>' +
        '</svg>' +
        '<div>' +
          '<div class="cwi-brand-title">C&amp;R Wine Intelligence</div>' +
          '<div class="cwi-brand-sub">읽는 분석으로 마시는 감성을 높이자</div>' +
        '</div>' +
      '</a>' +
      '<nav class="cwi-nav">' +
        '<a href="' + ROOT + '#intelligence">읽는 분석</a>' +
        '<a href="' + ROOT + '#wineality">마시는 감성</a>' +
        '<a href="' + ROOT + '#cellardoor">함께하는 와인</a>' +
        '<a href="' + ROOT + '#about">About</a>' +
      '</nav>' +
    '</div>';

  document.body.insertBefore(header, document.body.firstChild);
})();
