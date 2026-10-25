// Lightweight, zero-dependency SVG Charting Library for Banking Exam Analytics
window.BankCharts = (function() {

  // Donut / Pie Chart (Correct vs Incorrect vs Skipped)
  function renderDonut(containerId, data, options = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const total = data.reduce((acc, d) => acc + (d.value || 0), 0);
    if (total === 0) {
      el.innerHTML = '<div class="chart-empty">No question attempts recorded yet</div>';
      return;
    }

    const size = options.size || 160;
    const strokeWidth = options.strokeWidth || 22;
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = 0;
    let paths = '';

    data.forEach(slice => {
      if (slice.value <= 0) return;
      const fraction = slice.value / total;
      const strokeDasharray = `${fraction * circumference} ${circumference}`;
      const strokeDashoffset = -accumulatedAngle * circumference;
      paths += `
        <circle cx="${center}" cy="${center}" r="${radius}"
          fill="transparent"
          stroke="${slice.color}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDasharray}"
          stroke-dashoffset="${strokeDashoffset}"
          class="donut-segment">
          <title>${slice.label}: ${slice.value} (${(fraction * 100).toFixed(1)}%)</title>
        </circle>
      `;
      accumulatedAngle += fraction;
    });

    const legend = `
      <div class="chart-legend">
        ${data.map(d => `
          <div class="legend-item">
            <span class="legend-color" style="background:${d.color}"></span>
            <span class="legend-name">${d.label}</span>
            <span class="legend-val"><b>${d.value}</b> (${total ? ((d.value/total)*100).toFixed(1) : 0}%)</span>
          </div>
        `).join('')}
      </div>
    `;

    el.innerHTML = `
      <div class="chart-donut-wrap">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="donut-svg">
          <g transform="rotate(-90 ${center} ${center})">
            ${paths}
          </g>
          <text x="${center}" y="${center - 4}" text-anchor="middle" class="donut-center-num">${total}</text>
          <text x="${center}" y="${center + 14}" text-anchor="middle" class="donut-center-lbl">Total Qs</text>
        </svg>
        ${legend}
      </div>
    `;
  }

  // Interactive Bar Chart (Time per Question, Speed vs Target)
  function renderBarChart(containerId, items, options = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!items || !items.length) {
      el.innerHTML = '<div class="chart-empty">No timing data available</div>';
      return;
    }

    const height = 280;
    const topPad = 34; // more space for labels & trend badges
    const botPad = 38; // space for question tags
    const chartH = height - topPad - botPad;
    const hasComparison = items.some(d => d.prevTime != null && d.prevTime > 0);
    const allVals = items.flatMap(d => [d.value, d.prevTime || 0]);

    // noSlowThreshold: used for correctness-based charts (drill results).
    // Skips "Slow Pace" check and scales maxVal purely from data values.
    const noSlowThreshold = !!options.noSlowThreshold;
    const maxVal = noSlowThreshold
      ? Math.max(...allVals, 10) * 1.15
      : Math.max(...allVals, options.target || 40, 10) * 1.15;
    const target = noSlowThreshold ? null : options.target;

    const barW  = hasComparison ? 14 : 24;
    const prevW = hasComparison ? 12 : 0;
    const innerGap = hasComparison ? 4 : 0;
    const groupW = hasComparison ? (barW + prevW + innerGap) : barW;
    const outerGap = hasComparison ? 26 : 14;
    const contentW = Math.max(items.length * (groupW + outerGap) + 40, 500);

    const targetY = target ? topPad + chartH - ((target / maxVal) * chartH) : null;

    // Subtle horizontal grid lines & tick marks
    const gridCount = 4;
    let gridLines = '';
    for (let g = 0; g <= gridCount; g++) {
      const gy = topPad + (g / gridCount) * chartH;
      gridLines += `
        <line x1="0" y1="${gy}" x2="${contentW}" y2="${gy}"
          stroke="#f1f5f9" stroke-width="${g === gridCount ? 2 : 1}" stroke-dasharray="${g === gridCount ? '' : '4 4'}"/>
      `;
    }

    // Common patterns/gradients
    const defsHeader = `
      <defs>
        <!-- Distinct diagonal hatch pattern for Before Attempt -->
        <pattern id="hatch-prev" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" stroke-width="2" />
        </pattern>
        <linearGradient id="grad-fast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
        <linearGradient id="grad-slow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fbbf24"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
        <linearGradient id="grad-err" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f87171"/>
          <stop offset="100%" stop-color="#dc2626"/>
        </linearGradient>
        <linearGradient id="grad-skip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#7e22ce"/>
        </linearGradient>
      </defs>
    `;

    // Build bars
    let bars = '';
    items.forEach((item, idx) => {
      const gx = 8 + idx * (groupW + outerGap);
      const barH = Math.max(4, (item.value / maxVal) * chartH);
      const barY = topPad + chartH - barH;

      let gradFill = 'url(#grad-fast)';
      let textFill = '#059669';
      if (item.status === 'Incorrect') {
        gradFill = 'url(#grad-err)';
        textFill = '#dc2626';
      } else if (item.status === 'Unanswered') {
        gradFill = 'url(#grad-skip)';
        textFill = '#7e22ce';
      } else if (!noSlowThreshold && item.value > (target || 40)) {
        gradFill = 'url(#grad-slow)';
        textFill = '#d97706';
      }

      // Previous attempt bar (Distinct Patterned + Slate Border)
      let prevBarSVG = '';
      if (hasComparison && item.prevTime != null && item.prevTime > 0) {
        const pH = Math.max(4, (item.prevTime / maxVal) * chartH);
        const pY = topPad + chartH - pH;
        prevBarSVG = `
          <g>
            <rect x="${gx}" y="${pY}" width="${prevW}" height="${pH}" rx="4"
              fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="${gx}" y="${pY}" width="${prevW}" height="${pH}" rx="4"
              fill="url(#hatch-prev)" opacity="0.45"/>
            <text x="${gx + prevW / 2}" y="${pY - 5}" text-anchor="middle"
              font-size="9" fill="#64748b" font-weight="600">${item.prevTime}s</text>
          </g>
        `;
      }

      const currX = hasComparison ? (gx + prevW + innerGap) : gx;

      // Clean pill badge for trend
      let trendPill = '';
      if (item.speedDeltaPct != null && Math.abs(item.speedDeltaPct) > 5) {
        const faster = item.speedDeltaPct > 0;
        const icon = faster ? '⚡' : '⏳';
        trendPill = `
          <text x="${gx + groupW / 2}" y="${topPad - 14}" text-anchor="middle"
            font-size="10" font-weight="700">
            ${icon}
          </text>
        `;
      }

      // Value label on top of current bar
      const unitStr = options.unit !== undefined ? options.unit : 's';
      const valLabel = `
        <text x="${currX + barW / 2}" y="${barY - 5}" text-anchor="middle"
          font-size="10" font-weight="700" fill="${textFill}">${item.value}${unitStr}</text>
      `;

      // Question pill badge on axis
      const qLabel = `
        <rect x="${gx + groupW / 2 - 13}" y="${height - 24}" width="26" height="18" rx="4" fill="#f8fafc" stroke="#e2e8f0"/>
        <text x="${gx + groupW / 2}" y="${height - 11}" text-anchor="middle"
          font-size="9.5" fill="#334155" font-weight="700">${item.shortLabel || idx + 1}</text>
      `;

      bars += `
        <g class="bar-group" tabindex="0" data-idx="${idx}" role="button"
          aria-label="Review ${item.label}: ${item.value}${unitStr}" style="cursor:pointer;">
          ${trendPill}
          ${prevBarSVG}
          <rect x="${currX}" y="${barY}" width="${barW}" height="${barH}" rx="5"
            fill="${gradFill}" class="bar-rect" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.06));">
            <title>${item.label} · Now: ${item.value}${unitStr}${item.prevTime ? ' · Before: ' + item.prevTime + unitStr : ''} · ${item.status || ''} – Click to review</title>
          </rect>
          ${valLabel}
          ${qLabel}
        </g>
      `;
    });

    // Target benchmark dashed line
    const unitStr = options.unit !== undefined ? options.unit : 's';
    const targetLineInner = targetY !== null ? `
      <line x1="0" y1="${targetY}" x2="${contentW}" y2="${targetY}"
        stroke="#ef4444" stroke-dasharray="6 4" stroke-width="1.8" opacity="0.85"/>
      <rect x="${contentW - 68}" y="${targetY - 10}" width="64" height="20" rx="4" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
      <text x="${contentW - 36}" y="${targetY + 4}" text-anchor="middle"
        font-size="10" font-weight="700" fill="#dc2626">Target ${target}${unitStr}</text>
    ` : '';

    // Fixed Y-Axis panel
    const yMidY = topPad + chartH / 2;
    const yAxisSVG = `
      <svg width="56" height="${height}" viewBox="0 0 56 ${height}" style="display:block;">
        <line x1="55" y1="${topPad}" x2="55" y2="${topPad + chartH}" stroke="#e2e8f0" stroke-width="1.5"/>
        <text x="48" y="${topPad + 4}" text-anchor="end" font-size="10" font-weight="700" fill="#64748b">${Math.round(maxVal)}${unitStr}</text>
        <text x="48" y="${yMidY + 4}" text-anchor="end" font-size="9.5" fill="#94a3b8">${Math.round(maxVal / 2)}${unitStr}</text>
        <text x="48" y="${topPad + chartH + 3}" text-anchor="end" font-size="9.5" fill="#94a3b8">0${unitStr}</text>
        ${targetY !== null ? `
          <rect x="18" y="${targetY - 8}" width="34" height="16" rx="3" fill="#ef4444"/>
          <text x="35" y="${targetY + 4}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#ffffff">${target}${unitStr}</text>
        ` : ''}
      </svg>
    `;

    // Modern Legend
    const legendItems = [
      { color: 'linear-gradient(135deg, #10b981, #059669)', label: 'Fast & Correct' },
      { color: 'linear-gradient(135deg, #fbbf24, #d97706)', label: 'Slow Pace' },
      { color: 'linear-gradient(135deg, #f87171, #dc2626)', label: 'Incorrect' },
      { color: 'linear-gradient(135deg, #a855f7, #7e22ce)', label: 'Skipped' },
    ];
    if (hasComparison) {
      legendItems.push({
        isPattern: true,
        label: 'Before Attempt'
      });
    }

    const legendHTML = `
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; margin-top:14px; padding:10px 14px;
        background:#f8fafc; border-radius:10px; border:1px solid #e2e8f0;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:16px;">
          ${legendItems.map(l => l.isPattern ? `
            <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem; color:#475569; font-weight:500;">
              <span style="display:inline-block; width:14px; height:14px; border-radius:3px; border:1.5px solid #94a3b8;
                background:repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 2px, #94a3b8 2px, #94a3b8 4px);"></span>
              ${l.label}
            </div>` : `
            <div style="display:flex; align-items:center; gap:6px; font-size:0.8rem; color:#475569; font-weight:500;">
              <span style="display:inline-block; width:13px; height:13px; border-radius:3px; background:${l.color}; box-shadow:0 1px 3px rgba(0,0,0,0.1);"></span>
              ${l.label}
            </div>
          `).join('')}
        </div>
        <div style="display:flex; align-items:center; gap:14px; font-size:0.8rem; color:#64748b;">
          <span>⚡ Faster</span>
          <span>⏳ Slower</span>
        </div>
      </div>
    `;

    el.innerHTML = `
      <div style="display:flex; position:relative; overflow:hidden; border-radius:12px;
        border:1px solid #e2e8f0; background:#ffffff; box-shadow:0 2px 8px rgba(0,0,0,0.02); max-width:100%;">
        <!-- Fixed Y-Axis -->
        <div style="flex:0 0 56px; min-width:56px; background:#ffffff; border-right:1px solid #f1f5f9; z-index:5;">
          ${yAxisSVG}
        </div>
        <!-- Scrollable bars area -->
        <div class="chart-scrollable" style="flex:1; min-width:0; cursor:grab; background:#ffffff;">
          <svg width="${contentW}" height="${height}" viewBox="0 0 ${contentW} ${height}"
            style="display:block; min-width:${contentW}px;">
            ${defsHeader}
            ${gridLines}
            ${targetLineInner}
            ${bars}
          </svg>
        </div>
      </div>
      ${legendHTML}
    `;

    // Drag-to-scroll
    const scrollBox = el.querySelector('.chart-scrollable');
    if (scrollBox) {
      let isDown = false, startX, scrollLeft;
      const setGrab = v => { scrollBox.style.cursor = v ? 'grabbing' : 'grab'; };
      scrollBox.addEventListener('mousedown', e => { isDown = true; setGrab(true); startX = e.pageX - scrollBox.offsetLeft; scrollLeft = scrollBox.scrollLeft; });
      scrollBox.addEventListener('mouseleave', () => { isDown = false; setGrab(false); });
      scrollBox.addEventListener('mouseup', () => { isDown = false; setGrab(false); });
      scrollBox.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        scrollBox.scrollLeft = scrollLeft - (e.pageX - scrollBox.offsetLeft - startX) * 1.4;
      });
    }

    // Click + keyboard events
    if (typeof options.onBarClick === 'function') {
      el.querySelectorAll('.bar-group').forEach(bg => {
        bg.addEventListener('click', e => { options.onBarClick(items[+bg.dataset.idx], +bg.dataset.idx, e); });
        bg.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            options.onBarClick(items[+bg.dataset.idx], +bg.dataset.idx, e);
          }
        });
      });
    }
  }

  // Trend Line Chart (Accuracy & Speed over Attempts)
  function renderTrendLine(containerId, attempts, options = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!attempts || attempts.length < 1) {
      el.innerHTML = '<div class="chart-empty">Complete at least 1 test to see progress trend</div>';
      return;
    }

    const width = options.width || 560;
    const height = options.height || 220;
    const padding = { top: 30, right: 30, bottom: 40, left: 50 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const n = attempts.length;
    const pointsAcc = [];
    const pointsTime = [];

    const maxTime = Math.max(...attempts.map(a => a.avg || (a.sec / (a.total || 1))), 60);

    attempts.forEach((a, i) => {
      const x = n === 1 ? chartW / 2 : (i / (n - 1)) * chartW;
      const acc = a.accuracy || 0;
      const yAcc = chartH - (acc / 100) * chartH;
      const t = a.avg || (a.sec / (a.total || 1));
      const yTime = chartH - (Math.min(t, maxTime) / maxTime) * chartH;

      pointsAcc.push({ x: padding.left + x, y: padding.top + yAcc, val: acc.toFixed(1) + '%', label: 'Attempt ' + (i+1) });
      pointsTime.push({ x: padding.left + x, y: padding.top + yTime, val: t.toFixed(0) + 's', label: 'Attempt ' + (i+1) });
    });

    const pathAcc = n === 1 ? '' : 'M ' + pointsAcc.map(p => `${p.x},${p.y}`).join(' L ');
    const pathTime = n === 1 ? '' : 'M ' + pointsTime.map(p => `${p.x},${p.y}`).join(' L ');

    el.innerHTML = `
      <div class="chart-wrap">
        <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" class="trend-svg">
          <!-- Background Grid -->
          <line x1="${padding.left}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top}" stroke="var(--border-color)" stroke-dasharray="2 2" opacity="0.4"/>
          <line x1="${padding.left}" y1="${padding.top + chartH/2}" x2="${width - padding.right}" y2="${padding.top + chartH/2}" stroke="var(--border-color)" stroke-dasharray="2 2" opacity="0.4"/>
          <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="var(--border-color)"/>

          <!-- Axis Labels -->
          <text x="${padding.left - 8}" y="${padding.top + 4}" text-anchor="end" class="chart-axis-lbl">100%</text>
          <text x="${padding.left - 8}" y="${padding.top + chartH/2 + 4}" text-anchor="end" class="chart-axis-lbl">50%</text>
          <text x="${padding.left - 8}" y="${padding.top + chartH + 4}" text-anchor="end" class="chart-axis-lbl">0%</text>

          <!-- Paths -->
          ${pathAcc ? `<path d="${pathAcc}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>` : ''}
          ${pathTime ? `<path d="${pathTime}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>` : ''}

          <!-- Points -->
          ${pointsAcc.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="5" fill="#2563eb" stroke="#fff" stroke-width="2">
              <title>${p.label} Accuracy: ${p.val}</title>
            </circle>
            <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" class="point-lbl acc-lbl">${p.val}</text>
          `).join('')}

          ${pointsTime.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="4" fill="#f59e0b" stroke="#fff" stroke-width="2">
              <title>${p.label} Avg Time: ${p.val}</title>
            </circle>
          `).join('')}
        </svg>
        <div class="chart-legend flex-center mt-2">
          <div class="legend-item"><span class="legend-color" style="background:#2563eb"></span> Accuracy Trend (%)</div>
          <div class="legend-item"><span class="legend-color" style="background:#f59e0b"></span> Avg Time (s)</div>
        </div>
      </div>
    `;
  }

  // Topic Performance Comparison Horizontal Bars
  function renderTopicComparison(containerId, topics) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!topics || !topics.length) {
      el.innerHTML = '<div class="chart-empty">No topics attempted yet</div>';
      return;
    }

    el.innerHTML = `
      <div class="topic-comp-list">
        ${topics.map(t => {
          const acc = t.accuracy || 0;
          const time = t.avgTimePerAttempted || 0;
          const target = t.benchmark || 35;
          const isFast = time <= target;
          const barColor = acc >= 80 ? 'var(--color-success)' : acc >= 60 ? 'var(--color-warning)' : 'var(--color-danger)';
          return `
            <div class="topic-comp-row">
              <div class="topic-comp-header">
                <span class="topic-comp-title"><b>${t.topicName}</b> (${t.subjectName})</span>
                <span class="topic-comp-stats">
                  <span class="tag-acc" style="color:${barColor}">${acc}% Acc</span> &middot; 
                  <span class="${isFast ? 'text-success' : 'text-warning'}">${time}s/Q (Target: ${target}s)</span>
                </span>
              </div>
              <div class="progress-track" title="Accuracy: ${acc}%">
                <div class="progress-fill" style="width:${acc}%; background:${barColor}"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Radar Chart for Category Mastery
  function renderRadarChart(containerId, categories, options = {}) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!categories || !categories.length) {
      el.innerHTML = '<div class="chart-empty">No category data available</div>';
      return;
    }

    const size = options.size || 340;
    const center = size / 2;
    const radius = size * 0.38;
    const n = categories.length;
    const angleStep = (2 * Math.PI) / n;

    // Rings (25%, 50%, 75%, 100%)
    const levels = [0.25, 0.5, 0.75, 1];
    let gridSVG = '';
    levels.forEach(lvl => {
      const r = radius * lvl;
      const pts = [];
      for (let i = 0; i < n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        pts.push(`${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`);
      }
      gridSVG += `<polygon points="${pts.join(' ')}" fill="none" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="${lvl === 1 ? '' : '3 3'}"/>`;
      gridSVG += `<text x="${center + 4}" y="${center - r + 10}" font-size="8.5" fill="#94a3b8">${Math.round(lvl * 100)}%</text>`;
    });

    // Spoke lines & labels
    let spokesSVG = '';
    const dataPoints = [];
    categories.forEach((cat, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const xEnd = center + radius * Math.cos(angle);
      const yEnd = center + radius * Math.sin(angle);
      spokesSVG += `<line x1="${center}" y1="${center}" x2="${xEnd}" y2="${yEnd}" stroke="#cbd5e1" stroke-width="1"/>`;

      // Label positioning
      const labelDist = radius + 22;
      const xLbl = center + labelDist * Math.cos(angle);
      const yLbl = center + labelDist * Math.sin(angle);
      const anchor = Math.abs(Math.cos(angle)) < 0.15 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
      const score = Math.round(cat.score || 0);

      spokesSVG += `
        <text x="${xLbl}" y="${yLbl}" text-anchor="${anchor}" font-size="9.5" font-weight="600" fill="#334155">${cat.name}</text>
        <text x="${xLbl}" y="${yLbl + 11}" text-anchor="${anchor}" font-size="8.5" font-weight="700" fill="${score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'}">${score}%</text>
      `;

      // Data polygon point
      const valFrac = Math.min(Math.max((cat.score || 0) / 100, 0.05), 1);
      const xPt = center + radius * valFrac * Math.cos(angle);
      const yPt = center + radius * valFrac * Math.sin(angle);
      dataPoints.push({ x: xPt, y: yPt, name: cat.name, score });
    });

    const polygonPts = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

    const pointsSVG = dataPoints.map(p => `
      <circle cx="${p.x}" cy="${p.y}" r="4" fill="#2563eb" stroke="#ffffff" stroke-width="2">
        <title>${p.name}: ${p.score}%</title>
      </circle>
    `).join('');

    el.innerHTML = `
      <div style="display:flex; justify-content:center; align-items:center; width:100%;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="max-width:100%; display:block;">
          <defs>
            <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="#2563eb" stop-opacity="0.08"/>
            </radialGradient>
          </defs>
          ${gridSVG}
          ${spokesSVG}
          <polygon points="${polygonPts}" fill="url(#radar-glow)" stroke="#2563eb" stroke-width="2.5"/>
          ${pointsSVG}
        </svg>
      </div>
    `;
  }

  return {
    renderDonut,
    renderBarChart,
    renderTrendLine,
    renderTopicComparison,
    renderRadarChart
  };
})();
