const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  slot: {type: String, required: true, unique: true}
});

const appointmentModel = mongoose.model('appointment', appointmentSchema);
module.exports = appointmentModel;