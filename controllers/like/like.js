const likeService = require('../../services/like.js');

const addRemoveLike = (req, res) => {
  likeService.addRemoveLike(req, res);  
}

module.exports = {
  addRemoveLike
}

