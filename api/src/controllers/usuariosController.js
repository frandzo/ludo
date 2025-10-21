import * as usuariosService from "../services/usuariosService.js";

export async function getAllUsuarios(req, res) {
  try {
    const data = await usuariosService.getAll();
    res.json(data);
    // res.send("TEST USUARIOS");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUsuarioById(req, res) {
  try {
    const usuario = await usuariosService.getById(req.params.id);
    res.json(usuario);
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

export async function loginUsuario(req, res) {
  try {
    const token = await usuariosService.login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
