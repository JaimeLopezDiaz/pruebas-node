module.exports = function(app){

	var newDate = new Date().toDateString();
	var PersonaController = require('../controllers/PersonaController');
	var bodyParser = require('body-parser');
	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function(req, res, next){	
		console.log(newDate);
		next();
	});

	app.get('/persona', function(req, res){
		PersonaController.getPersona(req,res);	
	});

	app.post('/persona', function(req,res){
		PersonaController.postPersona(req,res);
	});

	app.put('/persona/:id', function(req, res){
		PersonaController.updatePersona(req, res);
	});

	app.delete('/persona/:id', PersonaController.checkAuth, function(req, res){
		PersonaController.deletePersona(req, res);
	});

	app.use(function(req, res, next){
		console.log("404 ERROR");
		res.send("404 ERROR");
	});

}