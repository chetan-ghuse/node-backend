const jwt = require('jsonwebtoken');
const user = require('../models').user;

exports.getToken = (req, res, next) => {
	if (!req.headers['authorization']) {
		return res.status(400).send({
      'error': true, 'msg': 'token not provided', 'response': null
    });
	}
	try {
	  const token = req.headers['authorization'];
		let decoded = jwt.verify(token, 'mySecR3tKeY')
		let userFind = user.findOne({where: {id: decoded['id']}})
		if (!userFind) {
		  return res.status(400).send({
				'error': true, 'msg': 'user not found', 'response': null
			});
		}
		return next();
	} catch (error) {
		return res.status(400).send({
    	'error': true, 'msg': 'error in authorization', 'response': null
   	});
	}
}