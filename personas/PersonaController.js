var Persona = require('../personas/PersonaSchema');
var PersonaDao = require('../personas/PersonaDao');

exports.getPersona = function(req, res){	
	PersonaDao.getPersona('Pepito', res)
	.then(function(persona){
		res.send(persona);		
		console.log("Busqueda correcta");
	})
	.catch(function(err){
		console.log(err);
	})
};

exports.postPersona = function(req, res){
	var personaNueva = new Persona({
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			DNI: req.body.DNI,
			telefono: req.body.telefono
		});
	PersonaDao.savePersona(personaNueva);
	return res.send("Persona añadida" + personaNueva);
};

exports.updatePersona = function(req, res){
	PersonaDao.updatePersona(req.params.id, res, function(persona){
		persona.nombre= req.body.nombre;
		persona.apellido= req.body.apellido;
		persona.DNI= req.body.DNI;
		persona.telefono= req.body.telefono;

		res.json(persona);
	})
};

exports.deletePersona = function(req, res){
	PersonaDao.deletePersona(req, res);
	return res.json({ message: 'Persona removed from the DB!' });
};

exports.checkAuth = function (req, res, next){
	if(!req.headers.authorization){
		return res.send("403 Forbidden");
	}
	next();
};