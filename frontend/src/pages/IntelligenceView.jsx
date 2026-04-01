import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Shield, TrendingUp, AlertTriangle,
  Filter, Star, Target, Loader2
} from 'lucide-react';
import {
  API_BASE, useElectionData,
  getStateNames, getConstituenciesBySlug
} from '../data/useElectionData';
import { getPartyColor, getPartyAlliance, ALLIANCE_CONFIG } from '../data/partyConfig';

const classify = (pct) => {
  if (pct < 2)  return { label:'ULTRA CRITICAL', color:'text-red-400',    bg:'bg-red-500/10 border-red-500/20',      icon:<AlertTriangle size={10}/> };
  if (pct < 5)  return { label:'CRITICAL',        color:'text-orange-400', bg:'bg-orange-500/10 border-orange-500/20', icon:<AlertTriangle size={10}/> };
  if (pct < 10) return { label:'SWING',            color:'text-yellow-400', bg:'bg-yellow-500/10 border-yellow-500/20', icon:<TrendingUp size={10}/> };
  if (pct < 20) return { label:'STABLE',           color:'text-blue-400',   bg:'bg-blue-500/10 border-blue-500/20',     icon:<TrendingUp size={10}/> };
  return         { label:'SAFE',              color:'text-green-400',  bg:'bg-green-500/10 border-green-500/20',   icon:<Shield size={10}/> };
};

const isStarSeat = (c) => c.turnout > 85 || c.turnout < 45 || c.marginPct > 40;

const SeatCard = ({ c, onClick }) => {
  const cls       = classify(c.marginPct);
  const star      = isStarSeat(c);
  const alliance  = getPartyAlliance(c.winnerParty);
  const alliCfg   = ALLIANCE_CONFIG[alliance] || ALLIANCE_CONFIG.Others;
  const partyClr  = getPartyColor(c.winnerParty);

  return (
    <button onClick={onClick}
      className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 hover:bg-blue-600/5 transition-all text-left group w-full">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ color:alliCfg.color, backgroundColor:`${alliCfg.color}18` }}>
            {alliCfg.label}
          </span>
          {star && <Star size={10} className="text-yellow-400 fill-yellow-400" />}
        </div>
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase ${cls.color} ${cls.bg}`}>
          {cls.icon} {cls.label}
        </span>
      </div>
      <h3 className="text-lg font-black italic uppercase tracking-tight group-hover:text-blue-300 transition-colors leading-tight mb-1">
        {c.name}
      </h3>
      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">{c.state}</div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-[10px] font-black text-slate-300">{c.winner}</div>
          <div className="text-[9px] font-black uppercase mt-0.5" style={{ color:partyClr }}>{c.winnerParty}</div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-black italic ${cls.color}`}>+{c.marginPct}%</div>
          <div className="text-[9px] text-slate-600 font-black uppercase">margin</div>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[8px] font-black uppercase text-slate-600">
        <span>Turnout: {c.turnout}%</span>
        <span>{(c.margin/1000).toFixed(1)}K votes</span>
      </div>
    </button>
  );
};

// ── Load all constituencies — API (all states) or JSON ────
const useAllConstituencies = () => {
  const { data: jsonData, loading: jsonLoading } = useElectionData();
  const [constituencies, setConstituencies] = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [stateOptions,   setStateOptions]   = useState([]);
  const [source,         setSource]         = useState(null);

  useEffect(() => {
    const load = async () => {
      // Try API — fetch states list then all constituencies
      try {
        const statesRes = await fetch(`${API_BASE}/states?type=LOK_SABHA`,
          { signal: AbortSignal.timeout(3000) });
        if (statesRes.ok) {
          const slugs = await statesRes.json();
          setStateOptions(slugs.map(s => ({
            value: s,
            label: s.split('-').map(w =>
              w.length>2 ? w.charAt(0).toUpperCase()+w.slice(1) : w.toUpperCase()
            ).join(' ')
          })));

          // Fetch all states in parallel
          const results = await Promise.allSettled(
            slugs.map(slug =>
              fetch(`${API_BASE}/state/${slug}?year=2024&type=LOK_SABHA`,
                { signal: AbortSignal.timeout(5000) }).then(r => r.json())
            )
          );

          const all = [];
          results.forEach((r, i) => {
            if (r.status === 'fulfilled' && r.value?.constituencies) {
              r.value.constituencies.forEach(c => {
                all.push({
                  rawId:        String(c.constSno),
                  name:         c.constituencyName,
                  state:        c.state,
                  stateSlug:    slugs[i],
                  winner:       c.winnerName    || 'N/A',
                  winnerParty:  c.winnerParty   || 'N/A',
                  margin:       c.margin        || 0,
                  marginPct:    c.marginPct     || 0,
                  turnout:      c.voterTurnoutPct || 0,
                  status:       c.status        || 'STABLE',
                });
              });
            }
          });

          if (all.length > 0) {
            setConstituencies(all);
            setSource('api');
            setLoading(false);
            return;
          }
        }
      } catch { /* fall through */ }

      // JSON fallback — wait for jsonData
      if (!jsonLoading && jsonData) {
        const stateNames = getStateNames(jsonData);
        setStateOptions(stateNames.map(s => ({ value: s.slug, label: s.label })));
        const all = stateNames.flatMap(s =>
          getConstituenciesBySlug(jsonData, s.slug).map(c => ({
            ...c, state: s.label, stateSlug: s.slug
          }))
        );
        setConstituencies(all);
        setSource('json');
        setLoading(false);
      }
    };

    load();
  }, [jsonData, jsonLoading]);

  return { constituencies, loading, stateOptions, source };
};

// ── Main ──────────────────────────────────────────────────
const IntelligenceView = () => {
  const navigate = useNavigate();
  const { constituencies, loading, stateOptions, source } = useAllConstituencies();

  const [marginFilter,   setMarginFilter]   = useState('all');
  const [allianceFilter, setAllianceFilter] = useState('all');
  const [stateFilter,    setStateFilter]    = useState('all');
  const [starOnly,       setStarOnly]       = useState(false);
  const [sortBy,         setSortBy]         = useState('margin-asc');

  const filtered = useMemo(() => {
    let r = [...constituencies];
    if (marginFilter==='ultra')    r = r.filter(c => c.marginPct < 2);
    if (marginFilter==='critical') r = r.filter(c => c.marginPct < 5);
    if (marginFilter==='swing')    r = r.filter(c => c.marginPct >= 5  && c.marginPct < 10);
    if (marginFilter==='stable')   r = r.filter(c => c.marginPct >= 10 && c.marginPct < 20);
    if (marginFilter==='safe')     r = r.filter(c => c.marginPct >= 20);
    if (allianceFilter !== 'all')  r = r.filter(c => getPartyAlliance(c.winnerParty) === allianceFilter);
    if (stateFilter !== 'all')     r = r.filter(c => c.stateSlug === stateFilter);
    if (starOnly)                  r = r.filter(c => isStarSeat(c));
    if (sortBy==='margin-asc')     r.sort((a,b) => a.marginPct - b.marginPct);
    if (sortBy==='margin-desc')    r.sort((a,b) => b.marginPct - a.marginPct);
    if (sortBy==='turnout-desc')   r.sort((a,b) => b.turnout - a.turnout);
    if (sortBy==='turnout-asc')    r.sort((a,b) => a.turnout - b.turnout);
    return r;
  }, [constituencies, marginFilter, allianceFilter, stateFilter, starOnly, sortBy]);

  const stats = useMemo(() => ({
    total:        constituencies.length,
    ultraCritical:constituencies.filter(c => c.marginPct < 2).length,
    critical:     constituencies.filter(c => c.marginPct < 5).length,
    swing:        constituencies.filter(c => c.marginPct>=5 && c.marginPct<10).length,
    safe:         constituencies.filter(c => c.marginPct >= 20).length,
    star:         constituencies.filter(c => isStarSeat(c)).length,
  }), [constituencies]);

  const filtersActive = marginFilter!=='all'||allianceFilter!=='all'||stateFilter!=='all'||starOnly;

  if (loading) return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center page-enter">
      <div className="text-center">
        <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">
          Building intelligence across all constituencies...
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white page-enter">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800/80">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group">
          <ChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          National View
        </button>
        <div className="flex items-center gap-3">
          {source && (
            <div className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
              source==='api'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-slate-800 text-slate-500'
            }`}>
              {source==='api' ? '⚡ Live API' : '📄 JSON'}
            </div>
          )}
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">VOTEMATRIX · Intelligence Console</span>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        <div className="flex items-center gap-5 mb-8">
          <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
            <Target className="text-blue-500" size={28} />
          </div>
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">Intelligence Console</h1>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">
              Cross-filter {stats.total} constituencies · 2024 Lok Sabha
            </p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { label:'Total Seats',    value:stats.total,         color:'text-white',    f:()=>{setMarginFilter('all');setStarOnly(false);} },
            { label:'Ultra Critical', value:stats.ultraCritical, color:'text-red-400',    f:()=>{setMarginFilter('ultra');setStarOnly(false);} },
            { label:'Critical <5%',   value:stats.critical,      color:'text-orange-400', f:()=>{setMarginFilter('critical');setStarOnly(false);} },
            { label:'Swing 5–10%',    value:stats.swing,         color:'text-yellow-400', f:()=>{setMarginFilter('swing');setStarOnly(false);} },
            { label:'Safe >20%',      value:stats.safe,          color:'text-green-400',  f:()=>{setMarginFilter('safe');setStarOnly(false);} },
            { label:'Star Seats',     value:stats.star,          color:'text-yellow-300', f:()=>{setMarginFilter('all');setStarOnly(true);} },
          ].map((s,i) => (
            <button key={i} onClick={s.f}
              className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 text-center hover:border-blue-500/40 transition-all">
              <div className={`text-2xl font-black italic ${s.color}`}>{s.value}</div>
              <div className="text-[8px] text-slate-500 uppercase font-black tracking-wider mt-1">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Filter console */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Filter size={13} className="text-blue-400" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Filter Console</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-2">Victory Margin</label>
              <select value={marginFilter} onChange={e=>setMarginFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-blue-500 transition-all cursor-pointer text-slate-300">
                <option value="all">All Margins</option>
                <option value="ultra">{'< 2% — Ultra Critical'}</option>
                <option value="critical">{'< 5% — Critical Swing'}</option>
                <option value="swing">{'5–10% — Competitive'}</option>
                <option value="stable">{'10–20% — Stable'}</option>
                <option value="safe">{'> 20% — Safe Stronghold'}</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-2">Alliance</label>
              <select value={allianceFilter} onChange={e=>setAllianceFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-blue-500 transition-all cursor-pointer text-slate-300">
                <option value="all">All Alliances</option>
                <option value="NDA">NDA</option>
                <option value="INDIA">INDIA Bloc</option>
                <option value="Others">Others / Regional</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-2">State / UT</label>
              <select value={stateFilter} onChange={e=>setStateFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-blue-500 transition-all cursor-pointer text-slate-300">
                <option value="all">All States</option>
                {stateOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest block mb-2">Sort By</label>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] font-black uppercase outline-none focus:border-blue-500 transition-all cursor-pointer text-slate-300">
                  <option value="margin-asc">Most Volatile First</option>
                  <option value="margin-desc">Safest First</option>
                  <option value="turnout-desc">Highest Turnout</option>
                  <option value="turnout-asc">Lowest Turnout</option>
                </select>
              </div>
              <button onClick={()=>setStarOnly(!starOnly)}
                className={`w-full p-2.5 rounded-xl text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all border ${
                  starOnly ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'
                }`}>
                <Star size={11} fill={starOnly?'currentColor':'none'} />
                {starOnly ? 'Star Seats Active' : 'Show Star Seats Only'}
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Showing:</span>
            <span className="text-[10px] font-black text-blue-400">{filtered.length}</span>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">of {stats.total} constituencies</span>
            {filtersActive && (
              <button
                onClick={()=>{setMarginFilter('all');setAllianceFilter('all');setStateFilter('all');setStarOnly(false);}}
                className="ml-auto text-[9px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors">
                Clear All ×
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-600 text-xs font-black uppercase tracking-widest">No constituencies match current filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((c,i) => (
              <SeatCard key={`${c.stateSlug}-${c.rawId}-${i}`} c={c}
                onClick={() => navigate(`/state/${c.stateSlug}/constituency/${c.rawId}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligenceView;
