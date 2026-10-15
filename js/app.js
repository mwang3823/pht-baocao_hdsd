(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const vn = (v, d = 0) => Number(v).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d });

  const TODAY = '2026-10-15';
  const FDEF = { nam: '2026', ky: '10', dot: null, phuong: 'Tất cả', tungay: '2026-10-01', denngay: TODAY, noidung: 'Tất cả' };
  const FLABEL = { nam: 'Năm', ky: 'Kỳ', dot: 'Đợt', phuong: 'Phường', tungay: 'Từ ngày', denngay: 'Đến ngày', noidung: 'Nội dung' };
  const AUTOHIDE = ['dt-ky', 'tt-2nam', 'gbbq-ky', 'hd-0', 'hd-14', 'hd-04'];
  const TYPE_NAME = { bar: 'Biểu đồ cột', donut: 'Biểu đồ donut', heat: 'Bản đồ nhiệt', rank: 'Danh sách xếp hạng', combo: 'Cột + đường', banner: 'Khung tóm tắt', seg: 'Công tắc', group: 'Khung thu gọn', tiles: 'Ô chỉ số', stats: 'Chỉ số theo kỳ', qlgt: 'Danh sách phường', sawaco: 'Khung tóm tắt' };

  const ICON = {
    back: '<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    funnel: '<path d="M4 6h16M7 12h10M10 18h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    bar: '<path d="M5 20V10M10 20V5M15 20v-7M20 20V8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
    table: '<path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    user: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    chev: '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    right: '<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    search: '<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 16l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    check: '<path d="M5 12l5 5 9-10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    bell: '<path d="M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    phone: '<rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    users: '<circle cx="9" cy="9" r="3" fill="currentColor"/><circle cx="16" cy="10" r="2.4" fill="currentColor"/><path d="M3 19c.8-3 3.3-5 6-5s5.2 2 6 5zM14 15c2.6-.6 5.4.6 6.5 4H16" fill="currentColor"/>',
    drop: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" fill="currentColor"/>',
    money: '<rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor"/><circle cx="12" cy="12" r="2.6" fill="#fff"/>',
    gauge: '<path d="M4 16a8 8 0 1116 0z" fill="currentColor"/><path d="M12 16l3-5" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    leak: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z" fill="currentColor"/><path d="M9 14h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z" fill="currentColor"/><circle cx="7.5" cy="8.5" r="1.6" fill="#fff"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2" fill="currentColor"/><rect x="14" y="10.5" width="7" height="4" rx="1" fill="#fff"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor"/><circle cx="9" cy="11" r="2.2" fill="#fff"/><path d="M14 10h4M14 14h4" stroke="#fff" stroke-width="1.6"/>',
    plus: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    move: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M8 12h8M13 9l3 3-3 3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    swap: '<circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M8 10h8l-2-2M16 14H8l2 2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
    folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="currentColor"/>',
    doc: '<path d="M6 3h8l4 4v14H6z" fill="currentColor"/><path d="M9 12h6M9 16h6" stroke="#fff" stroke-width="1.6"/>',
    tool: '<path d="M14 4a5 5 0 00-4.6 6.9L4 16.3 7.7 20l5.4-5.4A5 5 0 0020 10l-3 1-2-2 1-3z" fill="currentColor"/>',
    spin: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="36 50" stroke-linecap="round"/>'
  };
  const ic = (n, s = 18, cls = '') => `<svg class="ic ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ''}</svg>`;

  // ---------- index ----------
  const BLK = {};
  const TABIDX = {};
  TABS.forEach((t, ti) => {
    TABIDX[t.key] = ti;
    const walk = (list, parents) => list.forEach(b => {
      BLK[b.id] = { b, tab: t.key, parents };
      if (b.children) walk(b.children, parents.concat({ id: b.id, kind: 'group' }));
      if (b.panes) b.panes.forEach((p, pi) => walk(p, parents.concat({ id: b.id, kind: 'seg', pane: pi })));
    });
    walk(t.blocks, []);
  });

  // ---------- state ----------
  const S = {
    screen: 'home', tab: 'kh', pill: 1, seg: {}, view: {}, filt: {}, collapsed: {}, sel: {}, hidden: {},
    tip: null, loading: new Set(), mode: null, real: false, realIdx: 0, sheet: null, hl: null, scrollMem: {}
  };
  const getF = id => S.filt[id] || (S.filt[id] = { ...FDEF });
  const isFiltered = (id, keys) => keys.some(k => (S.filt[id] || FDEF)[k] !== FDEF[k]);

  // ---------- helpers ----------
  function rng(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
  }
  function seedFor(id) {
    const info = BLK[id]; if (!info) return '';
    let parts = [];
    [...info.parents.map(p => p.id), id].forEach(k => { if (S.filt[k]) parts.push(k + JSON.stringify(S.filt[k])); });
    TABS[TABIDX[info.tab]].blocks.forEach(b => { if (b.t === 'seg' && !b.panes && S.seg[b.id]) parts.push(b.id + S.seg[b.id]); });
    const cur = parts.join('|');
    return cur;
  }
  function jitter(arr, seed) {
    if (!seed) return arr;
    const r = rng(seed);
    return arr.map(v => {
      if (!v) return v;
      const f = 0.82 + r() * 0.36;
      return Number.isInteger(v) ? Math.max(0, Math.round(v * f)) : +(v * f).toFixed(2);
    });
  }
  function abbr(v, fmt) {
    if (!v) return '';
    if (fmt === 'pct') return v.toFixed(2) + '%';
    if (fmt === 'ty') return (v / 1e9).toFixed(1) + 'tỷ';
    if (v >= 1e6) return (v / 1e6).toFixed(1) + 'tr';
    if (v >= 1e3) return (v / 1e3).toFixed(1) + 'k';
    return String(Math.round(v));
  }
  function full(v, fmt) {
    if (fmt === 'pct') return vn(v, 2) + '%';
    if (fmt === 'tyc') return vn(v, 2) + ' tỷ';
    return vn(Math.round(v));
  }
  const dmy = s => s ? s.split('-').reverse().join('/') : '';

  function subtitleOf(b, fid) {
    const keys = b.filters || [];
    if (!keys.length) return b.sub || '';
    if (b.sub && !b.yearOnly) return b.sub;
    const f = S.filt[fid] || FDEF;
    if (keys.length === 1 && keys[0] === 'nam') return 'Năm ' + f.nam;
    if (keys.includes('tungay')) return `Kỳ ${f.ky}/${f.nam} · ${dmy(f.tungay)} – ${dmy(f.denngay)}`;
    let s = `Kỳ ${f.ky}`;
    if (f.dot) s += ` - Đợt ${f.dot}`;
    if (f.phuong && f.phuong !== 'Tất cả') s += ` - ${f.phuong}`;
    return s + ` - Năm ${f.nam}`;
  }

  // ---------- chart renderers ----------
  function barChart(id, ch, opt = {}) {
    const seed = opt.seed || '';
    const series = ch.series.map(s => ({ ...s, data: jitter(s.data, seed && seed + s.name) }));
    const n = ch.cats.length, ns = series.length;
    const bw = ns === 1 ? 22 : ns === 2 ? 13 : 10;
    const gw = ns * bw + (ns - 1) * 2 + 18;
    const H = 196, top = 24, bot = 26, ph = H - top - bot;
    const W = Math.max(opt.minW || 290, n * gw + 16);
    const max = Math.max(1, ...series.flatMap(s => s.data)) * 1.06;
    const li = ch.label ?? ns - 1;
    let svg = '';
    const tipI = S.tip && S.tip.id === id ? S.tip.i : -1;
    for (let i = 0; i < n; i++) {
      const gx = 8 + i * gw;
      if (i === tipI) svg += `<rect x="${gx + 2}" y="${top - 18}" width="${gw - 4}" height="${ph + 18}" rx="6" fill="rgba(14,42,92,.07)"/>`;
      let maxY = top + ph;
      series.forEach((s, si) => {
        const v = s.data[i] || 0, h = v / max * ph, x = gx + 9 + si * (bw + 2), y = top + ph - h;
        if (h > 0) svg += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="2.5" fill="${s.color}"/>`;
        maxY = Math.min(maxY, y);
        if (ch.labelAll && v) svg += `<text x="${x + bw / 2}" y="${y - 4}" class="bl">${abbr(v, ch.fmt)}</text>`;
      });
      if (!ch.labelAll) {
        let lv = series[li] ? series[li].data[i] : 0;
        if (!lv) lv = 0;
        if (lv) svg += `<text x="${gx + gw / 2}" y="${maxY - 5}" class="bl">${abbr(lv, ch.fmt)}</text>`;
      }
      svg += `<text x="${gx + gw / 2}" y="${H - 8}" class="xl">${esc(ch.cats[i])}</text>`;
      if (!opt.noTip) svg += `<rect x="${gx}" y="0" width="${gw}" height="${H}" fill="transparent" data-act="tip" data-id="${id}" data-i="${i}" style="cursor:pointer"/>`;
    }
    let tip = '';
    if (tipI >= 0) {
      const x = Math.min(Math.max(8 + tipI * gw + gw / 2 - 70, 4), W - 150);
      tip = `<div class="tip" style="left:${x}px">` + series.map(s => `<div><i style="background:${s.color}"></i>${esc(s.name)}: <b>${full(s.data[tipI] || 0, ch.fmt)}</b></div>`).join('') + '</div>';
    }
    const legend = ns >= 2 ? `<div class="legend">${series.map(s => `<span><i style="background:${s.color}"></i>${esc(s.name)}</span>`).join('')}</div>` : '';
    return `<div class="hscroll"><div class="chart-wrap" style="width:${W}px"><svg width="${W}" height="${H}" class="bars">${svg}</svg>${tip}</div></div>${legend}`;
  }

  function comboChart(id, ch, seed) {
    const hid = S.hidden[id] || [];
    const bars = ch.bars.map(s => ({ ...s, data: jitter(s.data, seed && seed + s.name) }));
    const lines = ch.lines.map(s => ({ ...s, data: jitter(s.data, seed && seed + s.name) }));
    const n = ch.cats.length, gw = 52, H = 210, top = 18, bot = 26, L = 34, R = 40, ph = H - top - bot;
    const W = Math.max(300, L + R + n * gw);
    const vb = bars.filter(s => !hid.includes(s.name)), vl = lines.filter(s => !hid.includes(s.name));
    const maxB = Math.max(1, ...vb.flatMap(s => s.data)) * 1.1;
    const maxL = Math.max(1, ...vl.flatMap(s => s.data)) * 1.1;
    let svg = '';
    for (let k = 0; k <= 4; k++) {
      const y = top + ph - k / 4 * ph;
      svg += `<line x1="${L}" x2="${W - R}" y1="${y}" y2="${y}" stroke="var(--ph-grid)" stroke-dasharray="3 3"/>`;
      svg += `<text x="${L - 4}" y="${y + 3}" class="ax" text-anchor="end">${(maxB * k / 4).toFixed(1)}%</text>`;
      svg += `<text x="${W - R + 4}" y="${y + 3}" class="ax" text-anchor="start">${abbr(maxL * k / 4, 'm3') || 0}</text>`;
    }
    const tipI = S.tip && S.tip.id === id ? S.tip.i : -1;
    for (let i = 0; i < n; i++) {
      const gx = L + i * gw;
      if (i === tipI) svg += `<rect x="${gx + 2}" y="${top}" width="${gw - 4}" height="${ph}" fill="rgba(14,42,92,.07)" rx="5"/>`;
      vb.forEach((s, si) => {
        const bw = 16, h = s.data[i] / maxB * ph, x = gx + gw / 2 - vb.length * bw / 2 + si * bw;
        svg += `<rect x="${x}" y="${top + ph - h}" width="${bw - 2}" height="${h}" fill="${s.color}" rx="2"/>`;
      });
      svg += `<text x="${gx + gw / 2}" y="${H - 8}" class="xl">${ch.cats[i]}</text>`;
    }
    vl.forEach(s => {
      const pts = s.data.map((v, i) => `${L + i * gw + gw / 2},${top + ph - v / maxL * ph}`);
      svg += `<polyline points="${pts.join(' ')}" fill="none" stroke="${s.color}" stroke-width="2"/>`;
      pts.forEach(p => { const [x, y] = p.split(','); svg += `<circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="${s.color}" stroke-width="2"/>`; });
    });
    for (let i = 0; i < n; i++) svg += `<rect x="${L + i * gw}" y="0" width="${gw}" height="${H}" fill="transparent" data-act="tip" data-id="${id}" data-i="${i}" style="cursor:pointer"/>`;
    let tip = '';
    if (tipI >= 0) {
      const x = Math.min(Math.max(L + tipI * gw + gw / 2 - 80, 4), W - 175);
      tip = `<div class="tip" style="left:${x}px"><div class="tt">${ch.cats[tipI]}</div>` +
        [...vb, ...vl].map(s => `<div><i style="background:${s.color}"></i>${s.name}: <b>${full(s.data[tipI], s.fmt)}${s.fmt === 'm3' ? ' m³' : ''}</b></div>`).join('') + '</div>';
    }
    const legend = `<div class="legend">${[...bars, ...lines].map(s => `<span class="lg-tog ${hid.includes(s.name) ? 'off' : ''}" data-act="series" data-id="${id}" data-name="${esc(s.name)}"><i style="background:${s.color}"></i>${s.name}</span>`).join('')}</div>`;
    return `<div class="hscroll"><div class="chart-wrap" style="width:${W}px"><svg width="${W}" height="${H}" class="bars">${svg}</svg>${tip}</div></div>${legend}`;
  }

  function donutData(ch, seed) {
    const vals = jitter(ch.items.map(x => x[1]), seed);
    return ch.items.map((x, i) => ({ name: x[0], v: vals[i], color: (ch.colors || PAL)[i % (ch.colors || PAL).length] }));
  }
  function donutChart(id, ch, seed) {
    const items = donutData(ch, seed);
    const total = items.reduce((a, b) => a + b.v, 0);
    const sel = S.sel[id] ?? null;
    const r = 72, w = 34, Cc = 2 * Math.PI * r;
    let off = 0, arcs = '';
    items.forEach((it, i) => {
      const len = it.v / total * Cc;
      const on = sel === i, dim = sel !== null && !on;
      arcs += `<circle cx="100" cy="100" r="${r}" fill="none" stroke="${it.color}" stroke-width="${on ? w + 10 : w}" stroke-dasharray="${Math.max(len - 1, 0.5)} ${Cc}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)" opacity="${dim ? .25 : 1}" data-act="slice" data-id="${id}" data-i="${i}" style="cursor:pointer"/>`;
      off += len;
    });
    const fv = v => full(v, ch.fmt) + (ch.suffix || '');
    let center;
    if (sel !== null && items[sel]) {
      const it = items[sel];
      center = `<div class="dc-name">${esc(it.name)}</div><div class="dc-val">${fv(it.v)}</div><div class="dc-sub">${vn(it.v / total * 100, 1)}%</div>`;
    } else center = `<div class="dc-val big">${ch.fmt === 'tyc' ? vn(total, 2) + ' tỷ' : vn(total) + (ch.suffix || '')}</div><div class="dc-sub">${esc(ch.center || 'Tổng')}</div>`;
    const legend = `<div class="dlegend">${items.map((it, i) => `<div class="dl ${sel === i ? 'on' : ''} ${sel !== null && sel !== i ? 'dim' : ''}" data-act="slice" data-id="${id}" data-i="${i}"><i style="background:${it.color}"></i><span class="dn">${esc(it.name)}</span><b>${ch.fmt === 'tyc' ? vn(it.v, 2) + ' tỷ' : vn(it.v)}</b><em>${vn(it.v / total * 100, 1)}%</em></div>`).join('')}</div>`;
    return `<div class="donut" data-act="unsel" data-id="${id}"><svg viewBox="0 0 200 200" width="210" height="210">${arcs}</svg><div class="dcenter">${center}</div></div>${legend}`;
  }

  function heatChart(id, ch, seed) {
    const rows = ch.rows.map(r => [r[0], jitter(r[1], seed && seed + r[0])]);
    const max = Math.max(...rows.flatMap(r => r[1]));
    const tip = S.tip && S.tip.id === id ? S.tip : null;
    let h = `<div class="hscroll"><div class="chart-wrap"><table class="heat"><thead><tr><th></th>${ch.cols.map(c => `<th>GB ${c}</th>`).join('')}</tr></thead><tbody>`;
    rows.forEach((r, ri) => {
      h += `<tr><th>${esc(r[0])}</th>`;
      r[1].forEach((v, ci) => {
        const t = v ? Math.sqrt(v / max) : 0;
        const bg = v ? `rgba(${Math.round(232 - 214 * t)},${Math.round(240 - 182 * t)},${Math.round(254 - 116 * t)},1)` : 'var(--ph-zero)';
        const fg = t > .45 ? '#fff' : 'var(--ph-ink)';
        const on = tip && tip.i === ri * 100 + ci;
        h += `<td style="background:${bg};color:${fg}" class="${on ? 'on' : ''}" data-act="tip" data-id="${id}" data-i="${ri * 100 + ci}">${v ? (v >= 1000 ? (v / 1000).toFixed(1) + 'N' : v) : ''}</td>`;
      });
      h += '</tr>';
    });
    h += '</tbody></table>';
    if (tip) {
      const ri = Math.floor(tip.i / 100), ci = tip.i % 100;
      h += `<div class="tip" style="left:${Math.min(40 + ci * 46, 260)}px;top:${30 + ri * 31}px"><div>${esc(rows[ri][0])} • GB ${ch.cols[ci]}</div><div>Số KH: <b>${vn(rows[ri][1][ci])}</b></div></div>`;
    }
    h += '</div></div><div class="heat-scale"><span>Ít</span><i></i><span>Nhiều</span></div>';
    return h;
  }

  function rankChart(id, ch) {
    const maxp = Math.max(...ch.items.map(x => x.p));
    let h = '';
    if (ch.search) h += `<div class="rk-search">${ic('search', 15)}<input type="text" placeholder="${esc(ch.search)}" data-act="search" data-id="${id}"></div>`;
    h += `<div class="rank">` + ch.items.map((it, i) => `
      <div class="rk" data-name="${esc(it.n.toLowerCase())}">
        ${ch.plain ? '' : `<span class="rk-no ${i < 3 ? 'top' : ''}">${i + 1}</span>`}
        <div class="rk-main">
          <div class="rk-row"><span class="rk-n">${esc(it.n)}</span><span class="rk-v">${esc(it.v)}</span></div>
          <div class="rk-row"><div class="rk-bar"><i style="width:${(it.p / maxp * 100).toFixed(1)}%;background:${ch.color}"></i></div>${it.d ? `<span class="rk-d">▼ ${esc(it.d.replace('- ', ''))}</span>` : `<span class="rk-p">${vn(it.p, 1)}%</span>`}</div>
        </div>
      </div>`).join('') + '</div>';
    return h;
  }

  function deltaCell(cur, prev) {
    if (!cur) return '<td class="dl0">--</td>';
    const d = cur - prev;
    if (Math.abs(d) < 1e-9) return '<td>0</td>';
    const isInt = Number.isInteger(cur) && Number.isInteger(prev);
    const t = isInt ? vn(Math.abs(d)) : vn(Math.abs(d), 2);
    return d > 0 ? `<td class="up">+${t} ▲</td>` : `<td class="down">-${t} ▼</td>`;
  }
  function tableOf(id, ch, seed) {
    let h = '<div class="hscroll"><table class="dtable">';
    if (ch.type === 'bar') {
      const series = ch.series.map(s => ({ ...s, data: jitter(s.data, seed && seed + s.name) }));
      const avg = ['pct', 'vnd'].includes(ch.fmt);
      h += `<thead><tr><th>${/Kỳ|Đợt/.test(ch.cats[0]) ? '' : 'Mục'}</th>${series.map(s => `<th>${esc(s.name)}</th>`).join('')}${series.length > 1 ? '<th>+/-</th>' : ''}</tr></thead><tbody>`;
      ch.cats.forEach((c, i) => {
        h += `<tr><td class="l">${esc(c)}</td>${series.map(s => `<td>${s.data[i] ? full(s.data[i], ch.fmt === 'ty' ? 'num' : ch.fmt) : '--'}</td>`).join('')}`;
        if (series.length > 1) h += deltaCell(series[series.length - 1].data[i], series[series.length - 2].data[i]);
        h += '</tr>';
      });
      const agg = s => { const nz = s.data.filter(Boolean); const sum = nz.reduce((a, b) => a + b, 0); return avg ? sum / (nz.length || 1) : sum; };
      h += `<tr class="tc"><td class="l">${avg ? 'TB' : 'TC'}</td>${series.map(s => `<td>${full(agg(s), ch.fmt === 'ty' ? 'num' : ch.fmt)}</td>`).join('')}${series.length > 1 ? deltaCell(agg(series[series.length - 1]), agg(series[series.length - 2])) : ''}</tr>`;
    } else if (ch.type === 'combo') {
      const all = [...ch.bars, ...ch.lines].map(s => ({ ...s, data: jitter(s.data, seed && seed + s.name) }));
      h += `<thead><tr><th>Kỳ</th>${all.map(s => `<th>${s.name}</th>`).join('')}</tr></thead><tbody>`;
      ch.cats.forEach((c, i) => { h += `<tr><td class="l">${c}</td>${all.map(s => `<td>${full(s.data[i], s.fmt)}</td>`).join('')}</tr>`; });
    } else if (ch.type === 'donut') {
      const items = donutData(ch, seed); const total = items.reduce((a, b) => a + b.v, 0);
      h += '<thead><tr><th>Tên</th><th>Số lượng</th><th>Tỷ lệ</th></tr></thead><tbody>';
      items.forEach(it => { h += `<tr><td class="l"><i class="sw" style="background:${it.color}"></i>${esc(it.name)}</td><td>${ch.fmt === 'tyc' ? vn(it.v, 2) + ' tỷ' : vn(it.v)}</td><td>${vn(it.v / total * 100, 1)}%</td></tr>`; });
      h += `<tr class="tc"><td class="l">TC</td><td>${ch.fmt === 'tyc' ? vn(total, 2) + ' tỷ' : vn(total)}</td><td>100%</td></tr>`;
    } else if (ch.type === 'heat') {
      const prevSeed = 'prev' + id;
      h += '<thead><tr><th>Phường</th><th>GB</th><th>Kỳ trước</th><th>Kỳ hiện tại</th><th>+/- Kỳ</th></tr></thead><tbody>';
      let gt = 0, gp = 0;
      ch.rows.forEach(r => {
        const cur = jitter(r[1], seed && seed + r[0]);
        const prev = cur.map((v, i) => v ? Math.max(0, v + Math.round((rng(prevSeed + r[0] + i)() - .5) * Math.max(2, v * .004))) : 0);
        let st = 0, sp = 0;
        ch.cols.forEach((g, i) => {
          h += `<tr>${i === 0 ? `<td class="l grp" rowspan="${ch.cols.length}">${esc(r[0])}</td>` : ''}<td>${g}</td><td>${vn(prev[i])}</td><td>${vn(cur[i])}</td>${cur[i] || prev[i] ? deltaCell(cur[i] || 0.0001, prev[i]) : '<td>0</td>'}</tr>`;
          st += cur[i]; sp += prev[i];
        });
        gt += st; gp += sp;
        h += `<tr class="tc"><td class="l">TC</td><td></td><td>${vn(sp)}</td><td>${vn(st)}</td>${deltaCell(st, sp)}</tr>`;
      });
      h += `<tr class="tc"><td class="l">TỔNG</td><td></td><td>${vn(gp)}</td><td>${vn(gt)}</td>${deltaCell(gt, gp)}</tr>`;
    } else if (ch.type === 'rank') {
      h += '<thead><tr><th>#</th><th>Tên</th><th>Giá trị</th><th>Tỷ lệ</th></tr></thead><tbody>';
      ch.items.forEach((it, i) => { h += `<tr><td>${i + 1}</td><td class="l">${esc(it.n)}</td><td>${esc(it.v)}</td><td>${it.d ? `<span class="down">▼ ${esc(it.d.replace('- ', ''))}</span>` : vn(it.p, 1) + '%'}</td></tr>`; });
    }
    return h + '</tbody></table></div>';
  }

  // ---------- block renderers ----------
  const skel = (h = 160) => `<div class="skel" style="height:${h}px"></div>`;

  function filterBtn(fid, keys) {
    const on = isFiltered(fid, keys);
    return `<button class="fbtn ${on ? 'on' : ''}" data-act="filter" data-id="${fid}" title="Bộ lọc">${ic('funnel', 18)}${on ? '<i class="fdot"></i>' : ''}</button>`;
  }
  function viewToggle(id) {
    const v = S.view[id] || 'chart';
    return `<div class="vt"><button class="${v === 'chart' ? 'on' : ''}" data-act="view" data-id="${id}" data-v="chart">${ic('bar', 13)}Biểu đồ</button><button class="${v === 'table' ? 'on' : ''}" data-act="view" data-id="${id}" data-v="table">${ic('table', 13)}Bảng</button></div>`;
  }

  function renderCard(b, ctx) {
    const fid = b.filters ? b.id : ctx.fid;
    const seed = seedFor(b.id);
    const loading = S.loading.has(b.id) || S.loading.has('all') || (ctx.fid && S.loading.has(ctx.fid));
    if (S.mode === 'empty' && AUTOHIDE.includes(b.id)) return '';
    let body;
    if (loading) body = skel(b.chart.type === 'donut' ? 260 : 190);
    else if (S.mode === 'error') body = `<div class="empty err">Không tải được dữ liệu, kéo xuống để thử lại</div>`;
    else if (S.mode === 'empty') body = `<div class="empty">Không có dữ liệu</div>`;
    else if ((S.view[b.id] || 'chart') === 'table') body = tableOf(b.id, b.chart, seed);
    else {
      const ch = b.chart;
      body = ch.type === 'bar' ? barChart(b.id, ch, { seed })
        : ch.type === 'donut' ? donutChart(b.id, ch, seed)
          : ch.type === 'heat' ? heatChart(b.id, ch, seed)
            : ch.type === 'combo' ? comboChart(b.id, ch, seed)
              : rankChart(b.id, ch);
    }
    const sub = ctx.listSub || subtitleOf(b, fid);
    const title = ctx.listTitle || b.title;
    return `<div class="card ${b.bare ? 'bare' : ''}" data-bid="${b.id}">
      ${title ? `<div class="card-h"><div><div class="card-t">${esc(title)}</div>${sub ? `<div class="card-s">${esc(sub)}</div>` : ''}</div>${b.filters ? filterBtn(b.id, b.filters) : ''}</div>` : ''}
      <div class="card-tools">${viewToggle(b.id)}</div>
      ${body}</div>`;
  }

  function renderBanner(b) {
    if (S.loading.has('all')) return `<div class="banner-wrap" data-bid="${b.id}">${skel(96)}</div>`;
    return `<div class="banner" data-bid="${b.id}" style="background:${b.bg}">
      ${b.cap ? `<div class="bn-cap">${b.cap}</div>` : ''}
      <div class="bn-row"><div><div class="bn-l">${b.tl}</div><div class="bn-v">${b.tv}</div></div>${b.rl ? `<div class="r"><div class="bn-l">${b.rl}</div><div class="bn-v">${b.rv}</div></div>` : ''}</div>
      ${b.bl ? `<div class="bn-row sm"><span>${b.bl}</span><span>${b.br || ''}</span></div>` : ''}
      ${b.prog != null ? `<div class="bn-prog"><i style="width:${Math.min(b.prog, 100)}%;background:${b.pc}"></i></div>` : ''}
      ${b.sub ? `<div class="bn-sub">${b.sub.map(s => `<div style="background:${s.bg}"><div class="bn-l">${s.l}</div><div class="bn-v sm">${s.v}</div></div>`).join('')}</div>` : ''}
    </div>`;
  }

  function renderSawaco(b) {
    if (S.loading.has('all')) return `<div data-bid="${b.id}">${skel(170)}</div>`;
    return `<div class="banner sw" data-bid="${b.id}" style="background:#0E7C82">
      <div class="sw-top"><span class="sw-ic">${ic('phone', 20)}</span><div><div class="bn-l">Khách hàng đã tải app Sawaco</div><div class="bn-v">17.552</div></div></div>
      <div class="bn-row sm"><span>Tỷ lệ tải app</span><b>19.40%</b></div>
      <div class="bn-prog"><i style="width:19.4%;background:#fff"></i></div>
      <div class="sw-tiles"><div><div class="bn-l">Tổng khách hàng</div><div class="bn-v sm">90.475</div></div><div><div class="bn-l">Chưa tải app</div><div class="bn-v sm">72.923</div></div></div>
    </div>`;
  }

  function renderSeg(b, ctx) {
    const cur = S.seg[b.id] || 0;
    const opts = b.options.map((o, i) => `<button class="${cur === i ? 'on' : ''}" data-act="seg" data-id="${b.id}" data-i="${i}">${b.icons ? `<span class="rd">${i === 0 ? '⊖' : '⊘'}</span>` : ''}${esc(o)}</button>`).join('');
    let h = `<div class="segrow ${b.right ? 'right' : ''}" data-bid="${b.id}"><div class="seg">${opts}</div>${b.filters ? filterBtn(b.id, b.filters) : ''}</div>`;
    if (b.panes) {
      const pane = b.panes[cur] || [];
      if (b.filterOf) {
        const f = S.filt[b.id] || FDEF;
        const lc = { fid: b.id, listTitle: b.options[cur], listSub: `${dmy(f.tungay)} – ${dmy(f.denngay)}${f.noidung !== 'Tất cả' ? ' · ' + f.noidung : ''}` };
        h += pane.map(x => renderBlock(x, lc)).join('');
      } else h += renderBlocks(pane, ctx);
    }
    return h;
  }

  function renderGroup(b) {
    const col = !!S.collapsed[b.id];
    const sub = b.filters ? subtitleOf({ filters: b.filters }, b.id).replace(/^Kỳ (\d+)(.*) - Năm (\d+)$/, 'Năm $3 - Kỳ $1$2') : b.sub;
    return `<div class="group ${col ? 'col' : ''}" data-bid="${b.id}">
      <div class="group-h" data-act="collapse" data-id="${b.id}"><div class="gbar"></div><div class="gtxt"><div class="gt">${esc(b.title.toUpperCase())}</div>${sub ? `<div class="gs">${esc(sub)}</div>` : ''}</div>${b.filters ? filterBtn(b.id, b.filters) : ''}<span class="gchev">${ic('chev', 18)}</span></div>
      ${col ? '' : `<div class="group-b">${renderBlocks(b.children, { fid: b.filters ? b.id : null })}</div>`}
    </div>`;
  }

  function renderTiles(b) {
    const items = b.items.map(t => `<div class="tile ${t.tone} ${t.wide ? 'wide' : ''}"><div class="tl">${t.l}</div><div class="tv">${t.v}</div></div>`).join('');
    const head = b.title ? `<div class="tiles-h"><b>${b.title}</b>${b.filters ? filterBtn(b.id, b.filters) : ''}</div>` : '';
    return `<div class="tiles-wrap" data-bid="${b.id}">${head}${S.loading.has('all') ? skel(120) : `<div class="tiles c${b.cols || 2}">${items}</div>`}</div>`;
  }

  function renderStats(b) {
    const f = S.filt[b.id] || FDEF;
    const items = b.items.map((x, i) => [x[0], i === 0 ? `${f.ky}/${f.nam}` : x[1]]);
    return `<div class="stats" data-bid="${b.id}">
      <div class="stats-h"><div><div class="card-t">${b.title}</div><div class="card-s">${subtitleOf(b, b.id)}</div></div>${filterBtn(b.id, b.filters)}</div>
      ${S.loading.has(b.id) || S.loading.has('all') ? skel(56) : `<div class="stats-b">${items.map(x => `<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}</div>`}</div>`;
  }

  function renderQlgt(b) {
    if (S.loading.has('all')) return `<div class="card" data-bid="${b.id}">${skel(200)}</div>`;
    const col = g => `<div class="qcol"><div class="qh"><i></i>${g.name}</div>${g.items.map(x => `<div class="qr"><span>${x[0]}</span><b>${vn(x[1])}</b></div>`).join('')}<div class="qt"><b>${vn(g.total)}</b><span>${g.pct}</span></div><div class="qbar"><i style="width:${parseFloat(g.pct)}%"></i></div></div>`;
    return `<div class="card" data-bid="${b.id}"><div class="card-h"><div class="card-t up">${b.title}</div><b class="qtotal">${b.total}</b></div><div class="qgrid">${b.groups.map(col).join('')}</div></div>`;
  }

  function renderBlock(b, ctx = {}) {
    switch (b.t) {
      case 'card': return renderCard(b, ctx);
      case 'banner': return renderBanner(b);
      case 'sawaco': return renderSawaco(b);
      case 'seg': return renderSeg(b, ctx);
      case 'group': return renderGroup(b);
      case 'tiles': return renderTiles(b);
      case 'stats': return renderStats(b);
      case 'qlgt': return renderQlgt(b);
    }
    return '';
  }
  const renderBlocks = (list, ctx = {}) => list.map(b => renderBlock(b, ctx)).join('');

  // ---------- screens ----------
  function statusBar() {
    return `<div class="sbar"><span>14:58</span><span class="island"></span><span class="sicons">▂▄▆ ◔</span></div>`;
  }
  function header(title, back) {
    return `<div class="ph-head">${statusBar()}<div class="ph-title">${back ? `<button class="hb" data-act="back">${ic('back', 20)}</button>` : ''}<span>${title}</span></div></div>`;
  }
  function bottomNav(active) {
    return `<div class="bnav"><button data-act="nav-home" class="${active === 'home' ? 'on' : ''}">${ic('home', 22)}</button><button class="bn-center" data-bid="nav-report" data-act="nav-report">${ic('bar', 22)}</button><button>${ic('user', 22)}</button></div>`;
  }

  function homeScreen() {
    const fn = [['Thông tin khách hàng', 'users'], ['Tra cứu hóa đơn', 'doc'], ['Tra cứu CCCD/SĐĐ', 'id'], ['Cập nhật kiểm tra', 'folder'], ['Cập nhật HC bấm chì', 'tool'], ['Thay ĐHN kiểm định', 'swap']];
    return `<div class="ph-head home">${statusBar()}<div class="hm-user"><span class="av">P</span><b>Admin</b><span class="bell">${ic('bell', 20)}<i></i></span></div>
      <div class="hm-search"><div class="chips"><span class="on">Tất cả</span><span>Danh bạ</span><span>CCCD/SĐĐ</span><span>Hóa đơn</span></div><div class="sbox">${ic('search', 14)} Nhập danh bạ để tra cứu thông tin nhanh</div></div></div>
      <div class="ph-body" id="phBody"><div class="hm-sec">DANH SÁCH CHỨC NĂNG</div><div class="hm-grid">${fn.map(f => `<div class="hm-fn"><span>${ic(f[1], 22)}</span>${f[0]}</div>`).join('')}</div>
      <div class="hm-more">⌄ Xem tất cả</div>
      <div class="hm-rp"><div class="hm-rph"><b>Báo cáo</b><a data-act="nav-report">↗ Xem tất cả</a></div><div class="hm-rpc"><div>Tổng doanh thu cùng kỳ <span class="neg">▼ -0,65 %</span></div><div class="hm-rpv"><div><small>8/2026</small><b>33.006.998.730</b></div><div><small>9/2026</small><b>32.791.509.600</b></div></div></div></div>
      </div>${bottomNav('home')}`;
  }

  function overviewScreen() {
    const p = OVERVIEW.pills[S.pill];
    const chart = {
      cats: NUM(12), fmt: 'raw', series: [{ name: 'Năm 2025', color: '#1E6FD9', data: p.y25 }, { name: 'Năm 2026', color: '#0B2A5B', data: p.y26.concat(Array(12 - p.y26.length).fill(0)) }], label: 1
    };
    let body;
    if (S.mode === 'error') body = `<div class="ov-err"><div class="empty err">Không tải được dữ liệu</div><button class="btn-p" data-act="retry">Thử lại</button></div>`;
    else {
      const bars = S.loading.has('all') ? skel(200) : ovBars(chart);
      body = `<div class="card ov-chart" data-bid="ov-chart"><div class="ov-t">BÁO CÁO SO SÁNH THEO NĂM</div>
        <div class="pills">${OVERVIEW.pills.map((x, i) => `<button class="${i === S.pill ? 'on' : ''}" data-act="pill" data-i="${i}">${x.name}</button>`).join('')}</div>
        <div class="ov-u">${p.unit}</div>${bars}
        <div class="legend ov-lg"><span><i style="background:#1E6FD9"></i>Năm 2025: <b>${p.s25}</b></span><span><i style="background:#0B2A5B"></i>Năm 2026: <b>${p.s26}</b></span></div></div>
        <div class="kpis">${OVERVIEW.kpis.map(k => S.loading.has('all') ? `<div class="kpi skel-k"></div>` : `
          <div class="kpi" data-bid="${k.id}" data-act="kpi" data-id="${k.id}" style="background:${k.color}">
            <div class="kpi-h"><span class="kpi-ic">${ic(k.icon, 15)}</span>${k.title}</div>
            ${k.rows ? k.rows.map(r => `<div class="kpi-r"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('') : `<div class="kpi-v">${S.mode === 'empty' ? '--' : k.total}</div><div class="kpi-n">${k.note}</div>`}
          </div>`).join('')}</div>`;
    }
    return `${header('Báo cáo tổng quan')}<div class="ph-body" id="phBody">${body}</div>${bottomNav('report')}`;
  }
  function ovBars(ch) {
    const n = 12, gw = 40, H = 170, top = 22, bot = 22, ph = H - top - bot, W = n * gw + 10;
    const max = Math.max(...ch.series.flatMap(s => s.data)) * 1.05;
    const min = Math.min(...ch.series.flatMap(s => s.data).filter(Boolean)) * 0.8;
    let svg = '';
    for (let i = 0; i < n; i++) {
      const gx = 5 + i * gw;
      let lab = 0, my = top + ph;
      ch.series.forEach((s, si) => {
        const v = s.data[i]; if (!v) return;
        const h = (v - min) / (max - min) * ph; const y = top + ph - h;
        svg += `<rect x="${gx + 6 + si * 14}" y="${y}" width="13" height="${h}" fill="${s.color}" rx="1.5"/>`;
        my = Math.min(my, y); lab = v;
      });
      if (lab) svg += `<text x="${gx + gw / 2}" y="${my - 5}" class="bl">${lab}</text>`;
      svg += `<text x="${gx + gw / 2}" y="${H - 6}" class="xl">${i + 1}</text>`;
    }
    return `<div class="hscroll"><svg width="${W}" height="${H}" class="bars">${svg}</svg></div>`;
  }

  function detailScreen() {
    const t = TABS[TABIDX[S.tab]];
    const tabs = TABS.map(x => `<button class="${x.key === S.tab ? 'on' : ''}" data-act="tab" data-k="${x.key}">${x.name}</button>`).join('');
    let body = renderBlocks(t.blocks);
    if (S.mode === 'error' && !body.includes('err')) body += `<div class="empty err">Không tải được dữ liệu, kéo xuống để thử lại</div>`;
    return `${header('Báo cáo tổng quan', true)}<div class="tabbar" id="tabBar">${tabs}</div><div class="ph-body detail" id="phBody"><div class="ptr" id="ptr">${ic('spin', 18, 'rot')}</div>${body}<div style="height:24px"></div></div>`;
  }

  function realScreen() {
    const key = S.screen === 'detail' ? S.tab : 'ov';
    const list = IMGS[key] || [];
    const i = Math.min(S.realIdx, list.length - 1);
    return `<div class="real"><img src="images/${list[i]}.jpg" alt="Ảnh chụp thực tế"><div class="real-nav"><button data-act="real-prev">‹</button><span>${i + 1} / ${list.length}</span><button data-act="real-next">›</button></div></div>`;
  }

  // ---------- sheets ----------
  function sheetHTML() {
    const sh = S.sheet; if (!sh) return '';
    if (sh.kind === 'filter') {
      const b = BLK[sh.id].b, d = sh.draft;
      const keys = b.filters;
      const rows = keys.filter(k => k !== 'denngay').map(k => {
        if (k === 'tungay') return `<div class="fr"><label>Từ ngày – Đến ngày</label><div class="frd"><button data-act="pick" data-k="tungay">${dmy(d.tungay)}</button><span>–</span><button data-act="pick" data-k="denngay">${dmy(d.denngay)}</button></div></div>`;
        const val = k === 'ky' ? (d.ky === 'Tất cả' ? 'Tất cả' : 'Kỳ ' + d.ky) : k === 'dot' ? (d.dot ? 'Đợt ' + d.dot : 'Tất cả đợt') : k === 'nam' ? d.nam : d[k];
        return `<div class="fr"><label>${FLABEL[k]}</label><button class="fsel" data-act="pick" data-k="${k}"><span>${esc(val)}</span>${ic('chev', 16)}</button></div>`;
      }).join('');
      return `<div class="sheet-bg" data-act="sheet-close"></div><div class="sheet">
        <div class="grip"></div><div class="sh-h"><b>Bộ lọc</b><button data-act="sheet-close">${ic('close', 18)}</button></div>
        ${rows}${sh.err ? `<div class="ferr">${sh.err}</div>` : ''}
        <div class="sh-btns"><button class="btn-o" data-act="f-reset">Xóa filter</button><button class="btn-p" data-act="f-apply">${sh.busy ? ic('spin', 18, 'rot') : 'Áp dụng'}</button></div></div>${pickerHTML()}`;
    }
    if (sh.kind === 'year') return `<div class="sheet-bg" data-act="sheet-close"></div>${pickerHTML()}`;
    return '';
  }
  function pickerHTML() {
    const p = S.sheet && S.sheet.pick; if (!p) return '';
    const d = S.sheet.draft || {};
    if (p === 'tungay' || p === 'denngay') {
      return `<div class="sheet pick"><div class="grip"></div><div class="sh-h"><b>${FLABEL[p]}</b><button data-act="pick-close">${ic('close', 18)}</button></div>
        <input type="date" class="dinp" id="dateInp" value="${d[p]}" max="${TODAY}"><div class="sh-btns"><button class="btn-p" data-act="date-done" data-k="${p}">Xong</button></div></div>`;
    }
    const list = p === 'nam' ? ['2026', '2025', '2024', '2023'] : p === 'ky' ? ['Tất cả', ...NUM(12)] : p === 'dot' ? ['Tất cả', ...NUM(6)] : p === 'phuong' ? ['Tất cả', ...WARDS] :
      ['Tất cả', 'Đăng ký định mức', 'Sang tên ĐHN', 'Thắc mắc về thanh toán hoá đơn', 'Mở nước', 'Kiểm tra Đồng hồ nước', 'Nội dung khác'];
    const title = p === 'nam' ? 'Chọn năm' : 'Chọn ' + FLABEL[p].toLowerCase();
    const cur = p === 'dot' ? (d.dot || 'Tất cả') : d[p];
    return `<div class="sheet pick"><div class="grip"></div><div class="sh-h"><b>${title}</b><button data-act="pick-close">${ic('close', 18)}</button></div>
      <div class="plist">${list.map(x => `<button class="${String(cur) === x ? 'on' : ''}" data-act="pick-set" data-k="${p}" data-v="${esc(x)}">${p === 'ky' && x !== 'Tất cả' ? 'Kỳ ' + x : p === 'dot' && x !== 'Tất cả' ? 'Đợt ' + x : esc(x)}${String(cur) === x ? ic('check', 16) : ''}</button>`).join('')}</div></div>`;
  }

  function openFilter(id) {
    const b = BLK[id] && BLK[id].b; if (!b || !b.filters) return;
    if (b.yearOnly) { S.sheet = { kind: 'year', id, draft: { ...getF(id) }, pick: 'nam' }; }
    else S.sheet = { kind: 'filter', id, draft: { ...getF(id) }, open: { ...getF(id) }, pick: null };
    drawSheet();
  }
  function drawSheet() { $('#phSheet').innerHTML = sheetHTML(); }

  function reloadIds(ids, ms = 800) {
    ids.forEach(i => S.loading.add(i)); render();
    setTimeout(() => { ids.forEach(i => S.loading.delete(i)); render(); }, ms);
  }

  // ---------- render ----------
  function render(opt = {}) {
    const scr = $('#phScreen');
    const prev = $('#phBody');
    const key = S.screen + (S.screen === 'detail' ? S.tab : '');
    if (prev && !opt.resetScroll) S.scrollMem[S.lastKey] = prev.scrollTop;
    const tabScroll = $('#tabBar') ? $('#tabBar').scrollLeft : 0;
    const hs = $$('.hscroll', scr).map(x => x.scrollLeft);
    scr.className = 'ph-screen ' + S.screen + (S.real ? ' isreal' : '');
    scr.innerHTML = S.real ? realScreen() : S.screen === 'home' ? homeScreen() : S.screen === 'overview' ? overviewScreen() : detailScreen();
    const body = $('#phBody');
    if (body) body.scrollTop = opt.resetScroll ? 0 : (S.scrollMem[key] || 0);
    if (S.lastKey === key) $$('.hscroll', scr).forEach((x, i) => { if (hs[i] != null) x.scrollLeft = hs[i]; });
    S.lastKey = key;
    const tb = $('#tabBar');
    if (tb) {
      const on = $('button.on', tb);
      if (opt.centerTab && on) tb.scrollLeft = on.offsetLeft - tb.clientWidth / 2 + on.clientWidth / 2;
      else tb.scrollLeft = tabScroll;
    }
    if (S.hl) { const el = $(`[data-bid="${S.hl}"]`, scr); if (el) el.classList.add('hl'); }
    drawSheet();
    syncToolbar();
  }

  function scrollToBid(id) {
    const body = $('#phBody'); const el = body && $(`[data-bid="${id}"]`, body);
    if (!el) return;
    const top = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 12;
    body.scrollTop = top;
  }

  // ---------- go (from doc) ----------
  function parseGo(s) {
    const o = {};
    (s || '').split(';').forEach(p => { const i = p.indexOf(':'); if (i > 0) o[p.slice(0, i).trim()] = p.slice(i + 1).trim(); });
    return o;
  }
  function go(spec) {
    const a = typeof spec === 'string' ? parseGo(spec) : spec;
    S.sheet = null; S.tip = null; S.real = false; S.realIdx = 0;
    S.mode = a.mode && a.mode !== 'skeleton' ? a.mode : null;
    if (a.tab) { S.screen = 'detail'; S.tab = a.tab; }
    else if (a.screen) S.screen = a.screen;
    if (a.pill != null) S.pill = +a.pill;
    const t = a.target;
    const info = t && BLK[t];
    if (info) {
      info.parents.forEach(p => { if (p.kind === 'group') S.collapsed[p.id] = false; if (p.kind === 'seg') S.seg[p.id] = p.pane; });
      if (BLK[t].b.t === 'group') S.collapsed[t] = false;
    }
    if (a.seg != null && t) S.seg[t] = +a.seg;
    if (a.view && t) S.view[t] = a.view;
    if (t && a.view == null && info && info.b.t === 'card') S.view[t] = 'chart';
    if (a.tip != null && t) S.tip = { id: t, i: +a.tip };
    if (a.sel != null && t) S.sel[t] = +a.sel;
    if (a.collapse && t) S.collapsed[t] = true;
    S.hl = t || null;
    render({ resetScroll: true, centerTab: true });
    if (t) setTimeout(() => scrollToBid(t), 60);
    if (a.mode === 'skeleton') { S.loading.add('all'); render(); setTimeout(() => { S.loading.delete('all'); render(); }, 1800); }
    if (a.open === 'filter' && t) setTimeout(() => openFilter(info && info.b.filters ? t : (info && info.parents.length ? info.parents[info.parents.length - 1].id : t)), 450);
    if (a.open === 'filter' && !info) setTimeout(() => openFilter(t), 450);
    clearTimeout(go._t);
    go._t = setTimeout(() => { S.hl = null; $$('.hl', $('#phScreen')).forEach(e => e.classList.remove('hl')); }, 5000);
    if (window.innerWidth < 1100) document.body.classList.add('show-phone');
  }
  window.HDSD_GO = go;

  // ---------- phone events ----------
  function onPhoneClick(e) {
    const el = e.target.closest('[data-act]');
    const scr = $('#phScreen');
    if (!el) { if (S.tip) { S.tip = null; render(); } return; }
    const act = el.dataset.act, id = el.dataset.id;
    switch (act) {
      case 'nav-report': S.screen = 'overview'; S.hl = null; render({ resetScroll: true }); break;
      case 'nav-home': S.screen = 'home'; render({ resetScroll: true }); break;
      case 'back': S.screen = 'overview'; render(); break;
      case 'pill': S.pill = +el.dataset.i; render(); break;
      case 'kpi': {
        const k = OVERVIEW.kpis.find(x => x.id === id);
        S.screen = 'detail'; S.tab = k.tab; S.tip = null;
        if (k.seg != null) S.seg['thay-seg'] = k.seg;
        render({ resetScroll: true, centerTab: true });
        if (k.target) { S.collapsed[k.target] = false; render(); setTimeout(() => scrollToBid(k.target), 60); }
        break;
      }
      case 'tab': S.tab = el.dataset.k; S.tip = null; render({ centerTab: true }); break;
      case 'view': S.view[id] = el.dataset.v; S.tip = null; render(); break;
      case 'seg': S.seg[id] = +el.dataset.i; S.tip = null;
        if (BLK[id] && !BLK[id].b.panes) reloadIds(['all'], 600); else render();
        break;
      case 'collapse': if (e.target.closest('.fbtn')) return; S.collapsed[id] = !S.collapsed[id]; render(); break;
      case 'filter': e.stopPropagation(); openFilter(id); break;
      case 'tip': e.stopPropagation(); S.tip = S.tip && S.tip.id === id && S.tip.i === +el.dataset.i ? null : { id, i: +el.dataset.i }; render(); break;
      case 'series': {
        const h = S.hidden[id] || (S.hidden[id] = []);
        const n = el.dataset.name; const ix = h.indexOf(n);
        if (ix >= 0) h.splice(ix, 1); else h.push(n);
        render(); break;
      }
      case 'slice': e.stopPropagation(); S.sel[id] = S.sel[id] === +el.dataset.i ? null : +el.dataset.i; render(); break;
      case 'unsel': if (S.sel[id] != null) { S.sel[id] = null; render(); } break;
      case 'retry': S.mode = null; reloadIds(['all'], 900); break;
      case 'real-prev': S.realIdx = Math.max(0, S.realIdx - 1); render(); break;
      case 'real-next': S.realIdx = Math.min((IMGS[S.screen === 'detail' ? S.tab : 'ov'] || []).length - 1, S.realIdx + 1); render(); break;
    }
    void scr;
  }

  function onSheetClick(e) {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const sh = S.sheet; if (!sh) return;
    const act = el.dataset.act;
    if (act === 'sheet-close') { S.sheet = null; drawSheet(); return; }
    if (act === 'pick') { sh.pick = el.dataset.k; drawSheet(); return; }
    if (act === 'pick-close') { if (sh.kind === 'year') S.sheet = null; else sh.pick = null; drawSheet(); return; }
    if (act === 'pick-set') {
      const k = el.dataset.k, v = el.dataset.v;
      sh.draft[k] = k === 'dot' && v === 'Tất cả' ? null : v;
      sh.pick = null; sh.err = null;
      if (sh.kind === 'year') {
        const b = BLK[sh.id].b;
        const ids = b.shareYear ? Object.keys(BLK).filter(x => BLK[x].b.shareYear === b.shareYear) : [sh.id];
        ids.forEach(x => { getF(x).nam = v; });
        S.sheet = null; drawSheet(); reloadIds(ids, 700); return;
      }
      if (k === 'ky' && sh.draft.tungay && BLK[sh.id].b.filters.includes('tungay') && v !== 'Tất cả') {
        const m = String(v).padStart(2, '0'), y = sh.draft.nam;
        const last = new Date(+y, +v, 0).getDate();
        sh.draft.tungay = `${y}-${m}-01`;
        const end = `${y}-${m}-${String(last).padStart(2, '0')}`;
        sh.draft.denngay = end > TODAY ? TODAY : end;
      }
      drawSheet(); return;
    }
    if (act === 'date-done') {
      const k = el.dataset.k, v = $('#dateInp').value;
      const d = { ...sh.draft, [k]: v };
      let err = null;
      if (!v) err = 'Vui lòng chọn ngày.';
      else if (d.denngay < d.tungay) err = '"Đến ngày" không được trước "Từ ngày".';
      else if (v > TODAY) err = 'Không được chọn sau ngày hôm nay.';
      else if (BLK[sh.id].b.filters.includes('tungay') && d.ky !== 'Tất cả') {
        const m = `${d.nam}-${String(d.ky).padStart(2, '0')}`;
        if (!v.startsWith(m)) err = 'Ngày phải nằm trong tháng của kỳ đã chọn.';
      }
      if (!err) sh.draft = d;
      sh.err = err; sh.pick = null; drawSheet(); return;
    }
    if (act === 'f-reset') {
      const b = BLK[sh.id].b;
      if (b.reset === 'keep') { sh.draft.phuong = 'Tất cả'; sh.draft.noidung = 'Tất cả'; }
      else if (b.reset === 'open') sh.draft = { ...sh.open };
      else sh.draft = { ...FDEF };
      sh.err = null; drawSheet(); return;
    }
    if (act === 'f-apply') {
      if (sh.err) return;
      sh.busy = true; drawSheet();
      setTimeout(() => {
        const id = sh.id, b = BLK[id].b;
        const yearChanged = (S.filt[id] || FDEF).nam !== sh.draft.nam;
        S.filt[id] = { ...sh.draft };
        S.sheet = null; drawSheet();
        if (b.reloadTab && yearChanged) reloadIds(['all'], 900);
        else {
          const ids = [id];
          if (b.t === 'group') b.children.forEach(c => ids.push(c.id));
          if (b.filterOf) ids.push(b.filterOf, b.filterOf + '2');
          reloadIds(ids, 500);
        }
      }, 650);
    }
  }

  function onPhoneInput(e) {
    if (e.target.dataset.act !== 'search') return;
    const q = e.target.value.trim().toLowerCase();
    $$('.rk', e.target.closest('.card')).forEach(r => { r.style.display = !q || r.dataset.name.includes(q) ? '' : 'none'; });
  }

  // drag: pull-to-refresh & swipe tabs
  let drag = null;
  function onDown(e) {
    const body = e.target.closest('#phBody'); if (!body || e.target.closest('.hscroll,input,.sheet')) return;
    drag = { x: e.clientX, y: e.clientY, top: body.scrollTop, t: Date.now() };
  }
  function onMove(e) {
    if (!drag) return;
    const dy = e.clientY - drag.y; const p = $('#ptr');
    if (p && drag.top <= 0 && dy > 0) { p.style.height = Math.min(dy, 70) + 'px'; p.style.opacity = Math.min(dy / 60, 1); }
  }
  function onUp(e) {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y; const p = $('#ptr');
    if (p) { p.style.height = ''; p.style.opacity = ''; }
    if (drag.top <= 0 && dy > 70 && Math.abs(dx) < 60) refresh();
    else if (S.screen === 'detail' && Math.abs(dx) > 90 && Math.abs(dy) < 50) {
      const i = TABIDX[S.tab] + (dx < 0 ? 1 : -1);
      if (TABS[i]) { S.tab = TABS[i].key; S.tip = null; render({ centerTab: true }); }
    }
    drag = null;
  }
  function refresh() {
    S.mode = null; S.tip = null;
    if (S.screen === 'detail') {
      const t = TABS[TABIDX[S.tab]];
      Object.keys(BLK).filter(k => BLK[k].tab === t.key).forEach(k => { delete S.filt[k]; });
    }
    reloadIds(['all'], 1000);
  }

  // ---------- toolbar ----------
  function syncToolbar() {
    const r = $('#tbReal'); if (r) r.classList.toggle('on', S.real);
    const m = $('#tbMode'); if (m) m.value = S.mode || (S.loading.has('all') ? 'skeleton' : '');
    const lbl = $('#phLoc');
    if (lbl) lbl.textContent = S.screen === 'home' ? 'Trang chủ' : S.screen === 'overview' ? 'Báo cáo tổng quan' : 'Báo cáo chi tiết › ' + TABS[TABIDX[S.tab]].name;
  }
  function initToolbar() {
    $('#tbHome').onclick = () => { S.real = false; S.screen = 'home'; S.mode = null; render({ resetScroll: true }); };
    $('#tbRefresh').onclick = refresh;
    $('#tbReal').onclick = () => { S.real = !S.real; S.realIdx = 0; render(); };
    $('#tbMode').onchange = e => {
      const v = e.target.value;
      if (v === 'skeleton') { S.mode = null; S.loading.add('all'); render(); setTimeout(() => { S.loading.delete('all'); render(); }, 2000); }
      else { S.mode = v || null; render(); }
    };
  }

  // ---------- doc content for tabs ----------
  function compTitle(b) {
    if (b.t === 'banner') return b.tl;
    if (b.t === 'sawaco') return 'Khung tóm tắt KH đã tải app';
    if (b.t === 'seg') return 'Công tắc ' + b.options.join(' / ');
    if (b.t === 'tiles') return b.title || 'Ô chỉ số';
    if (b.t === 'qlgt') return 'Khách hàng theo phường';
    return b.title;
  }
  function compType(b) { return b.t === 'card' ? TYPE_NAME[b.chart.type] : TYPE_NAME[b.t]; }
  function buildTabDocs() {
    const host = $('#tabDocs');
    host.innerHTML = TABS.map((t, i) => {
      const num = `4.${i + 1}`;
      const comps = [];
      const walk = list => list.forEach(b => {
        if (b.d) comps.push(b);
        if (b.t === 'group') b.children.forEach(c => { if (c.t === 'card' && c.title) comps.push({ ...c, _child: true }); });
        if (b.panes) b.panes.forEach(p => walk(p));
      });
      walk(t.blocks);
      const compHTML = comps.map(b => {
        const f = b.filters ? `<div class="chips">${b.yearOnly ? '<span>Chọn năm</span>' : b.filters.filter(k => k !== 'denngay').map(k => `<span>${k === 'tungay' ? 'Từ ngày – Đến ngày' : FLABEL[k]}</span>`).join('')}</div>` : '';
        return `<div class="comp ${b._child ? 'child' : ''}" id="c-${b.id}" data-toc="3" data-toc-label="${esc(compTitle(b))}" data-go="tab:${t.key};target:${b.id}">
          <div class="comp-top"><span class="badge">${compType(b)}</span><b>${esc(compTitle(b))}</b><button class="go-btn sm" data-go="tab:${t.key};target:${b.id}">Xem ▸</button></div>
          ${b.d ? `<p>${b.d}</p>` : ''}${f}</div>`;
      }).join('');
      const steps = t.steps.map((s, k) => `<li data-go="${s[1]}"><span class="sn">Bước ${k + 1}</span><span class="st">${s[0]}</span><button class="go-btn" data-go="${s[1]}">Xem trên app ▸</button></li>`).join('');
      const imgs = (IMGS[t.key] || []).map(n => `<img loading="lazy" src="images/${n}.jpg" alt="${t.name}" data-lb="images/${n}.jpg">`).join('');
      return `<section class="doc-sec tab-sec" id="tab-${t.key}" data-toc="2" data-toc-label="${num} ${t.name}" data-go="tab:${t.key}">
        <h3><span class="num">${num}</span> Tab ${t.name}</h3>
        <p class="purpose"><b>Mục đích nghiệp vụ:</b> ${t.purpose}</p>
        <h4>Các bước thao tác</h4><ol class="steps">${steps}</ol>
        <h4>Thành phần màn hình</h4><div class="comps">${compHTML}</div>
        ${t.notes.length ? `<div class="note"><b>Lưu ý</b><ul>${t.notes.map(n => `<li>${n}</li>`).join('')}</ul></div>` : ''}
        ${imgs ? `<h4>Ảnh chụp thực tế</h4><div class="gallery">${imgs}</div>` : ''}
      </section>`;
    }).join('');
  }

  // ---------- tree ----------
  function buildTree() {
    const nodes = $$('#content [data-toc]');
    const root = []; const stack = [];
    nodes.forEach(el => {
      const lv = +el.dataset.toc;
      const n = { el, lv, label: el.dataset.tocLabel || el.textContent.trim(), kids: [] };
      while (stack.length && stack[stack.length - 1].lv >= lv) stack.pop();
      (stack.length ? stack[stack.length - 1].kids : root).push(n);
      stack.push(n);
    });
    let uid = 0;
    const html = (list, depth) => `<ul class="tree d${depth}">${list.map(n => {
      const id = 'tn' + (uid++); n.el.dataset.tn = id;
      const has = n.kids.length > 0;
      const open = depth === 1;
      return `<li class="${has ? 'has' : ''} ${open ? 'open' : ''}"><div class="tn" data-tn="${id}">${has ? `<button class="tw" aria-label="Mở/đóng">${ic('right', 12)}</button>` : '<span class="tw-sp"></span>'}<span class="tl">${esc(n.label)}</span>${n.el.dataset.go ? '<span class="tgo" title="Có màn hình mô phỏng">▸</span>' : ''}</div>${has ? html(n.kids, depth + 1) : ''}</li>`;
    }).join('')}</ul>`;
    $('#tree').innerHTML = html(root, 1);
  }
  function initTree() {
    $('#tree').addEventListener('click', e => {
      const tw = e.target.closest('.tw');
      const row = e.target.closest('.tn'); if (!row) return;
      const li = row.parentElement;
      if (tw) { li.classList.toggle('open'); return; }
      const el = $(`#content [data-tn="${row.dataset.tn}"]`);
      if (li.classList.contains('has')) li.classList.add('open');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1400);
        if (el.dataset.go) go(el.dataset.go);
      }
      setActive(row.dataset.tn);
      document.body.classList.remove('show-nav');
    });
    $('#treeSearch').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      $$('#tree li').forEach(li => {
        const hit = !q || li.textContent.toLowerCase().includes(q);
        li.style.display = hit ? '' : 'none';
        if (q && hit && li.classList.contains('has')) li.classList.add('open');
      });
    });
    const obs = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting && +en.target.dataset.toc < 3) setActive(en.target.dataset.tn, true); });
    }, { rootMargin: '-80px 0px -70% 0px' });
    $$('#content [data-toc]').forEach(el => obs.observe(el));
  }
  function setActive(tn, soft) {
    $$('#tree .tn.on').forEach(x => x.classList.remove('on'));
    const row = $(`#tree .tn[data-tn="${tn}"]`); if (!row) return;
    row.classList.add('on');
    let p = row.parentElement.parentElement.closest('li');
    while (p) { p.classList.add('open'); p = p.parentElement.closest('li'); }
    if (soft) { const nav = $('#nav'); const r = row.getBoundingClientRect(), nr = nav.getBoundingClientRect(); if (r.top < nr.top + 60 || r.bottom > nr.bottom - 20) row.scrollIntoView({ block: 'nearest' }); }
  }

  // ---------- doc events ----------
  function initDoc() {
    document.addEventListener('click', e => {
      const g = e.target.closest('.go-btn, .kpi-link');
      if (g && g.dataset.go) {
        e.preventDefault();
        $$('.steps li.act').forEach(x => x.classList.remove('act'));
        const li = g.closest('li'); if (li) li.classList.add('act');
        go(g.dataset.go);
        return;
      }
      const im = e.target.closest('[data-lb]');
      if (im) { $('#lbImg').src = im.dataset.lb; $('#lightbox').classList.add('on'); return; }
      if (e.target.closest('#lightbox')) $('#lightbox').classList.remove('on');
      if (e.target.closest('#btnNav')) document.body.classList.toggle('show-nav');
      if (e.target.closest('#btnPhone')) document.body.classList.toggle('show-phone');
      if (e.target.closest('#scrim')) document.body.classList.remove('show-nav', 'show-phone');
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { $('#lightbox').classList.remove('on'); document.body.classList.remove('show-nav', 'show-phone'); } });
    const ph = $('#phone');
    ph.addEventListener('click', e => { if (e.target.closest('#phSheet')) onSheetClick(e); else onPhoneClick(e); });
    ph.addEventListener('input', onPhoneInput);
    ph.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    const tb = $('#themeBtn');
    if (tb) tb.onclick = () => {
      const r = document.documentElement;
      const dark = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('hdsd-theme', r.dataset.theme); } catch (_) { }
    };
    try { const t = localStorage.getItem('hdsd-theme'); if (t) document.documentElement.dataset.theme = t; } catch (_) { }
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildTabDocs();
    buildTree();
    initTree();
    initDoc();
    initToolbar();
    render();
  });
})();
