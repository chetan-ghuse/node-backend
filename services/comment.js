const Comment = require('../models').comment;
const Blog = require('../models').blog;
// const moment = require('moment');

const addComment = async (req, res) => {
  if (!req.body.blogId) {
    return res.status(400).send({
      'error': true, 'msg': 'Provide blog id', 'response': null
    })
  }
  let blogFound;
  try {
    blogFound = await Blog.findOne({
      where: {id: req.body.blogId}
    })
    if (!blogFound) {
      return res.status(400).send({
        'error': true, 'msg': 'Provide valid blog id', 'response': null
      })
    }
    let commentCreated = await Comment.create({
      comment: req.body.comment,
      blogId: req.body.blogId,
      userId: req.body.userId,
      // createdAt: moment(new Date(Date.now())).format()
    })
    res.status(200).send({
      'error': false, 'msg': 'Comment Successfully Added', 'response': null
    })
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
};

const findUserOfComment = async (req, res, comment) => {
  let returnValue = false;
  if (comment['userId'] === req.body.userId) {
    return true
  }
  let blogFound;
  try {
    blogFound = await Blog.findOne({
      where: {id: comment['blogId']}
    })
    if (blogFound['userId'] === req.body.userId) {
      returnValue = true
    }
  } catch (error) {
    returnValue = false
  }
  return returnValue;
}

const deleteComment = async (req, res) => {
  if (!req.body.commentId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter comment id', 'response': null
    });
  }
  let commentFound;
  try {
    commentFound = await Comment.findOne({
      where: {id: req.body.commentId}
    })
    if (!commentFound) {
      return res.status(400).send({
        'error': true, 'msg': 'Please enter proper comment id', 'response': null
      });
    }
    else if (!findUserOfComment(req, res, commentFound)) {
      return res.status(400).send({
        'error': true, 'msg': 'Permission denied', 'response': null
      });     
    }
    await commentFound.destroy()
    res.status(200).send({
      'error': false, 'msg': 'Comment Deleted', 'response': null
    })
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

const updateComment = async (req, res) => {
	if (!req.body.commentId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter comment id', 'response': null
    });
  }
  let commentFound;
  try {
    commentFound = await Comment.findOne({
      where: {id: req.body.commentId}
    })
    if (!commentFound) {
      return res.status(400).send({
        'error': true, 'msg': 'Comment Not Found', 'response': null
      });
    }
    else if (commentFound['userId'] !== req.body.userId) {
      return res.status(400).send({
        'error': true, 'msg': 'Permission Denied', 'response': null
      });
    }
    await commentFound.update({
      comment: req.body.comment || commentFound['comment'],
      updatedAt: new Date(Date.now())
    })
    res.status(200).send({
      'error': false, 'msg': 'Comment Updated', 'response': null
    })
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

module.exports = {
  addComment, 
  deleteComment,
  updateComment
}