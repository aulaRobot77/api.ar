'use strict'
var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');

var jwt = require('../servicios/jwt');

function home(req,res){
  res.status(200).send({message: "Conexión existente"});
}

function saveUser(req, res){
  var user = new User();

  // Obtener parametros de la peticion
  var params = req.body;

  if(params.password && params.nombreUsuario){
    // Asignar valores al usuario
    user.nombreUsuario = params.nombreUsuario;
    user.nombre = params.nombre;
    user.apellido = params.apellido;
    user.role = params.role;

    User.findOne({nombreUsuario: user.nombreUsuario}, (err,userSearch) => {
      if(err){
        res.status(500).send({message: 'No se pudo comprobar existencia de usuario.'})
      }
      else{
        if(!userSearch){
          //Cifra la contraseña
          bcrypt.hash(params.password, null, null, function(err,hash){
            user.password = hash;

            //Guarda usuario en la BD
            user.save((err, userStored) => {
              if(err){
                res.status(500).send({message: ' Error al registrar el Usuario'});
              }
              else{
                if(!userStored){
                  res.status(404).send({message: 'No se ha registrado el usuario'});
                }
                else{
                  res.status(200).send({userStored});
                }
              }
            });
          });
        }
        else{
          res.status(500).send({message: 'Nombre de usuario duplicado.'})
        }
      }
    });
  }
  else{
    res.status(404).send({message: 'Introduce los datos correctos.'});
  }
}

function login(req, res){
  var params = req.body;
  User.findOne({nombreUsuario: params.nombreUsuario}, (err,user) => {
    if(err){
      res.status(500).send({message: 'No se pudo comprobar existencia de usuario.'})
    }
    else{
      if(!user){
        res.status(500).send({message: 'El Usuario no ha podido loguearse.'})
      }
      else{
        bcrypt.compare(params.password, user.password, (err, check) => {
            if(check){
              // Comprobar y generar token
              if(params.gettoken){
                res.status(200).send({
                  token: jwt.createToken(user)
                })
              }
              else{
                user.password = null;
                res.status(200).send({user})
              }
            }
            else
              res.status(404).send({message: 'Contraseña Incorrecta'})
        });
      }
    }
  });


}

function editUser(req, res){
  var usuarioId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(usuarioId, update, (err, usuarioEdit) =>{
    if(err){
      res.status(500).send({message: "Error al actualizar usuario"})
    }
    else{
      if(!usuarioEdit){
        res.status(404).send({message: "No se ha podido actualizar al usuario"});
      }
      else{
        res.status(200).send({usuario: usuarioEdit});
      }
    }
  });
}

function getUser(req, res){
    var usuarioId = req.params.id;

    User.findById(usuarioId, (err, usuarioGet) => {
      if(err){
        res.status(404).send({message: "No se ha podido obtener el usuario"});
      }
      else{
        res.status(202).send({usuario: usuarioGet});
      }
    }).select({password:0});;
}

function getAllUsers(req, res){

  User.find((err, usuarios) => {
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!usuarios){
        res.status(404).send({message: "No existen usuarios"});
      }
      else{
        res.status(202).send({usuarios: usuarios});
      }
    }
  }).select({password:0});
}

function getInstructores(req, res){

  User.find({role: 'Instructor'}, (err, instructores) => {
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!instructores){
        res.status(404).send({message: "No existen instructores"});
      }
      else{
        res.status(202).send({instructores: instructores});
      }
    }
  }).select({password:0});
}

function getInstructoresFilter(req, res){
  var list = (req.params.list);
  if(list != 'null'){
    list = list.split(',');
    User.find({role: 'Instructor', _id: {$nin: list}}, (err, instructores) => {
      if(err){
        res.status(500).send({message: "Error en la petición"});
      }
      else{
        if(!instructores){
          res.status(404).send({message: "No existen instructores"});
        }
        else{
          res.status(202).send({instructores: instructores});
        }
      }
    }).select({password:0});
  }
  else {
    User.find({role: 'Instructor'}, (err, instructores) => {
      if(err){
        res.status(500).send({message: "Error en la petición"});
      }
      else{
        if(!instructores){
          res.status(404).send({message: "No existen instructores"});
        }
        else{
          res.status(202).send({instructores: instructores});
        }
      }
    }).select({password:0});
  }
}

function deleteUser(req, res){
  var userId = req.params.id;

  User.findByIdAndRemove(userId, (err, userRemoved) => {
    if(err){
      res.status(500).send({message: "Error en la petición."});
    }
    else{
      if(!userRemoved){
          res.status(404).send({message: "No se logró borrar el usuario."});
      }
      else{
        res.status(200).send({user: userRemoved});
      }
    }
  });
}

module.exports = {
  home,
  saveUser,
  editUser,
  login,
  getUser,
  getAllUsers,
  deleteUser,
  getInstructores,
  getInstructoresFilter
};
