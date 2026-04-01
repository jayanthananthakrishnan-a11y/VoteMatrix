import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Activity, Zap, Loader2, Target } from 'lucide-react';
import HorseshoeChart from '../components/HorseshoeChart';
import { allianceData } from '../data/electionData';
import { API_BASE, keyToSlug } from '../data/useElectionData';

// ── Fetch state list from API, fall back to JSON ──────────
const useStateList = () => {
  const [states,  setStates]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [source,  setSource]  = useState(null);

  useEffect(() => {
    const load = async () => {
      // Try API first
      try {
        const res = await fetch(`${API_BASE}/states?type=LOK_SABHA`,
          { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const slugs = await res.json(); // ["tamil-nadu", "uttar-pradesh", ...]
          const mapped = slugs.map(slug => ({
            slug,
            label: slug.split('-').map(w =>
              w.length > 2
                ? w.charAt(0).toUpperCase() + w.slice(1)
                : w.toUpperCase()
            ).join(' ')
          }));
          setStates(mapped);
          setSource('api');
          setLoading(false);
          return;
        }
      } catch {
        // API not available — fall through to JSON
      }

      // JSON fallback
      try {
        const res  = await fetch('/Election_Results_2024_with_states.json');
        const data = await res.json();
        const mapped = Object.keys(data).map(k => ({
          slug:  keyToSlug(k),
          label: k.split(' ').map(w =>
            w.length > 2
              ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
              : w.toUpperCase()
          ).join(' ')
        }));
        setStates(mapped);
        setSource('json');
      } catch (e) {
        console.error('Failed to load states:', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { states, loading, source };
};

// ── Main Component ────────────────────────────────────────
const NationalView = () => {
  const navigate = useNavigate();
  const [search,  setSearch]  = useState('');
  const { states, loading, source } = useStateList();

  const filtered = states.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white page-enter">

      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-lg font-black italic tracking-tighter">
            VOTE<span className="text-blue-500">MATRIX</span>
          </span>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] hidden md:block ml-2">
            India Election Intelligence Platform
          </span>
        </div>

        <div className="flex items-center gap-4">
          {loading && (
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase">
              <Loader2 size={11} className="animate-spin text-blue-500" />
              Loading...
            </div>
          )}
          {source && (
            <div className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
              source === 'api'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-slate-800 text-slate-500'
            }`}>
              {source === 'api' ? '⚡ Live API' : '📄 JSON'}
            </div>
          )}
          <button
            onClick={() => navigate('/intelligence')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-xl text-blue-400 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600/20 transition-all"
          >
            <Target size={12} /> Intelligence
          </button>
          <div className="flex bg-slate-900 border border-slate-800 rounded-full p-1 text-[10px] font-black uppercase">
            <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white">
              Lok Sabha
            </button>
            <button
              onClick={() => navigate('/assembly')}
              className="px-4 py-1.5 rounded-full text-slate-500 hover:text-slate-300 transition-all"
            >
              Assembly
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* Hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

          {/* Horseshoe */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">18th Lok Sabha</h2>
                <h3 className="text-2xl font-black italic tracking-tighter">Alliance Seat Distribution</h3>
              </div>
              <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[9px] font-black uppercase tracking-widest">
                2024 Results
              </span>
            </div>
            <HorseshoeChart />
          </div>

          {/* Right panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Assembly CTA */}
            <button
              onClick={() => navigate('/assembly')}
              className="p-5 bg-slate-900/40 border border-slate-700 rounded-2xl hover:border-blue-500/40 hover:bg-blue-600/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 via-blue-500 to-slate-500 opacity-80" />
                <span className="text-sm font-black italic uppercase tracking-tight group-hover:text-blue-300 transition-colors">
                  Assembly Elections Map
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold">
                Interactive India political map — view which party/alliance governs each state.
              </p>
              <div className="mt-3 text-[9px] font-black uppercase tracking-widest text-blue-400">Explore →</div>
            </button>

            {/* Intelligence CTA */}
            <button
              onClick={() => navigate('/intelligence')}
              className="p-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-left group"
            >
              <div className="flex items-center gap-3 mb-2">
                <Target size={18} className="text-blue-400" />
                <span className="text-sm font-black italic uppercase tracking-tight">Intelligence Console</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold">
                Filter all 543 constituencies by margin, alliance, state.
              </p>
            </button>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total Seats',  value: '543',                          color: 'text-white' },
                { label: 'Majority',     value: '272',                          color: 'text-yellow-400' },
                { label: 'States / UTs', value: loading ? '...' : states.length.toString(), color: 'text-blue-400' },
              ].map((s, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 text-center">
                  <div className={`text-2xl font-black italic ${s.color}`}>{s.value}</div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Alliance bars */}
            {Object.entries(allianceData).map(([name, d]) => (
              <div key={name} className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: d.color }}>{name}</span>
                  <span className="text-xl font-black italic" style={{ color: d.color }}>{d.total}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(d.total/543)*100}%`, backgroundColor: d.color }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {d.parties.slice(0, 4).map((p, i) => (
                    <span key={i} className="text-[8px] font-black text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                      {p.name}: {p.seats}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Navigation */}
        <div className="bg-slate-900/20 border border-slate-800 rounded-3xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">State Navigation</h2>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                {loading
                  ? 'Loading states...'
                  : `${states.length} states & UTs — click to drill down`}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 w-full md:w-72">
              <Search size={13} className="text-slate-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search state or UT..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-[11px] uppercase font-black outline-none w-full placeholder-slate-700 text-slate-300"
              />
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Array(18).fill(0).map((_, i) => (
                <div key={i} className="h-10 bg-slate-900/50 border border-slate-800 rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {/* State grid */}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {filtered.map(state => (
                <button
                  key={state.slug}
                  onClick={() => navigate(`/state/${state.slug}`)}
                  className="py-3 px-3 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/60 hover:bg-blue-600/10 transition-all text-left group"
                >
                  <div className="flex items-center gap-2">
                    <Activity size={8} className="text-slate-700 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white tracking-tighter leading-tight transition-colors">
                      {state.label}
                    </span>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-600 text-xs font-black uppercase tracking-widest">
                  No states found matching "{search}"
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 justify-center">
          <Zap size={10} className="text-slate-700" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">
            Data Source: Election Commission of India · 2024 General Elections
          </span>
        </div>
      </div>
    </div>
  );
};

export default NationalView;
