import React from 'react';
import GaugeChart from 'react-gauge-chart';

const SpeedometerGauge = ({ 
  value, 
  title, 
  unit, 
  min = 0, 
  max = 100, 
  greenZone,
  yellowZone,
  redZone 
}) => {
  const normalizedValue = (value - min) / (max - min);
  
  const getZoneColor = (value) => {
    if (value <= greenZone[1]) return "#38a169";
    if (value <= yellowZone[1]) return "#ecc94b";
    return "#e53e3e";
  };


  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <GaugeChart
        id={`gauge-${title}`}
        nrOfLevels={3}
        colors={["#38a169", "#ecc94b", "#e53e3e"]}
        arcWidth={0.3}
        percent={normalizedValue}
        textColor="#1a202c"
        formatTextValue={() => `${value} ${unit}`}
        // formatTextValue={() => `${value.toFixed(2)} ${unit}`}
      />
      <div className="text-sm text-gray-600 mt-2">
        Safe Range: {greenZone[0]}-{greenZone[1]} {unit}
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Moderate Range: {yellowZone[0]}-{greenZone[1]} {unit}
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Unhealthy Range: {redZone[0]}-{redZone[1]} {unit}
      </div>
    </div>
  );
};

export default SpeedometerGauge;