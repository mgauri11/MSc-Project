import express from "express";
const router = express.Router();
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../config/keys";
// Load input validation
import validateRegisterInput from "../validation/staff_register";
import validateLoginInput from "../validation/staff_login";

// Load Staff model
import Staff from "../models/Staff";

//Reference for register and login is taken from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
//I have made modifications to the solutiona and used it in both staff and student backend and mongoDB database model files.


// @route POST api/staff_register
// @desc Register user
router.post("/staff_register", (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Staff.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new Staff({
       
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bycrpt.genSalt(10, (err, salt) => {
        bycrpt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST /staff/staff_login
// @desc Login user and return JWT token
// @access Public
router.post("/staff_login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email;
  const password = req.body.password;
// Find user by Staff_Id
  Staff.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "email not found" });
    }
// Check password
    bycrpt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

export default router;