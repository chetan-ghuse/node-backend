const userController = require('../controllers/user/user');
const authenticate = require('../utils/authenticateUser').getToken;
const getUserId = require('../utils/method-helper').getUserId;

module.exports.route = () => {
	router.all('/',userController.mainPage);
  // router.get('/users', userController.getUsers);
  router.get('/users', authenticate, userController.getUsers);
  router.get('/user/:userEmail', authenticate, getUserId, userController.getUser);
  router.get('/unauthorized', userController.unauthorized);
  
  router.post('/addUser', userController.addUser);
  router.post('/login', userController.loginUser);
  router.post('/logout', authenticate, userController.logoutUser);

  router.put('/updateUser', authenticate, userController.updateUser);
  router.delete('/deleteUser', authenticate, getUserId, userController.deleteUser);
}