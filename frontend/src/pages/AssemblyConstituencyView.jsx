import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy } from 'lucide-react';

const AssemblyConstituencyView = () => {
  const { stateSlug, constituencyId } = useParams();
  const navigate = useNavigate();

  const id = parseInt(constituencyId) || 1;
  const totalVotes = 80000 + id * 1234;
  const winnerVotes = Math.round(totalVotes * 0.45);
  const runnerVotes = Math.round(totalVotes * 0.32);
  const thirdVotes  = Math.round(totalVotes * 0.15);
  const fourthVotes = totalVotes - winnerVotes - runnerVotes - thirdVotes;
  const margin      = winnerVotes - runnerVotes;
  const marginPct   = ((margin / totalVotes) * 100).toFixed(1);
  const turnout     = (60 + (id % 25)).toFixed(1);

  const candidates = [
    { name: `Candidate A`, party: 'DMK',  votes: winnerVotes, pct: ((winnerVotes/totalVotes)*100).toFixed(1), color:'#DD0000', winner:true },
    { name: `Candidate B`, party: 'ADMK', votes: runnerVotes, pct: ((runnerVotes/totalVotes)*100).toFixed(1), color:'#374151', winner:false },
    { name: `Candidate C`, party: 'BJP',  votes: thirdVotes,  pct: ((thirdVotes/totalVotes)*100).toFixed(1),  color:'#FF8C00', winner:false },
    { name: `Candidate D`, party: 'NOTA', votes: fourthVotes, pct: ((fourthVotes/totalVotes)*100).toFixed(1), color:'#64748b', winner:false },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
        <button onClick={() => navigate(`/assembly/state/${stateSlug}`)}
          className="flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest">
          <ChevronLeft size={13} /> {stateSlug?.replace(/-/g,' ')}
        </button>
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
          VOTEMATRIX · Assembly · Constituency #{id}
        </span>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">
              {stateSlug?.replace(/-/g,' ')} Assembly · #{id}
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">Constituency {id}</h1>
          </div>
          <div className="flex gap-6 border-l border-slate-800 pl-6">
            <div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Turnout</div>
              <div className="text-4xl font-black italic">{turnout}%</div>
            </div>
            <div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Margin</div>
              <div className={`text-4xl font-black italic ${parseFloat(marginPct) < 5 ? 'text-red-400' : 'text-green-400'}`}>
                +{marginPct}%
              </div>
            </div>
          </div>
        </div>

        {/* Winner/Runner-up */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={12} className="text-yellow-400" />
                <span className="text-[9px] font-black text-yellow-400 uppercase">Winner</span>
              </div>
              <div className="text-base font-black italic uppercase">{candidates[0].name}</div>
              <div className="text-[10px] font-black mt-1" style={{ color: candidates[0].color }}>{candidates[0].party}</div>
              <div className="text-2xl font-black italic mt-2 text-yellow-300">
                {(candidates[0].votes/1000).toFixed(1)}K
              </div>
              <div className="text-[10px] text-slate-400">{candidates[0].pct}% vote share</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <div className="text-[9px] font-black text-slate-500 uppercase mb-2">#2 Runner-up</div>
              <div className="text-base font-black italic uppercase">{candidates[1].name}</div>
              <div className="text-[10px] font-black mt-1" style={{ color: candidates[1].color }}>{candidates[1].party}</div>
              <div className="text-2xl font-black italic mt-2 text-slate-300">
                {(candidates[1].votes/1000).toFixed(1)}K
              </div>
              <div className="text-[10px] text-slate-500">{candidates[1].pct}% vote share</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="text-[9px] font-black text-slate-500 uppercase mb-2">
              Margin: {margin.toLocaleString()} votes ({marginPct}%)
            </div>
            <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
              {candidates.map((c,i) => (
                <div key={i} className="h-full"
                  style={{ width:`${c.pct}%`, backgroundColor:c.color, opacity:i===0?1:0.6 }} />
              ))}
            </div>
          </div>
        </div>

        {/* All candidates */}
        <div className="grid grid-cols-2 gap-3">
          {candidates.map((c, i) => (
            <div key={i}
              className={`relative border rounded-2xl p-4 ${i===0 ? 'ring-1 ring-yellow-500/30 border-yellow-500/30 bg-yellow-500/5' : 'border-slate-800 bg-slate-900/30'}`}>
              {i===0 && (
                <div className="absolute -top-2.5 left-4 flex items-center gap-1 bg-yellow-500 px-2 py-0.5 rounded-full">
                  <Trophy size={8} className="text-yellow-900" />
                  <span className="text-[8px] font-black text-yellow-900 uppercase">Winner</span>
                </div>
              )}
              <div className="mt-1">
                <div className="text-[9px] font-black uppercase mb-0.5" style={{ color: c.color }}>{c.party}</div>
                <div className="text-base font-black italic uppercase">{c.name}</div>
                <div className="flex justify-between items-end mt-3 mb-1">
                  <span className="text-xl font-black italic">{(c.votes/1000).toFixed(1)}K</span>
                  <span className="text-sm font-black" style={{ color:c.color }}>{c.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width:`${c.pct}%`, backgroundColor:c.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
          <div className="text-[9px] font-black text-yellow-400 uppercase tracking-widest mb-1">Mock Data</div>
          <p className="text-[9px] text-slate-500">Real candidate data loads in Phase 3.</p>
        </div>
      </div>
    </div>
  );
};

export default AssemblyConstituencyView;
