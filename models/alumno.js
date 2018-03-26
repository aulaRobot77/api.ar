'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoSchema = Schema({
  dni: String,
  nombre: String,
  apellido: String,
  fechaNacimiento: String,
  fechaIngreso: String,
  domicilio: String,
  escuela: String,
  grado: String,
  horarioEscolar: String,
  horariosLibres: [{
    dia: {type: String, require: true},
    horaI: {type: Number, require: true},
    horaF: {type: Number, require: true}
  }],
  nombreMadre: String,
  telMadre: String,
  emailMadre: String,
  profesionMadre: String,
  nombrePadre: String,
  telPadre: String,
  emailPadre: String,
  profesionPadre: String,
  telefonos: String,
  acotaciones: String,
  observaciones: String,
  niveles: [{
    nivel: {type: String, require: true},//{type: Schema.ObjectId, ref: 'Nivel', require: true},
    estado: {type: String, require: true},
    anio: {type: Number, require: true}
  }],
  fechaFinalizacion: String,
  grupo: {type: Schema.ObjectId, ref: 'Grupo'},
  estado: String
});

module.exports = mongoose.model("Alumno", AlumnoSchema);
