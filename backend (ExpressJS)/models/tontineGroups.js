const mongoose = require('mongoose');

const tontineGroupeSchema = new mongoose.Schema({
  nom:     { type: String, required: true },
  cycle:   { type: String },
  montant: { type: Number },
});

module.exports = mongoose.model('TontineGroupe', tontineGroupeSchema, 'tontines_groupes');