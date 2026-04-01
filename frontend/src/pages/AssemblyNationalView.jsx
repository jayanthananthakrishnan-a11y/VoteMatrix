import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';

// ALL DATA INLINE — zero imports from assemblyData or partyConfig
const STATES = [
  { slug:'uttar-pradesh',      name:'Uttar Pradesh',      party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Yogi Adityanath',       seats:403, year:2022 },
  { slug:'gujarat',            name:'Gujarat',            party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Bhupendra Patel',        seats:182, year:2022 },
  { slug:'madhya-pradesh',     name:'Madhya Pradesh',     party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Mohan Yadav',            seats:230, year:2023 },
  { slug:'rajasthan',          name:'Rajasthan',          party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Bhajan Lal Sharma',      seats:200, year:2023 },
  { slug:'chhattisgarh',       name:'Chhattisgarh',       party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Vishnu Deo Sai',         seats:90,  year:2023 },
  { slug:'haryana',            name:'Haryana',            party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Nayab Singh Saini',      seats:90,  year:2024 },
  { slug:'maharashtra',        name:'Maharashtra',        party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Devendra Fadnavis',      seats:288, year:2024 },
  { slug:'assam',              name:'Assam',              party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Himanta Biswa Sarma',    seats:126, year:2021 },
  { slug:'uttarakhand',        name:'Uttarakhand',        party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Pushkar Singh Dhami',    seats:70,  year:2022 },
  { slug:'goa',                name:'Goa',                party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Pramod Sawant',          seats:40,  year:2022 },
  { slug:'manipur',            name:'Manipur',            party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'N. Biren Singh',         seats:60,  year:2022 },
  { slug:'tripura',            name:'Tripura',            party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Manik Saha',             seats:60,  year:2023 },
  { slug:'nagaland',           name:'Nagaland',           party:'NDPP',   alliance:'NDA',    color:'#365314', cm:'Neiphiu Rio',            seats:60,  year:2023 },
  { slug:'meghalaya',          name:'Meghalaya',          party:'NPP',    alliance:'NDA',    color:'#00796B', cm:'Conrad Sangma',          seats:60,  year:2023 },
  { slug:'arunachal-pradesh',  name:'Arunachal Pradesh',  party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Pema Khandu',            seats:60,  year:2024 },
  { slug:'sikkim',             name:'Sikkim',             party:'SKM',    alliance:'NDA',    color:'#9F1239', cm:'Prem Singh Tamang',      seats:32,  year:2024 },
  { slug:'andhra-pradesh',     name:'Andhra Pradesh',     party:'TDP',    alliance:'NDA',    color:'#FFD700', cm:'N. Chandrababu Naidu',   seats:175, year:2024 },
  { slug:'odisha',             name:'Odisha',             party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Mohan Majhi',            seats:147, year:2024 },
  { slug:'bihar',              name:'Bihar',              party:'JD(U)',  alliance:'NDA',    color:'#16A34A', cm:'Nitish Kumar',           seats:243, year:2020 },
  { slug:'delhi',              name:'Delhi',              party:'BJP',    alliance:'NDA',    color:'#FF8C00', cm:'Rekha Gupta',            seats:70,  year:2025 },
  { slug:'puducherry',         name:'Puducherry',         party:'AINRC',  alliance:'NDA',    color:'#7C3AED', cm:'N. Rangasamy',           seats:30,  year:2021 },
  { slug:'himachal-pradesh',   name:'Himachal Pradesh',   party:'INC',    alliance:'INDIA',  color:'#0EA5E9', cm:'Sukhvinder Singh Sukhu', seats:68,  year:2022 },
  { slug:'tamil-nadu',         name:'Tamil Nadu',         party:'DMK',    alliance:'INDIA',  color:'#DD0000', cm:'M. K. Stalin',           seats:234, year:2021 },
  { slug:'karnataka',          name:'Karnataka',          party:'INC',    alliance:'INDIA',  color:'#0EA5E9', cm:'Siddaramaiah',           seats:224, year:2023 },
  { slug:'telangana',          name:'Telangana',          party:'INC',    alliance:'INDIA',  color:'#0EA5E9', cm:'A. Revanth Reddy',       seats:119, year:2023 },
  { slug:'jharkhand',          name:'Jharkhand',          party:'JMM',    alliance:'INDIA',  color:'#22C55E', cm:'Hemant Soren',           seats:81,  year:2024 },
  { slug:'punjab',             name:'Punjab',             party:'AAP',    alliance:'INDIA',  color:'#0284C7', cm:'Bhagwant Mann',          seats:117, year:2022 },
  { slug:'jammu-and-kashmir',  name:'Jammu & Kashmir',    party:'JKNC',   alliance:'INDIA',  color:'#2563EB', cm:'Omar Abdullah',          seats:90,  year:2024 },
  { slug:'west-bengal',        name:'West Bengal',        party:'AITC',   alliance:'Others', color:'#06B6D4', cm:'Mamata Banerjee',        seats:294, year:2021 },
  { slug:'kerala',             name:'Kerala',             party:'CPI(M)', alliance:'Others', color:'#BE123C', cm:'Pinarayi Vijayan',       seats:140, year:2021 },
  { slug:'mizoram',            name:'Mizoram',            party:'ZPM',    alliance:'Others', color:'#0C4A6E', cm:'Lalduhoma',              seats:40,  year:2023 },
];

const ALLIANCE_COLORS = { NDA: '#FF8C00', INDIA: '#0EA5E9', Others: '#94A3B8' };

const REGIONS = [
  { label: 'North India',     slugs: ['jammu-and-kashmir','himachal-pradesh','punjab','haryana','uttarakhand','delhi','uttar-pradesh','rajasthan'] },
  { label: 'East India',      slugs: ['west-bengal','bihar','jharkhand','odisha','sikkim'] },
  { label: 'Northeast India', slugs: ['assam','arunachal-pradesh','nagaland','manipur','mizoram','tripura','meghalaya'] },
  { label: 'Central India',   slugs: ['madhya-pradesh','chhattisgarh'] },
  { label: 'West India',      slugs: ['gujarat','maharashtra','goa'] },
  { label: 'South India',     slugs: ['karnataka','telangana','andhra-pradesh','kerala','tamil-nadu','puducherry'] },
];

const AssemblyNationalView = () => {
  const navigate = useNavigate();
  const [mode,   setMode]   = useState('alliance');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const counts = { NDA: 0, INDIA: 0, Others: 0 };
  STATES.forEach(s => { counts[s.alliance] = (counts[s.alliance] || 0) + 1; });

  const getColor = (s) => mode === 'alliance' ? (ALLIANCE_COLORS[s.alliance] || '#94A3B8') : s.color;

  const regions = REGIONS.map(({ label, slugs }) => ({
    label,
    states: slugs
      .map(slug => STATES.find(s => s.slug === slug))
      .filter(Boolean)
      .filter(s => {
        const ms = s.name.toLowerCase().includes(search.toLowerCase());
        const mf = filter === 'ALL' || s.alliance === filter;
        return ms && mf;
      }),
  })).filter(r => r.states.length > 0);

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest">
          <ChevronLeft size={13} /> Lok Sabha
        </button>
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
          VOTEMATRIX · Assembly
        </span>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">Assembly Elections</div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">India Political Dashboard</h1>
          </div>
          <div className="flex bg-slate-900 border border-slate-800 rounded-full p-1">
            {[{k:'alliance',l:'Alliance'},{k:'party',l:'Party'}].map(({k,l}) => (
              <button key={k} onClick={() => setMode(k)}
                className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                  mode===k ? 'bg-blue-600 text-white' : 'text-slate-500'
                }`}>{l}</button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'NDA Govts',   value: counts.NDA,    color: '#FF8C00' },
            { label: 'INDIA Govts', value: counts.INDIA,  color: '#0EA5E9' },
            { label: 'Others',      value: counts.Others, color: '#94A3B8' },
          ].map((s,i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center">
              <div className="text-4xl font-black italic" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[9px] text-slate-500 uppercase font-black tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 flex-1 min-w-[180px]">
            <Search size={13} className="text-slate-600 flex-shrink-0" />
            <input type="text" placeholder="Search state..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-[11px] uppercase font-black outline-none w-full placeholder-slate-700 text-slate-300" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['ALL','NDA','INDIA','Others'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                  filter===f
                    ? f==='NDA'    ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                    : f==='INDIA'  ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                    : f==='Others' ? 'bg-slate-500/20 border-slate-500/40 text-slate-300'
                    : 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* State cards by region */}
        <div className="space-y-8">
          {regions.map(({ label, states }) => (
            <div key={label}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</h2>
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-[9px] font-black text-slate-600">{states.length}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {states.map(s => {
                  const c = getColor(s);
                  return (
                    <button key={s.slug}
                      onClick={() => navigate(`/assembly/state/${s.slug}`)}
                      className="relative overflow-hidden border rounded-2xl p-4 text-left group bg-slate-900/40 hover:bg-slate-800/60 transition-all"
                      style={{ borderColor: `${c}35` }}>
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: c }} />
                      <div className="pt-1.5">
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded inline-block mb-1.5"
                          style={{ color: c, backgroundColor: `${c}18` }}>
                          {s.alliance}
                        </span>
                        <h3 className="text-sm font-black italic uppercase tracking-tight leading-tight mb-1 text-slate-200 group-hover:text-white">
                          {s.name}
                        </h3>
                        <div className="text-[9px] font-black uppercase mb-0.5" style={{ color: c }}>{s.party}</div>
                        <div className="text-[8px] font-black text-slate-500 truncate">{s.cm}</div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-slate-800/50">
                          <span className="text-[8px] font-black text-slate-600">{s.seats} seats</span>
                          <span className="text-[8px] font-black text-slate-600">{s.year}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {regions.length === 0 && (
            <div className="text-center py-12 text-slate-600 font-black uppercase text-xs tracking-widest">
              No states match current filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssemblyNationalView;
