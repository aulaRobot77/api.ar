'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "aula-robot-clave";

exports.createToken = function(user){
  var payload = {
    sub: user._id,
    nombreUsuario: user.nombreUsuario,
    nombre: user.nombre,
    apellido: user.apellido,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(4,'hour').unix()
  };

  return jwt.encode(payload, secret)
};
