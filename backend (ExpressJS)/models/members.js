const mongoose = require('mongoose');

const cotisationSchema = new mongoose.Schema({
  session_date: { type: String },
  amount_paid:  { type: Number },
  status:       { type: String },
  penalty:      { type: Number, default: 0 },
}, { _id: false });

const memberSchema = new mongoose.Schema({
  nom:        { type: String, required: true },
  CNI:        { type: String, required: true, unique: true },
  telephone:  { type: String },
  quartier:   { type: String },
  profession: { type: String },
  tontines:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'TontineGroupe' }],
  cotisations: [cotisationSchema],
});

module.exports = mongoose.model('Member', memberSchema, 'members');