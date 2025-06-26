export const blueTeam = [
  "Anil", "Sowmini", "Manoj", "Kripa",
  "Arun", "Nithya Prashanth", "Abhyuday", "Jerin"
];

export const orangeTeam = [
  "Nithin", "Gautham Kamath", "Liya", "Gautham Chandra",
  "Santosh", "Yaseen", "Abhishek Saini", "Ajith"
];

export const matches = blueTeam.map((bluePlayer, i) => [
  bluePlayer,
  orangeTeam[i]
]);
