'use strict'

var express = require('express');
var ParteDiarioController = require('../controladores/parte-diario.controller');

var api = express.Router();
var mdAuth = require('../middlewares/autentificacion');

// api.get('/ruta', metodoDentroDeControlador)
// api.get('/ruta', mdAuth.auth, metodoDentroDeControlador)

api.post('/parte-diario',  ParteDiarioController.crearParteDiario);
//api.put('/parte-diario/:id',  ParteDiarioController.editarParteDiario);
//api.delete('/parte-diario/:id', mdAuth.auth, ParteDiarioController.eliminarParteDiario);
//api.get('/parte-diario/:id', mdAuth.auth, ParteDiarioController.getParteDiario);
//api.get('/parte-diario', mdAuth.auth, ParteDiarioController.getAllPartesDiarios);

module.exports = api;
