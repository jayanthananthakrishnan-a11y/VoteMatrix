import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, Shield, Users, BarChart2, Loader2, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { API_BASE, slugToKey, getConstituencyDetail } from '../data/useElectionData';
import { getPartyColor, getPartyAlliance, ALLIANCE_CONFIG } from '../data/partyConfig';
import { getHistoricalData, hasHistoricalData, AVAILABLE_YEARS } from '../data/historicalMockData';

const getMarginClass = (pct) => pct < 3 ? 'text-red-400' : pct < 10 ? 'text-yellow-400' : 'text-green-400';

const getClassification = (pct) => {
  if (pct < 3)   return { label: 'CRITICAL',        cls: 'text-red-400 bg-red-500/10 border-red-500/20' };
  if (pct < 10)  return { label: 'SWING',            cls: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
  if (pct >= 20) return { label: 'SAFE STRONGHOLD',  cls: 'text-green-300 bg-green-400/10 border-green-400/20' };
  return          { label: 'STABLE',                cls: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
};

const CandidateCard = ({ c, totalVotes, rank }) => {
  const name  = c.candidate_name || c.candidateName || 'Unknown';
  const party = c.party || 'N/A';
  const votes = c.total_votes_secured ?? c.totalVotesSecured ?? 0;
  const pct   = totalVotes > 0 ? ((votes/totalVotes)*100).toFixed(1) : '0.0';
  const color = getPartyColor(party);
  return (
    <div className={`relative border rounded-2xl p-4 ${
      rank===0 ? 'ring-1 ring-yellow-500/30 border-yellow-500/30 bg-yellow-500/5' : 'border-slate-800 bg-slate-900/30'
    }`}>
      {rank===0 && (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 bg-yellow-500 px-2 py-0.5 rounded-full">
          <Trophy size={8} className="text-yellow-900"/>
          <span className="text-[8px] font-black text-yellow-900 uppercase">Winner</span>
        </div>
      )}
      {rank===1 && (
        <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-slate-700 border border-slate-600">
          <span className="text-[8px] font-black text-slate-300 uppercase">Runner-up</span>
        </div>
      )}
      <div className="mb-3 mt-1">
        <div className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color }}>{party}</div>
        <div className="text-base font-black italic uppercase leading-tight">{name}</div>
      </div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-xl font-black italic">
          {votes >= 1000 ? `${(votes/1000).toFixed(1)}K` : votes.toLocaleString()}
        </span>
        <span className="text-sm font-black" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor:color }}/>
      </div>
    </div>
  );
};

// ── Coming Soon Panel ─────────────────────────────────────
const ComingSoonPanel = ({ year, onBack }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="p-6 bg-slate-900/40 border border-slate-700 rounded-3xl mb-6 inline-block">
      <Clock size={40} className="text-slate-600 mx-auto mb-3"/>
      <div className="text-2xl font-black italic uppercase tracking-tighter text-slate-400">
        {year} Data
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-1">
        Coming in Next Version
      </div>
    </div>
    <p className="text-slate-500 text-sm max-w-md mb-2">
      Historical {year} Lok Sabha data for this constituency will be available once PDF extraction is complete.
    </p>
    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-8">
      Data available for select constituencies · Full import in v2.0
    </p>
    <button onClick={onBack}
      className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest transition-colors">
      <ArrowRight size={12}/> View 2024 Data Instead
    </button>
  </div>
);

// ── Fetch 2024 data ───────────────────────────────────────
const fetch2024Data = async (stateSlug, constituencyId) => {
  try {
    const res = await fetch(
      `${API_BASE}/constituency/${stateSlug}/${constituencyId}?year=2024`,
      { signal: AbortSignal.timeout(3000) }
    );
    if (res.ok) {
      const data = await res.json();
      return {
        constituency_name: data.constituencyName,
        const_sno:         data.constSno,
        state:             data.state,
        total_electors:    data.totalElectors,
        total_polled:      data.totalPolled,
        total_valid_votes: data.totalValidVotes,
        voter_turnout_pct: data.voterTurnoutPct,
        uncontested:       data.uncontested,
        candidates: (data.candidates||[])
          .sort((a,b) => (b.totalVotesSecured||0)-(a.totalVotesSecured||0))
          .map(c => ({
            candidate_name:      c.candidateName,
            party:               c.party,
            symbol:              c.symbol,
            total_votes_secured: c.totalVotesSecured,
            vote_share_pct:      c.voteSharePct,
          })),
        _source: 'api', _year: 2024,
      };
    }
  } catch { /* fall through */ }

  try {
    const res  = await fetch('/Election_Results_2024_with_states.json');
    const data = await res.json();
    const detail = getConstituencyDetail(data, stateSlug, constituencyId);
    if (detail) return { ...detail, _source: 'json', _year: 2024 };
  } catch (e) { console.error(e); }
  return null;
};

// ── Main Component ────────────────────────────────────────
const ConstituencyView = () => {
  const { stateSlug, constituencyId } = useParams();
  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState(2024);
  const [raw2024,      setRaw2024]      = useState(null);
  const [loading,      setLoading]      = useState(true);

  // Always load 2024 data on mount
  useEffect(() => {
    setLoading(true);
    fetch2024Data(stateSlug, constituencyId)
      .then(data => { setRaw2024(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [stateSlug, constituencyId]);

  // For historical years — get mock data or null
  const historicalRaw = selectedYear !== 2024
    ? getHistoricalData(stateSlug, Number(constituencyId), selectedYear)
    : null;

  const hasMock = selectedYear !== 2024 && !!historicalRaw;
  const showComingSoon = selectedYear !== 2024 && !historicalRaw;

  // Active data to display
  const raw = selectedYear === 2024 ? raw2024 : historicalRaw;

  if (loading) return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center page-enter">
      <div className="text-center">
        <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-4"/>
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Loading constituency data...</p>
      </div>
    </div>
  );

  if (!raw2024) return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center page-enter">
      <div className="text-center">
        <div className="text-5xl font-black text-slate-800 mb-4 italic">#{constituencyId}</div>
        <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6">Constituency not found</p>
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest mx-auto">
          <ChevronLeft size={12}/> Go Back
        </button>
      </div>
    </div>
  );

  // Derive display values from active data (or 2024 for header)
  const displayRaw = raw || raw2024;
  const sorted     = [...(displayRaw.candidates||[])].sort((a,b) =>
    (b.total_votes_secured||b.totalVotesSecured||0) - (a.total_votes_secured||a.totalVotesSecured||0)
  );
  const winner     = sorted[0];
  const runnerUp   = sorted[1];
  const wVotes     = winner?.total_votes_secured   || winner?.totalVotesSecured   || 0;
  const rVotes     = runnerUp?.total_votes_secured || runnerUp?.totalVotesSecured || 0;
  const margin     = wVotes - rVotes;
  const totalValid = displayRaw.total_valid_votes || displayRaw.totalValidVotes || 0;
  const marginPct  = totalValid > 0 ? parseFloat(((margin/totalValid)*100).toFixed(1)) : 0;
  const turnout    = (displayRaw.voter_turnout_pct || displayRaw.voterTurnoutPct || 0).toFixed(1);
  const constName  = raw2024.constituency_name || raw2024.constituencyName || `#${constituencyId}`;
  const stateRaw   = raw2024.state || stateSlug || '';
  const stateName  = stateRaw.split(' ')
    .map(w => w.length>2 ? w.charAt(0).toUpperCase()+w.slice(1).toLowerCase() : w.toUpperCase()).join(' ');

  const classification = getClassification(marginPct);
  const winnerParty    = winner?.party || 'N/A';
  const allianceCfg    = ALLIANCE_CONFIG[getPartyAlliance(winnerParty)] || ALLIANCE_CONFIG.Others;

  const sourceLabel = displayRaw._source === 'api'  ? '⚡ Live API'
    : displayRaw._source === 'mock' ? '📊 Mock Data'
    : '📄 JSON';
  const sourceCls = displayRaw._source === 'api'
    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
    : displayRaw._source === 'mock'
    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
    : 'bg-slate-800 text-slate-500';

  return (
    <div className="min-h-screen bg-[#020617] text-white page-enter">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800/80">
        <button onClick={() => navigate(stateSlug ? `/state/${stateSlug}` : '/')}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group">
          <ChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform"/>
          {stateName}
        </button>
        <div className="flex items-center gap-3">
          <div className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${sourceCls}`}>
            {sourceLabel}
          </div>
          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
            VOTEMATRIX · {constName}
          </span>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* Header — always shows from 2024 base data */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                {stateName} · #{raw2024.const_sno || raw2024.constSno || constituencyId}
              </span>
              {!showComingSoon && (
                <>
                  <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${classification.cls}`}>
                    {classification.label}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest"
                    style={{ color:allianceCfg.color, backgroundColor:`${allianceCfg.color}18` }}>
                    {allianceCfg.label}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              {constName}
            </h1>
          </div>
          {!showComingSoon && (
            <div className="flex gap-6 border-l border-slate-800 pl-6 flex-shrink-0">
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Turnout</div>
                <div className="text-4xl font-black italic">{turnout}%</div>
              </div>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Margin</div>
                <div className={`text-4xl font-black italic ${getMarginClass(marginPct)}`}>+{marginPct}%</div>
              </div>
            </div>
          )}
        </div>

        {/* ── YEAR TIMELINE TOGGLE — always visible ── */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex-shrink-0">
              Election Year:
            </span>
            <div className="flex gap-2 flex-wrap">
              {AVAILABLE_YEARS.map(year => {
                const isCurrent  = year === selectedYear;
                const isMockYear = year !== 2024;
                const histExists = year !== 2024 && hasHistoricalData(stateSlug, Number(constituencyId));
                return (
                  <button key={year} onClick={() => setSelectedYear(year)}
                    className={`relative px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      isCurrent
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                    }`}>
                    {year}
                    {isMockYear && histExists && (
                      <span className="absolute -top-1.5 -right-1.5 text-[7px] font-black bg-yellow-500 text-yellow-900 px-1 rounded-full">
                        MOCK
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedYear !== 2024 && (
              <button onClick={() => setSelectedYear(2024)}
                className="ml-auto flex items-center gap-1 text-[9px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
                Back to 2024 <ArrowRight size={10}/>
              </button>
            )}
          </div>
          {hasMock && (
            <div className="mt-2 px-1 text-[9px] font-black text-yellow-500/70 uppercase tracking-widest">
              Showing {selectedYear} Lok Sabha · Mock data for demonstration
            </div>
          )}
        </div>

        {/* ── COMING SOON for historical years without mock data ── */}
        {showComingSoon ? (
          <ComingSoonPanel year={selectedYear} onBack={() => setSelectedYear(2024)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: candidates */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <Users size={14} className="text-blue-400"/>
                <h2 className="text-sm font-black uppercase italic tracking-tight">
                  Candidate Results · {selectedYear}
                </h2>
                <div className="h-px flex-1 bg-slate-800"/>
                <span className="text-[9px] font-black text-slate-600 uppercase">
                  {totalValid.toLocaleString()} valid votes
                </span>
              </div>

              {/* Winner vs runner-up */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy size={12} className="text-yellow-400"/>
                      <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest">Winner</span>
                    </div>
                    <div className="text-base font-black italic uppercase leading-tight">
                      {winner?.candidate_name||winner?.candidateName}
                    </div>
                    <div className="text-[10px] font-black mt-1" style={{ color:getPartyColor(winnerParty) }}>
                      {winnerParty}
                    </div>
                    <div className="text-2xl font-black italic mt-2 text-yellow-300">
                      {wVotes>=1000 ? `${(wVotes/1000).toFixed(1)}K` : wVotes.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400 font-black">
                      {winner?.vote_share_pct||winner?.voteSharePct}% vote share
                    </div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">#2 Runner-up</div>
                    <div className="text-base font-black italic uppercase leading-tight">
                      {runnerUp?.candidate_name||runnerUp?.candidateName}
                    </div>
                    <div className="text-[10px] font-black mt-1" style={{ color:getPartyColor(runnerUp?.party) }}>
                      {runnerUp?.party}
                    </div>
                    <div className="text-2xl font-black italic mt-2 text-slate-300">
                      {rVotes>=1000 ? `${(rVotes/1000).toFixed(1)}K` : rVotes.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-black">
                      {runnerUp?.vote_share_pct||runnerUp?.voteSharePct}% vote share
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    Margin: {margin.toLocaleString()} votes ({marginPct}%)
                  </div>
                  <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
                    {sorted.map((c,i) => {
                      const pct = c.vote_share_pct||c.voteSharePct||0;
                      return <div key={i} className="h-full"
                        style={{ width:`${pct}%`, backgroundColor:getPartyColor(c.party), opacity:i===0?1:0.65 }}/>;
                    })}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {sorted.map((c,i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor:getPartyColor(c.party) }}/>
                        <span className="text-[8px] font-black uppercase" style={{ color:getPartyColor(c.party) }}>{c.party}</span>
                        <span className="text-[8px] font-black text-slate-500">{c.vote_share_pct||c.voteSharePct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {sorted.map((c,i) => (
                  <CandidateCard key={i} c={c} totalVotes={totalValid} rank={i}/>
                ))}
              </div>
            </div>

            {/* Right: stats */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-slate-900/30 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={12} className="text-blue-400"/>
                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Stats · {selectedYear}</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label:'Total Electors', value:(displayRaw.total_electors||displayRaw.totalElectors||0).toLocaleString() },
                    { label:'Total Polled',   value:(displayRaw.total_polled||displayRaw.totalPolled||0).toLocaleString() },
                    { label:'Valid Votes',    value:totalValid.toLocaleString() },
                    { label:'Voter Turnout',  value:`${turnout}%` },
                    { label:'Candidates',     value:sorted.length },
                    { label:'Winning Margin', value:`${margin.toLocaleString()} votes` },
                  ].map((item,i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">{item.label}</span>
                      <span className="text-[11px] font-black text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 size={12} className="text-purple-400"/>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Vote Share</span>
                </div>
                <div className="space-y-2.5">
                  {sorted.map((c,i) => {
                    const pct   = c.vote_share_pct||c.voteSharePct||0;
                    const color = getPartyColor(c.party);
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-[9px] font-black mb-1">
                          <span className="uppercase" style={{ color }}>{c.party}</span>
                          <span className="text-slate-400">{pct}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor:color }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Historical winners panel */}
              <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-4">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">
                  Historical Winners
                </div>
                <div className="space-y-2">
                  {AVAILABLE_YEARS.map(year => {
                    const isCurrent  = year === selectedYear;
                    const histData   = year === 2024 ? null : getHistoricalData(stateSlug, Number(constituencyId), year);
                    const w2024      = raw2024?.candidates?.[0];
                    const mockW      = histData?.candidates?.[0];

                    const label = year === 2024
                      ? `${w2024?.candidate_name||w2024?.candidateName||'—'} (${w2024?.party||'—'})`
                      : histData
                      ? `${mockW?.candidateName||'—'} (${mockW?.party||'—'})`
                      : 'Data in next version';
                    const labelColor = year === 2024
                      ? getPartyColor(w2024?.party)
                      : histData ? getPartyColor(mockW?.party) : '#475569';

                    return (
                      <button key={year} onClick={() => setSelectedYear(year)}
                        className={`w-full flex justify-between items-center p-2.5 rounded-xl border transition-all text-left ${
                          isCurrent
                            ? 'bg-blue-600/10 border-blue-500/30'
                            : 'bg-slate-900/30 border-slate-800 hover:border-slate-600'
                        }`}>
                        <div className="min-w-0 flex-1">
                          <div className="text-[9px] font-black uppercase italic truncate" style={{ color:labelColor }}>
                            {label}
                          </div>
                        </div>
                        <div className={`text-[10px] font-black italic flex-shrink-0 ml-2 ${isCurrent?'text-blue-400':'text-slate-500'}`}>
                          {year}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasMock && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle size={11} className="text-yellow-500"/>
                    <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Mock Data</span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed">
                    {selectedYear} data shown for demonstration. Real data imports in v2.0.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstituencyView;
