const likeController = require('../controllers/like/like');
const authenticate = require('../utils/authenticateUser').getToken;
const getUserId = require('../utils/method-helper').getUserId;

module.exports.route = () => {
  router.post('/addRemoveLike', authenticate, getUserId, likeController.addRemoveLike) 
}
