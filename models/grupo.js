'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GrupoSchema = Schema({
  nombre: { type: String, required: true },
  anio: { type: Number, required: true },
  hora_fin: Number,
  hora_inicio: Number,
  dia_semana: String,
  instructores: [{type: Schema.ObjectId, ref: 'User'}],
  cursan: [{type: Schema.ObjectId, ref: 'Alumno'}]
});

module.exports=mongoose.model('Grupo',GrupoSchema);
