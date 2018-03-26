'use strict'

var express = require('express');
var PagoController = require('../controladores/pago.controller');

var api = express.Router();
var mdAuth = require('../middlewares/autentificacion');

// api.get('/ruta', metodoDentroDeControlador)
// api.get('/ruta', mdAuth.auth, metodoDentroDeControlador)
api.post('/pago', mdAuth.auth, PagoController.crearPago);
api.get('/pago/:id', mdAuth.auth, PagoController.getPago);
api.get('/nro-recibo', mdAuth.auth, PagoController.getNroRecibo);

module.exports = api;
