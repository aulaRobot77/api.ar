'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  nombreUsuario: String,
  nombre: String,
  apellido:String,
  password:String,
  role:String
  //Agregar acá los demás atributos, también se deben agregar en el método de creación, en el controlador
});

module.exports=mongoose.model('User',UserSchema);
