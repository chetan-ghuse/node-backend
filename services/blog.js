const Blog = require('../models').blog;
const Comment = require('../models').comment;
const Media = require('../models').media;
const Like = require('../models').like;
const User = require('../models').user;
const Sequelize = require('sequelize');
const fs = require('fs'); 
//const randtoken = require('rand-token').generator({chars: '0-9'});

/*
 * Description: To add new blog by the logged in user along with media
 *   The function first create an blog entry in blog table and
 *   if media are uploaded then corresponding entries are made in media table
 * Input Parameters: 
 *   A. Parameters in body-
 *     1. title,
 *     2. description,
 *     3. content,
 *   B. Parameters in req.files
 * Output: res (If blog creation is successful then success message is send,
 *   else error message is send to client)
*/

const addBlog = async (req, res) => {
  let blogCreated;
  try {
	  blogCreated = await Blog.create({
	    title: req.body.title,
	    description: req.body.description,
	    content: req.body.content,
	    userId: req.body.userId
	  })
	 	if (!req.files) {
      return res.status(201).send({
        'error': false, 'msg': 'Blog Successfully Added', 'response': null
      })
    }
	 	for (index in req.files) {
      await Media.create({
        photoAddress: (req.files)[index]['path'],
        blogId: blogCreated.id
      })
	 	}
	 	res.status(201).send({
		  'error': false, 'msg': 'Blog Successfully Added', 'response': null
 		})
  } catch (error) {
  	res.status(400).send({
			'error': true, 'msg': error.message, 'response': null
		})
  }
};

const userBlog = async (req, res) => {
  let blogData;
  try {
    blogData = await Blog.findAll({
      where: {userId: req.body.userId},
      attributes: ['id', 'title', 'description', 'content', 'visible', 'createdAt'],
      include: [{
        model: Comment,
        as: 'commentItems',
        attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
        include: [{
          model: User,
          attributes: [['id', 'userId'], 'firstName', 'lastName']
        }]
      }, { 
        model: Media,
        as: 'mediaItems',
        attributes: ['id', 'photoAddress']
      }, {
        model: Like, 
        as: 'likeItems',
        attributes: ['id'],// [Sequelize.fn('count', Sequelize.col('likeItems.id')), 'LikeCount'] 
        include: [{
          model: User,
          attributes: [['id', 'userId'], 'firstName', 'lastName']
        }]
        // group: ['blogId'],
      }],
      order: [
        ['updatedAt', 'DESC'],
        [{model: Comment, as: 'commentItems'}, 'createdAt', 'DESC'],
        [{model: Media, as: 'mediaItems'}, 'createdAt', 'DESC'],
        [{model: Like, as: 'likeItems'}, 'createdAt', 'DESC']
      ]
    })
  
    if (!blogData) {
      return res.status(400).send({
        'error': true, 'msg': 'Error in finding blogs', 'response': null
      });
    }
    res.status(200).send({
      'error': false, 'msg': 'All blogs are fetched', 'response': blogData
    });
    // for(blogs in blogData) {
    //   let likeCount = await Like.count({
    //     where: {blogId: blogData[blogs]['id']},
    //     group: ['blogId']
    //   })
    //   if (likeCount) {
    //     blogData[blogs].likeCount =  Number(likeCount[0]['count'])
    //   }
    // }
  } catch(error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  } 
};

const usersBlog = async (req, res) => {
  let blogData;
  try {
    blogData = await Blog.all({
      where: {visible: true},
      attributes: ['id', 'title', 'description', 'content', 'createdAt'],
      include: [{
        model: User,
        attributes: [['id', 'userId'], 'firstName', 'lastName']
      }, {
        model: Comment,
        as: 'commentItems',
        attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
        include: [{
          model: User,
          attributes: [['id', 'userId'], 'firstName', 'lastName']
        }]
      }, { 
        model: Media,
        as: 'mediaItems',
        attributes: ['id', 'photoAddress']
      }, {
        model: Like, 
        as: 'likeItems',
        attributes: ['id'],
        include: [{
          model: User,
          attributes: [['id', 'userId'], 'firstName', 'lastName']
        }]
      }],    
      order: [
        ['updatedAt', 'DESC'],
        [{model: Comment, as: 'commentItems'}, 'createdAt', 'DESC'],
        [{model: Media, as: 'mediaItems'}, 'createdAt', 'DESC'],
        [{model: Like, as: 'likeItems'}, 'createdAt', 'DESC']
      ]
    })

    if (!blogData) {
      return res.status(400).send({
        'error': true, 'msg': 'Error in finding blogs', 'response': null
      });      
    }
    res.status(200).send({
      'error': false, 'msg': 'All blogs are fetched', 'response': blogData
    });
  } catch(err) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
};

const deleteBlog = async (req, res) => {
  if (!req.body.blogId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter blog id', 'response': null
    });
  }
  let blogFound;
  try {
    blogFound = await Blog.findOne({
      where: {id: req.body.blogId}
    })
    if (!blogFound) {
      return res.status(400).send({
        'error': true, 'msg': 'Please enter proper blog id', 'response': null
      });
    } else if (blogFound['userId'] !== req.body.userId) {
      return res.status(400).send({
        'error': true, 'msg': 'Permission denied', 'response': null
      });
    }
    await deleteMedia(req, res)
    await blogFound.destroy()
    res.status(200).send({
      'error': false, 'msg': 'Blog Deleted', 'response': null
    })
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

const deleteMedia = async (req, res) => {
  let mediaFound;
  try {
    mediaFound = await Media.findAll({
      where: {blogId: req.body.blogId}
    })
    if (mediaFound) {
      for (index in mediaFound) {
        await DeleteFromStorage(mediaFound[index])
      }
    }
    return
  } catch (error) {
    return error
    // res.status(400).send({
    //   'error': true, 'msg': 'Error in media deletion', 'response': null
    // });
  }
}


const DeleteFromStorage = (mediaFound) => {
  fs.unlink(('./'+mediaFound['photoAddress']), output => {return})
}

module.exports = {
  addBlog, 
  userBlog,
  usersBlog,
  deleteBlog
}