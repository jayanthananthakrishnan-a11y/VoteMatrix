import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// NOTE: Ensure this geojson file contains the full territorial boundaries
const geoUrl = "/maps/india_full_territory.geojson"; 

const NationalMap = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <style>{`
        .india-path {
          fill: #0f172a;
          stroke: #334155;
          stroke-width: 0.8;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .india-path:hover {
          fill: #2563eb !important;
          stroke: #ffffff !important;
          stroke-width: 2;
          cursor: pointer;
          filter: drop-shadow(0 0 15px rgba(37,99,235,0.4));
        }
      `}</style>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [78.9629, 22.5937] }}
        className="w-full h-[650px]"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="india-path"
                onClick={() => {
                  const stateName = geo.properties.ST_NM || geo.properties.NAME_1;
                  if (stateName) {
                    const slug = stateName.toLowerCase().trim().replace(/\s+/g, '-');
                    navigate(`/state/${slug}`);
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(NationalMap);