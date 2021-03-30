const commentController = require('../controllers/comment/comment');
const authenticate = require('../utils/authenticateUser').getToken;
const getUserId = require('../utils/method-helper').getUserId;

module.exports.route = () => {
  router.post('/addComment', authenticate, getUserId, commentController.addComment) 
  router.delete('/deleteComment', authenticate, getUserId, commentController.deleteComment)
  router.put('/updateComment', authenticate, getUserId, commentController.updateComment) 
}
