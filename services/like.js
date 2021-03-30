const Like = require('../models').like;
const Blog = require('../models').blog;

const addRemoveLike = async (req, res) => {
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
    let likeFound = await Like.findOne({
      where: {
        blogId: req.body.blogId,
        userId: req.body.userId
      }
    })
    if (!likeFound) {
      await likeAdd(req, res);
    } else {
      await likeRemove(req, res, likeFound);
    }
  } catch(error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

const likeAdd = async (req, res) => {
  let likeAdded;
  try{
    likeAdded = await Like.create({
      blogId: req.body.blogId,
      userId: req.body.userId
    })
    res.status(201).send({
      'error': false, 'msg': 'Like entry added', 'response': null
    })          
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

const likeRemove = async (req, res, likeFound) => {
  let likeRemoved;
  try {
    likeRemoved = await likeFound.destroy();
    if (likeRemoved) {
      res.status(200).send({
        'error': false, 'msg': 'Like Deleted', 'response': null
      })
    }
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

module.exports = {
  addRemoveLike
}