var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var persona = new Schema({
	nombre: String,
	apellido:String,
	DNI: String,
	telefono:Number
});

module.exports = mongoose.model('persona', persona);