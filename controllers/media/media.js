const mediaService = require('../../services/media.js');

const addMedia = (req, res) => {
  mediaService.addMedia(req, res);  
}

const deleteMedia = (req, res) => {
  mediaService.deleteMedia(req, res);  
}

const showMedia = (req, res) => {
  mediaService.showMedia(req, res);  
}

module.exports = {
  addMedia,
  deleteMedia,
  showMedia
}



