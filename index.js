'use strict'

var mongoose = require("mongoose");
var app = require ('./app');
const port = process.env.PORT || 3789;

mongoose.connect('mongodb://localhost:27017/aularobotdb', (err, res) => {
  if(err){
    throw err;
  }
  else{
    console.log("La conexión a la BD de Aula Robot se ha realizado correctamente :)");
    app.listen(port, ()=> {
      console.log("El servidor local con Node y Express está corriendo correctamente...");
    });
  }
});
