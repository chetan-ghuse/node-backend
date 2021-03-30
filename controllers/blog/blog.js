const blogService = require('../../services/blog.js');
//const jwt = require('jsonwebtoken');
//const methodHelper = require('../../utils/method-helper');

// const getUserId = (req, res) => {
//   const tokenInfo = methodHelper.getInfoByToken(req);
//   req.body.userId = tokenInfo.payload['id'];
// }

const addBlog = (req, res) => {
  blogService.addBlog(req, res);  
}

const userBlog = (req, res) => {
  blogService.userBlog(req, res);  
}

const usersBlog = (req, res) => {
  blogService.usersBlog(req, res);  
}

const deleteBlog = (req, res) => {
  blogService.deleteBlog(req, res);  
}

// const countLike = (req, res) => {
//   blogService.countLike(req, res);  
// }

module.exports = {
  addBlog,
  userBlog,
  usersBlog,
  deleteBlog,
  // countLike
}