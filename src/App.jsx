import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from 'firebase/database';

// Game Types Configuration
const GAME_TYPES = [
  { id: 'chess-single', name: 'Chess Singles', isDoubles: false },
  { id: 'carrom', name: 'Carrom', isDoubles: true },
  { id: 'tt-doubles', name: 'Table Tennis Doubles', isDoubles: true },
  { id: 'darts-single', name: 'Darts Singles', isDoubles: false }
];

// Context Setup
const AppContext = createContext();
const useApp = () => useContext(AppContext);

const LOCAL_KEY = 'tournament_app_data_final';
const ADMIN_PASS = '123'; // Change in production

const firebaseConfig = {
  apiKey: "AIzaSyAU6tlFnapvjAV-WnVzSdRu--Cn_kYrHIs",
  authDomain: "smarthub-sports-meet.firebaseapp.com",
  databaseURL: "https://smarthub-sports-meet-default-rtdb.firebaseio.com",
  projectId: "smarthub-sports-meet",
  storageBucket: "smarthub-sports-meet.firebasestorage.app",
  messagingSenderId: "783479433960",
  appId: "1:783479433960:web:d321bae88292a5b11cf75d",
  measurementId: "G-M7WS5MW728"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const AppProvider = ({ children }) => {
  
  const defaultPlayers = [
   { id: 'p1', name: 'Anil', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p2', name: 'Nithin', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p3', name: 'Sowmini', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p4', name: 'Gautham Kamath', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p5', name: 'Manoj', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p6', name: 'Liya', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p7', name: 'Kripa', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p8', name: 'Gautham Chandra', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p9', name: 'Arun', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p10', name: 'Santosh', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p11', name: 'Nithya Prashanth', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p12', name: 'Yaseen', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p13', name: 'Abhyuday', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p14', name: 'Abhishek Saini', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p15', name: 'Jerin', teamId: 'blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'p16', name: 'Ajith', teamId: 'orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
  ];

  const defaultTeams = [
    { id: 'blue', name: 'Blue Team', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'orange', name: 'Orange Team', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 }
  ];

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [publicToken, setPublicToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [gameMode, setGameMode] = useState('singles'); // 'singles' or 'doubles'
  const [selectedGameType, setSelectedGameType] = useState('');

  // Initialize data
  useEffect(() => {
    const dbRef = ref(db, 'tournamentData');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayers(data.players || [...defaultPlayers]);
        setTeams(data.teams || [...defaultTeams]);
        setGames(data.games || []);
        setPublicToken(data.publicToken || generateToken());
        setGameMode(data.gameMode || 'singles');
        setSelectedGameType(data.selectedGameType || '');
      } else {
        initializeFreshData();
      }
      setIsLoading(false);
    });

    const initializeFreshData = () => {
      setPlayers([...defaultPlayers]);
      setTeams([...defaultTeams]);
      setGames([]);
      setPublicToken(generateToken());
      setGameMode('singles');
      setSelectedGameType('');
      saveToStorage({
        players: [...defaultPlayers],
        teams: [...defaultTeams],
        games: [],
        publicToken: generateToken(),
        gameMode: 'singles',
        selectedGameType: ''
      });
    };
  }, []);

  // Save data with debounce
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        saveToStorage({ 
          players, 
          teams, 
          games, 
          publicToken,
          gameMode,
          selectedGameType
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [players, teams, games, publicToken, isLoading, gameMode, selectedGameType]);

  const generateToken = () => uuidv4().split('-')[0] + Date.now().toString(36).slice(-4);

  const saveToStorage = (data) => {
    set(ref(db, 'tournamentData'), data);
  };

 const updateStats = useCallback((game, isRollback = false) => {
    const factor = isRollback ? -1 : 1;
    const { team1Ids, team2Ids, team1Score, team2Score } = game;

    setPlayers(prevPlayers => 
      prevPlayers.map(player => {
        const isInTeam1 = team1Ids.includes(player.id);
        const isInTeam2 = team2Ids.includes(player.id);
        if (!isInTeam1 && !isInTeam2) return player;

        const isWinner = (isInTeam1 && team1Score > team2Score) || 
                        (isInTeam2 && team2Score > team1Score);

        return {
          ...player,
          gamesPlayed: player.gamesPlayed + factor,
          gamesWon: isWinner ? player.gamesWon + factor : player.gamesWon,
          totalPoints: player.totalPoints + (factor * (isInTeam1 ? team1Score : team2Score))
        };
      })
    );

    setTeams(prevTeams => 
      prevTeams.map(team => {
        const teamPlayers = players.filter(p => p.teamId === team.id);
        const team1Count = team1Ids.filter(id => 
          teamPlayers.some(p => p.id === id)).length;
        const team2Count = team2Ids.filter(id => 
          teamPlayers.some(p => p.id === id)).length;

        if (team1Count === 0 && team2Count === 0) return team;

        const isTeam1 = team1Count > 0;
        const isWinner = (isTeam1 && team1Score > team2Score) || 
                        (!isTeam1 && team2Score > team1Score);
        const pointsContribution = isTeam1 ? team1Score : team2Score;

        return {
          ...team,
          gamesPlayed: team.gamesPlayed + factor,
          gamesWon: isWinner ? team.gamesWon + factor : team.gamesWon,
          totalPoints: team.totalPoints + (factor * pointsContribution)
        };
      })
    );
  }, [players]);

  const addGame = useCallback((team1Ids, team2Ids, team1Score, team2Score, gameTypeId) => {
    const gameType = GAME_TYPES.find(g => g.id === gameTypeId);
    const isSingles = gameType ? !gameType.isDoubles : gameMode === 'singles';
    
    const newGame = {
      id: uuidv4(),
      team1Ids: team1Ids.filter(Boolean),
      team2Ids: team2Ids.filter(Boolean),
      team1Score: parseInt(team1Score),
      team2Score: parseInt(team2Score),
      timestamp: new Date().toISOString(),
      gameTypeId,
      isSingles
    };

    setGames(prev => [...prev, newGame]);
    updateStats(newGame);
  }, [gameMode, updateStats]);

  const editGame = useCallback((gameId, updatedGame) => {
    setGames(prevGames => {
      const existingGame = prevGames.find(g => g.id === gameId);
      if (!existingGame) return prevGames;

      // Rollback old stats first
      updateStats(existingGame, true);
      
      // Apply new stats
      updateStats(updatedGame);

      return prevGames.map(game => game.id === gameId ? updatedGame : game);
    });
  }, [updateStats]);

  const deleteGame = useCallback((gameId) => {
    setGames(prevGames => {
      const gameToDelete = prevGames.find(g => g.id === gameId);
      if (!gameToDelete) return prevGames;

      // Rollback stats
      updateStats(gameToDelete, true);

      return prevGames.filter(g => g.id !== gameId);
    });
  }, [updateStats]);

  const loginAdmin = (password) => {
    const success = password === ADMIN_PASS;
    setIsAdmin(success);
    return success;
  };

  const getPublicUrl = () => {
    return `${window.location.origin}${window.location.pathname}#/public/${publicToken}`;
  };

  return (
    <AppContext.Provider value={{
      players, 
      teams, 
      games,
      GAME_TYPES,
      gameMode,
      selectedGameType,
      setGameMode,
      setSelectedGameType,
      addGame, 
      editGame, 
      deleteGame,
      isAdmin, 
      loginAdmin, 
      getPublicUrl
    }}>
      {children}
    </AppContext.Provider>
  );
};

// ====================== COMPONENTS ====================== //

const GameTypeSelector = () => {
  const { 
    gameMode, 
    setGameMode, 
    selectedGameType, 
    setSelectedGameType,
    GAME_TYPES 
  } = useApp();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setGameMode('singles')}
          className={`px-4 py-2 rounded ${gameMode === 'singles' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Singles
        </button>
        <button
          type="button"
          onClick={() => setGameMode('doubles')}
          className={`px-4 py-2 rounded ${gameMode === 'doubles' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Doubles
        </button>
      </div>

      <div>
        <label className="block mb-1">Game Type</label>
        <select
          value={selectedGameType}
          onChange={(e) => setSelectedGameType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Game Type</option>
          {GAME_TYPES.filter(game => 
            game.isDoubles === (gameMode === 'doubles')
          ).map(game => (
            <option key={game.id} value={game.id}>{game.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { teams } = useApp();
  
  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Team Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
        {teams.map(team => (
          <div key={team.id} className={`p-4 rounded-lg shadow-md ${team.id === 'blue' ? 'bg-blue-50' : 'bg-orange-50'}`}>
            <h2 className="mb-2 text-xl font-semibold">{team.name}</h2>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-3xl font-bold">{team.gamesPlayed}</div>
                <div className="text-sm">Played</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{team.gamesWon}</div>
                <div className="text-sm">Won</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{team.totalPoints}</div>
                <div className="text-sm">Points</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const { players } = useApp();
  const sortedPlayers = [...players].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Player Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Player</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Team</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Played</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Won</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPlayers.map(player => (
              <tr key={player.id}>
                <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${player.teamId === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                    {player.teamId}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{player.gamesPlayed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.gamesWon}</td>
                <td className="px-6 py-4 font-bold whitespace-nowrap">{player.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EnterScore = () => {
  const { 
    players, 
    addGame, 
    isAdmin, 
    gameMode,
    selectedGameType,
    GAME_TYPES
  } = useApp();
  
  const [team1, setTeam1] = useState(gameMode === 'singles' ? [''] : ['', '']);
  const [team2, setTeam2] = useState(gameMode === 'singles' ? [''] : ['', '']);
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  // Reset team selection when game mode changes
  useEffect(() => {
    setTeam1(gameMode === 'singles' ? [''] : ['', '']);
    setTeam2(gameMode === 'singles' ? [''] : ['', '']);
  }, [gameMode]);

  if (!isAdmin) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-red-600">Admin Access Required</h2>
        <p>Please login to enter scores</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGameType) {
      alert('Please select a game type');
      return;
    }
    if (!score1 || !score2) {
      alert('Please enter both scores');
      return;
    }
    if (team1.some(id => team2.includes(id))) {
      alert('Players cannot be on both teams');
      return;
    }

    addGame(
      team1.filter(Boolean),
      team2.filter(Boolean),
      score1,
      score2,
      selectedGameType
    );

    setTeam1(gameMode === 'singles' ? [''] : ['', '']);
    setTeam2(gameMode === 'singles' ? [''] : ['', '']);
    setScore1('');
    setScore2('');
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Enter Match Score</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <GameTypeSelector />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium text-blue-700">Blue Team</h3>
            {team1.map((id, idx) => (
              <div key={`team1-${idx}`} className="flex items-center gap-2">
                <select
                  value={id}
                  onChange={(e) => {
                    const updated = [...team1];
                    updated[idx] = e.target.value;
                    setTeam1(updated);
                  }}
                  className="flex-1 p-2 border rounded"
                  required
                >
                  <option value="">Select Player</option>
                  {players.filter(p => p.teamId === 'blue').map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {idx === team1.length - 1 && team1.length < 2 && gameMode === 'doubles' && (
                  <button
                    type="button"
                    onClick={() => setTeam1([...team1, ''])}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-orange-700">Orange Team</h3>
            {team2.map((id, idx) => (
              <div key={`team2-${idx}`} className="flex items-center gap-2">
                <select
                  value={id}
                  onChange={(e) => {
                    const updated = [...team2];
                    updated[idx] = e.target.value;
                    setTeam2(updated);
                  }}
                  className="flex-1 p-2 border rounded"
                  required
                >
                  <option value="">Select Player</option>
                  {players.filter(p => p.teamId === 'orange').map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                {idx === team2.length - 1 && team2.length < 2 && gameMode === 'doubles' && (
                  <button
                    type="button"
                    onClick={() => setTeam2([...team2, ''])}
                    className="p-2 text-orange-600 hover:text-orange-800"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1">Blue Team Score</label>
            <input
              type="number"
              min="0"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Orange Team Score</label>
            <input
              type="number"
              min="0"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Submit Score
        </button>
      </form>
    </div>
  );
};

const EditScore = () => {
  const { games, players, editGame, deleteGame, isAdmin } = useApp();
  const [selectedGame, setSelectedGame] = useState(null);
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEdit = (game) => {
    setSelectedGame(game);
    setScore1(game.team1Score.toString());
    setScore2(game.team2Score.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGame || isProcessing) return;
    
    setIsProcessing(true);
    try {
      const updatedGame = {
        ...selectedGame,
        team1Score: parseInt(score1),
        team2Score: parseInt(score2)
      };
      
      await editGame(selectedGame.id, updatedGame);
      setSelectedGame(null);
    } catch (error) {
      console.error("Failed to update game:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      setIsProcessing(true);
      try {
        await deleteGame(gameId);
        if (selectedGame?.id === gameId) {
          setSelectedGame(null);
        }
      } catch (error) {
        console.error("Failed to delete game:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Edit Scores</h1>
      
      {!selectedGame ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Game to Edit</h2>
          <div className="overflow-y-auto max-h-96">
            {games.length === 0 ? (
              <p className="text-gray-500">No games recorded yet</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Teams</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Score</th>
                    <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {games.map(game => (
                    <tr key={game.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">
                            {game.team1Ids.map(id => players.find(p => p.id === id)?.name).join(', ')}
                          </span>
                          <span>vs</span>
                          <span className="text-orange-600">
                            {game.team2Ids.map(id => players.find(p => p.id === id)?.name).join(', ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold whitespace-nowrap">
                        {game.team1Score} - {game.team2Score}
                      </td>
                      <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(game)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(game.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Editing Game</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium text-blue-700">
                  {selectedGame.team1Ids.map(id => players.find(p => p.id === id)?.name).join(', ')}
                </h3>
                <input
                  type="number"
                  min="0"
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  className="w-full p-2 mt-1 border rounded"
                  required
                />
              </div>
              <div>
                <h3 className="font-medium text-orange-700">
                  {selectedGame.team2Ids.map(id => players.find(p => p.id === id)?.name).join(', ')}
                </h3>
                <input
                  type="number"
                  min="0"
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  className="w-full p-2 mt-1 border rounded"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setSelectedGame(null)}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

const AdminLogin = () => {
  const { loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      navigate('/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const PublicView = () => {
  const { players, teams, games } = useApp();
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/public\/([a-z0-9]+)/i);
    if (match && match[1]) {
      const stored = JSON.parse(localStorage.getItem(LOCAL_KEY));
      if (stored?.publicToken === match[1]) {
        setValidToken(true);
      }
    }
  }, []);

  if (!validToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-8 text-center bg-white rounded-lg shadow-md">
          <h2 className="mb-2 text-xl font-bold text-red-600">Invalid Access</h2>
          <p className="text-gray-600">This public link is not valid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Tournament Public View</h1>
        <div className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
          Live Scores
        </div>
      </div>
      <Dashboard />
      <Leaderboard />
    </div>
  );
};

const AdminTools = () => {
  const { getPublicUrl, isAdmin } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isAdmin) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getPublicUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Admin Tools</h2>
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-medium">Public Sharing Link</h3>
          <div className="flex">
            <input
              type="text"
              value={getPublicUrl()}
              readOnly
              className="flex-1 p-2 border rounded-l focus:outline-none"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-r ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Share this link to allow public viewing (read-only)
          </p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <nav className="bg-white shadow-sm">
          <div className="px-4 mx-auto max-w-7xl">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-blue-500"
                >
                  Dashboard
                </Link>
                <Link
                  to="/leaderboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                >
                  Leaderboard
                </Link>
                <Link
                  to="/enter-score"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                >
                  Enter Score
                </Link>
                <Link
                  to="/edit-score"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                >
                  Edit Scores
                </Link>
              </div>
              <div className="flex items-center">
                <Link
                  to="/admin"
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="p-4 mx-auto max-w-7xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/enter-score" element={<EnterScore />} />
            <Route path="/edit-score" element={<EditScore />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/public/:token" element={<PublicView />} />
          </Routes>
          {/* <AdminTools /> */}
        </main>
      </Router>
    </AppProvider>
  );
};

export default App;