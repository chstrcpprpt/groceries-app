const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

//POST /api/auth | authenticate the user | public
router.post("/", (req, res) => {
  const { userName, password } = req.body;

  //basic validation
  if(!userName || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  //check for existing user
  User.findOne({ userName })
    .then(user => {
      if(!user) {
        return res.status(400).json({
          msg: "User does not exist"
        });
      }

      //validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) {
            return res.status(400).json({
              msg: "Invalid credentials"
            });
          }

          //if it does match
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

//GET - get user data || private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      res.json(user)
    });
});

module.exports = router;