const MainHub = ({ setPage }) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
    <h1 className="text-4xl font-black italic tracking-tighter">ELECTION INTELLIGENCE v2</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
      {/* Button 1: State Navigation */}
      <button 
        onClick={() => setPage('states')}
        className="p-8 bg-slate-900 border-2 border-slate-800 rounded-2xl hover:border-blue-500 transition-all text-left group"
      >
        <div className="text-blue-500 mb-2 group-hover:scale-110 transition-transform">📍</div>
        <h2 className="text-2xl font-bold">State-wise Constituencies</h2>
        <p className="text-slate-400 mt-2">Browse the 2024 results by state and individual parliamentary seats.</p>
      </button>

      {/* Button 2: Advanced Analysis */}
      <button 
        onClick={() => setPage('analysis')}
        className="p-8 bg-slate-900 border-2 border-slate-800 rounded-2xl hover:border-purple-500 transition-all text-left group"
      >
        <div className="text-purple-500 mb-2 group-hover:scale-110 transition-transform">🔍</div>
        <h2 className="text-2xl font-bold">Advanced Filter Console</h2>
        <p className="text-slate-400 mt-2">Cross-reference margins, alliances, and VIP sectors across India.</p>
      </button>
    </div>
  </div>
);