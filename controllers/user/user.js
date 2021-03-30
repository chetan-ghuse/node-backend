const userService = require('../../services/user.js');
// const methodHelper = require('../../utils/method-helper');

// const getUserId = (req, res) => {
//   const tokenInfo = methodHelper.getInfoByToken(req);
//   req.body.userId = tokenInfo.payload['id'];
// }

const getUsers = (req, res) => {
  // getUserId(req, res);
  userService.getUsers(req, res);
}

const getUser = (req, res) => {
  userService.getUser(req, res);
}

const deleteUser = (req, res) => {
  userService.deleteUser(req, res);
}

const addUser = (req, res) => {
  userService.addUser(req, res);
}
 
const updateUser = (req, res) => {
  userService.updateUser(req, res);
}

const loginUser = (req, res) => {
  userService.loginUser(req, res);
}

const logoutUser = (req, res) => {
  userService.logoutUser(req, res);
}

const unauthorized = (req, res) => {
  userService.unauthorized(req, res); 
}

const mainPage = (req, res) => {
  userService.mainPage(req, res); 
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  unauthorized,
  addUser,
  updateUser,
  mainPage,
  loginUser,
  logoutUser
}