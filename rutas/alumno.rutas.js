'use strict'

var express = require('express');
var AlumnoController = require('../controladores/alumno.controller');

var api = express.Router();
var mdAuth = require('../middlewares/autentificacion');

// api.get('/ruta', metodoDentroDeControlador)
// api.get('/ruta', mdAuth.auth, metodoDentroDeControlador)

api.post('/alumno', mdAuth.auth, AlumnoController.crearAlumno);
api.put('/alumno/:id', mdAuth.auth, AlumnoController.editarAlumno);
api.delete('/alumno/:id', mdAuth.auth, AlumnoController.eliminarAlumno);
api.get('/alumno/:id', mdAuth.auth, AlumnoController.getAlumno);
api.get('/alumnos', mdAuth.auth, AlumnoController.getAllAlumnos);
api.get('/alumnos-inactivos', mdAuth.auth, AlumnoController.getAlumnosInactivos);
api.get('/alumnos-filtro/:list', mdAuth.auth, AlumnoController.getAllAlumnosFiltro);

module.exports = api;
