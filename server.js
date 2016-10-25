var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/persona', function(err, res){
	if(err) console.log("ERROR AL CONECTAR BD" + err);
	else console.log("CONECTADO A BD");
});

require('./services/PersonaService')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

