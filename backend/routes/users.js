var express = require('express');
var router = express.Router();
let tokenVerify = require('../middlewares/tokenHandle');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let User = require('../models/user');

/* GET users listing. */
router.get('/', tokenVerify, function(req, res, next) {
  res.send('respond with a resource');
});

//ลงทะเบียนผู้ใช้ใหม่
router.post("/register", async function (req, res, next) {
  const body = req.body;

  try {

    if (!body.username || !body.email || !body.password) {
      throw new Error("Username, email, and password are required.");
    }

    // if (body.password !== body.confirmPassword) {
    //   throw new Error("Passwords do not match.");
    // }

    let hashedPassword = await bcrypt.hash(body.password, 10);

    let result = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    console.log(result);

    res.status(200).json({
      success: true,
      message: "User created successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//เข้าสู่ระบบ
router.post('/login', async function (req, res, next) {
    try {
        let body = req.body
        if (!body.username || !body.password) {
            throw new Error("username and password is required.!")
        }

        let userNameIsValid = false
        let passWordIsValid = false

        const userData = await User.findOne({
            where: {
                username: body.username
            },
            raw: true
        })
        if (userData !== null) {
            userNameIsValid = true
            if (userData.password) {
                passWordIsValid = await bcrypt.compare(body.password, userData.password)
            }
        }
        if (!userNameIsValid || !passWordIsValid) {
            throw new Error("username or password invalid.!")
        }
        let token = jwt.sign({ username: body.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Login Success.",
            token: token
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
});

module.exports = router;
