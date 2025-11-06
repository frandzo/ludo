import * as scoresRepo from "../repositories/scoresRepository.js";

export async function getAll() {
  return await scoresRepo.findAll();
}

export async function create(data) {
  return await scoresRepo.create(data);
}

export async function remove(id) {
  return await scoresRepo.remove(id);
}
