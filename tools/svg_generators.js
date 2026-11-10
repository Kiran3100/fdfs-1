// SVG Diagram Generator Module for DI Questions
// Produces clean, elegant, high-contrast, modern SVG diagrams.

function generatePieChartSvg(title, subtitle, totalText, slices) {
  // slices = [{ label: 'English', percent: 18, color: '#4F46E5' }, ...]
  const width = 580;
  const height = 360;
  const cx = 200;
  const cy = 200;
  const r = 130;

  let currentAngle = -90; // start at 12 o'clock
  let paths = [];
  let legendItems = [];

  const totalVal = slices.reduce((acc, s) => acc + (s.percent !== undefined ? s.percent : s.degrees), 0);
  const isDegree = slices.some(s => s.degrees !== undefined);

  slices.forEach((slice, idx) => {
    const val = isDegree ? slice.degrees : slice.percent;
    const sliceAngle = (val / totalVal) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const pathD = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

    // Mid angle for slice text
    const midRad = ((startAngle + sliceAngle / 2) * Math.PI) / 180;
    const textR = r * 0.68;
    const tx = cx + textR * Math.cos(midRad);
    const ty = cy + textR * Math.sin(midRad);

    const displayVal = isDegree ? `${slice.degrees}°` : `${slice.percent}%`;

    paths.push(`
      <path d="${pathD}" fill="${slice.color}" stroke="#ffffff" stroke-width="2.5" />
      <text x="${tx.toFixed(1)}" y="${(ty + 4).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#ffffff" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.6))">${displayVal}</text>
    `);

    // Legend
    const ly = 90 + idx * 36;
    legendItems.push(`
      <g transform="translate(380, ${ly})">
        <rect x="0" y="0" width="18" height="18" rx="4" fill="${slice.color}" stroke="#cbd5e1" stroke-width="1" />
        <text x="26" y="14" font-size="13" font-weight="600" fill="#1e293b">${slice.label} (${displayVal})</text>
      </g>
    `);
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" style="max-width: ${width}px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin: 12px 0;">
    <rect width="${width}" height="${height}" fill="#f8fafc" rx="12" />
    <rect x="0" y="0" width="${width}" height="64" fill="#ffffff" rx="12" />
    <line x1="0" y1="64" x2="${width}" y2="64" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="24" y="28" font-size="16" font-weight="700" fill="#0f172a">${title}</text>
    <text x="24" y="48" font-size="12" font-weight="500" fill="#64748b">${subtitle}</text>
    ${totalText ? `<rect x="${width - 170}" y="14" width="146" height="36" rx="6" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1" />
    <text x="${width - 97}" y="37" font-size="13" font-weight="700" fill="#1d4ed8" text-anchor="middle">${totalText}</text>` : ''}
    <g>
      ${paths.join('')}
    </g>
    <g>
      ${legendItems.join('')}
    </g>
  </svg>`;
}

function generateDoublePieSvg(title, chart1, chart2) {
  // chart1: { title: 'Scale I', total: 'Total: 250', slices: [...] }
  // chart2: { title: 'Scale II', total: 'Total: 120', slices: [...] }
  const width = 760;
  const height = 400;

  function renderPie(chart, cx, cy, r) {
    let currentAngle = -90;
    let paths = [];
    let legendItems = [];
    const totalVal = chart.slices.reduce((acc, s) => acc + s.percent, 0);

    chart.slices.forEach((slice, idx) => {
      const sliceAngle = (slice.percent / totalVal) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle = endAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);
      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathD = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

      const midRad = ((startAngle + sliceAngle / 2) * Math.PI) / 180;
      const tx = cx + r * 0.65 * Math.cos(midRad);
      const ty = cy + r * 0.65 * Math.sin(midRad);

      paths.push(`
        <path d="${pathD}" fill="${slice.color}" stroke="#ffffff" stroke-width="2" />
        <text x="${tx.toFixed(1)}" y="${(ty + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.7))">${slice.percent}%</text>
      `);

      const legX = cx - r;
      const legY = cy + r + 24 + Math.floor(idx / 3) * 22;
      const colX = legX + (idx % 3) * 95;
      legendItems.push(`
        <rect x="${colX}" y="${legY}" width="12" height="12" rx="3" fill="${slice.color}" />
        <text x="${colX + 16}" y="${legY + 10}" font-size="11" font-weight="600" fill="#1e293b">${slice.label}</text>
      `);
    });

    return `
      <g>
        <text x="${cx}" y="${cy - r - 22}" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">${chart.title}</text>
        <rect x="${cx - 50}" y="${cy - r - 16}" width="100" height="20" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="${cx}" y="${cy - r - 2}" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">${chart.total}</text>
        ${paths.join('')}
        ${legendItems.join('')}
      </g>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" style="max-width: ${width}px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 12px 0;">
    <rect width="${width}" height="${height}" fill="#f8fafc" rx="12" />
    <rect x="0" y="0" width="${width}" height="50" fill="#ffffff" rx="12" />
    <line x1="0" y1="50" x2="${width}" y2="50" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="24" y="32" font-size="16" font-weight="700" fill="#0f172a">${title}</text>
    ${renderPie(chart1, 190, 185, 95)}
    <line x1="380" y1="65" x2="380" y2="${height - 20}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4" />
    ${renderPie(chart2, 570, 185, 95)}
  </svg>`;
}

function generatePieAndTableSvg(title, pieChart, table) {
  // pieChart: { title: '...', total: '...', slices: [...] }
  // table: { title: '...', headers: ['Col1', 'Col2'], rows: [['A', '50% more'], ...] }
  const width = 760;
  const height = 400;
  const cx = 175;
  const cy = 200;
  const r = 105;

  let currentAngle = -90;
  let paths = [];
  let legendItems = [];
  const totalVal = pieChart.slices.reduce((acc, s) => acc + s.percent, 0);

  pieChart.slices.forEach((slice, idx) => {
    const sliceAngle = (slice.percent / totalVal) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = sliceAngle > 180 ? 1 : 0;
    const pathD = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

    const midRad = ((startAngle + sliceAngle / 2) * Math.PI) / 180;
    const tx = cx + r * 0.65 * Math.cos(midRad);
    const ty = cy + r * 0.65 * Math.sin(midRad);

    paths.push(`
      <path d="${pathD}" fill="${slice.color}" stroke="#ffffff" stroke-width="2" />
      <text x="${tx.toFixed(1)}" y="${(ty + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff" filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.7))">${slice.percent}%</text>
    `);

    const ly = 320 + Math.floor(idx / 3) * 22;
    const lx = 35 + (idx % 3) * 100;
    legendItems.push(`
      <rect x="${lx}" y="${ly}" width="12" height="12" rx="3" fill="${slice.color}" />
      <text x="${lx + 16}" y="${ly + 10}" font-size="11" font-weight="600" fill="#1e293b">${slice.label}</text>
    `);
  });

  // Table rendering
  let tableRowsSvg = [];
  const startX = 350;
  const startY = 80;
  const colW1 = 140;
  const colW2 = 230;
  const totalTableW = colW1 + colW2;
  const rowH = 34;

  // Header row
  tableRowsSvg.push(`
    <rect x="${startX}" y="${startY}" width="${totalTableW}" height="${rowH}" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
    <text x="${startX + 16}" y="${startY + 22}" font-size="12" font-weight="700" fill="#1e293b">${table.headers[0]}</text>
    <text x="${startX + colW1 + 16}" y="${startY + 22}" font-size="12" font-weight="700" fill="#1e293b">${table.headers[1]}</text>
  `);

  table.rows.forEach((row, rIdx) => {
    const curY = startY + (rIdx + 1) * rowH;
    const bg = rIdx % 2 === 0 ? '#ffffff' : '#f8fafc';
    tableRowsSvg.push(`
      <rect x="${startX}" y="${curY}" width="${totalTableW}" height="${rowH}" fill="${bg}" stroke="#cbd5e1" stroke-width="1" />
      <text x="${startX + 16}" y="${curY + 22}" font-size="12" font-weight="600" fill="#334155">${row[0]}</text>
      <text x="${startX + colW1 + 16}" y="${curY + 22}" font-size="12" font-weight="700" fill="#0f172a">${row[1]}</text>
    `);
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" style="max-width: ${width}px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 12px 0;">
    <rect width="${width}" height="${height}" fill="#f8fafc" rx="12" />
    <rect x="0" y="0" width="${width}" height="50" fill="#ffffff" rx="12" />
    <line x1="0" y1="50" x2="${width}" y2="50" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="24" y="32" font-size="15" font-weight="700" fill="#0f172a">${title}</text>
    <text x="${cx}" y="76" text-anchor="middle" font-size="13" font-weight="700" fill="#334155">${pieChart.title}</text>
    <g>
      ${paths.join('')}
      ${legendItems.join('')}
    </g>
    <line x1="330" y1="65" x2="330" y2="${height - 20}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 4" />
    <g>
      <text x="${startX + totalTableW / 2}" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="#334155">${table.title || ''}</text>
      ${tableRowsSvg.join('')}
    </g>
  </svg>`;
}

function generateTableSvg(title, headers, rows) {
  // headers: ['Shops / Years', 'V', 'W', 'X', 'Y', 'Z']
  // rows: [['2016', '506', '250', ...], ...]
  const colCount = headers.length;
  const colW = 88;
  const firstColW = 120;
  const totalW = firstColW + (colCount - 1) * colW + 40;
  const rowH = 36;
  const startX = 20;
  const startY = 70;
  const height = startY + (rows.length + 1) * rowH + 25;

  let contentSvg = [];

  // Header
  contentSvg.push(`
    <rect x="${startX}" y="${startY}" width="${totalW - 40}" height="${rowH}" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
  `);
  headers.forEach((h, i) => {
    const x = i === 0 ? startX + 16 : startX + firstColW + (i - 1) * colW + colW / 2;
    const anchor = i === 0 ? 'start' : 'middle';
    contentSvg.push(`<text x="${x}" y="${startY + 23}" font-size="12" font-weight="700" fill="#0f172a" text-anchor="${anchor}">${h}</text>`);
  });

  rows.forEach((r, rIdx) => {
    const y = startY + (rIdx + 1) * rowH;
    const bg = rIdx % 2 === 0 ? '#ffffff' : '#f8fafc';
    contentSvg.push(`
      <rect x="${startX}" y="${y}" width="${totalW - 40}" height="${rowH}" fill="${bg}" stroke="#e2e8f0" stroke-width="1" />
    `);
    r.forEach((val, i) => {
      const x = i === 0 ? startX + 16 : startX + firstColW + (i - 1) * colW + colW / 2;
      const anchor = i === 0 ? 'start' : 'middle';
      const weight = i === 0 ? '600' : '500';
      contentSvg.push(`<text x="${x}" y="${y + 23}" font-size="12" font-weight="${weight}" fill="#1e293b" text-anchor="${anchor}">${val}</text>`);
    });
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${height}" width="100%" height="auto" style="max-width: ${totalW}px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 12px 0;">
    <rect width="${totalW}" height="${height}" fill="#f8fafc" rx="12" />
    <rect x="0" y="0" width="${totalW}" height="50" fill="#ffffff" rx="12" />
    <line x1="0" y1="50" x2="${totalW}" y2="50" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="24" y="32" font-size="15" font-weight="700" fill="#0f172a">${title}</text>
    <g>
      ${contentSvg.join('')}
    </g>
  </svg>`;
}

function generateGroupedBarSvg(title, subtitle, categories, series1, series2, maxY = 300) {
  // categories: ['A', 'B', 'C', 'D']
  // series1: { name: 'Sunday', color: '#6366f1', values: [220, 160, 180, 200] }
  // series2: { name: 'Monday', color: '#0f172a', values: [160, 180, 230, 170] }
  const width = 640;
  const height = 370;
  const startX = 65;
  const startY = 80;
  const plotW = 530;
  const plotH = 210;

  let yAxisSvg = [];
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const val = (maxY / yTicks) * i;
    const y = startY + plotH - (i / yTicks) * plotH;
    yAxisSvg.push(`
      <line x1="${startX}" y1="${y}" x2="${startX + plotW}" y2="${y}" stroke="#e2e8f0" stroke-width="1" />
      <text x="${startX - 10}" y="${y + 4}" font-size="11" font-weight="600" fill="#64748b" text-anchor="end">${Math.round(val)}</text>
    `);
  }

  let barsSvg = [];
  const groupW = plotW / categories.length;
  const barW = groupW * 0.28;

  categories.forEach((cat, idx) => {
    const groupCenter = startX + idx * groupW + groupW / 2;
    const v1 = series1.values[idx];
    const v2 = series2.values[idx];

    const h1 = (v1 / maxY) * plotH;
    const y1 = startY + plotH - h1;
    const x1 = groupCenter - barW - 4;

    const h2 = (v2 / maxY) * plotH;
    const y2 = startY + plotH - h2;
    const x2 = groupCenter + 4;

    barsSvg.push(`
      <!-- Bar 1 -->
      <rect x="${x1.toFixed(1)}" y="${y1.toFixed(1)}" width="${barW.toFixed(1)}" height="${h1.toFixed(1)}" rx="4" fill="${series1.color}" />
      <text x="${(x1 + barW / 2).toFixed(1)}" y="${(y1 - 6).toFixed(1)}" font-size="11" font-weight="700" fill="${series1.color}" text-anchor="middle">${v1}</text>
      
      <!-- Bar 2 -->
      <rect x="${x2.toFixed(1)}" y="${y2.toFixed(1)}" width="${barW.toFixed(1)}" height="${h2.toFixed(1)}" rx="4" fill="${series2.color}" />
      <text x="${(x2 + barW / 2).toFixed(1)}" y="${(y2 - 6).toFixed(1)}" font-size="11" font-weight="700" fill="${series2.color}" text-anchor="middle">${v2}</text>

      <!-- Category Label -->
      <text x="${groupCenter.toFixed(1)}" y="${startY + plotH + 24}" font-size="13" font-weight="700" fill="#1e293b" text-anchor="middle">${cat}</text>
    `);
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" style="max-width: ${width}px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 12px 0;">
    <rect width="${width}" height="${height}" fill="#f8fafc" rx="12" />
    <rect x="0" y="0" width="${width}" height="56" fill="#ffffff" rx="12" />
    <line x1="0" y1="56" x2="${width}" y2="56" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="24" y="26" font-size="15" font-weight="700" fill="#0f172a">${title}</text>
    <text x="24" y="44" font-size="12" font-weight="500" fill="#64748b">${subtitle}</text>

    <!-- Legend -->
    <g transform="translate(${width - 220}, 20)">
      <rect x="0" y="0" width="14" height="14" rx="3" fill="${series1.color}" />
      <text x="20" y="11" font-size="12" font-weight="600" fill="#1e293b">${series1.name}</text>
      <rect x="100" y="0" width="14" height="14" rx="3" fill="${series2.color}" />
      <text x="120" y="11" font-size="12" font-weight="600" fill="#1e293b">${series2.name}</text>
    </g>

    <!-- Plot area -->
    <g>
      ${yAxisSvg.join('')}
      <line x1="${startX}" y1="${startY + plotH}" x2="${startX + plotW}" y2="${startY + plotH}" stroke="#94a3b8" stroke-width="1.5" />
      ${barsSvg.join('')}
    </g>
  </svg>`;
}

function generateLineChartSvg(title, subtitle, categories, series1, series2, maxY = 700) {
  // categories: ['A', 'B', 'C', 'D', 'E', 'F']
  // series1: { name: '2016', color: '#0f172a', shape: 'circle', values: [200, 360, 400, 460, 440, 540] }
  // series2: { name: '2017', color: '#6366f1', shape: 'diamond', values: [260, 480, 360, 560, 360, 586] }
  const width = 660;
  const height = 380;
  const startX = 65;
  const startY = 80;
  const plotW = 550;
  const plotH = 220;

  let yAxisSvg = [];
  const yTicks = 7;
  for (let i = 0; i <= yTicks; i++) {
    const val = (maxY / yTicks) * i;
    const y = startY + plotH - (i / yTicks) * plotH;
    yAxisSvg.push(`
      <line x1="${startX}" y1="${y}" x2="${startX + plotW}" y2="${y}" stroke="#e2e8f0" stroke-width="1" />
      <text x="${startX - 10}" y="${y + 4}" font-size="11" font-weight="600" fill="#64748b" text-anchor="end">${Math.round(val)}</text>
    `);
  }

  const stepX = plotW / (categories.length - 1);

  function getCoords(values) {
    return values.map((v, i) => ({
      x: startX + i * stepX,
      y: startY + plotH - (v / maxY) * plotH,
      v: v
    }));
  }

  const pts1 = getCoords(series1.values);
  const pts2 = getCoords(series2.values);

  const path1D = pts1.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const path2D = pts2.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  let markersSvg = [];

  // Series 1 markers
  pts1.forEach(p => {
    markersSvg.push(`
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5.5" fill="${series1.color}" stroke="#ffffff" stroke-width="2" />
      <text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" font-size="10" font-weight="700" fill="${series1.color}" text-anchor="middle">${p.v}</text>
    `);
  });

  // Series 2 markers (diamond / square)
  pts2.forEach(p => {
    markersSvg.push(`
      <polygon points="${p.x.toFixed(1)},${(p.y - 6).toFixed(1)} ${(p.x + 6).toFixed(1)},${p.y.toFixed(1)} ${p.x.toFixed(1)},${(p.y + 6).toFixed(1)} ${(p.x - 6).toFixed(1)},${p.y.toFixed(1)}" fill="${series2.color}" stroke="#ffffff" stroke-width="2" />
      <text x="${p.x.toFixed(1)}" y="${(p.y + 18).toFixed(1)}" font-size="10" font-weight="700" fill="${series2.color}" text-anchor="middle">${p.v}</text>
    `);
  });

  let xLabels = categories.map((c, i) => {
    const x = startX + i * stepX;
    return `<text x="${x.toFixed(1)}" y="${startY + plotH + 24}" font-size="12" font-weight="700" fill="#1e293b" text-anchor="middle">${c}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto" style="max-width: ${width}px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; margin: 12px 0;">
    <rect width="${width}" height="${height}" fill="#f8fafc" rx="12" />
    <rect x="0" y="0" width="${width}" height="56" fill="#ffffff" rx="12" />
    <line x1="0" y1="56" x2="${width}" y2="56" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="24" y="26" font-size="15" font-weight="700" fill="#0f172a">${title}</text>
    <text x="24" y="44" font-size="12" font-weight="500" fill="#64748b">${subtitle}</text>

    <!-- Legend -->
    <g transform="translate(${width - 240}, 20)">
      <circle cx="8" cy="7" r="5" fill="${series1.color}" />
      <text x="20" y="11" font-size="12" font-weight="600" fill="#1e293b">${series1.name}</text>
      
      <polygon points="110,2 115,7 110,12 105,7" fill="${series2.color}" />
      <text x="122" y="11" font-size="12" font-weight="600" fill="#1e293b">${series2.name}</text>
    </g>

    <g>
      ${yAxisSvg.join('')}
      <line x1="${startX}" y1="${startY + plotH}" x2="${startX + plotW}" y2="${startY + plotH}" stroke="#94a3b8" stroke-width="1.5" />
      <path d="${path1D}" fill="none" stroke="${series1.color}" stroke-width="2.5" />
      <path d="${path2D}" fill="none" stroke="${series2.color}" stroke-width="2.5" stroke-dasharray="5 4" />
      ${markersSvg.join('')}
      ${xLabels}
    </g>
  </svg>`;
}

module.exports = {
  generatePieChartSvg,
  generateDoublePieSvg,
  generatePieAndTableSvg,
  generateTableSvg,
  generateGroupedBarSvg,
  generateLineChartSvg
};
