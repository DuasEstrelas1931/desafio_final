import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Libera a pasta "logo" para acesso público
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use("/api/clubs/logo", express.static(path.join(__dirname, "logo")));
// como usar a url do logo
// Exemplo: http://localhost:3001/api/clubs/logo/real_madrid.png


const playersPath = "./data/players.json";
const clubsPath = "./data/clubs.json";

const readData = (filePath) => JSON.parse(readFileSync(filePath));
const writeData = (filePath, data) =>
  writeFileSync(filePath, JSON.stringify(data, null, 2));

app.get("/api/players", (req, res) => {
  res.json(readData(playersPath));
});

app.post("/api/players", (req, res) => {
  const players = readData(playersPath);
  const newPlayer = { id: uuidv4(), ...req.body };
  players.push(newPlayer);
  writeData(playersPath, players);
  res.status(201).json(newPlayer);
});

app.put("/api/players/:id", (req, res) => {
  const players = readData(playersPath);
  const index = players.findIndex((p) => p.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Jogador não encontrado" });

  players[index] = { ...players[index], ...req.body };
  writeData(playersPath, players);
  res.json(players[index]);
});

app.delete("/api/players/:id", (req, res) => {
  let players = readData(playersPath);
  const originalLength = players.length;
  players = players.filter((p) => p.id !== req.params.id);
  if (players.length === originalLength)
    return res.status(404).json({ message: "Jogador não encontrado" });

  writeData(playersPath, players);
  res.status(204).send();
});

app.get("/api/clubs", (req, res) => {
  res.json(readData(clubsPath));
});

app.listen(PORT, () => {
  console.log(`✅ API da Champions rodando em http://localhost:${PORT}`);
});
