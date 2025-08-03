var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let tokenVerify = require('./middlewares/tokenHandle');

let sequelize = require('./middlewares/database');
const User = require('./models/user');
const Project = require('./models/project');
const Issue = require('./models/issue');

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    console.log(User === sequelize.models.users);
    console.log(Project === sequelize.models.projects);
    console.log(Issue === sequelize.models.issues);

    sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

module.exports = app;
