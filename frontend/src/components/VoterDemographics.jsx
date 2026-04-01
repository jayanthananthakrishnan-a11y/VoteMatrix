import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const VoterDemographics = () => {
  // Data derived from your ECI 'Participation of Women' snippet (Tamil Nadu row)
  // Total Electors: 62,404,947 | Total Women Electors: 31,721,536
  // Total Polled: 43,458,597 | Women Polled: 22,159,193
  
  const tnGenderTurnout = [
    { name: 'Male', electors: 30683411, polled: 21299404 }, // Calculated from Total - Women
    { name: 'Female', electors: 31721536, polled: 22159193 },
  ];

  const COLORS = ['#3b82f6', '#ec4899'];

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* 1. Electors vs Actual Voters (The "Gap" Analysis) */}
      <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-6">
          Voter Participation by Gender (TN)
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tnGenderTurnout} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#475569" fontSize={12} fontWeight="bold" />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: '900' }}/>
              <Bar dataKey="electors" fill="#1e293b" name="Total Registered" radius={[4, 4, 0, 0]} />
              <Bar dataKey="polled" fill="#3b82f6" name="Actually Voted" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Representation in State Parties (Women Candidates) */}
      <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-6">
          Women Representation in Main Parties
        </h3>
        <div className="space-y-8">
          {[
            { party: "DMK", total: 21, women: 3, percent: 14.2 },
            { party: "ADMK", total: 32, women: 1, percent: 3.1 },
            { party: "BJP", total: 23, women: 4, percent: 17.3 }
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span className="text-slate-400">{item.party} Women Candidates</span>
                <span className="text-blue-400">{item.women} of {item.total} Seats</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${(item.women/item.total)*100}%` }} 
                />
              </div>
            </div>
          ))}
          <p className="text-[9px] text-slate-500 leading-tight italic">
            *Data reflects the Participation of Women in National/State parties as per Section 26/27 of your report.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoterDemographics;