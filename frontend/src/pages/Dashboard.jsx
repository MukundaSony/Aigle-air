import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ChartContainer } from "../components/ui/chart";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, Battery, Droplets, Thermometer, Activity, Monitor } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import SpeedometerGauge from '../components/SpeedometerGauge';
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

// Simulated data - in a real app, this would come from an API


const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  temperature: 20 + Math.random() * 10,
  pH: 6.5 + Math.random() * 2,
  population: 1000 + (i * 100) + Math.random() * 200,
  co2: 400 + Math.random() * 50,
  o2: 300 + Math.random() * 100
}));

const Dashboard = () => {

  const [co2, setCo2] = useState(null);
  const [o2, setO2] = useState(null);
  const [pm2_5, setPm2_5] = useState(null);
  const [pm10, setPm10] = useState(null);
  const [currentAd, setCurrentAd] = useState(0);

  const environmentalData = {
    co2: { value: co2, unit: "ppm", percentage: 0.0415, greenZone: [0, 1000], yellowZone: [1001, 2000], redZone: [2001, 5000] },
    o2: { value: o2, unit: "%", greenZone: [19.5, 23.5], yellowZone: [16, 19.5], redZone: [12, 15.9] },
    pm25: { value: pm2_5, unit: "µg/m³", greenZone: [0, 12], yellowZone: [12.1, 35.9], redZone: [36, 60] },
    pm10: { value: pm10, unit: "µg/m³", greenZone: [0, 54], yellowZone: [55, 150], redZone: [151, 260] },
  };

  const ads = [
    "Monitoring CO2 levels for optimal growth",
    "Maintaining perfect pH balance",
    "Ensuring ideal temperature conditions",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/sensor/data")
      .then((response) => response.json())
      .then((data) => {
        setCo2(data.co2);
        setO2(data.oxygen_concentration);
        setPm2_5(data.pm2_5 || null);  // Fix: Correctly accessing airQuality object
        setPm10(data.pm10 || null);   // Fix: Correctly accessing airQuality object
      })
      .catch((error) => console.log("Error:", error));
  }, []);
  

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-aigle-primary">Environmental Monitoring System</h1>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Advertisement Screen */}
      <motion.div 
        className="bg-gradient-to-r from-aigle-light to-aigle-lighter p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-aigle-primary mb-4">AIGLE System Status</h2>
        <motion.div
          key={currentAd}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-lg text-aigle-text"
        >
          {ads[currentAd]}
        </motion.div>
      </motion.div>

      {/* Environmental Monitoring Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SpeedometerGauge
          title="CO₂ Levels"
          value={co2}
          percentage={environmentalData.co2.percentage}
          unit={environmentalData.co2.unit}
          min={0}
          max={10000}
          greenZone={environmentalData.co2.greenZone}
          yellowZone={environmentalData.co2.yellowZone}
          redZone={environmentalData.co2.redZone}
        />
        <SpeedometerGauge
          title="Oxygen Concentration"
          // value={o2}
          value={(o2 !== null && o2 !== undefined) ? o2.toFixed(2) : "0.00"}
          unit={environmentalData.o2.unit}
          min={0}
          max={100}
          greenZone={environmentalData.o2.greenZone}
          yellowZone={environmentalData.o2.yellowZone}
          redZone={environmentalData.o2.redZone}
        />
        <SpeedometerGauge
          title="PM 2.5"
          value={pm2_5}
          unit={environmentalData.pm25.unit}
          min={0}
          max={140}
          greenZone={environmentalData.pm25.greenZone}
          yellowZone={environmentalData.pm25.yellowZone}
          redZone={environmentalData.pm25.redZone}
        />
        <SpeedometerGauge
          title="PM 10"
          value={pm10}
          unit={environmentalData.pm10.unit}
          min={0}
          max={260}
          greenZone={environmentalData.pm10.greenZone}
          yellowZone={environmentalData.pm10.yellowZone}
          redZone={environmentalData.pm10.redZone}
        />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Temperature & pH Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="temp" orientation="left" stroke="#0891B2" />
                  <YAxis yAxisId="ph" orientation="right" stroke="#059669" />
                  <Tooltip />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#0891B2"
                    name="Temperature (°C)"
                  />
                  <Line
                    yAxisId="ph"
                    type="monotone"
                    dataKey="pH"
                    stroke="#059669"
                    name="pH"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Population Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="population"
                    stroke="#14B8A6"
                    fill="#14B8A6"
                    fillOpacity={0.3}
                    name="Population"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All systems are operating within normal parameters. Last update: {new Date().toLocaleTimeString()}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Dashboard;