const mediaController = require('../controllers/media/media');
const authenticate = require('../utils/authenticateUser').getToken;
const getUserId = require('../utils/method-helper').getUserId;

module.exports.route = () => {
  router.post('/addMedia', authenticate, getUserId, mediaController.addMedia)
  router.delete('/deleteMedia', authenticate, getUserId, mediaController.deleteMedia)
  router.post('/showMedia', authenticate, getUserId, mediaController.showMedia)
}
