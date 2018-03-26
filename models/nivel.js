'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NivelSchema = Schema({
  nombre: {type: String, require: true},
  descripción: {type: String},
});

module.exports = mongoose.model('Nivel',NivelSchema);
