import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, AlertTriangle, TrendingUp, Loader2, Target } from 'lucide-react';
import {
  API_BASE, slugToKey, keyToSlug,
  getConstituenciesBySlug
} from '../data/useElectionData';
import { getPartyColor, getPartyAlliance, ALLIANCE_CONFIG } from '../data/partyConfig';

// ── Status badge ──────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    SAFE:     { color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20',  icon: <Shield size={10} /> },
    STABLE:   { color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',    icon: <TrendingUp size={10} /> },
    CRITICAL: { color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',      icon: <AlertTriangle size={10} /> },
  };
  const s = cfg[status] || cfg.STABLE;
  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase ${s.color} ${s.bg}`}>
      {s.icon} {status}
    </span>
  );
};

const AlliancePill = ({ label, color, active, count, onClick }) => (
  <button onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${
      active ? 'text-white' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
    }`}
    style={active ? { backgroundColor: `${color}25`, borderColor: `${color}60`, color } : {}}>
    <span>{label}</span>
    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black ${active ? 'bg-black/20' : 'bg-slate-800'}`}>{count}</span>
  </button>
);

// ── Fetch constituencies — API first, JSON fallback ───────
const useConstituencies = (stateSlug) => {
  const [constituencies, setConstituencies] = useState([]);
  const [stateName,      setStateName]      = useState('');
  const [loading,        setLoading]        = useState(true);
  const [source,         setSource]         = useState(null);

  useEffect(() => {
    if (!stateSlug) return;
    setLoading(true);

    const load = async () => {
      // Try API first
      try {
        const res = await fetch(
          `${API_BASE}/state/${stateSlug}?year=2024&type=LOK_SABHA`,
          { signal: AbortSignal.timeout(3000) }
        );
        if (res.ok) {
          const data = await res.json();
          setStateName(data.state || stateSlug);
          // Map API response to same shape as JSON
          const mapped = (data.constituencies || []).map(c => ({
            rawId:         String(c.constSno),
            name:          c.constituencyName,
            state:         c.state,
            stateSlug:     c.stateSlug,
            winner:        c.winnerName    || 'N/A',
            winnerParty:   c.winnerParty   || 'N/A',
            runnerUp:      c.runnerUpName  || 'N/A',
            runnerUpParty: c.runnerUpParty || 'N/A',
            margin:        c.margin        || 0,
            marginPct:     c.marginPct     || 0,
            turnout:       c.voterTurnoutPct || 0,
            totalElectors: c.totalElectors || 0,
            totalPolled:   c.totalPolled   || 0,
            totalValidVotes: c.totalValidVotes || 0,
            status:        c.status        || 'STABLE',
            candidates:    c.candidates    || [],
          }));
          setConstituencies(mapped);
          setSource('api');
          setLoading(false);
          return;
        }
      } catch { /* fall through */ }

      // JSON fallback
      try {
        const res  = await fetch('/Election_Results_2024_with_states.json');
        const data = await res.json();
        const key  = slugToKey(stateSlug);
        const raw  = data[key];
        if (raw) {
          setStateName(key.split(' ').map(w =>
            w.length > 2 ? w.charAt(0) + w.slice(1).toLowerCase() : w.toUpperCase()
          ).join(' '));
          setConstituencies(getConstituenciesBySlug(data, stateSlug));
        }
        setSource('json');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [stateSlug]);

  return { constituencies, stateName, loading, source };
};

// ── Main Component ────────────────────────────────────────
const StateView = () => {
  const { stateSlug } = useParams();
  const navigate = useNavigate();

  const [statusFilter,   setStatusFilter]   = useState('ALL');
  const [allianceFilter, setAllianceFilter] = useState('ALL');
  const [searchText,     setSearchText]     = useState('');

  const { constituencies, stateName, loading, source } = useConstituencies(stateSlug);

  const displayName = stateName || stateSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Party summary
  const partySummary = useMemo(() => {
    const counts = {};
    constituencies.forEach(c => { counts[c.winnerParty] = (counts[c.winnerParty] || 0) + 1; });
    return Object.entries(counts).sort((a,b) => b[1]-a[1])
      .map(([party, seats]) => ({ party, seats, color: getPartyColor(party) }));
  }, [constituencies]);

  // Alliance counts
  const allianceCounts = useMemo(() => {
    const c = { NDA: 0, INDIA: 0, Others: 0 };
    constituencies.forEach(con => {
      const a = getPartyAlliance(con.winnerParty);
      if (c[a] !== undefined) c[a]++; else c.Others++;
    });
    return c;
  }, [constituencies]);

  // Filtered list
  const filtered = useMemo(() => constituencies
    .filter(c => statusFilter === 'ALL' || c.status === statusFilter)
    .filter(c => allianceFilter === 'ALL' || getPartyAlliance(c.winnerParty) === allianceFilter)
    .filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
  , [constituencies, statusFilter, allianceFilter, searchText]);

  // Loading
  if (loading) return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center page-enter">
      <div className="text-center">
        <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Loading constituencies...</p>
      </div>
    </div>
  );

  if (constituencies.length === 0) return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center page-enter">
      <div className="text-center">
        <div className="text-5xl font-black text-slate-800 mb-4 italic uppercase">{displayName}</div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6">No data found</p>
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest mx-auto">
          <ChevronLeft size={12} /> Back
        </button>
      </div>
    </div>
  );

  const safeCount     = constituencies.filter(c => c.status === 'SAFE').length;
  const stableCount   = constituencies.filter(c => c.status === 'STABLE').length;
  const criticalCount = constituencies.filter(c => c.status === 'CRITICAL').length;

  return (
    <div className="min-h-screen bg-[#020617] text-white page-enter">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800/80">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group">
          <ChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          India Overview
        </button>
        <div className="flex items-center gap-3">
          {source && (
            <div className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
              source === 'api'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-slate-800 text-slate-500'
            }`}>
              {source === 'api' ? '⚡ Live API' : '📄 JSON'}
            </div>
          )}
          <button onClick={() => navigate('/intelligence')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-[10px] font-black uppercase tracking-widest">
            <Target size={12} /> Intelligence
          </button>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
            VOTEMATRIX · {displayName}
          </span>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">
              State Dashboard · 2024 Lok Sabha
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">{displayName}</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Seats',    value: constituencies.length, color: 'text-white' },
            { label: 'Safe Seats',     value: safeCount,             color: 'text-green-400' },
            { label: 'Swing Seats',    value: stableCount,           color: 'text-blue-400' },
            { label: 'Critical Seats', value: criticalCount,         color: 'text-red-400' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4 text-center">
              <div className={`text-3xl font-black italic ${s.color}`}>{s.value}</div>
              <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alliance filter */}
        <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-4 mb-4">
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Filter by Alliance</div>
          <div className="flex gap-2 flex-wrap">
            <AlliancePill label="All" color="#3b82f6" active={allianceFilter==='ALL'}
              count={constituencies.length} onClick={() => setAllianceFilter('ALL')} />
            {Object.entries(ALLIANCE_CONFIG).map(([key, cfg]) => (
              <AlliancePill key={key} label={cfg.label} color={cfg.color}
                active={allianceFilter===key} count={allianceCounts[key]||0}
                onClick={() => setAllianceFilter(allianceFilter===key ? 'ALL' : key)} />
            ))}
          </div>
          {partySummary.length > 0 && (
            <div className="mt-4">
              <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
                {partySummary.map((p, i) => (
                  <div key={i} className="h-full" title={`${p.party}: ${p.seats}`}
                    style={{ width:`${(p.seats/constituencies.length)*100}%`, backgroundColor:p.color }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {partySummary.map((p, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor:p.color }} />
                    <span className="text-[9px] font-black uppercase" style={{ color:p.color }}>{p.party}</span>
                    <span className="text-[9px] font-black text-slate-500">{p.seats}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status filter + search */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Status:</span>
          {['ALL','SAFE','STABLE','CRITICAL'].map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                statusFilter===f
                  ? f==='CRITICAL' ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : f==='SAFE'     ? 'bg-green-500/20 border-green-500/40 text-green-400'
                  : 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
              }`}>{f}</button>
          ))}
          <input type="text" placeholder="Search constituency..."
            value={searchText} onChange={e => setSearchText(e.target.value)}
            className="ml-auto bg-slate-900 border border-slate-800 rounded-xl px-4 py-1.5 text-[10px] font-black uppercase outline-none placeholder-slate-700 text-slate-300 focus:border-blue-500 transition-colors w-52" />
          <span className="text-[9px] font-black text-slate-600">{filtered.length} / {constituencies.length}</span>
        </div>

        {/* Constituency grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(c => {
            const alliance    = getPartyAlliance(c.winnerParty);
            const allianceCfg = ALLIANCE_CONFIG[alliance] || ALLIANCE_CONFIG.Others;
            const partyColor  = getPartyColor(c.winnerParty);
            return (
              <button key={c.rawId}
                onClick={() => navigate(`/state/${stateSlug}/constituency/${c.rawId}`)}
                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all text-left group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">#{c.rawId}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
                        style={{ color:allianceCfg.color, backgroundColor:`${allianceCfg.color}15` }}>
                        {allianceCfg.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-black italic uppercase tracking-tight group-hover:text-blue-300 transition-colors">
                      {c.name}
                    </h3>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] font-black text-slate-300">{c.winner}</div>
                    <div className="text-[9px] font-black uppercase mt-0.5" style={{ color:partyColor }}>{c.winnerParty}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-black italic ${c.marginPct<5?'text-red-400':c.marginPct<15?'text-yellow-400':'text-green-400'}`}>
                      +{c.marginPct}%
                    </div>
                    <div className="text-[9px] text-slate-600 font-black uppercase">margin</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[8px] font-black uppercase text-slate-600 mb-1">
                    <span>Turnout</span><span>{c.turnout}%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width:`${c.turnout}%` }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-600 font-black uppercase text-xs tracking-widest">
            No constituencies match current filters
          </div>
        )}
      </div>
    </div>
  );
};

export default StateView;
