import React, { useEffect, useState } from 'react';
import FlavanoidsTable from './components/FlavanoidsTable';
import GammaTable from './components/GammaTable';
import wineData from './wineData.json';
import './App.css';

const App: React.FC = () => {
  const [wineDataState, setWineData] = useState<any[]>([]);

  useEffect(() => {
    setWineData(wineData);
  }, []);

  return (
    <div>
      <h1>Wine Data Analytics Dashboard</h1>
      <FlavanoidsTable wineData={wineDataState} />
      <GammaTable wineData={wineDataState} />
    </div>
  );
};

export default App;
