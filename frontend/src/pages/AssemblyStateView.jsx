import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Crown } from 'lucide-react';

// Inline data — zero external imports
const STATE_DATA = {
  'tamil-nadu':        { name:'Tamil Nadu',        party:'DMK',    cm:'M. K. Stalin',           seats:234, year:2021, alliance:'INDIA', color:'#DD0000' },
  'west-bengal':       { name:'West Bengal',        party:'AITC',   cm:'Mamata Banerjee',        seats:294, year:2021, alliance:'Others',color:'#06B6D4' },
  'uttar-pradesh':     { name:'Uttar Pradesh',      party:'BJP',    cm:'Yogi Adityanath',        seats:403, year:2022, alliance:'NDA',   color:'#FF8C00' },
  'gujarat':           { name:'Gujarat',            party:'BJP',    cm:'Bhupendra Patel',        seats:182, year:2022, alliance:'NDA',   color:'#FF8C00' },
  'madhya-pradesh':    { name:'Madhya Pradesh',     party:'BJP',    cm:'Mohan Yadav',            seats:230, year:2023, alliance:'NDA',   color:'#FF8C00' },
  'rajasthan':         { name:'Rajasthan',          party:'BJP',    cm:'Bhajan Lal Sharma',      seats:200, year:2023, alliance:'NDA',   color:'#FF8C00' },
  'chhattisgarh':      { name:'Chhattisgarh',       party:'BJP',    cm:'Vishnu Deo Sai',         seats:90,  year:2023, alliance:'NDA',   color:'#FF8C00' },
  'haryana':           { name:'Haryana',            party:'BJP',    cm:'Nayab Singh Saini',      seats:90,  year:2024, alliance:'NDA',   color:'#FF8C00' },
  'maharashtra':       { name:'Maharashtra',        party:'BJP',    cm:'Devendra Fadnavis',      seats:288, year:2024, alliance:'NDA',   color:'#FF8C00' },
  'assam':             { name:'Assam',              party:'BJP',    cm:'Himanta Biswa Sarma',    seats:126, year:2021, alliance:'NDA',   color:'#FF8C00' },
  'uttarakhand':       { name:'Uttarakhand',        party:'BJP',    cm:'Pushkar Singh Dhami',    seats:70,  year:2022, alliance:'NDA',   color:'#FF8C00' },
  'goa':               { name:'Goa',                party:'BJP',    cm:'Pramod Sawant',          seats:40,  year:2022, alliance:'NDA',   color:'#FF8C00' },
  'manipur':           { name:'Manipur',            party:'BJP',    cm:'N. Biren Singh',         seats:60,  year:2022, alliance:'NDA',   color:'#FF8C00' },
  'tripura':           { name:'Tripura',            party:'BJP',    cm:'Manik Saha',             seats:60,  year:2023, alliance:'NDA',   color:'#FF8C00' },
  'nagaland':          { name:'Nagaland',           party:'NDPP',   cm:'Neiphiu Rio',            seats:60,  year:2023, alliance:'NDA',   color:'#365314' },
  'meghalaya':         { name:'Meghalaya',          party:'NPP',    cm:'Conrad Sangma',          seats:60,  year:2023, alliance:'NDA',   color:'#00796B' },
  'arunachal-pradesh': { name:'Arunachal Pradesh',  party:'BJP',    cm:'Pema Khandu',            seats:60,  year:2024, alliance:'NDA',   color:'#FF8C00' },
  'sikkim':            { name:'Sikkim',             party:'SKM',    cm:'Prem Singh Tamang',      seats:32,  year:2024, alliance:'NDA',   color:'#9F1239' },
  'andhra-pradesh':    { name:'Andhra Pradesh',     party:'TDP',    cm:'N. Chandrababu Naidu',   seats:175, year:2024, alliance:'NDA',   color:'#FFD700' },
  'odisha':            { name:'Odisha',             party:'BJP',    cm:'Mohan Majhi',            seats:147, year:2024, alliance:'NDA',   color:'#FF8C00' },
  'bihar':             { name:'Bihar',              party:'JD(U)', cm:'Nitish Kumar',           seats:243, year:2020, alliance:'NDA',   color:'#16A34A' },
  'delhi':             { name:'Delhi',              party:'BJP',    cm:'Rekha Gupta',            seats:70,  year:2025, alliance:'NDA',   color:'#FF8C00' },
  'puducherry':        { name:'Puducherry',         party:'AINRC',  cm:'N. Rangasamy',           seats:30,  year:2021, alliance:'NDA',   color:'#7C3AED' },
  'himachal-pradesh':  { name:'Himachal Pradesh',   party:'INC',    cm:'Sukhvinder Singh Sukhu', seats:68,  year:2022, alliance:'INDIA', color:'#0EA5E9' },
  'karnataka':         { name:'Karnataka',          party:'INC',    cm:'Siddaramaiah',           seats:224, year:2023, alliance:'INDIA', color:'#0EA5E9' },
  'telangana':         { name:'Telangana',          party:'INC',    cm:'A. Revanth Reddy',       seats:119, year:2023, alliance:'INDIA', color:'#0EA5E9' },
  'jharkhand':         { name:'Jharkhand',          party:'JMM',    cm:'Hemant Soren',           seats:81,  year:2024, alliance:'INDIA', color:'#22C55E' },
  'punjab':            { name:'Punjab',             party:'AAP',    cm:'Bhagwant Mann',          seats:117, year:2022, alliance:'INDIA', color:'#0284C7' },
  'jammu-and-kashmir': { name:'Jammu & Kashmir',    party:'JKNC',   cm:'Omar Abdullah',          seats:90,  year:2024, alliance:'INDIA', color:'#2563EB' },
  'kerala':            { name:'Kerala',             party:'CPI(M)', cm:'Pinarayi Vijayan',       seats:140, year:2021, alliance:'Others',color:'#BE123C' },
  'mizoram':           { name:'Mizoram',            party:'ZPM',    cm:'Lalduhoma',              seats:40,  year:2023, alliance:'Others',color:'#0C4A6E' },
};

const AssemblyStateView = () => {
  const { stateSlug } = useParams();
  const navigate = useNavigate();
  const s = STATE_DATA[stateSlug];

  if (!s) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-black text-slate-800 mb-4 italic uppercase">{stateSlug}</p>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-6">State not found</p>
          <button onClick={() => navigate('/assembly')}
            className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
            ← Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Generate mock constituencies
  const constituencies = Array.from({ length: Math.min(s.seats, 30) }, (_, i) => ({
    id: i + 1,
    name: `Constituency ${i + 1}`,
    party: i % 3 === 0 ? s.party : (i % 2 === 0 ? 'INC' : 'BJP'),
    margin: Math.round(2000 + Math.random() * 50000),
    marginPct: parseFloat((1 + Math.random() * 30).toFixed(1)),
    turnout: parseFloat((55 + Math.random() * 30).toFixed(1)),
  }));

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
        <button onClick={() => navigate('/assembly')}
          className="flex items-center gap-2 text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest">
          <ChevronLeft size={13} /> Political Map
        </button>
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
          VOTEMATRIX · {s.name} Assembly
        </span>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* CM Banner */}
        <div className="rounded-2xl p-5 mb-8 border flex items-center gap-5"
          style={{ backgroundColor: `${s.color}10`, borderColor: `${s.color}30` }}>
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${s.color}20` }}>
            <Crown size={24} style={{ color: s.color }} />
          </div>
          <div className="flex-1">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Chief Minister · {s.name}</div>
            <div className="text-2xl font-black italic uppercase tracking-tight" style={{ color: s.color }}>{s.cm}</div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded"
                style={{ color: s.color, backgroundColor: `${s.color}20` }}>{s.party}</span>
              <span className="text-[9px] font-black uppercase text-slate-500">{s.alliance} Alliance · {s.year} Election</span>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-3xl font-black italic" style={{ color: s.color }}>{s.seats}</div>
            <div className="text-[9px] font-black uppercase text-slate-500">Total Seats</div>
          </div>
        </div>

        <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-8">{s.name}</h1>

        {/* Note */}
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4 mb-6">
          <div className="text-[9px] font-black text-yellow-400 uppercase tracking-widest mb-1">Phase 1 — Mock Data</div>
          <p className="text-[9px] text-slate-500">
            Showing {Math.min(s.seats, 30)} of {s.seats} constituencies with auto-generated data.
            Real data for all constituencies loads in Phase 3 (Database).
          </p>
        </div>

        {/* Constituency grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {constituencies.map(c => (
            <button key={c.id}
              onClick={() => navigate(`/assembly/state/${stateSlug}/constituency/${c.id}`)}
              className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-blue-500/50 transition-all text-left group">
              <div className="text-[8px] font-black text-slate-600 mb-1">#{c.id}</div>
              <div className="text-sm font-black italic uppercase group-hover:text-blue-300 mb-2">{c.name}</div>
              <div className="text-[9px] font-black uppercase" style={{ color: s.color }}>{c.party}</div>
              <div className={`text-sm font-black italic mt-1 ${c.marginPct < 5 ? 'text-red-400' : c.marginPct < 15 ? 'text-yellow-400' : 'text-green-400'}`}>
                +{c.marginPct}%
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssemblyStateView;
