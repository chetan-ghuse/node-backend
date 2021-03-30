const reportController = require('../controllers/report/report');
const authenticate = require('../utils/authenticateUser').getToken;
const getUserId = require('../utils/method-helper').getUserId;

module.exports.route = () => {
  router.post('/reportBlog', authenticate, getUserId, reportController.reportBlog) 
}
