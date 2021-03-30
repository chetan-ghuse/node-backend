const multer = require('multer');
const path = require('path');
// const storage = multer.diskStorage({
//   fileFilter: (req, file, cb) => {
//     console.log(file)
//     if (!file) {
// //    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'));
//     }
//     cb(null, true);
//   },
//     destination: (req, file, cb) => {
//       // console.log('file ',file)
//       cb(null, './images/uploads/')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now()+ '-' + file.originalname)
//     }
// });


const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './images/uploads');
    }, 
    filename: (req, file, callback) => {
      callback(null, file.fieldname +'-' + Date.now()+ '-' + file.originalname);
    }
  }),
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    // ~['abc', 'xyz'].indexOf(ext)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      callback('only images can be uploaded')
    } else {
      callback(null, true)
    }
  }
}).array('image');

// exports.upload = multer({storage: storage}).array('image', 5);

exports.uploadFiles = async (req, res, next) => {

  await upload(req, res, (err) => {
    if (err) {
      res.status(500).send({
        'error': true, 'msg': err, 'response': null
      })
      return
    }
    next()
  })
}