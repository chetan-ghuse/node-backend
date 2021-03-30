const reportService = require('../../services/report.js');

const reportBlog = (req, res) => {
  reportService.reportBlog(req, res);  
}

module.exports = {
  reportBlog
}