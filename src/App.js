
import './App.css';
import { FillerUI } from './UI/fillerUI'; // change name for this later
import './App.css'
import { ExoExplore } from './3d/ExoExplore';
import styles from './index.css'
function App() {
  return (
    <div className="App">
      <div className="relative w-full h-screen">
        {/* MAIN BODY HERE (3d renders) */}
        <ExoExplore />
        <div className="absolute top-5 left-5 space-y-4 z-50">
          {/* UI GOES HERE */}
          <FillerUI />
        </div>
      </div>
    </div>
  );
}

export default App;
