'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "aula-robot-clave";

exports.auth = function(req, res, next){
  if(!req.headers.autorizacion){
    return res.status(403).send({message: 'Falta cabecera de Autoriación'});
  }

  var token = req.headers.autorizacion.replace(/['"]+/g,'');

  try{
    var payload = jwt.decode(token,secret);

    // Verifica fecha de caducidad
    if(payload.exp <= moment().unix()){
      return res.status(401).send({message: 'El token ha expirado'});
    }
  }
  catch(ex){
      return res.status(404).send({message: 'El token no es válido'});
  }

  // Para acceder al usuario logueado
  req.user = payload;

  next();
};
