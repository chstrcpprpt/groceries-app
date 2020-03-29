const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

// Sign up route
router.post("/signup", (req, res, next) => {
  const { body } = req;
  const {
    userName,
    password
  } = body;
  let { email } = body;

  //Check nulls
  if(!userName) {
    return res.send({
      success: false,
      message: "Error: Username cannot be blank"
    });
  }
  if(!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank"
    });
  }
  if(!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank"
    });
  }

  email = email.toLowerCase();

  //Verift email doesn't exist
  User.find({
    email: email
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: "Error: Account already exists"
      });
    }

    // save new user
    const newUser = new User();
    newUser.email = email;
    newUser.userName = userName;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }
      return res.send({
        success: true,
        message: "Signed up"
      });
    });
  });

});

// Sign in route
router.post("/signin", (req, res, next) => {
  const { body } = req;
  const {
    userName,
    password
  } = body;

  //Check nulls
  if(!userName) {
    return res.send({
      success: false,
      message: "Error: Username cannot be blank"
    });
  }
  if(!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank"
    });
  }

  //Check password matches
  User.find({
    userName: userName
  }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }
    //Check user exists
    if (users.length != 1) {
      return res.send({
        success: false,
        message: "Error: Username not found"
      });
    }

    const user = users[0];

    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: "Error: Password incorrect"
      });
    }

    //Create user session
    const userSession = new UserSession();

    userSession.userId = user._id;
    userSession.save((err, docs) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error"
        });
      }

      return res.send({
        success: true,
        message: "Valid sign in",
        token: docs._id
      });
    });

  });


});

// Verify route
router.get("/verify", (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  
  //verify the token is unique and not deleted
  // verify?token=
  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }

    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: "Error: Invalid"
      });
    } else {
      return res.send({
        success: true,
        message: "Good"
      });
    }
  });

});

// Logout route
router.get("/logout", (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  
  //change isDeleted to true
  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: {
      isDeleted:true
    }
  }, null, (err, sessions) => {
    if (err) {
      return res.send({
        success: false,
        message: "Error: Server error"
      });
    }

    return res.send({
      success: true,
      message: "Good"
    });
  });

});

module.exports = router;