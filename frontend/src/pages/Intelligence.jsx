import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { prominentSeats } from '../data/prominentData';
import { Filter, Star, Zap, ChevronLeft, Target } from 'lucide-react';

const Intelligence = () => {
  const navigate = useNavigate();
  const [marginFilter, setMarginFilter] = useState('all');
  const [vipOnly, setVipOnly] = useState(false);

  const filtered = useMemo(() => {
    return prominentSeats.filter(seat => {
      const matchMargin = marginFilter === 'all' || 
        (marginFilter === 'v-low' && seat.marginPercent < 2) ||
        (marginFilter === 'low' && seat.marginPercent < 5);
      const matchVip = !vipOnly || seat.isProminent;
      return matchMargin && matchVip;
    });
  }, [marginFilter, vipOnly]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-colors uppercase text-[10px] font-black tracking-widest">
        <ChevronLeft size={14} /> Back to Command Center
      </button>

      <div className="max-w-[1400px] mx-auto">
        <header className="flex items-center gap-6 mb-12">
          <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
            <Target className="text-blue-500" size={32} />
          </div>
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">Intelligence Console</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Strategic Sector Filtering & Risk Assessment</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] space-y-4">
               <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Victory Margin Logic</label>
               <select 
                onChange={(e) => setMarginFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-black uppercase outline-none focus:border-blue-500"
               >
                 <option value="all">All Margins</option>
                 <option value="v-low">{"< 2% Critical Swing"}</option>
                 <option value="low">{"< 5% Vulnerable"}</option>
               </select>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] flex items-center">
               <button 
                onClick={() => setVipOnly(!vipOnly)}
                className={`w-full p-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-3 transition-all border ${vipOnly ? 'bg-blue-600 border-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}
               >
                 <Star size={14} fill={vipOnly ? "white" : "none"} />
                 {vipOnly ? "VIP SECTORS ISOLATED" : "SHOW VIP SECTORS ONLY"}
               </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(seat => (
            <div key={seat.id} className="bg-slate-900/30 border border-slate-800 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all">
               <div className="flex justify-between items-start mb-6">
                 <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{seat.state}</span>
                 {seat.isProminent && <Zap size={16} className="text-yellow-500 fill-yellow-500" />}
               </div>
               <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-1">{seat.name}</h3>
               <p className="text-slate-400 text-xs font-bold mb-6">{seat.candidate}</p>
               <div className="flex justify-between items-center border-t border-slate-800 pt-6">
                 <span className="text-[10px] font-black uppercase text-slate-500">{seat.party}</span>
                 <span className={`text-2xl font-black italic ${seat.marginPercent < 5 ? 'text-red-500' : 'text-green-500'}`}>
                   {seat.marginPercent}%
                 </span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intelligence;