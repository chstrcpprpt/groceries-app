const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

//POST /api/users | register new user | public
router.post("/", (req, res) => {
  const { userName, email, password } = req.body;

  //basic validation
  if(!userName || !email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  //check for existing user
  User.findOne({ userName })
    .then(user => {
      if(user) {
        return res.status(400).json({
          msg: "User already exists"
        });
      }

      const newUser = new User({
        userName,
        email,
        password
      });

      //create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;

          //save new user
          newUser.save()
            .then(user => {

              jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    //info that is displayed to the user
                    token,
                    user: {
                      id: user.id,
                      userName: user.userName,
                      email: user.email
                    }
                  });
                }
              )
            });
        });
      });

    });
});

module.exports = router;