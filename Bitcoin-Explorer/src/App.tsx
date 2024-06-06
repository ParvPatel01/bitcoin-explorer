import NavBar from './components/NavBar'
import HomeContainer from './pages/HomeContainer';
import { useState, useEffect } from 'react';




function App() {
  const [metric, setMetric] = useState('');

  return (
    <>
      <NavBar metric={metric} setMetric={setMetric} />
      <HomeContainer metric={metric} />
    </>
  )
}

export default App
