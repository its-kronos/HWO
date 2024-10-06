import { ExoExplore } from "./3d/ExoExplore";
import ExoplanetScene from "./3d/components/Exoplanet";
import "./App.css";
import styles from "./index.css";
import { useState } from 'react';
import ESIPlot from "./UI/ESIcontour";
import { AnalysisGeneration } from "./utils/utils";
import { ExoTable } from "./UI/ExoTable";
import { HostStarTable } from "./UI/hostStarTable";
import { ExoBarChart } from "./UI/Bars";
import { ParamControl } from "./UI/paramControl";
import SearchBar from "./UI/Search";
import * as THREE from 'three';
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
  const [LOS, setLOS] = useState(new THREE.Vector3(50000, 0, 0));
  const [exo, setExo] = useState(null);
  const [params, setParams] = useState({ 
    aperture: 8, 
    focalLength: 131.4, 
    sensorSize: 4000, 
    pitch: 0, 
    yaw: 0, 
    roll: 0 
  });
  
  const [analysis, setAnalysis] = useState({ 
    characterizable: [], 
    nonCharacterizable: [], 
    unknown: [] 
  });

  return (
    <div className="relative w-full h-screen">
      {exo ? (
        <ExoplanetScene params={exo} />
      ) : (
        <ExoExplore 
          params={params} 
          coords={coords} 
          setCoords={setCoords} 
          setCoordsExtremes={setCoordsExtremes} 
          coordsExtremes={coordsExtremes} 
          LOS={LOS}
          setLOS={setLOS}
        />
      )}

      <div className="absolute top-5 left-5 space-y-4 z-50">
        <SearchBar planets={coords} setExo={setExo} LOS={new THREE.Vector3(0,0,orbitRadius)} orbitRaidus={orbitRadius} setParams={setParams} setLOS={setLOS}/>
      </div>

        {exo?
            <>         

            <div className="absolute top-5 right-5 space-y-4 z-50">
              <button onClick={() => setExo(null)} className="btn btn-primary w-96">Return to HWO</button>   
              <HostStarTable data={exo} />
            </div>

            <div className="absolute top-[calc(22%+10px)] right-5 space-y-4 z-50">
              <ExoTable data={exo} />
            </div>

            </>
          :
          <>
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 space-y-4 z-50 w-1/4">
              <ExoBarChart analytics={analysis} />
            </div>
      
            <div className="absolute top-5 right-5 space-y-4 z-50">
              <ESIPlot points={analysis} />
            </div>
      
            <div className="absolute bottom-5 right-5 space-y-4 z-100" style={{ marginRight: "6%" }}>
              <ParamControl setParams={setParams} params={params} coords={coords} orbitRadius={orbitRadius} setAnalysis={setAnalysis}/>
            </div>
        </>

        }
    </div>
  );
}

export default App;
