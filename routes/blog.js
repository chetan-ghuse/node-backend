const blogController = require('../controllers/blog/blog');
const authenticate = require('../utils/authenticateUser').getToken;
const uploadFiles = require('../utils/uploadPhoto').uploadFiles;
const getUserId = require('../utils/method-helper').getUserId;

module.exports.route = () => {
  router.post('/addBlog', authenticate, uploadFiles, getUserId, blogController.addBlog) 
  router.post('/userBlog', authenticate, getUserId, blogController.userBlog)
  router.post('/usersBlog', authenticate, getUserId, blogController.usersBlog)
  router.delete('/deleteBlog', authenticate, getUserId, blogController.deleteBlog)
}
