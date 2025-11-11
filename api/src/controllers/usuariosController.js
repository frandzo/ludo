// api/src/controllers/usuariosController.js

import * as usuariosService from "../services/usuariosService.js";

export async function getAllUsuarios(req, res) {
  try {
    // filtros se obtienen desde la query de la URL (ejemplko: /api/usuarios?rol=estudiante)
    const filters = req.query;
    const data = await usuariosService.getAll(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUsuarioById(req, res) {
  try {
    const usuario = await usuariosService.getById(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProgresoByUsuarioId(req, res) {
  try {
    const historial = await usuariosService.getProgreso(req.params.id);
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUsuario(req, res) {
  try {
    const newUsuario = await usuariosService.create(req.body);
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUsuario(req, res) {
  try {
    const updated = await usuariosService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUsuario(req, res) {
  try {
    const result = await usuariosService.remove(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
