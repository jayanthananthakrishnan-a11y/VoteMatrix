import React from 'react';
import { User, TrendingUp, AlertCircle } from 'lucide-react';

const CandidateGrid = ({ candidates }) => {
  // Logic: Calculate % of total for the progress bars
  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {candidates.map((c, index) => (
        <div key={index} className={`relative overflow-hidden bg-slate-900/40 border ${index === 0 ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-slate-800'} p-6 rounded-3xl transition-all hover:bg-slate-900/60`}>
          
          {/* Rank Badge */}
          <div className="absolute top-4 right-4 text-[10px] font-black opacity-30 italic">#0{index + 1}</div>

          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{c.party}</h4>
              <h3 className="text-lg font-black uppercase italic leading-tight">{c.name}</h3>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-black tracking-tighter italic">
                  {(c.votes / 1000).toFixed(1)}K 
                  <span className="text-[10px] text-slate-500 ml-1 uppercase not-italic">Votes</span>
                </span>
                <span className={`text-xs font-black ${index === 0 ? 'text-blue-400' : 'text-slate-400'}`}>
                  {((c.votes / totalVotes) * 100).toFixed(1)}%
                </span>
              </div>

              {/* Vote Share Bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${index === 0 ? 'bg-blue-500' : 'bg-slate-600'}`}
                  style={{ width: `${(c.votes / totalVotes) * 100}%` }}
                />
              </div>

              {index === 0 ? (
                <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-blue-400 tracking-wider">
                  <TrendingUp size={12} /> Leading by {(candidates[0].votes - candidates[1].votes).toLocaleString()}
                </div>
              ) : (
                <div className="mt-4 text-[10px] font-black uppercase text-slate-600 tracking-wider">
                  Gap: -{(candidates[0].votes - c.votes).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateGrid;