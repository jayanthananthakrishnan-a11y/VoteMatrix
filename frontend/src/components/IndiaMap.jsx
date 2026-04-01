import React, { useEffect, useRef, useState } from 'react';

// State name → slug mapping (matches our assemblyData keys)
const STATE_NAME_TO_SLUG = {
  'Andhra Pradesh': 'andhra-pradesh',
  'Arunachal Pradesh': 'arunachal-pradesh',
  'Assam': 'assam',
  'Bihar': 'bihar',
  'Chhattisgarh': 'chhattisgarh',
  'Goa': 'goa',
  'Gujarat': 'gujarat',
  'Haryana': 'haryana',
  'Himachal Pradesh': 'himachal-pradesh',
  'Jharkhand': 'jharkhand',
  'Karnataka': 'karnataka',
  'Kerala': 'kerala',
  'Madhya Pradesh': 'madhya-pradesh',
  'Maharashtra': 'maharashtra',
  'Manipur': 'manipur',
  'Meghalaya': 'meghalaya',
  'Mizoram': 'mizoram',
  'Nagaland': 'nagaland',
  'Odisha': 'odisha',
  'Punjab': 'punjab',
  'Rajasthan': 'rajasthan',
  'Sikkim': 'sikkim',
  'Tamil Nadu': 'tamil-nadu',
  'Telangana': 'telangana',
  'Tripura': 'tripura',
  'Uttar Pradesh': 'uttar-pradesh',
  'Uttarakhand': 'uttarakhand',
  'West Bengal': 'west-bengal',
  'Andaman & Nicobar Island': 'andaman-and-nicobar',
  'Chandigarh': 'chandigarh',
  'Dadra and Nagar Haveli': 'dadra-and-nagar-haveli',
  'Daman and Diu': 'dadra-and-nagar-haveli',
  'Delhi': 'delhi',
  'Jammu & Kashmir': 'jammu-and-kashmir',
  'Ladakh': 'ladakh',
  'Lakshadweep': 'lakshadweep',
  'Puducherry': 'puducherry',
};

const IndiaMap = ({ stateColors, onStateClick, tooltip }) => {
  const svgRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  useEffect(() => {
    // Load D3 + topojson dynamically
    const loadMap = async () => {
      try {
        // Fetch India topojson
        const res = await fetch('https://cdn.jsdelivr.net/npm/india-atlas@1.0.0/dist/india.json');
        if (!res.ok) throw new Error('Map fetch failed');
        const topo = await res.json();

        const d3Script = document.createElement('script');
        d3Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
        d3Script.onload = () => {
          const topoScript = document.createElement('script');
          topoScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
          topoScript.onload = () => {
            try {
              const d3 = window.d3;
              const topojson = window.topojson;

              const key = Object.keys(topo.objects)[0];
              const features = topojson.feature(topo, topo.objects[key]).features;

              const projection = d3.geoMercator().fitSize([600, 700], {
                type: 'FeatureCollection',
                features,
              });
              const pathGen = d3.geoPath().projection(projection);

              const computed = features.map(f => ({
                d: pathGen(f),
                name: f.properties.NAME_1 || f.properties.name || f.properties.ST_NM || '',
                slug: STATE_NAME_TO_SLUG[f.properties.NAME_1 || f.properties.name || f.properties.ST_NM || ''] || '',
                centroid: pathGen.centroid(f),
              }));

              setPaths(computed);
            } catch (e) {
              console.error('Map render error:', e);
            }
          };
          document.head.appendChild(topoScript);
        };
        document.head.appendChild(d3Script);
      } catch (e) {
        console.error('Map load error:', e);
      }
    };
    loadMap();
  }, []);

  const handleMouseMove = (e, p) => {
    const rect = svgRef.current.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 10 });
    setHovered(p);
  };

  return (
    <div className="relative w-full" style={{ maxWidth: 600 }}>
      <svg
        ref={svgRef}
        viewBox="0 0 600 700"
        className="w-full"
        style={{ display: 'block' }}
        onMouseLeave={() => { setHovered(null); setTooltipPos(null); }}
      >
        {paths.length === 0 && (
          <text x="300" y="350" textAnchor="middle" fill="#334155" fontSize="14"
            fontFamily="'Barlow Condensed', sans-serif" fontWeight="700">
            Loading India map...
          </text>
        )}

        {paths.map((p, i) => {
          if (!p.d) return null;
          const color = stateColors[p.slug] || '#1e293b';
          const isHov = hovered?.slug === p.slug;
          return (
            <path
              key={i}
              d={p.d}
              fill={color}
              stroke="#0f172a"
              strokeWidth={isHov ? 1.5 : 0.8}
              opacity={isHov ? 1 : 0.88}
              style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseMove={(e) => handleMouseMove(e, p)}
              onClick={() => p.slug && onStateClick(p.slug)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered && tooltipPos && (
        <div
          className="absolute pointer-events-none z-10"
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 8 }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
            <div className="text-[10px] font-black uppercase text-white tracking-wide">
              {hovered.name || hovered.slug}
            </div>
            {tooltip && tooltip[hovered.slug] && (
              <div className="text-[9px] font-bold text-slate-400 mt-0.5">
                {tooltip[hovered.slug]}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
