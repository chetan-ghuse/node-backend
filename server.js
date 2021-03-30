const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash    = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


//const session = require('client-sessions');
// app.use(session({
//   cookieName: 'session',
//   secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
//   httpOnly: true,
//   secure: true,
//   ephemeral: true
// }));

global.router = express.Router();
app.use(cors());
app.use('/', router);
require('./routes')

const server = app.listen(3000);