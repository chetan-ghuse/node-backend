const User = require('../models').user; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const blog = require('../models').blog;
// const comment = require('../models').comment;
// const media = require('../models').media;
// const like = require('../models').like;
// const moment = require('moment');
// let msg, statusCode, error, responseObj = null;

/*
 * Description: To get List of all users using this site
 * Input Parameters: None
 * Output: return array of objects containing following value for each user-
 *  1. id,
 *  2. name,
 *  3. emailId
 *  4. createdAt
*/

const getUsers = async (req, res) => {
  let usersFound;
  try {
    usersFound = await User.all({
      attributes: ['id', 'firstName', 'lastName', 'emailId', 'createdAt'],      
      order: [['createdAt', 'DESC']],
    })
      /* to change time zone*/
    // for (userData in users) {
    //   console.log(users[userData]['createdAt'])
    //   console.log(moment.parseZone(users[userData]['createdAt']).format('LLL'))
    //   users[userData]['createdAt'] = moment.parseZone(users[userData]['createdAt']).format('LLL')
    // }
    res.status(200).send({
      'error': false, 'msg': 'users are fetched', 'response': usersFound
    })
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    });
  }
};

/*
 * Description: To get details of logged in user.
 *  The function first check whether provided emailId is present in table, 
 *  if emailId is present and match to logged in user's emailId then user details
 *  are returned
 * Input Parameters: 
 *  1. emailId - param in url 
 * Output: return object containing user info which includes- 
 *  1. id,
 *  2. firstName,
 *  3. lastName,
 *  4. emailId 
 *  5. createdAt 
*/

const getUser = async (req, res) => {
	if (!req.params.userEmail) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter email id', 'response': null
    });
  }
  let userFound;
  try {
    userFound = await User.findOne({ 
      where: {emailId: req.params.userEmail}, 
      attributes: ['id', 'firstName', 'lastName', 'emailId', 'createdAt']
    })
    if (!userFound || (userFound['id'] !== req.body.userId)) {
      return res.status(200).send({
        'error': true, 'msg': 'Permission denied', 'response': null
      })
    }
    res.status(200).send({
      'error': false, 'msg': 'user details are fetched', 'response': userFound
    })
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    });
  }
}

/*
 * Description: For registration of new user on the blog site.
 *   The function first check whether provided emailId is present in User table, 
 *   if emailId is not present then new entry is made for user into User table
 * Input Parameters: 
 *   All parameters are send in body
 *   1. emailId
 *   2. firstName,
 *   3. lastName,
 *   4. password
 * Output: If user signup is successful then success message is send,
 *   else error message is send to client
*/

const addUser = async (req, res) => {
  if (!req.body.emailId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please provide email id', 'response': null
    });
  }
  let userFound;
  try {
    userFound = await User.findOne({ 
      where: {emailId: req.body.emailId} 
    })
    if (userFound) {
      return res.status(400).send({
        'error': true, 'msg': 'Email id already registered', 'response': null
      })
    }
    // let today = moment(new Date(Date.now())).format()
    // console.log(today)
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: bcrypt.hashSync(req.body.password, 5),
      // createdAt: (new Date(Date.now())).toString()
    })
    res.status(201).send({
      'error': false, 'msg': 'User Added', 'response': null
    })  
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

/*
 * Description: For deletion of user on the blog site.
 *   The function first check whether provided emailId and password are available in User table.
 *   If emailId and password are valid for logged in user then user info and 
 *   activites are permanently removed from all tables
 * Input Parameters: 
 *   All parameters are send in body
 *   1. emailId
 *   2. password
 * Output: If input parameters are valid for logged in user then 
 *   user is removed from all tables.
*/

const deleteUser = async (req, res) => {
  if (!req.body.emailId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter Email Id', 'response': null
    });
  }
  let users;
  try {
    users = await User.findOne({ 
      where: { id: req.body.userId} 
    });	
  	if (!users) {
      return res.status(400).send({
        'error': true, 'msg': 'Please enter registered email id', 'response': null
      });
    } else if (users.emailId !== req.body.emailId || 
      !bcrypt.compareSync(req.body.password, users.password)) {
      return res.status(400).send({
        'error': true, 'msg': 'Permission denied', 'response': null
      });        
    }
    await users.destroy()
    res.status(200).send({
      'error': false, 'msg': 'User Deleted', 'response': null
    })
  } catch(err) {
    res.status(400).send({
    	'error': true, 'msg': error.message, 'response': null
  	})
  }    
}

/*
 * Description: To redirect to main page of blog site if user is unauthorized one
 * Input Parameters: None
 * Output: redirect to main page
*/

const unauthorized = (req, res) => res.redirect('/');

/*
 * Description: Main page of blog site where user can login/ signup to the site
 * Input Parameters: None
 * Output: None at present
*/

const mainPage = (req, res) => {
  msg = 'use: /login for login & /addUser for user registration';
  res.status(400).send({
    'error': false, 'msg': msg, 'response': null
  });
}

/*
 * Description: To update basic details of logged in user
 *   User can update his/her basic details (firstName, lastName, password),
 *   but user is not allowed to change his/her emailId
 * Input Parameters:
 *   1. emailId - required
 *   2. firstName - optional
 *   3. lastName - optional
 *   4. password - optional
 * Output: If update operation is successful then success message is returned,
 *   else failure message is returned to client
*/

const updateUser = async (req, res) => {
  if (!req.body.emailId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter email id', 'response': null
    });
  }
  let userFound;
  try {
    userFound = await User.findOne({
      where: {emailId: req.body.emailId}
    })
    if (!userFound) {
      return res.status(404).send({
        'error': true, 'msg': 'User Not Found', 'response': null
      });
    }
    await userFound.update({
      firstName: req.body.firstName || userFound.firstName,
      lastName: req.body.lastName || userFound.lastName,
      password: bcrypt.hashSync(req.body.password, 5) || userFound.password,
      updatedAt: new Date(Date.now())
    })
    res.status(200).send({
      'error': false, 'msg': 'User Details Updated', 'response': null
    })   
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    })
  }
}

/*
 * Function Name: loginUser
 * Description: To login registered user
 *   The function check if provided emailId and password are present in User table
 *   If emailId and password are valid then token is generated
 * Input Parameters:
 *   parameters in body
 *   1. emailId
 *   2. password
 * Output: generation of token
*/

const loginUser = async (req, res) => {
  if(!req.body.emailId) {
    return res.status(400).send({
      'error': true, 'msg': 'Please enter email id', 'response': null
    });
  }
  let userFound;
  try {
    userFound = await User.findOne({
      where: {emailId: req.body.emailId}
    })
    if (!userFound) {
      return res.status(400).send({
        'error': true, 'msg': 'Please enter registered email id', 'response': null
      });
    } else if(!bcrypt.compareSync(req.body.password, userFound.password)) {
        return res.status(400).send({
          'error': true, 'msg': 'Please enter valid password', 'response': null
        });
      }
      // req.session.user = users;
      // console.log(req.session.user);
      // res.redirect('/');
      const token = jwt.sign({id: userFound.id}, 'mySecR3tKeY', { expiresIn: 30*60})
      res.status(200).send({
        'error': false, 'msg': token, 'response': null
      });
  } catch (error) {
    res.status(400).send({
      'error': true, 'msg': error.message, 'response': null
    });
  }
}

/*
 * Description: To logout user from blog site
 *   The token of logged in user is made null and is redirected to main page
 * Input Parameters: None
 * Output: token is set to null
*/

const logoutUser = (req, res) => {
  req.headers['authorization'] = null;
  res.redirect('/');  
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  unauthorized,
  updateUser,
  mainPage,
  loginUser,
  logoutUser
}