'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParteDiarioSchema = Schema({
  fechaClase: String,
  fechaHoraCreacion: String,
  grupo:String
});

module.exports=mongoose.model('ParteDiario',ParteDiarioSchema);
