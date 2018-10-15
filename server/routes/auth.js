const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const colors = require('colors');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
//const bcryptSalt = 10;

const login = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, err => {
      console.log("req.login");
      console.log(user);
      if (err) {
        reject(new Error("Something went wrong"));
      } else {
        resolve(user);
      }
    });
  });
};

// SIGNUP and LOGGED USER
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

router.post("/signup", (req, res, next) => {
  console.log("Etapa de Signup y Login Creacion nuevo".green);
  const { username, password, email, roll } = req.body;
  console.log("username", username.red);
  console.log("password", password.red);
  console.log("email", email.red);
  console.log("roll", roll.red);
  //console.log("imgurl", image); // queda pendiente enviar imagen

  // Check for non empty required fields
  if (username === "" || password === "" || email === "" || roll === "") {
    next(new Error("You must provide valid credentials"));
  }

  // Check if user exists in DB
  User.findOne({ username })
    .then(foundUser => {
      if (foundUser) throw new Error("Username already exists");

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        email,
        roll
      }).save();
    })
    .then(savedUser => login(req, savedUser)) // loging new user using passport
    .then(user => res.json({ status: "signup & loging succesfully", user })) // jason received
    .catch(e => next(e));
});

// LOGING USER
// router.get("/login", (req, res, next) => {
//   res.render("auth/login", { message: req.flash("error") });
// });

router.post("/login", (req, res, next) => {
  console.log('Entrado al loggin'.yellow);
  console.log(req.yellow);
  passport.authenticate("local", (err, theUser, failureDetails) => {
    //error checking
    if (err) next(new Error("Something went wrong"));
    if (!theUser) next(failureDetails);

    //Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

//GET Current user
router.get("/currentuser", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error("Not logged in"));
  }
});

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

// LOGOUT USER
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ massage: "logged out" });
  //res.redirect("/");
});

router.use((err, req, res, next) => {
  res.status(500).json({ massage: err.message });
});

module.exports = router;
