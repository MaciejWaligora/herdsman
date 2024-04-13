import './App.css';
import { GameCanvas } from '../Components/Game/GameCanvas';
import { config as gameConfig } from '../Config/GameConfig';



function App() {
  return (
    <div className="App">
      <GameCanvas {...gameConfig.canvasConfig}></GameCanvas>
    </div>
  );
}

export default App;
