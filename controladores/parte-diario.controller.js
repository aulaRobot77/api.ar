'use strict'

var ParteDiario = require('../models/parte-diario');


function crearParteDiario(req, res){
  var parte = new ParteDiario();

  // Obtener parametros de la peticion
  var params = req.body;

  if(params.fechaClase){
    // Asignar valores al alumno
    parte.fechaClase = params.fechaClase;
    parte.fechaHoraCreacion = params.fechaHoraCreacion;
    parte.grupo = params.grupo;
  }
}

module.exports = {
    crearParteDiario
}
