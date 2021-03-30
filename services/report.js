const Report = require('../models').report;
const Blog = require('../models').blog;
const threshold = 2;

const reportBlog = async (req, res) => {
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
    let reportFound = await Report.findOne({
      where: {
        blogId: req.body.blogId,
        userId: req.body.userId
      }
    })
    if (reportFound) {
    	return res.status(400).send({
      	'error': true, 'msg': 'Already reported once', 'response': null
    	})
    }
    await Report.create({
      blogId: req.body.blogId,
      userId: req.body.userId,
      message: req.body.message
    })
    await countReport(req, res, blogFound)
    res.status(201).send({
      'error': false, 'msg': 'report added', 'response': null
    })
  } catch(error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

const countReport = async (req, res, blogFound) => {
  let reportCount = await Report.count({
    where: {blogId: req.body.blogId},
    group: ['blogId']
  })
  if (Number(reportCount[0]['count']) === threshold) {
  	blogFound.update({
  		visible: false
  	})
  }
  return 
}
module.exports = {
  reportBlog
}