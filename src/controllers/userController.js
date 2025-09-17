const { users } = require('../models/User');

let nextId = users.length + 1;

function listUsers(req, res) {
  res.json(users);
}

function getUser(req, res) {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
}

function createUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name y email son requeridos" });

  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
}

function updateUser(req, res) {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
}

function deleteUser(req, res) {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
