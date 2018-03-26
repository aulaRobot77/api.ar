'use strict'

var express = require('express');
var GrupoController = require('../controladores/grupo.controller');

var api = express.Router();
var mdAuth = require('../middlewares/autentificacion');

// api.get('/ruta', metodoDentroDeControlador)
// api.get('/ruta', mdAuth.auth, metodoDentroDeControlador)
api.post('/grupo', mdAuth.auth, GrupoController.crearGrupo)
api.get('/grupo/:id', mdAuth.auth, GrupoController.getGrupo);
api.get('/grupo-completo/:id', mdAuth.auth, GrupoController.getGrupoCompleto);
api.put('/grupo/:id', mdAuth.auth, GrupoController.editarGrupo);
api.delete('/grupo/:id', mdAuth.auth, GrupoController.eliminarGrupo);
api.get('/grupos', mdAuth.auth, GrupoController.getAllGrupos);

module.exports = api;
