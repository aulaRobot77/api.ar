'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PagoSchema = Schema({
  nro: {type: String, require: true},
  fecha: {type: String, require: true},
  tipo: {type: String, require: true},
  alumno: {type: Schema.ObjectId, ref: 'Alumno', require: true},
  monto: {type: Number, require: true},
  montoT: {type: String, require: true},
  // Otro
  descripcion: {type: String},
  // Cuota Mensual
  meses: [],
  // Vacante
  anio: {type: Number},
  grupo: {type: String} //{type: Schema.ObjectId, ref: 'Grupo'}
});

module.exports = mongoose.model('Pago',PagoSchema);
