import { ExoExplore } from "./3d/ExoExplore";
import ExoplanetScene from "./3d/components/Exoplanet";
import "./App.css";
import styles from "./index.css";
import { useState } from 'react';
import ESIPlot from "./UI/ESIcontour";
import { AnalysisGeneration } from "./utils/utils";
import { ExoTable } from "./UI/ExoTable";
import { HostStarTable } from "./UI/hostStarTable";
import { ParamControl } from "./UI/paramControl";

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
  const orbitRadius = 2542864.0;

  const [exo, setExo] = useState(null);
  const [params, setParams] = useState({ aperture: 8, focalLength: 131.4, sensorSize: 4000, pitch: 0, yaw: 0, roll: 0 });
  const [analysis, setAnalysis] = useState({ characterizable: [], nonCharacterizable: [], unknown: [] });

  return (
    <div className="relative w-full h-screen">
      {exo ? <ExoplanetScene params={exo} /> : <ExoExplore params={params} coords={coords} setCoords={setCoords} setCoordsExtremes={setCoordsExtremes} coordsExtremes={coordsExtremes} />}

      <div className="absolute top-5 left-5 space-y-4 z-50">
        <ExoTable />
        <HostStarTable />
      </div>

      <div className="absolute bottom-5 left-80 space-y-4 z-100">
        <ParamControl /> 
      </div>

      <div className="absolute top-5 right-5 space-y-4 z-50">
        <ESIPlot points={analysis} />
      </div>

      <div className="absolute top-5 right-5 space-y-4 z-50">
        <button onClick={() => { setAnalysis(AnalysisGeneration(coords, orbitRadius, params)); }} className="btn btn-primary">Update Stats</button>
      </div>

    </div>
  );
}

export default App;
