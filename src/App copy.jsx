import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Context Setup
const AppContext = createContext();
const useApp = () => useContext(AppContext);

const LOCAL_KEY = 'tournament_app_data';
const ADMIN_PASS = 'admin123';

const GAME_TYPES = [
  { id: 'chess', name: 'Chess', isDoubles: false },
  { id: 'carrom', name: 'Carrom', isDoubles: true },
  { id: 'tt', name: 'Table Tennis', isDoubles: true },
  { id: 'darts', name: 'Darts', isDoubles: false }
];
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
    { id: 'blue', name: 'Blue', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
    { id: 'orange', name: 'Orange', gamesPlayed: 0, gamesWon: 0, totalPoints: 0 },
  ];

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [mode, setMode] = useState('singles');

  // Init from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_KEY));
     setPlayers(stored.players?.length || defaultPlayers);
      setTeams(stored.teams?.length || defaultTeams);
      setGames(stored.games?.length || []);
    // if (stored) {
    //   setPlayers(stored.players || defaultPlayers);
    //   setTeams(stored.teams || defaultTeams);
    //   setGames(stored.games || []);
    // } else {
    //   setPlayers(defaultPlayers);
    //   setTeams(defaultTeams);
    //   setGames([]);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ players, teams, games }));
  }, [players, teams, games]);

  const updateStats = (game, rollback = false) => {
    const { team1Ids, team2Ids, team1Score, team2Score } = game;
    const factor = rollback ? -1 : 1;

    const update = (ids, score, won) => {
      ids.forEach((id) => {
        const player = players.find((p) => p.id === id);
        if (!player) return;

        setPlayers((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  gamesPlayed: p.gamesPlayed + factor,
                  gamesWon: won ? p.gamesWon + factor : p.gamesWon,
                  totalPoints: p.totalPoints + factor * score,
                }
              : p
          )
        );

        setTeams((prev) =>
          prev.map((t) =>
            t.id === player.teamId
              ? {
                  ...t,
                  gamesPlayed: t.gamesPlayed + factor,
                  gamesWon: won ? t.gamesWon + factor : t.gamesWon,
                  totalPoints: t.totalPoints + factor * score,
                }
              : t
          )
        );
      });
    };

    update(team1Ids, team1Score, team1Score > team2Score);
    update(team2Ids, team2Score, team2Score > team1Score);
  };

  const addGame = (team1Ids, team2Ids, team1Score, team2Score, gameTypeId) => {
    const isSingles = team1Ids.length === 1 && team2Ids.length === 1;
    
    const newGame = {
      id: uuidv4(),
      player1Id: isSingles ? team1Ids[0] : null,
      player2Id: isSingles ? team2Ids[0] : null,
      team1Ids,
      team2Ids,
      player1Score: isSingles ? team1Score : null,
      player2Score: isSingles ? team2Score : null,
      team1Score,
      team2Score,
      winnerId: team1Score > team2Score ? (isSingles ? team1Ids[0] : 'team1') : (isSingles ? team2Ids[0] : 'team2'),
      isDoubles: !isSingles,
      gameTypeId
    };
    
    updateStats(newGame);
    setGames((prev) => [...prev, newGame]);
  };

  const editGame = (id, updatedGame) => {
    const oldGame = games.find((g) => g.id === id);
    if (!oldGame) return;
    updateStats(oldGame, true); // rollback
    updateStats(updatedGame);   // apply new
    setGames((prev) => prev.map((g) => (g.id === id ? updatedGame : g)));
  };

  const loginAdmin = (pass) => {
    if (pass === ADMIN_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ 
      players, 
      teams, 
      games, 
      addGame, 
      editGame, 
      isAdmin, 
      loginAdmin,
      mode,
      setMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { teams, players, games } = useApp();
  
  // Calculate total scores from games data instead of team state
  const calculateTeamTotal = (teamId) => {
    return games.reduce((total, game) => {
      // Check if team1 players belong to this team
      const team1Players = game.team1Ids.map(id => players.find(p => p.id === id));
      const isTeam1 = team1Players.some(p => p?.teamId === teamId);
      
      // Check if team2 players belong to this team
      const team2Players = game.team2Ids.map(id => players.find(p => p.id === id));
      const isTeam2 = team2Players.some(p => p?.teamId === teamId);
      
      if (isTeam1) return total + game.team1Score;
      if (isTeam2) return total + game.team2Score;
      return total;
    }, 0);
  };

  const blueTeamTotal = calculateTeamTotal('blue');
  const orangeTeamTotal = calculateTeamTotal('orange');

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">🏆 Tournament Dashboard</h1>
      
      {/* Team Score Tiles */}
     <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
        <div className="p-6 border-l-4 border-blue-500 rounded-lg shadow-md bg-blue-50">
          <h2 className="mb-2 text-xl font-semibold text-blue-800">Blue Team</h2>
          <div className="text-4xl font-bold text-blue-600">{blueTeamTotal}</div>
          <p className="mt-2 text-gray-600">Total Points</p>
        </div>
        
        <div className="p-6 border-l-4 border-orange-500 rounded-lg shadow-md bg-orange-50">
          <h2 className="mb-2 text-xl font-semibold text-orange-800">Orange Team</h2>
          <div className="text-4xl font-bold text-orange-600">{orangeTeamTotal}</div>
          <p className="mt-2 text-gray-600">Total Points</p>
        </div>
      </div>

      {/* Game Type Stats */}
      <div className="space-y-8">
        {GAME_TYPES.map(gameType => {
          const gameTypeGames = games.filter(g => g.gameTypeId === gameType.id);
          if (gameTypeGames.length === 0) return null;
          
          return (
            <div key={gameType.id} className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="px-4 py-3 bg-gray-100 border-b">
                <h2 className="text-lg font-semibold text-gray-800">{gameType.name}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Team</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Played</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Won</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teams.map(team => {
                      const teamGames = gameTypeGames.filter(g => 
                        g.team1Ids.some(id => players.find(p => p.id === id)?.teamId === team.id) ||
                        g.team2Ids.some(id => players.find(p => p.id === id)?.teamId === team.id)
                      );
                      
                      const points = teamGames.reduce((total, game) => {
                        if (game.team1Ids.some(id => players.find(p => p.id === id)?.teamId === team.id)) {
                          return total + game.team1Score;
                        }
                        return total + game.team2Score;
                      }, 0);
                      
                      const wins = teamGames.filter(g => 
                        (g.winnerId === 'team1' && g.team1Ids.some(id => players.find(p => p.id === id)?.teamId === team.id)) ||
                        (g.winnerId === 'team2' && g.team2Ids.some(id => players.find(p => p.id === id)?.teamId === team.id))
                      ).length;
                      
                      return (
                        <tr key={`${gameType.id}-${team.id}`}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{team.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{teamGames.length}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{wins}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">{points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Leaderboard Component
const Leaderboard = () => {
  const { players, games } = useApp();
  
  const enhancedPlayers = players.map(player => {
    const playerGames = games.filter(g => 
      g.team1Ids.includes(player.id) || g.team2Ids.includes(player.id)
    );
    
    const gameStats = GAME_TYPES.map(gameType => {
      const typeGames = playerGames.filter(g => g.gameTypeId === gameType.id);
      const points = typeGames.reduce((total, game) => {
        if (game.team1Ids.includes(player.id)) return total + game.team1Score;
        return total + game.team2Score;
      }, 0);
      
      return {
        gameType: gameType.name,
        played: typeGames.length,
        won: typeGames.filter(g => g.winnerId === player.id || 
             (g.winnerId === 'team1' && g.team1Ids.includes(player.id)) || 
             (g.winnerId === 'team2' && g.team2Ids.includes(player.id))).length,
        points
      };
    });

    return {
      ...player,
      gameStats,
      totalPoints: playerGames.reduce((total, game) => {
        if (game.team1Ids.includes(player.id)) return total + game.team1Score;
        return total + game.team2Score;
      }, 0)
    };
  });

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">🌟 Player Leaderboard</h1>
      
      <div className="space-y-8">
        {GAME_TYPES.map(gameType => {
          const hasGames = enhancedPlayers.some(p => 
            p.gameStats.some(s => s.gameType === gameType.name && s.played > 0)
          );
          
          if (!hasGames) return null;
          
          return (
            <div key={gameType.id} className="overflow-hidden bg-white rounded-lg shadow-md">
              <div className="px-4 py-3 bg-gray-100 border-b">
                <h2 className="text-lg font-semibold text-gray-800">{gameType.name}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Player</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Team</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Played</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Won</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Points</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enhancedPlayers
                      .filter(p => p.gameStats.some(s => s.gameType === gameType.name && s.played > 0))
                      .sort((a, b) => {
                        const aStats = a.gameStats.find(s => s.gameType === gameType.name);
                        const bStats = b.gameStats.find(s => s.gameType === gameType.name);
                        return (bStats?.points || 0) - (aStats?.points || 0);
                      })
                      .map(player => {
                        const stats = player.gameStats.find(s => s.gameType === gameType.name);
                        return (
                          <tr key={`${gameType.id}-${player.id}`}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{player.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{player.teamId}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{stats?.played || 0}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{stats?.won || 0}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">{stats?.points || 0}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// EnterScore Component with beautiful form
const EnterScore = () => {
  const { players, addGame, isAdmin } = useApp();
  const [gameTypeId, setGameTypeId] = useState('');
  const [team1, setTeam1] = useState(['']);
  const [team2, setTeam2] = useState(['']);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    const gameType = GAME_TYPES.find(g => g.id === gameTypeId);
    const isSingles = gameType ? !gameType.isDoubles : true;
    setTeam1(isSingles ? [''] : ['', '']);
    setTeam2(isSingles ? [''] : ['', '']);
  }, [gameTypeId]);

  if (!isAdmin) return <div className="p-4 text-red-600">Access Denied. Admins Only.</div>;

  const blueTeamPlayers = players.filter(player => player.teamId === 'blue');
  const orangeTeamPlayers = players.filter(player => player.teamId === 'orange');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validTeam1 = team1.filter(Boolean);
    const validTeam2 = team2.filter(Boolean);

    if (!gameTypeId) return alert('Please select game type');
    if (!validTeam1.length || !validTeam2.length) return alert('Players required');
    if (validTeam1.some((id) => validTeam2.includes(id))) return alert('Duplicate players in teams');

    addGame(validTeam1, validTeam2, parseInt(score1), parseInt(score2), gameTypeId);
    setTeam1(['']);
    setTeam2(['']);
    setScore1(0);
    setScore2(0);
    setGameTypeId('');
  };

  const getAvailablePlayers = (currentTeam, isBlueTeam) => {
    const teamPlayers = isBlueTeam ? blueTeamPlayers : orangeTeamPlayers;
    return teamPlayers.filter(player => {
      return currentTeam.includes(player.id) || ![...team1, ...team2].includes(player.id);
    });
  };

  const gameType = GAME_TYPES.find(g => g.id === gameTypeId);
  const isSingles = gameType ? !gameType.isDoubles : true;

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-4 py-3 bg-blue-600">
          <h1 className="text-xl font-bold text-white">🎯 Enter Match Score</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Game Type Selection */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Game Type</label>
              <select
                value={gameTypeId}
                onChange={(e) => setGameTypeId(e.target.value)}
                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">Select Game Type</option>
                {GAME_TYPES.map(game => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            </div>

            {gameTypeId && (
              <>
                {/* Player Selection */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Blue Team */}
                  <div className="space-y-4">
                    <h3 className="pb-2 text-lg font-medium text-blue-600 border-b">Blue Team</h3>
                    {Array.from({ length: isSingles ? 1 : 2 }).map((_, idx) => (
                      <div key={`team1-${idx}`}>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Player {idx + 1}</label>
                        <select
                          value={team1[idx] || ''}
                          onChange={(e) => {
                            const updated = [...team1];
                            updated[idx] = e.target.value;
                            setTeam1(updated);
                          }}
                          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Player</option>
                          {getAvailablePlayers(team1, true).map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Orange Team */}
                  <div className="space-y-4">
                    <h3 className="pb-2 text-lg font-medium text-orange-600 border-b">Orange Team</h3>
                    {Array.from({ length: isSingles ? 1 : 2 }).map((_, idx) => (
                      <div key={`team2-${idx}`}>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Player {idx + 1}</label>
                        <select
                          value={team2[idx] || ''}
                          onChange={(e) => {
                            const updated = [...team2];
                            updated[idx] = e.target.value;
                            setTeam2(updated);
                          }}
                          className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                          required
                        >
                          <option value="">Select Player</option>
                          {getAvailablePlayers(team2, false).map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Input */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-blue-600">
                      {team1.filter(Boolean).length > 0 ? (
                        team1.filter(Boolean).map(id => {
                          const player = players.find(p => p.id === id);
                          return player ? player.name : null;
                        }).filter(Boolean).join(' & ')
                      ) : 'Blue Team'} Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={score1}
                      onChange={(e) => setScore1(Number(e.target.value))}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-orange-600">
                      {team2.filter(Boolean).length > 0 ? (
                        team2.filter(Boolean).map(id => {
                          const player = players.find(p => p.id === id);
                          return player ? player.name : null;
                        }).filter(Boolean).join(' & ')
                      ) : 'Orange Team'} Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={score2}
                      onChange={(e) => setScore2(Number(e.target.value))}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                disabled={!gameTypeId}
              >
                Submit Match
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// EditScore Component with improved UI
const EditScore = () => {
  const { games, players, editGame, isAdmin } = useApp();
  const [selected, setSelected] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameTypeId, setGameTypeId] = useState('');

  if (!isAdmin) return <div className="p-4 text-red-600">Access Denied. Admins Only.</div>;

  const handleEdit = (game) => {
    setSelected(game);
    setScore1(game.team1Score);
    setScore2(game.team2Score);
    setGameTypeId(game.gameTypeId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gameType = GAME_TYPES.find(g => g.id === gameTypeId);
    const isSingles = gameType ? !gameType.isDoubles : false;
    
    const updated = {
      ...selected,
      team1Score: parseInt(score1),
      team2Score: parseInt(score2),
      gameTypeId,
      winnerId: parseInt(score1) > parseInt(score2) ? 
        (isSingles ? selected.team1Ids[0] : 'team1') : 
        (isSingles ? selected.team2Ids[0] : 'team2')
    };
    editGame(selected.id, updated);
    setSelected(null);
  };

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">✏️ Edit Game Scores</h2>
      
      {!selected ? (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {games.map((g) => {
              console.log("G", g)
               console.log("GAME_TYPES", GAME_TYPES)
              const gameType = GAME_TYPES.find(gt => gt.id === g.gameTypeId) || { name: 'Unknown Game' };
              return (
                <li key={g.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-600">{gameType.name}</div>
                      <div className="text-sm text-gray-500">
                        {g.team1Ids.map(id => players.find(p => p.id === id)?.name).join(', ')} vs{' '}
                        {g.team2Ids.map(id => players.find(p => p.id === id)?.name).join(', ')}
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        {g.team1Score} : {g.team2Score}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEdit(g)} 
                      className="inline-flex items-center px-3 py-1 text-sm font-medium leading-4 text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Game Score
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Game Type</label>
                <select
                  value={gameTypeId}
                  onChange={(e) => setGameTypeId(e.target.value)}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  {GAME_TYPES.map(game => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-blue-600">
                    {selected.team1Ids.map(id => {
                      const player = players.find(p => p.id === id);
                      return player ? player.name : '';
                    }).filter(Boolean).join(' & ')} Score
                  </label>
                  <input 
                    type="number"
                    min="0"
                    value={score1} 
                    onChange={(e) => setScore1(e.target.value)} 
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-orange-600">
                    {selected.team2Ids.map(id => {
                      const player = players.find(p => p.id === id);
                      return player ? player.name : '';
                    }).filter(Boolean).join(' & ')} Score
                  </label>
                  <input 
                    type="number"
                    min="0"
                    value={score2} 
                    onChange={(e) => setScore2(e.target.value)} 
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setSelected(null)} 
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Update Score
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// AdminLogin Component
const AdminLogin = () => {
  const { loginAdmin } = useApp();
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginAdmin(pass)) navigate('/dashboard');
    else alert('Wrong password!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Admin Login
          </h2>
        </div>
        <div className="px-4 py-8 bg-white rounded-lg shadow sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleLogin}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Wrapper with improved navigation
export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex space-x-6">
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

          <main className="py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/enter-score" element={<EnterScore />} />
              <Route path="/edit-score" element={<EditScore />} />
              <Route path="/admin" element={<AdminLogin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}