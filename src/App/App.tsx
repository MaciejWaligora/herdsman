import './App.css';
import { GameCanvas } from '../Components/Game/GameCanvas';
import { config as gameConfig } from '../Config/GameConfig';
import { UserInterface } from '../Components/UI/UserInterface';
import { config as UIConfig } from '../Config/UIConfig';
import { useState } from 'react';



function App() {

  const [state, setState] = useState(0);

  const updateUI = () => {
    setState(prevState => prevState + 1);
  }

  const gConfig = { ...gameConfig.canvasConfig, uiHandler: updateUI };
  const uConfig = { ...UIConfig, counterProps: { ...UIConfig.counterProps, value: state } };

  return (
    <div className="App">
      <UserInterface {...uConfig}></UserInterface>
      <GameCanvas {...gConfig}></GameCanvas>
    </div>
  );
}

export default App;
