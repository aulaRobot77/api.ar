'use strict'

var express = require('express');
var UserController = require('../controladores/user.controller');

var api = express.Router();
var mdAuth = require('../middlewares/autentificacion');

// api.get('/ruta', metodoDentroDeControlador)
// api.get('/ruta', mdAuth.auth, metodoDentroDeControlador)

api.get('/home', UserController.getUser);
api.post('/registro', UserController.saveUser);
api.post('/login', UserController.login);
api.get('/usuario/:id', mdAuth.auth, UserController.getUser);
api.put('/usuario/:id', mdAuth.auth, UserController.editUser);
api.delete('/usuario/:id', mdAuth.auth, UserController.deleteUser);
api.get('/usuarios', mdAuth.auth, UserController.getAllUsers);
api.get('/instructores', mdAuth.auth, UserController.getInstructores);
api.get('/instructores/:list', mdAuth.auth, UserController.getInstructoresFilter);

module.exports = api;
