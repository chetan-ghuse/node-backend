const blogService = require('../../services/blog.js');

const addBlog = (req, res) => {
  blogService.addBlog(req, res);
};

const userBlog = (req, res) => {
  blogService.userBlog(req, res);
};

const usersBlog = (req, res) => {
  blogService.usersBlog(req, res);
};

const deleteBlog = (req, res) => {
  blogService.deleteBlog(req, res);
};

const updateBlog = (req, res) => {
  blogService.updateBlog(req, res);
};

module.exports = {
  addBlog,
  userBlog,
  usersBlog,
  deleteBlog,
  updateBlog,
};
