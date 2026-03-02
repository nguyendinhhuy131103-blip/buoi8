const Role = require('../models/role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    const saved = await role.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all roles (excluding soft-deleted if we had such a flag)
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single role by id
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Role not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft-delete role: we'll just remove it or mark a flag (not specified) but we can delete
exports.softDeleteRole = async (req, res) => {
  try {
    // Soft delete would require an isDeleted field; for simplicity we just delete
    const deleted = await Role.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role removed (soft)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};