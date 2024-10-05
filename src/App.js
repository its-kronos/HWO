import { ExoExplore } from "./3d/ExoExplore";
import ExoplanetScene from "./3d/components/Exoplanet";
import "./App.css";
import styles from "./index.css"
import { useState } from 'react';
import { ExoTable } from "./UI/exoTable";
import { HostStarTable } from "./UI/hostStarTable"

function App() {
  const [coords, setCoords] = useState([]);
  const [coordsExtremes, setCoordsExtremes] = useState({
    st_rad: { min: Infinity, max: -Infinity },
    pl_rade: { min: Infinity, max: -Infinity },
    pl_orbsmax: { min: Infinity, max: -Infinity },
    sy_dist: { min: Infinity, max: -Infinity },
    SNR: { min: Infinity, max: -Infinity },
    ESmax: { min: Infinity, max: -Infinity },
  });
  const [exo, setExo] = useState(null)
  const [params, setParams] = useState({aperture: 8, focalLength: 131.4, sensorSize: 4000, pitch:0, yaw:0, roll:0})
  return (
    <div className="relative w-full h-screen">
      {exo ? <ExoplanetScene params={exo} /> : <ExoExplore params={params} coords={coords} setCoords={setCoords} setCoordsExtremes={setCoordsExtremes} coordsExtremes={coordsExtremes} />}
      
      <div className="absolute top-5 left-5 space-y-4 z-50">
        {/* UI GOES HERE */}
        <ExoTable />
        <HostStarTable />
      </div>
    </div>
  );
}

export default App;
