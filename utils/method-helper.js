const jwt = require('jsonwebtoken');

exports.getUserId = (req, res, next) => {
  const token = req.headers['authorization'];
  const tokenInfo = jwt.decode(token, {complete: true});
  req.body.userId = tokenInfo.payload['id'];
  next();
};