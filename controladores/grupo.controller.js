'use strict'

var Grupo = require('../models/grupo');

function crearGrupo(req, res){
  var grupo = new Grupo();

  // Obtener parametros de la peticion
  var params = req.body;

  if(params.nombre && params.anio){
    // Asignar valores al grupo
    grupo.nombre = params.nombre;
    grupo.anio = params.anio;
    grupo.hora_fin = params.hora_fin;
    grupo.hora_inicio = params.hora_inicio;
    grupo.dia_semana = params.dia_semana;
    grupo.cursan = params.cursan;
    grupo.instructores = params.instructores;

    Grupo.findOne({nombre: grupo.nombre, anio: grupo.anio}, (err,grupoSearch) => {
      if(err){
        res.status(500).send({message: 'No se pudo comprobar existencia de grupo.'})
      }
      else{
        if(!grupoSearch){
          //Guarda grupo en la BD
          grupo.save((err, grupoStored) => {
            if(err){
              res.status(500).send({message: ' Error al registrar el grupo'});
            }
            else{
              if(!grupoStored){
                res.status(404).send({message: 'No se ha registrado el grupo'});
              }
              else{
                res.status(200).send({grupoStored});
              }
            }
          });
        }
        else{
          res.status(500).send({message: 'Nombre de grupo duplicado.'})
        }
      }
    });
  }
  else{
    res.status(404).send({message: 'Introduce los datos correctos.'});
  }
}

function editarGrupo(req, res){
  var grupoId = req.params.id;
  var update = req.body;

  Grupo.findByIdAndUpdate(grupoId, update, (err, grupoEdit) =>{
    if(err){
      res.status(500).send({message: "Error al actualizar grupo"})
    }
    else{
      if(!grupoEdit){
        res.status(404).send({message: "No se ha podido actualizar al grupo"});
      }
      else{
        res.status(200).send({grupo: grupoEdit});
      }
    }
  });
}

function getGrupo(req, res){
    var grupoId = req.params.id;

    Grupo.findById(grupoId, (err, grupoGet) => {
      if(err){
        res.status(500).send({message: "No se ha podido obtener el grupo"});
      }
      else{
        if(!grupoGet){
          res.status(404).send({message: "El grupo no existe"});
        }
        else{
          res.status(200).send({grupo: grupoGet});
        }
      }
    });
}

function getGrupoCompleto(req, res){
    var grupoId = req.params.id;

    Grupo.findById(grupoId, (err, grupoGet) => {
      if(err){
        res.status(500).send({message: "No se ha podido obtener el grupo"});
      }
      else{
        if(!grupoGet){
          res.status(404).send({message: "El grupo no existe"});
        }
        else{
          res.status(200).send({grupo: grupoGet});
        }
      }
    }).populate('instructores').populate('cursan');
}

function getAllGrupos(req, res){

  Grupo.find().exec((err, grupos) => {
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!grupos){
        res.status(404).send({message: "No existen grupos"});
      }
      else{
        res.status(202).send({grupos: grupos});
      }
    }
  });
}

function eliminarGrupo(req, res){
  var grupoId = req.params.id;

  Grupo.findByIdAndRemove(grupoId, (err, grupoRemoved) => {
    if(err){
      res.status(500).send({message: "Error en la petición."});
    }
    else{
      if(!grupoRemoved){
          res.status(404).send({message: "No se logró borrar el grupo."});
      }
      else{
        res.status(200).send({grupo: grupoRemoved});
      }
    }
  });
}

module.exports = {
  crearGrupo,
  editarGrupo,
  eliminarGrupo,
  getGrupo,
  getAllGrupos,
  getGrupoCompleto
}
