const commentService = require('../../services/comment.js');

const addComment = (req, res) => {
  commentService.addComment(req, res);  
}

const deleteComment = (req, res) => {
  commentService.deleteComment(req, res);  
}

const updateComment = (req, res) => {
  commentService.updateComment(req, res);  
}

module.exports = {
  addComment,
  deleteComment,
  updateComment
}

