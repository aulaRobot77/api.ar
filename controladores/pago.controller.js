'use strict'

var Pago = require('../models/pago');

function crearPago(req, res){
  var pago = new Pago();

  // Obtener parametros de la peticion
  var params = req.body;

  if(params.nro && params.tipo){
    // Asignar valores al pago
    pago.nro = params.nro;
    pago.fecha = params.fecha;
    pago.alumno = params.alumno;
    pago.monto = params.monto;
    pago.montoT = params.montoT;
    if(params.tipo == 'otro'){
      pago.descripcion = params.descripcion
      //Guarda pago en la BD
      pago.save((err, pagoStored) => {
        if(err){
          res.status(500).send({message: ' Error al registrar el pago'});
        }
        else{
          if(!pagoStored){
            res.status(404).send({message: 'No se ha registrado el pago'});
          }
          else{
            res.status(200).send({pagoStored});
          }
        }
      });
    }
    else {
      if(params.tipo == 'meses'){
        pago.anio = params.anio;
        pago.mes = params.mes;

        Pago.findOne({mes: pago.mes, anio: pago.anio, alumno: pago.alumno}, (err,pagoSearch) => {
          if(err){
            res.status(500).send({message: 'No se pudo comprobar existencia de pago.'})
          }
          else{
            if(!pagoSearch){
              //Guarda pago en la BD
              pago.save((err, pagoStored) => {
                if(err){
                  res.status(500).send({message: ' Error al registrar el pago'});
                }
                else{
                  if(!pagoStored){
                    res.status(404).send({message: 'No se ha registrado el pago'});
                  }
                  else{
                    res.status(200).send({pagoStored});
                  }
                }
              });
            }
            else{
              res.status(500).send({message: 'Pago Mensual duplicado.'})
            }
          }
        });
      }
      else{
        if(params.tipo == 'vacante'){
          pago.anio = params.anio;
          pago.grupo = params.grupo;

          Pago.findOne({anio: pago.anio, alumno: pago.alumno}, (err,pagoSearch) => {
            if(err){
              res.status(500).send({message: 'No se pudo comprobar existencia de pago.'})
            }
            else{
              if(!pagoSearch){
                //Guarda pago en la BD
                pago.save((err, pagoStored) => {
                  if(err){
                    res.status(500).send({message: ' Error al registrar el pago'});
                  }
                  else{
                    if(!pagoStored){
                      res.status(404).send({message: 'No se ha registrado el pago'});
                    }
                    else{
                      res.status(200).send({pagoStored});
                    }
                  }
                });
              }
              else{
                res.status(500).send({message: 'Pago de Vacante duplicado.'})
              }
            }
          });
        }
      }
    }
  }
  else{
    res.status(404).send({message: 'Introduce los datos correctos.'});
  }
}

function getPago(req, res){
    var pagoId = req.params.id;

    Pago.findById(pagoId, (err, pagoGet) => {
      if(err){
        res.status(500).send({message: "No se ha podido obtener el pago"});
      }
      else{
        if(!pagoGet){
          res.status(404).send({message: "El pago no existe"});
        }
        else{
          res.status(200).send({pago: pagoGet});
        }
      }
    });
}

function getNroRecibo(req, res){

  Pago.aggregate([
    { $group: { _id: null, max: { $max: '$nro' }}},
    { $project: { _id: 0, max: 1 }}
  ]).
  then(function (resp) {
    res.status(200).send(resp);
  });
}


module.exports = {
  crearPago,
  getPago,
  getNroRecibo
}
