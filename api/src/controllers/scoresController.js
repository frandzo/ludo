import * as scoresService from "../services/scoresService.js";

export async function getAllScores(req, res) {
  try {
    const data = await scoresService.getAll();
    res.json(data);
    // res.send("TEST USUARIOS");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createScore(req, res) {
  try {
    const newScore = await scoresService.create(req.body);
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteScore(req, res) {
  try {
    const result = await scoresService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
