'use strict'

var Alumno = require('../models/alumno');

function crearAlumno(req, res){
  var alumno = new Alumno();

  // Obtener parametros de la peticion
  var params = req.body;

  if(params.dni){
    // Asignar valores al alumno
    alumno.dni = params.dni;
    alumno.nombre = params.nombre;
    alumno.apellido = params.apellido;
    alumno.fechaNacimiento = params.fechaNacimiento;
    alumno.fechaIngreso = params.fechaIngreso;
    alumno.domicilio = params.domicilio;
    alumno.escuela = params.escuela;
    alumno.grado = params.grado;
    alumno.horarioEscolar = params.horarioEscolar;
    alumno.horariosLibres = params.horariosLibres;
    alumno.nombreMadre = params.nombreMadre;
    alumno.telMadre = params.telMadre;
    alumno.emailMadre = params.emailMadre;
    alumno.profesionMadre = params.profesionMadre;
    alumno.nombrePadre = params.nombrePadre;
    alumno.telPadre = params.telPadre
    alumno.emailPadre = params.emailPadre
    alumno.profesionPadre = params.profesionPadre
    alumno.telefonos = params.telefonos;
    alumno.acotaciones = params.acotaciones;
    alumno.observaciones = params.observaciones;
    alumno.nivelesCompletados = params.nivelesCompletados;
    alumno.nivelActual = params.nivelActual;
    alumno.fechaFinalizacion = params.fechaFinalizacion;
    alumno.grupo = params.grupo
    if(alumno.grupo)
      alumno.estado = "Activo";
    else {
      alumno.estado = "Inactivo";
    }

    Alumno.findOne({dni: alumno.dni}, (err,alumnoSearch) => {
      if(err){
        res.status(404).send({message: 'No se pudo comprobar existencia de alumno.'})
      }
      else{
        if(!alumnoSearch){
          //Guarda alumno en la BD
          alumno.save((err, alumnoStored) => {
            if(err){
              res.status(500).send({message: ' Error al registrar el alumno'});
            }
            else{
              if(!alumnoStored){
                res.status(404).send({message: 'No se ha registrado el alumno'});
              }
              else{
                res.status(200).send({alumno: alumnoStored});
              }
            }
          });
        }
        else{
          res.status(500).send({message: 'Nombre de alumno duplicado.'})
        }
      }
    });
  }
  else{
    res.status(404).send({message: 'Introduce los datos correctos.'});
  }
}

function editarAlumno(req, res){
  var alumnoId = req.params.id;
  var update = req.body;
  if(update.grupo)
    update.estado = "Activo";
  else {
    update.estado = "Inactivo";
  }

  Alumno.findByIdAndUpdate(alumnoId, update, (err, alumnoEdit) =>{
    if(err){
      res.status(500).send({message: "Error al actualizar alumno"})
    }
    else{
      if(!alumnoEdit){
        res.status(404).send({message: "No se ha podido actualizar al alumno"});
      }
      else{
        res.status(200).send({alumno: alumnoEdit});
      }
    }
  });
}

function getAlumno(req, res){
    var alumnoId = req.params.id;

    Alumno.findById(alumnoId, (err, alumnoGet) => {
      if(err){
        res.status(500).send({message: "No se ha podido obtener el alumno"});
      }
      else{
        if(!alumnoGet){
          res.status(404).send({message: "El alumno no existe"});
        }
        else{
          res.status(200).send({alumno: alumnoGet});
        }
      }
    }).populate({path:'grupo'});
}

function getAllAlumnos(req, res){

  Alumno.find({}).populate({path: 'grupo'}).exec((err, alumnos) => {
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!alumnos){
        res.status(404).send({message: "No existen alumnos"});
      }
      else{
        res.status(202).send({alumnos: alumnos});
      }
    }
  });
}

function getAlumnosInactivos(req, res){

  Alumno.find({estado:'Inactivo'}).populate({path: 'grupo'}).exec((err, alumnos) => {
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!alumnos){
        res.status(404).send({message: "No existen alumnos"});
      }
      else{
        res.status(202).send({alumnos: alumnos});
      }
    }
  });
}

function getAllAlumnosFiltro(req, res){
  var list = (req.params.list);
  if(list == 'null'){
    Alumno.find().exec((err, alumnos) => {
      if(err){
        res.status(500).send({message: "Error en la petición"});
      }
      else{
        if(!alumnos){
          res.status(404).send({message: "No existen alumnos"});
        }
        else{
          res.status(202).send({alumnos: alumnos});
        }
      }
    })
  }
  else {
    list = list.split(',')
    Alumno.find({_id: {$nin: list}}).exec((err, alumnos) => {
      if(err){
        res.status(500).send({message: "Error en la petición"});
      }
      else{
        if(!alumnos){
          res.status(404).send({message: "No existen alumnos"});
        }
        else{
          res.status(202).send({alumnos: alumnos});
        }
      }
    })
  }
}

function eliminarAlumno(req, res){
  var alumnoId = req.params.id;

  Alumno.findByIdAndRemove(alumnoId, (err, alumnoRemoved) => {
    if(err){
      res.status(500).send({message: "Error en la petición."});
    }
    else{
      if(!alumnoRemoved){
          res.status(404).send({message: "No se logró borrar el alumno."});
      }
      else{
        res.status(200).send({alumno: alumnoRemoved});
      }
    }
  });
}

module.exports = {
  crearAlumno,
  editarAlumno,
  eliminarAlumno,
  getAlumno,
  getAllAlumnos,
  getAllAlumnosFiltro,
  getAlumnosInactivos
}
