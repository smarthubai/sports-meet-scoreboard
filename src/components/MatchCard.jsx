import React, { useState } from "react";

export default function MatchCard({ matchId, players, onScoreSubmit, isAdmin, score }) {
  const [scores, setScores] = useState(score || ["", ""]);

  const handleChange = (index, value) => {
    const updated = [...scores];
    updated[index] = value;
    setScores(updated);
  };

  const submitScore = () => {
    const s1 = parseInt(scores[0]);
    const s2 = parseInt(scores[1]);
    if (!isNaN(s1) && !isNaN(s2)) {
      onScoreSubmit(matchId, scores);
    } else {
      alert("Please enter valid scores.");
    }
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded-xl w-72">
      <div className="space-y-2">
        {players.map((p, i) => (
          <div key={i} className="flex items-center justify-between">
            <span>{p}</span>
            {isAdmin ? (
              <input
                type="number"
                value={scores[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-16 px-2 py-1 border rounded"
              />
            ) : (
              <span className="font-bold">{score ? score[i] : "-"}</span>
            )}
          </div>
        ))}
      </div>
      {isAdmin && (
        <button
          onClick={submitScore}
          className="w-full px-4 py-1 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit Score
        </button>
      )}
    </div>
  );
}
