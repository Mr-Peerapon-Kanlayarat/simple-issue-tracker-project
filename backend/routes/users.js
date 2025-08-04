var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let User = require('../models/user');

//ลงทะเบียนผู้ใช้ใหม่
router.post("/register", async function (req, res, next) {
  try {
    const data = req.body;

    if (!data.username || !data.email || !data.password) {
      throw new Error("Username, email, and password are required.");
    }

    // if (data.password !== data.confirmPassword) {
    //   throw new Error("Passwords do not match.");
    // }

    let hashedPassword = await bcrypt.hash(data.password, 10);

    let result = await User.create({
      username: data.username,
      email: data.email,
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
        const data = req.body
        if (!data.username || !data.password) {
            throw new Error("username and password is required.!")
        }

        let userNameIsValid = false
        let passWordIsValid = false

        const userData = await User.findOne({
            where: {
                username: data.username
            },
            raw: true
        })
        if (userData !== null) {
            userNameIsValid = true
            if (userData.password) {
                passWordIsValid = await bcrypt.compare(data.password, userData.password)
            }
        }
        if (!userNameIsValid || !passWordIsValid) {
            throw new Error("username or password invalid.!")
        }
        let token = jwt.sign({ 
            id: userData.id,
            username: userData.username,
            email: userData.email 
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
