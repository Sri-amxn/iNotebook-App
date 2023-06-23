const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'amanisagoodboy';

// ROUTE1:  create a user using: POST "/api/auth/createUser". no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors, reurn bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with the same email exists or not 
    try {
        let user = await User.findOne({ email: req.body.email });
        // console.log('user')
        if (user) {
            return res.status(400).json({ error: "sorry, a user with this email already exists" })
        }

        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id

            }

        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken })
        // res.json({ user })

        // catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error occured");

    }
})
// ROUTE2: Authenticate a user using: POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

    // if there are errors, reurn bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "try to login with valid credentials" })

        }

        const passwordCompare =  await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "try to login with valid credentials" })
        }
        const data = {
            user: {
                id: user.id

            }

        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })


    } catch (error) {

        console.error(error.message);
        res.status(500).json("Internal server error");

    }
  
})
  // ROUTE3: get logged in user's details: POST "/api/auth/getuser".  login required
  router.post('/getuser', fetchuser, async (req, res) => {
        
    // if there are errors, reurn bad requests and the errors
    try {
        // change it to userId later if 400 does not resolve
    user =req.user.id;
        const user =  await User.findById(user).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal server error");
        
    }

})


module.exports = router