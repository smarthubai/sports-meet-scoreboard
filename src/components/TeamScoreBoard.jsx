import React, { useState } from "react";
export default function TeamScoreBoard({ scores, matches }) {
  const teamTotals = [0, 0];

  matches.forEach(([p1, p2], idx) => {
    const score = scores[idx];
    if (score) {
      const [s1, s2] = score.map(Number);
      if (s1 > s2) teamTotals[0]++;
      else if (s2 > s1) teamTotals[1]++;
    }
  });

  let result = "";
  if (teamTotals[0] > teamTotals[1]) result = "Blue Team Wins 🏆";
  else if (teamTotals[1] > teamTotals[0]) result = "Orange Team Wins 🏆";
  else result = "Match Drawn";

  return (
    <div className="p-4 my-6 text-center bg-green-100 rounded-xl">
      <h2 className="mb-2 text-xl font-bold">🏁 Final Result</h2>
      <p>Blue Team: {teamTotals[0]} wins</p>
      <p>Orange Team: {teamTotals[1]} wins</p>
      <p className="mt-2 font-semibold text-green-700">{result}</p>
    </div>
  );
}
