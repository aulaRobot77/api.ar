'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//cargar rutas
var user_rutas = require('./rutas/user.rutas');
var alumno_rutas = require('./rutas/alumno.rutas');
var parte_diario_rutas = require('./rutas/parte-diario.rutas');
var grupo_rutas = require('./rutas/grupo.rutas');
var pago_rutas = require('./rutas/pago.rutas');

//middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Autorizacion, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas base
app.use('/api', user_rutas);
app.use('/api', alumno_rutas);
app.use('/api', parte_diario_rutas);
app.use('/api', grupo_rutas);
app.use('/api', pago_rutas);

app.get('/probando',(req,res)=>{
  res.status(200).send({message:'este es el método probando'});
});

module.exports = app;
