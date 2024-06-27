import { useState } from 'react';
import './App.css';
import { calculateNormal } from './calculators/calculateNormal';
import { calculateZombie } from './calculators/calculateZombie';

function App() {
  const [attackerTroops, setAttackerTroops] = useState(3);
  const [defenderTroops, setDefenderTroops] = useState(2);
  const [gameMode, setGameMode] = useState('classic');
  const [winOdds, setWinOdds] = useState(null);

  const calculateOdds = () => {
    let winProbability;
    if (gameMode === 'classic') {
      winProbability = calculateNormal(attackerTroops, defenderTroops);
    } else if (gameMode === 'zombie') {
      winProbability = calculateZombie(attackerTroops, defenderTroops);
    }
    // Add conditions for other game modes when implemented
    const winPercentage = (winProbability * 100).toFixed(2);
    setWinOdds(winPercentage);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Risk Attack Win Odds Calculator</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attackerTroops">
            Attacker Troops
          </label>
          <input
            id="attackerTroops"
            type="number"
            value={attackerTroops}
            onChange={(e) => setAttackerTroops(parseInt(e.target.value) || 0)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            max="1000"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="defenderTroops">
            Defender Troops
          </label>
          <input
            id="defenderTroops"
            type="number"
            value={defenderTroops}
            onChange={(e) => setDefenderTroops(parseInt(e.target.value) || 0)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            max="1000"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Game Mode</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="classic"
              name="gameMode"
              value="classic"
              checked={gameMode === 'classic'}
              onChange={(e) => setGameMode(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="classic" className="mr-4">Classic</label>
            <input
              type="radio"
              id="zombie"
              name="gameMode"
              value="zombie"
              checked={gameMode === 'zombie'}
              onChange={(e) => setGameMode(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="zombie" className="mr-4">Zombie Apocalypse</label>
            {/* Add radio buttons for other game modes when implemented */}
          </div>
        </div>
        <button
          onClick={calculateOdds}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate Odds
        </button>
        {winOdds !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Win Odds:</h2>
            <p>Attacker Win Percentage: {winOdds}%</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
