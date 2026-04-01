import React, { useState, useMemo, useCallback } from 'react';

const NDA_PARTIES = [
  { name: 'BJP',     seats: 240, color: '#FF8C00' },
  { name: 'TDP',     seats: 16,  color: '#FFD700' },
  { name: 'JD(U)',   seats: 12,  color: '#16A34A' },
  { name: 'SHS',     seats: 7,   color: '#EA580C' },
  { name: 'LJP(RV)', seats: 5,   color: '#1D4ED8' },
  { name: 'JSP',     seats: 2,   color: '#F59E0B' },
  { name: 'JD(S)',   seats: 2,   color: '#0D9488' },
  { name: 'RLD',     seats: 2,   color: '#15803D' },
  { name: 'AJSU',    seats: 1,   color: '#C2410C' },
  { name: 'AGP',     seats: 1,   color: '#6366F1' },
  { name: 'HAM(S)',  seats: 1,   color: '#7C3AED' },
  { name: 'SKM',     seats: 1,   color: '#9F1239' },
  { name: 'NDPP',    seats: 1,   color: '#365314' },
  { name: 'NPP',     seats: 1,   color: '#134E4A' },
];

const OTHERS_PARTIES = [
  { name: 'YSRCP',   seats: 4, color: '#3B82F6' },
  { name: 'IND',     seats: 5, color: '#94A3B8' },
  { name: 'AD(WPD)', seats: 2, color: '#92400E' },
  { name: 'AIMIM',   seats: 1, color: '#064E3B' },
  { name: 'SAD',     seats: 1, color: '#3F6212' },
  { name: 'UPPL',    seats: 1, color: '#78350F' },
  { name: 'ZPM',     seats: 1, color: '#0C4A6E' },
  { name: 'ASP(KR)', seats: 1, color: '#831843' },
];

const INDIA_PARTIES = [
  { name: 'INC',      seats: 100, color: '#0EA5E9' },
  { name: 'SP',       seats: 37,  color: '#EF4444' },
  { name: 'AITC',     seats: 29,  color: '#06B6D4' },
  { name: 'DMK',      seats: 22,  color: '#DC2626' },
  { name: 'SS(UBT)',  seats: 9,   color: '#F97316' },
  { name: 'NCP-SP',   seats: 8,   color: '#A855F7' },
  { name: 'RJD',      seats: 4,   color: '#22C55E' },
  { name: 'CPI(M)',   seats: 4,   color: '#BE123C' },
  { name: 'IUML',     seats: 3,   color: '#166534' },
  { name: 'JMM',      seats: 3,   color: '#D97706' },
  { name: 'AAP',      seats: 3,   color: '#0284C7' },
  { name: 'CPI',      seats: 2,   color: '#7F1D1D' },
  { name: 'JKNC',     seats: 2,   color: '#2563EB' },
  { name: 'VCK',      seats: 2,   color: '#9333EA' },
  { name: 'CPI(ML)L', seats: 2,   color: '#991B1B' },
  { name: 'MDMK',     seats: 1,   color: '#C2410C' },
  { name: 'RSP',      seats: 1,   color: '#86198F' },
  { name: 'KEC',      seats: 1,   color: '#0F766E' },
];

const TOTAL    = 543;
const MAJORITY = 272;

const ndaTotal   = NDA_PARTIES.reduce((s,p) => s+p.seats, 0);
const indiaTotal = INDIA_PARTIES.reduce((s,p) => s+p.seats, 0);
const othTotal   = OTHERS_PARTIES.reduce((s,p) => s+p.seats, 0);

// ── Arc path ──────────────────────────────────────────────
const describeArc = (cx, cy, innerR, outerR, startAngle, endAngle) => {
  const span = endAngle - startAngle;
  const pad  = Math.min(0.006, span * 0.08);
  const sa   = startAngle + pad;
  const ea   = endAngle   - pad;
  const draw = (s, e) => {
    const x1 = cx + outerR * Math.cos(s), y1 = cy - outerR * Math.sin(s);
    const x2 = cx + outerR * Math.cos(e), y2 = cy - outerR * Math.sin(e);
    const x3 = cx + innerR * Math.cos(e), y3 = cy - innerR * Math.sin(e);
    const x4 = cx + innerR * Math.cos(s), y4 = cy - innerR * Math.sin(s);
    const lg = (e - s) > Math.PI ? 1 : 0;
    return `M${x1} ${y1} A${outerR} ${outerR} 0 ${lg} 0 ${x2} ${y2} L${x3} ${y3} A${innerR} ${innerR} 0 ${lg} 1 ${x4} ${y4}Z`;
  };
  return ea > sa ? draw(sa, ea) : draw(startAngle, endAngle);
};

// ── Expandable alliance panel ─────────────────────────────
const AlliancePanel = ({ parties, color, name, total }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-1 min-w-[140px]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-3 py-2 rounded-xl border transition-all hover:opacity-80"
        style={{ borderColor: `${color}40`, backgroundColor: `${color}10` }}
      >
        <div className="text-left">
          <div className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>{name}</div>
          <div className="text-2xl font-black italic" style={{ color }}>{total}</div>
        </div>
        <div className="text-[10px] font-black text-slate-600 ml-2">{open ? '▲' : '▼'}</div>
      </button>

      {open && (
        <div className="mt-1 rounded-xl border border-slate-800 bg-slate-900/60 p-2 space-y-1">
          {parties.map((p, i) => (
            <div key={i} className="flex justify-between items-center px-1 py-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-[9px] font-black uppercase" style={{ color: p.color }}>{p.name}</span>
              </div>
              <span className="text-[9px] font-black text-slate-400">{p.seats}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────
const HorseshoeChart = () => {
  const [view,    setView]    = useState('alliance');
  const [tooltip, setTooltip] = useState(null);

  const segments = useMemo(() => {
    if (view === 'alliance') {
      return [
        { name: 'NDA',        seats: ndaTotal,   color: '#FF8C00' },
        { name: 'Others',     seats: othTotal,   color: '#94A3B8' },
        { name: 'INDIA Bloc', seats: indiaTotal, color: '#0EA5E9' },
      ];
    }
    return [...NDA_PARTIES, ...OTHERS_PARTIES, ...INDIA_PARTIES];
  }, [view]);

  const W = 500, H = 255;
  const cx = W / 2, cy = H - 8;
  const outerR = 228, innerR = 124;

  let angle = 0;
  const arcs = segments.map(seg => {
    const span = (seg.seats / TOTAL) * Math.PI;
    const sa = angle, ea = angle + span;
    angle += span;
    return { ...seg, sa, ea, path: describeArc(cx, cy, innerR, outerR, sa, ea) };
  });

  // Majority line — 272/543 of π from right ≈ straight up
  const majAngle = (MAJORITY / TOTAL) * Math.PI;
  const majX1 = cx + (innerR - 8)  * Math.cos(majAngle);
  const majY1 = cy - (innerR - 8)  * Math.sin(majAngle);
  const majX2 = cx + (outerR + 8)  * Math.cos(majAngle);
  const majY2 = cy - (outerR + 8)  * Math.sin(majAngle);

  const handleMouseMove = useCallback((e, seg) => {
    const rect = e.currentTarget.closest('svg').getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    setTooltip({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY - 10,
      name: seg.name, seats: seg.seats, color: seg.color,
    });
  }, []);

  const partyLegend = [...NDA_PARTIES, ...OTHERS_PARTIES, ...INDIA_PARTIES]
    .sort((a,b) => b.seats - a.seats);

  return (
    <div className="flex flex-col items-center w-full select-none">

      {/* 1. Toggle — TOP */}
      <div className="flex bg-slate-950 border border-slate-800 rounded-full p-1 mb-4">
        {[
          { key: 'alliance', label: 'Alliance View' },
          { key: 'party',    label: 'Party View'    },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => { setView(key); setTooltip(null); }}
            className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
              view === key ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* 2. Majority mark — below toggle, above chart */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8 bg-slate-700" style={{ borderTop: '1.5px dashed #475569' }} />
        <div className="text-center">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">Majority Mark · </span>
          <span className="text-[9px] font-black italic text-slate-300">{MAJORITY}</span>
        </div>
        <div className="h-px w-8 bg-slate-700" style={{ borderTop: '1.5px dashed #475569' }} />
      </div>

      {/* 3. Chart */}
      <div className="w-full max-w-xl">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full"
          style={{ overflow: 'visible' }}
          onMouseLeave={() => setTooltip(null)}>

          {arcs.map((seg, i) => (
            <path key={i} d={seg.path} fill={seg.color}
              style={{ cursor: 'pointer' }}
              onMouseMove={(e) => handleMouseMove(e, seg)}
            />
          ))}

          {/* Majority dashed line */}
          <line x1={majX1} y1={majY1} x2={majX2} y2={majY2}
            stroke="#475569" strokeWidth="1.5" strokeDasharray="4,4" />

          {/* Speaker */}
          <rect x={cx-28} y={cy-16} width="56" height="14" rx="3"
            fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x={cx} y={cy-5} textAnchor="middle" fill="#475569"
            fontSize="6" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700">
            SPEAKER
          </text>

          {/* Tooltip */}
          {tooltip && (() => {
            const TW = 124, TH = 38;
            const tx = Math.min(Math.max(tooltip.x - TW/2, 4), W - TW - 4);
            const ty = Math.max(tooltip.y - TH - 8, 4);
            return (
              <g pointerEvents="none">
                <rect x={tx} y={ty} width={TW} height={TH} rx="6"
                  fill="#0f172a" stroke={tooltip.color} strokeWidth="1.5" />
                <circle cx={tx+14} cy={ty+13} r="5" fill={tooltip.color} />
                <text x={tx+26} y={ty+16} fill="white" fontSize="11"
                  fontFamily="'Barlow Condensed', sans-serif" fontWeight="900">
                  {tooltip.name}
                </text>
                <text x={tx+26} y={ty+29} fill="#94a3b8" fontSize="9"
                  fontFamily="'Barlow Condensed', sans-serif" fontWeight="700">
                  {tooltip.seats} seat{tooltip.seats !== 1 ? 's' : ''}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* 4. Stats row */}
      <div className="flex gap-6 items-center mt-1 pt-4 border-t border-slate-800 w-full justify-center flex-wrap">
        {[
          { label: 'NDA',        value: ndaTotal,   color: '#FF8C00' },
          { label: 'Others',     value: othTotal,   color: '#94A3B8' },
          { label: 'INDIA Bloc', value: indiaTotal, color: '#0EA5E9' },
          { label: 'Majority',   value: MAJORITY,   color: '#64748b', border: true },
        ].map((s, i) => (
          <div key={i} className={`text-center ${s.border ? 'border-l border-slate-800 pl-6' : ''}`}>
            <div className="text-3xl font-black italic" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 5. Alliance breakdown — only in alliance view */}
      {view === 'alliance' && (
        <div className="mt-5 w-full">
          <div className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-2 text-center">
            Click alliance to see all parties
          </div>
          <div className="flex gap-3 flex-wrap">
            <AlliancePanel name="NDA"        total={ndaTotal}   color="#FF8C00" parties={NDA_PARTIES}    />
            <AlliancePanel name="INDIA Bloc" total={indiaTotal} color="#0EA5E9" parties={INDIA_PARTIES}  />
            <AlliancePanel name="Others"     total={othTotal}   color="#94A3B8" parties={OTHERS_PARTIES} />
          </div>
        </div>
      )}

      {/* 6. Party legend — only in party view */}
      {view === 'party' && (
        <div className="mt-4 w-full pt-3 border-t border-slate-800">
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
            {partyLegend.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-[9px] font-black uppercase" style={{ color: p.color }}>{p.name}</span>
                <span className="text-[9px] font-black text-slate-500">{p.seats}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HorseshoeChart;
