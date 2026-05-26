const express = require('express');
const router = express.Router();
const Member = require('../models/members');
const TontineGroupe = require('../models/tontineGroups');

// LES APIS DES MEMBRES ///////////////////////////////////////////////// /////

// Tous les membres (avec le détail de leurs tontines)
router.get('/members', async (req, res) => {
  try {
    const members = await Member.find().populate('tontines');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Un membre par ID
router.get('/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('tontines');
    if (!member) return res.status(404).json({ message: 'Membre introuvable' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un membre
router.post('/members', async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Modifier un membre
router.put('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Membre introuvable' });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un membre
router.delete('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Membre introuvable' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LES API DES TONTINES /////////////////////////////////////////////////////////////

// Tous les groupes
router.get('/tontines', async (req, res) => {
  try {
    const groupes = await TontineGroupe.find();
    res.json(groupes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Un groupe par ID
router.get('/tontines/:id', async (req, res) => {
  try {
    const groupe = await TontineGroupe.findById(req.params.id);
    if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });
    res.json(groupe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un groupe
router.post('/tontines', async (req, res) => {
  try {
    const groupe = await TontineGroupe.create(req.body);
    res.status(201).json(groupe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Modifier un groupe
router.put('/tontines/:id', async (req, res) => {
  try {
    const groupe = await TontineGroupe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });
    res.json(groupe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un groupe
router.delete('/tontines/:id', async (req, res) => {
  try {
    const groupe = await TontineGroupe.findByIdAndDelete(req.params.id);
    if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;